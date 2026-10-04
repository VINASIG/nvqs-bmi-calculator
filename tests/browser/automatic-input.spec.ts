import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import { test, expect } from '@playwright/test';
import { startServer } from '../../scripts/serve.ts';
import { open } from './support.ts';
import { inspectInterface } from '../../.vinasig/standards/templates/web/interface.mjs';

let app: Awaited<ReturnType<typeof startServer>>;
test.beforeAll(async () => {
  app = await startServer(path.resolve('dist'));
});
test.afterAll(async () => {
  await app.close();
});
for (const lang of ['vi', 'en'] as const)
  for (const theme of ['light', 'dark'] as const)
    for (const [width, height] of [
      [320, 800],
      [360, 800],
      [390, 844],
      [768, 1024],
      [1024, 768],
      [1440, 900],
    ] as const) {
      test(`automatic military BMI ${lang} ${theme} ${String(width)}`, async ({
        page,
      }, info) => {
        await page.setViewportSize({ width, height });
        await page.emulateMedia({
          colorScheme: theme,
          reducedMotion: 'reduce',
        });
        await open(page, app.url, lang);
        if (width === 320)
          await page.addStyleTag({ content: 'html {font-size:200%}' });
        await expect(page.locator('#calculate')).toHaveCount(0);
        const clearButton = page.getByRole('button', {
          name: lang === 'vi' ? 'Xóa tất cả' : 'Clear all',
          exact: true,
        });
        await expect(
          clearButton.locator('svg[aria-hidden="true"]'),
        ).toBeVisible();
        const clearStyle = await clearButton.evaluate((node) => ({
          border: getComputedStyle(node).borderTopWidth,
          color: getComputedStyle(node).borderTopColor,
          height: node.getBoundingClientRect().height,
        }));
        expect(Number.parseFloat(clearStyle.border)).toBeGreaterThanOrEqual(1);
        expect(clearStyle.color).not.toMatch(/transparent|rgba\([^)]*, 0\)$/u);
        expect(clearStyle.height).toBeGreaterThanOrEqual(44);
        await expect(page.locator('#compare')).toHaveCount(0);
        await page.locator('#height').fill('170');
        await expect(page.locator('#result')).toBeHidden();
        await expect(page.locator('[aria-invalid=true]')).toHaveCount(0);
        await page.locator('#weight').fill('50');
        await expect(page.locator('#bmi-value')).toHaveText(
          lang === 'vi' ? '17,3' : '17.3',
        );
        await expect(page.locator('#result')).toBeVisible();
        await expect(page.locator('#drivers')).toContainText('4');
        await expect(page.locator('#weight')).toBeFocused();
        const scroll = await page.evaluate(() => scrollY);
        await page.locator('#weight').fill('55');
        await expect(page.locator('#bmi-value')).toHaveText(
          lang === 'vi' ? '19,0' : '19.0',
        );
        await expect(page.locator('#weight')).toBeFocused();
        expect(await page.evaluate(() => scrollY)).toBe(scroll);
        await expect(page.locator('#drivers')).toContainText('1');
        expect(await page.evaluate(inspectInterface)).toEqual([]);
        const folder = `output/responsive/${process.env['CAPTURE_RUN'] ?? 'automatic-input-2026-10-04'}/after`;
        await mkdir(folder, { recursive: true });
        await page.evaluate(async () => {
          await document.fonts.ready;
          window.scrollTo(0, document.body.scrollHeight);
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => {
              resolve();
            }),
          );
          window.scrollTo(0, 0);
        });
        await page.screenshot({
          path: `${folder}/${lang}-${theme}-${String(width)}x${String(height)}-${info.project.name}-automatic-result.png`,
          fullPage: true,
        });
        await page.locator('#weight').fill('bad');
        await expect(page.locator('#result')).toBeHidden();
        for (const id of [
          'bmi-value',
          'category',
          'weight-range',
          'health-advice',
        ])
          await expect(page.locator('#' + id)).toBeEmpty();
        await expect(page.locator('#weight-error')).toBeHidden();
        await page.locator('#weight').blur();
        await expect(page.locator('#weight-error')).toBeVisible();
        await page.locator('#weight').fill('55');
        await expect(page.locator('#result')).toBeVisible();
        await expect(page.locator('[aria-invalid=true]')).toHaveCount(0);
        await page.locator('#clear').click();
        await expect(page.locator('#height')).toHaveValue('');
        await expect(page.locator('#weight')).toHaveValue('');
        await expect(page.locator('#result')).toBeHidden();
      });
    }
