import { test, expect } from '@playwright/test';
import { startServer } from '../../scripts/serve.ts';
import { open, sizes } from './support.ts';

const app = await startServer();
test.afterAll(async () => {
  await app.close();
});

for (const lang of ['vi', 'en'] as const)
  for (const theme of ['light', 'dark'] as const)
    test(`calendar internal safe area responsive ${lang} ${theme}`, async ({
      page,
    }, info) => {
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      await open(page, app.url, lang);
      await page.locator('#print-details summary').click();
      await page.evaluate(async () => {
        await document.fonts.ready;
      });
      const input = page.locator('#measurement-date');
      const trigger = page.locator('#date-open');
      const dialog = page.locator('#date-dialog');

      for (const [width, height] of sizes)
        for (const text of [100, 200]) {
          await page.setViewportSize({ width, height });
          await page.evaluate((scale) => {
            document.documentElement.style.fontSize =
              String((16 * scale) / 100) + 'px';
          }, text);
          const selected = text === 100 ? '2026-10-04' : '2026-10-10';
          await input.fill(selected);
          await trigger.click();
          await expect(
            dialog.locator(`[data-date="${selected}"]`),
          ).toBeFocused();
          await dialog.evaluate((e) => {
            e.scrollTop = 0;
          });
          const bounds = await dialog.evaluate((e) => {
            const box = e.getBoundingClientRect();
            const style = getComputedStyle(e);
            const left = box.left + e.clientLeft;
            const right = left + e.clientWidth;
            const first = e.firstElementChild?.getBoundingClientRect();
            return {
              left: box.left,
              right: box.right,
              top: box.top,
              bottom: box.bottom,
              client: e.clientWidth,
              scroll: e.scrollWidth,
              padding: [
                style.paddingTop,
                style.paddingRight,
                style.paddingBottom,
                style.paddingLeft,
              ].map((value) => parseFloat(value)),
              topInset: (first?.top ?? box.top) - box.top - e.clientTop,
              insets: [...e.children, ...e.querySelectorAll('button')].map(
                (child) => {
                  const r = child.getBoundingClientRect();
                  return { left: r.left - left, right: right - r.right };
                },
              ),
              days: [
                ...e.querySelectorAll<HTMLButtonElement>('[data-date]'),
              ].map((button) => {
                const r = button.getBoundingClientRect();
                const range = document.createRange();
                range.selectNodeContents(button);
                return {
                  width: r.width,
                  height: r.height,
                  text: range.getBoundingClientRect().width,
                };
              }),
            };
          });
          expect(bounds.left).toBeGreaterThanOrEqual(0);
          expect(bounds.right).toBeLessThanOrEqual(width);
          expect(bounds.top).toBeGreaterThanOrEqual(0);
          expect(bounds.bottom).toBeLessThanOrEqual(height);
          expect(bounds.scroll).toBeLessThanOrEqual(bounds.client + 1);
          for (const padding of bounds.padding)
            expect(padding).toBeGreaterThanOrEqual(16);
          expect(bounds.topInset).toBeGreaterThanOrEqual(15.5);
          expect(bounds.insets.length).toBeGreaterThan(40);
          for (const inset of bounds.insets) {
            expect(inset.left).toBeGreaterThanOrEqual(15.5);
            expect(inset.right).toBeGreaterThanOrEqual(15.5);
          }
          for (const day of bounds.days) {
            expect(day.height).toBeGreaterThanOrEqual(44);
            expect(day.width).toBeGreaterThanOrEqual(24);
            expect(day.text).toBeLessThanOrEqual(day.width - 4);
          }
          const stem = `${lang}-${theme}-${String(width)}x${String(height)}-text-${String(text)}`;
          if ([320, 360, 390, 768, 1024, 1440].includes(width))
            await page.screenshot({ path: info.outputPath(stem + '-top.png') });
          await dialog.evaluate((e) => {
            e.scrollTop = e.scrollHeight;
          });
          const bottomInset = await dialog.evaluate((e) => {
            const box = e.getBoundingClientRect();
            const last = e.lastElementChild?.getBoundingClientRect();
            return (
              box.top +
              e.clientTop +
              e.clientHeight -
              (last?.bottom ?? box.bottom)
            );
          });
          expect(bottomInset).toBeGreaterThanOrEqual(15.5);
          if ([320, 360, 390, 768, 1024, 1440].includes(width))
            await page.screenshot({
              path: info.outputPath(stem + '-bottom.png'),
            });
          await page.keyboard.press('Escape');
          await expect(dialog).toBeHidden();
          await expect(trigger).toBeFocused();
          await expect(input).toHaveValue(selected);
        }
    });
