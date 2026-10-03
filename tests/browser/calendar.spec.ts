import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';
import { startServer } from '../../scripts/serve.ts';
import { copy } from '../../src/lib/military-copy.ts';
import {
  sizes,
  open,
  input,
  expand,
  axe,
  privacy,
  capture,
  placeholderContrast,
} from './support.ts';

const app = await startServer();
test.afterAll(async () => {
  await app.close();
});
const folder = 'output/responsive/controls-2026-10-03/after';

for (const lang of ['vi', 'en'] as const) {
  const c = copy[lang];
  test(`calendar keyboard, real dates, dismissal and local record ${lang}`, async ({
    page,
    context,
  }, info) => {
    await open(page, app.url, lang);
    await input(page, lang, '170', '55');
    await expand(page);
    const date = page.locator('#measurement-date');
    const dialog = page.getByRole('dialog', { name: c.dateTitle });
    await date.fill('2026-02-29');
    let downloads = 0;
    page.on('download', () => {
      downloads++;
    });
    await page.locator('#download').click();
    await expect(date).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#date-error')).toHaveText(c.dateError);
    await expect(date).toBeFocused();
    await expect(page.locator('#sheet-content')).toBeEmpty();
    expect(downloads).toBe(0);

    await date.fill('2024-02-28');
    await expect(page.locator('#date-error')).toBeHidden();
    await date.press('ArrowDown');
    await expect(dialog).toBeVisible();
    await expect(page.locator('[data-date="2024-02-28"]')).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('[data-date="2024-02-29"]')).toBeFocused();
    await page.keyboard.press('PageDown');
    await expect(page.locator('[data-date="2024-03-29"]')).toBeFocused();
    await page.keyboard.press('Shift+PageUp');
    await expect(page.locator('[data-date="2023-03-29"]')).toBeFocused();
    await page.keyboard.press('Home');
    await expect(page.locator('[data-date="2023-03-26"]')).toBeFocused();
    await page.keyboard.press('End');
    await expect(page.locator('[data-date="2023-04-01"]')).toBeFocused();
    for (const direction of ['Tab', 'Shift+Tab'])
      for (let step = 0; step < 10; step++) {
        await page.keyboard.press(direction);
        expect(
          await dialog.evaluate((e) => e.contains(document.activeElement)),
        ).toBe(true);
      }
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(date).toBeFocused();
    await expect(date).toHaveValue('2024-02-28');

    await page.locator('#date-open').click();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    await expect(date).toHaveValue('2024-02-29');
    await expect(dialog).toBeHidden();
    await expect(page.locator('#date-open')).toBeFocused();
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#download').click();
    const download = await downloadPromise;
    const saved = await download.path();
    assert(saved);
    expect(await readFile(saved, 'utf8')).toContain('2024-02-29');
    await page.locator('#date-open').click();
    await page.locator('#date-next').click();
    await expect(page.locator('[data-date="2024-03-29"]')).toBeFocused();
    await page.locator('#date-close').click();
    await expect(date).toHaveValue('2024-02-29');
    await page.locator('#date-open').click();
    const bounds = await dialog.boundingBox();
    assert(bounds && bounds.x > 0 && bounds.y > 0);
    await page.mouse.click(bounds.x / 2, bounds.y / 2);
    await expect(dialog).toBeHidden();
    await page.locator('#date-open').click();
    const today = await page.evaluate(() => {
      const now = new Date();
      return [
        String(now.getFullYear()).padStart(4, '0'),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0'),
      ].join('-');
    });
    await page.locator('#date-today').click();
    await expect(date).toHaveValue(today);
    await page.locator('#date-open').click();
    await page.locator('#date-clear').click();
    await expect(date).toHaveValue('');
    await expect(page.locator('#date-error')).toBeHidden();
    await date.fill('2024-02-29');
    await page.getByRole('button', { name: c.clear, exact: true }).click();
    await expect(date).toHaveValue('');
    await expect(page.locator('#table-male')).toBeChecked();
    await privacy(context, page);
    expect(info.project.name).toMatch(/chromium|firefox|webkit/);
  });

  for (const theme of ['light', 'dark'] as const)
    test(`calendar responsive touch and font ${lang} ${theme}`, async ({
      browser,
    }, info) => {
      const context = await browser.newContext({
        hasTouch: true,
        colorScheme: theme,
        reducedMotion: 'reduce',
      });
      try {
        const page = await context.newPage();
        const errors: string[] = [];
        const requests: string[] = [];
        page.on('pageerror', (e) => {
          errors.push(e.message);
        });
        await open(page, app.url, lang);
        await expand(page);
        await page.evaluate(async () => {
          await document.fonts.ready;
        });
        page.on('request', (r) => {
          requests.push(r.url());
        });
        await page.locator('#measurement-date').fill('2026-10-03');
        await mkdir(folder, { recursive: true });
        const observations = [];
        for (const [width, height] of sizes)
          for (const text of [100, 200]) {
            await page.setViewportSize({ width, height });
            await page.evaluate((scale) => {
              document.documentElement.style.fontSize =
                String((16 * scale) / 100) + 'px';
            }, text);
            await page.locator('#date-open').tap();
            await expect(
              page.locator('[data-date="2026-10-03"]'),
            ).toBeFocused();
            const bounds = await page.locator('#date-dialog').evaluate((e) => {
              const r = e.getBoundingClientRect();
              return {
                left: r.left,
                right: r.right,
                top: r.top,
                bottom: r.bottom,
                client: e.clientWidth,
                scroll: e.scrollWidth,
                font: getComputedStyle(e).fontFamily,
                bodyWidth: document.documentElement.scrollWidth,
                buttons: [...e.querySelectorAll('button')].map((button) => {
                  const range = document.createRange();
                  range.selectNodeContents(button);
                  return {
                    width: button.getBoundingClientRect().width,
                    height: button.getBoundingClientRect().height,
                    dayText: button.dataset['date']
                      ? range.getBoundingClientRect().width
                      : 0,
                  };
                }),
              };
            });
            expect(bounds.left).toBeGreaterThanOrEqual(0);
            expect(bounds.right).toBeLessThanOrEqual(width);
            expect(bounds.top).toBeGreaterThanOrEqual(0);
            expect(bounds.bottom).toBeLessThanOrEqual(height);
            expect(bounds.scroll).toBeLessThanOrEqual(bounds.client + 1);
            expect(bounds.bodyWidth).toBeLessThanOrEqual(width);
            expect(bounds.font).toContain('Space Grotesk');
            for (const button of bounds.buttons) {
              expect(button.height).toBeGreaterThanOrEqual(44);
              expect(button.width).toBeGreaterThanOrEqual(24);
              expect(button.dayText).toBeLessThanOrEqual(button.width - 4);
            }
            observations.push({ width, height, text, ...bounds });
            const name = `calendar-${lang}-${String(width)}x${String(height)}-${theme}-text-${String(text)}-${info.project.name}`;
            await page.screenshot({ path: folder + '/' + name + '.png' });
            await page.locator('#date-dialog').evaluate((e) => {
              e.scrollTop = e.scrollHeight;
            });
            await page.screenshot({
              path: folder + '/' + name + '-bottom.png',
            });
            if ((width === 390 || width === 1440) && text === 100)
              await axe(page);
            await page.locator('#date-close').tap();
            await expect(page.locator('#date-dialog')).not.toBeVisible();
          }
        await page.evaluate(() => {
          document.documentElement.style.fontSize = '16px';
        });
        await page.setViewportSize({ width: 390, height: 844 });
        await page.locator('#date-open').tap();
        await page.locator('[data-date="2026-10-14"]').tap();
        await expect(page.locator('#measurement-date')).toHaveValue(
          '2026-10-14',
        );
        expect(requests).toEqual([]);
        expect(errors).toEqual([]);
        await privacy(context, page);
        await writeFile(
          folder + `/calendar-${lang}-${theme}-${info.project.name}.json`,
          JSON.stringify(observations, null, 2) + '\n',
        );
      } finally {
        await context.close();
      }
    });
  for (const theme of ['light', 'dark'] as const)
    test(`placeholder examples and entered values ${lang} ${theme}`, async ({
      browser,
    }, info) => {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        colorScheme: theme,
      });
      try {
        const page = await context.newPage();
        await open(page, app.url, lang);
        await expand(page);
        for (const prefix of ['', 'record-'])
          for (const [id, example] of [
            ['height', c.heightExample],
            ['weight', c.weightExample],
            ['chest', c.chestExample],
          ]) {
            assert(id && example);
            const field = page.locator('#' + prefix + id);
            await expect(field).toHaveValue('');
            await expect(field).toHaveAttribute('placeholder', example);
            await placeholderContrast(page, prefix + id);
          }
        const name = `placeholder-${lang}-390x844-${theme}-${info.project.name}`;
        await capture(page, name + '-empty');
        await page.locator('#calculate').click();
        await expect(page.locator('#result')).toBeHidden();
        await expect(page.locator('#height-error')).toBeVisible();
        await expect(page.locator('#weight-error')).toBeVisible();
        await page.locator('#height').fill('170');
        await expect(page.locator('#height')).toHaveValue('170');
        await expect(page.locator('#weight')).toHaveValue('');
        await capture(page, name + '-height-entered');
        await privacy(context, page);
      } finally {
        await context.close();
      }
    });
}