for (const lang of ['vi', 'en'] as const) {
  test(`automatic military BMI Clear works while input is incomplete ${lang}`, async ({
    page,
  }) => {
    await open(page, app.url, lang);
    for (const value of ['', 'bad', '0']) {
      await page.locator('#height').fill('170.125');
      await page.locator('#weight').fill('65.875');
      await expect(page.locator('#result')).toBeVisible();
      await page.locator('#weight').fill(value);
      await page.locator('#clear').click();
      await expect(page.locator('#height')).toHaveValue('');
      await expect(page.locator('#weight')).toHaveValue('');
      await expect(page.locator('#height')).toBeFocused();
      await expect(page.locator('#result')).toBeHidden();
    }
  });
  test(`automatic military BMI composition, decimals and Enter ${lang}`, async ({
    page,
  }) => {
    await open(page, app.url, lang);
    await page.locator('#height').fill('170');
    await page.locator('#weight').fill('55');
    await expect(page.locator('#result')).toBeVisible();
    await page.locator('#weight').dispatchEvent('compositionstart');
    await page.locator('#weight').evaluate((node) => {
      if (!(node instanceof HTMLInputElement))
        throw new Error('Expected measurement input');
      node.value = '50';
      node.dispatchEvent(
        new InputEvent('input', {
          bubbles: true,
          isComposing: true,
          inputType: 'insertCompositionText',
          data: '50',
        }),
      );
    });
    await expect(page.locator('#result')).toBeHidden();
    await page.locator('#weight').dispatchEvent('compositionend');
    await expect(page.locator('#bmi-value')).toHaveText(
      lang === 'vi' ? '17,3' : '17.3',
    );
    await page.locator('#weight').fill('52,6');
    await expect(page.locator('#bmi-value')).toHaveText(
      lang === 'vi' ? '18,2' : '18.2',
    );
    await page.locator('#weight').press('Enter');
    await expect(page.locator('#weight')).toBeFocused();
    expect(page.url()).toBe(app.url + (lang === 'en' ? 'en/' : ''));
    await expect(page.locator('#result-heading')).not.toBeFocused();
  });
}

for (const lang of ['vi', 'en']) {
  test('automatic physique updates ' + lang, async ({ page }) => {
    await open(page, app.url, lang === 'en' ? 'en' : 'vi');
    await page.locator('#height').fill('170');
    await page.locator('#weight').fill('52.6');
    await page.locator('#weight').fill('55');
    const bmi = await page.locator('#bmi-value').textContent();
    await page.locator('#chest').fill('70');
    await expect(page.locator('#drivers')).toContainText('6');
    await expect(page.locator('#bmi-value')).toHaveText(bmi ?? '');
    await page
      .locator('label')
      .filter({ has: page.locator('#table-female') })
      .click();
    await expect(page.locator('#table-female')).toBeChecked();
    await expect(page.locator('#chest')).toBeHidden();
    await expect(page.locator('#drivers')).toContainText('1');
    await expect(page.locator('#bmi-value')).toHaveText(bmi ?? '');
    await page.locator('#clear').click();
    await expect(page.locator('#height')).toHaveValue('');
    await expect(page.locator('#category')).toBeEmpty();
    await expect(page.locator('#conclusion-scope')).toBeEmpty();
  });
}
