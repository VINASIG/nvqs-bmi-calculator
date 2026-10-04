import { test, expect } from '@playwright/test';
import { startServer } from '../../scripts/serve.ts';
import { copy } from '../../src/lib/military-copy.ts';
import { open, input, capture, privacy } from './support.ts';

const app = await startServer();
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
      test(`clear conclusion ${lang} ${theme} ${String(width)}`, async ({
        page,
        context,
      }, info) => {
        await page.setViewportSize({ width, height });
        await page.emulateMedia({
          colorScheme: theme,
          reducedMotion: 'reduce',
        });
        const requests: string[] = [];
        await open(page, app.url, lang);
        page.on('request', (r) => {
          requests.push(r.url());
        });
        if (width === 320)
          await page.addStyleTag({ content: 'html { font-size: 200% }' });
        const c = copy[lang];
        const retired =
          '#comparison-details, #comparison-form, #print-details, #print-sheet, #record-height, #measurement-date, #witness, #method, #print, #download, #date-dialog';
        await expect(page.locator(retired)).toHaveCount(0);
        for (const [weight, accepted] of [
          ['55', true],
          ['50', false],
          ['52.6', false],
        ] as const) {
          await input(page, lang, '170', weight);
          await expect(page.locator('#category')).toHaveText(
            accepted ? c.callupMet : c.callupRejected,
          );
          await expect(page.locator('#conclusion-scope')).toHaveText(
            accepted ? c.callupMetScope : c.callupRejectedScope,
          );
          await expect(page.locator('#drivers')).toContainText(
            accepted ? '1' : '4',
          );
          await expect(
            page.locator('#scoring-explanation'),
          ).not.toHaveAttribute('open', '');
          const summary = page.locator('.result-summary');
          await summary.scrollIntoViewIfNeeded();
          await expect(summary).toBeInViewport();
          const style = await page.locator('#category').evaluate((node) => ({
            size: getComputedStyle(node).fontSize,
            weight: getComputedStyle(node).fontWeight,
          }));
          expect(Number.parseFloat(style.size)).toBeGreaterThanOrEqual(
            width === 320 ? 36 : 18,
          );
          expect(Number.parseFloat(style.weight)).toBeGreaterThanOrEqual(500);
          await capture(
            page,
            `${lang}-${theme}-${String(width)}x${String(height)}-${info.project.name}-${weight === '55' ? 'grade-1' : weight === '50' ? 'grade-4' : 'bmi-pass-physique-fail'}-conclusion`,
          );
        }
        const disclosure = page.locator('#scoring-explanation summary');
        await disclosure.focus();
        await page.keyboard.press('Enter');
        await expect(page.locator('#scoring-explanation')).toHaveAttribute(
          'open',
          '',
        );
        await expect(page.locator('#score-list li')).toHaveCount(3);
        if (lang === 'en') {
          await expect(page.locator('#score-list li').first()).toContainText(
            'receives 1 point.',
          );
          await expect(page.locator('#score-list li').last()).toContainText(
            'receives 4 points.',
          );
        }
        await capture(
          page,
          `${lang}-${theme}-${String(width)}x${String(height)}-${info.project.name}-scoring-open`,
        );
        await page.keyboard.press('Enter');
        await expect(page.locator('#scoring-explanation')).not.toHaveAttribute(
          'open',
          '',
        );
        await page.locator('#clear').click();
        for (const id of [
          'category',
          'drivers',
          'conclusion-scope',
          'score-list',
        ])
          await expect(page.locator('#' + id)).toBeEmpty();
        await expect(page.locator('#result')).toBeHidden();
        await privacy(context, page);
        expect(requests).toEqual([]);
      });
    }
