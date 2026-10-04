import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import { test, expect } from '@playwright/test';
import { startServer } from '../../scripts/serve.ts';
import { copy } from '../../src/lib/military-copy.ts';
import { open } from './support.ts';
import {
  inspectInterface,
  inspectControlSurfaces,
} from '../../.vinasig/standards/templates/web/interface.mjs';
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
      test(`plain military guidance ${lang} ${theme} ${String(width)}`, async ({
        page,
      }, info) => {
        await page.setViewportSize({ width, height });
        await page.emulateMedia({
          colorScheme: theme,
          reducedMotion: 'reduce',
        });
        await open(page, app.url, lang);
        await page.evaluate(() => document.fonts.ready);
        if (width === 320)
          await page.addStyleTag({ content: 'html { font-size: 200% }' });
        const requests: string[] = [];
        page.on('request', (request) => requests.push(request.url()));
        const folder = 'output/responsive/plain-language-2026-10-04/after';
        await mkdir(folder, { recursive: true });
        const prefix = `${lang}-${theme}-${String(width)}x${String(height)}-${info.project.name}`;
        const advice = page.locator('#advice-heading').locator('..');
        await page.locator('#height').fill('170');
        await page.locator('#weight').fill('50');
        await expect(page.locator('#weight-range')).toHaveText(
          lang === 'vi' ? '53,5 - 71,9 kg' : '53.5 - 71.9 kg',
        );
        await expect(page.locator('#weight-change')).toContainText(
          lang === 'vi' ? '53,5 kg khoảng 3,5 kg' : '3.5 kg below 53.5 kg',
        );
        await expect(page.locator('#health-advice')).toHaveText(
          copy[lang].underAdvice,
        );
        await expect(page.locator('#weight-distance')).toBeHidden();
        await expect(page.locator('#exact-bmi')).toBeHidden();
        await advice.screenshot({
          path: `${folder}/${prefix}-underweight-advice.png`,
        });
        await page
          .locator('#result')
          .screenshot({ path: `${folder}/${prefix}-underweight-result.png` });
        const weightSummary = page.locator('#weight-method summary');
        await weightSummary.focus();
        await page.keyboard.press('Enter');
        await expect(page.locator('#weight-distance')).toBeVisible();
        await expect(page.locator('#weight-distance')).toContainText(
          lang === 'vi' ? '71,9 kg khoảng 21,9 kg' : '21.9 kg below 71.9 kg',
        );
        await advice.screenshot({
          path: `${folder}/${prefix}-method-open.png`,
        });
        await page.keyboard.press('Enter');
        await expect(page.locator('#weight-distance')).toBeHidden();
        const precision = page.locator('#bmi-explanation summary');
        await precision.focus();
        await page.keyboard.press('Enter');
        await expect(page.locator('#exact-bmi')).toBeVisible();
        await expect(page.locator('#exact-bmi')).toHaveText(
          lang === 'vi' ? '17,30' : '17.30',
        );
        await page
          .locator('#result')
          .screenshot({ path: `${folder}/${prefix}-precision-open.png` });
        await page.keyboard.press('Enter');
        for (const [weight, band] of [
          ['65', 'healthy'],
          ['85', 'overweight'],
        ] as const) {
          await page.locator('#weight').fill(weight);
          if (weight === '65') {
            await expect(page.locator('#weight-change')).toHaveText(
              copy[lang].maintain,
            );
            await expect(page.locator('#health-advice')).toHaveText(
              copy[lang].normalAdvice,
            );
          } else {
            await expect(page.locator('#weight-change')).toContainText(
              lang === 'vi'
                ? '71,9 kg khoảng 13,1 kg'
                : '13.1 kg above 71.9 kg',
            );
            await expect(page.locator('#health-advice')).toHaveText(
              copy[lang].overAdvice,
            );
          }
          await advice.screenshot({
            path: `${folder}/${prefix}-${band}-advice.png`,
          });
          expect(await page.evaluate(inspectInterface)).toEqual([]);
          expect(await page.evaluate(inspectControlSurfaces)).toEqual([]);
        }
        await page.locator('#height').fill('200');
        await page.locator('#weight').fill('99.999');
        await expect(page.locator('#bmi-value')).toHaveText(
          lang === 'vi' ? '25,0' : '25.0',
        );
        await expect(page.locator('#weight-change')).toHaveText(
          copy[lang].maintain,
        );
        await expect(page.locator('#health-advice')).toHaveText(
          copy[lang].normalAdvice,
        );
        await expect(page.locator('#weight-range')).toHaveText(
          lang === 'vi' ? '74 - 99,6 kg' : '74 - 99.6 kg',
        );
        await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
        await expect(page.getByRole('contentinfo')).toBeInViewport();
        const bounds = await page.evaluate(() => ({
          width: innerWidth,
          html: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
        }));
        expect(bounds.html).toBeLessThanOrEqual(bounds.width + 1);
        expect(bounds.body).toBeLessThanOrEqual(bounds.width + 1);
        await page.locator('#clear').click();
        await expect(page.locator('#result-details')).toBeHidden();
        await expect(page.locator('#weight-change')).toBeEmpty();
        await expect(page.locator('#weight-distance')).toBeEmpty();
        await expect(page.locator('#exact-bmi')).toBeEmpty();
        await expect(page.locator('[aria-invalid=true]')).toHaveCount(0);
        expect(requests).toEqual([]);
      });
    }
