import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';
import { startServer } from '../../scripts/serve.ts';
import { copy, sources } from '../../src/lib/military-copy.ts';
import {
  sizes,
  open,
  input,
  expand,
  capture,
  axe,
  privacy,
} from './support.ts';
const app = await startServer();
test.afterAll(async () => {
  await app.close();
});
for (const lang of ['vi', 'en'] as const) {
  const c = copy[lang];
  for (const [width, height] of sizes)
    for (const text of [100, 200])
      test(`responsive military ${lang} ${String(width)}x${String(height)} text ${String(text)}`, async ({
        page,
      }, info) => {
        await page.setViewportSize({ width, height });
        await open(page, app.url, lang);
        await page.evaluate((scale) => {
          document.documentElement.style.fontSize =
            String((16 * scale) / 100) + 'px';
        }, text);
        const name = `military-${lang}-${String(width)}x${String(height)}-${info.project.name}-text-${String(text)}`;
        await capture(page, name + '-idle');
        await page.locator('#calculate').click();
        await expect(page.locator('#height')).toBeFocused();
        await expect(page.locator('#height-error')).toBeVisible();
        await expect(page.locator('#weight-error')).toBeVisible();
        await capture(page, name + '-error');
        await input(page, lang, '170', '50');
        await expect(page.locator('#bmi-value')).toHaveText(
          lang === 'vi' ? '17,3' : '17.3',
        );
        await expect(page.locator('#category')).toContainText('4');
        await expect(page.locator('#bmi-criterion')).toHaveText(c.bmiOutside);
        await expect(page.locator('#result-heading')).toBeFocused();
        await capture(page, name + '-success');
        await expand(page);
        await input(page, lang, '170', '52.6');
        await expect(page.locator('#low-gap')).toBeVisible();
        await expect(page.locator('#bmi-criterion')).toHaveText(c.bmiWithin);
        await page.locator('#record-height').fill('170');
        await page.locator('#record-weight').fill('55');
        await page.locator('#compare').click();
        await expect(page.locator('#comparison-result')).toBeVisible();
        await capture(page, name + '-boundary-comparison-notes-open');
        await page.locator('#witness').fill('A'.repeat(120));
        await page
          .locator('#method')
          .fill('Long measurement notes '.repeat(50));
        await input(page, lang, '50', '1000');
        await expect(page.locator('#bmi-value')).toHaveText(
          lang === 'vi' ? '4000,0' : '4000.0',
        );
        await capture(page, name + '-long-result');
      });
  for (const [width, height] of [
    [390, 844],
    [1440, 900],
  ] as const)
    for (const theme of ['light', 'dark'] as const)
      for (const reduced of ['no-preference', 'reduce'] as const)
        test(`privacy accessibility military ${lang} ${String(width)} ${theme} ${reduced}`, async ({
          browser,
        }, info) => {
          const context = await browser.newContext({
            viewport: { width, height },
            colorScheme: theme,
            reducedMotion: reduced,
          });
          try {
            const page = await context.newPage();
            const requests: {
              url: string;
              method: string;
              body: string | null;
            }[] = [];
            const errors: string[] = [];
            page.on('request', (r) => {
              requests.push({
                url: r.url(),
                method: r.method(),
                body: r.postData(),
              });
            });
            page.on('pageerror', (e) => {
              errors.push(e.message);
            });
            await open(page, app.url, lang);
            await expect(page.locator('input[type=range]')).toHaveCount(0);
            await axe(page);
            await page.locator('#calculate').click();
            await axe(page);
            await expand(page);
            for (const weight of [
              '71.999',
              '72',
              '74',
              '100',
              '108',
              '119.6',
              '119.601',
              '120',
              '140',
              '160',
            ]) {
              await input(page, lang, '200', weight);
              await axe(page);
            }
            await input(page, lang, '170.125', '65.875');
            await page.locator('#record-height').fill('171.125');
            await page.locator('#record-weight').fill('66.875');
            await page.locator('#compare').click();
            await page.locator('#witness').fill('Privacy fixture');
            await page.locator('#measurement-date').fill('2026-10-03');
            await axe(page);
            await capture(
              page,
              `military-${lang}-${String(width)}x${String(height)}-${info.project.name}-${theme}-${reduced}`,
            );
            await privacy(context, page);
            expect(errors).toEqual([]);
            expect(
              requests.every(
                (r) =>
                  r.method === 'GET' &&
                  r.body === null &&
                  new URL(r.url).origin === new URL(app.url).origin,
              ),
            ).toBe(true);
            expect(
              requests.some((r) =>
                /65\.875|170\.125|Privacy|2026-10-03/.test(r.url),
              ),
            ).toBe(false);
            expect(
              await page
                .locator('#height')
                .evaluate((e) => getComputedStyle(e).fontFamily),
            ).toContain('Space Grotesk');
            expect(
              await page
                .locator('.brand img')
                .evaluate((e) => (e as HTMLImageElement).naturalWidth),
            ).toBeGreaterThan(0);
            await page.locator('#weight').fill('66');
            await expect(page.locator('#result')).toBeHidden();
            await expect(page.locator('#comparison-result')).toBeHidden();
            for (const id of [
              'bmi-value',
              'health-advice',
              'weight-range',
              'self-outcome',
            ])
              await expect(page.locator('#' + id)).toBeEmpty();
            await page
              .getByRole('button', { name: c.clear, exact: true })
              .click();
            for (const id of [
              'height',
              'weight',
              'chest',
              'record-height',
              'record-weight',
              'record-chest',
              'witness',
              'measurement-date',
              'method',
            ])
              await expect(page.locator('#' + id)).toHaveValue('');
            await expect(page.locator('#height')).toBeFocused();
          } finally {
            await context.close();
          }
        });
  test(`military fixtures, exact thresholds and healthy advice ${lang}`, async ({
    page,
  }) => {
    await open(page, app.url, lang);
    for (const [h, w, grade, outside] of [
      ['170', '50', '4', true],
      ['171', '52', '4', true],
      ['170', '44', '4', true],
      ['170', '55', '1', false],
      ['160', '50', '2', false],
      ['176', '95', '4', true],
      ['170', '52.6', '4', false],
    ] as const) {
      await input(page, lang, h, w);
      await expect(page.locator('#category')).toContainText(grade);
      await expect(page.locator('#bmi-criterion')).toHaveText(
        outside ? c.bmiOutside : c.bmiWithin,
      );
    }
    await expect(page.locator('#low-gap')).toBeVisible();
    await expect(page.locator('#physique-criterion')).toHaveText(c.ineligible);
    await expect(page.locator('#boundary-warning')).toHaveText(c.borderline);
    for (const [w, outside] of [
      ['71.999', true],
      ['72', false],
      ['119.6', false],
      ['119.601', true],
    ] as const) {
      await input(page, lang, '200', w);
      await expect(page.locator('#bmi-criterion')).toHaveText(
        outside ? c.bmiOutside : c.bmiWithin,
      );
    }
    await input(page, lang, '200', '99.8');
    await expect(page.locator('#table-gap')).toBeVisible();
    await expect(page.locator('#category')).toContainText('1-2');
    await input(page, lang, '170', '50');
    await expect(page.locator('#weight-range')).toHaveText(
      lang === 'vi' ? '53,5-71,9 kg' : '53.5-71.9 kg',
    );
    await expect(page.locator('#weight-change')).toContainText(
      lang === 'vi' ? '3,5 kg' : '3.5 kg',
    );
    await expect(page.locator('#health-advice')).toHaveText(c.underAdvice);
    await page
      .locator('label')
      .filter({ has: page.locator('#table-female') })
      .click();
    await expect(page.locator('#chest')).toBeHidden();
    await input(page, lang, '155', '45');
    await expect(page.locator('#category')).toContainText('2');
    await expect(page.locator('#missing-chest')).toBeHidden();
  });
  test(`optional chest, highest score and invalid inputs ${lang}`, async ({
    page,
  }) => {
    await open(page, app.url, lang);
    await expect(page.locator('#bmi-formula')).toHaveText(c.bmiFormula);
    await expect(page.locator('#chest-hint')).toHaveText(c.chestHint);
    await expect(page.locator('#chest')).toHaveAttribute(
      'aria-describedby',
      'chest-hint measurement-hint chest-error',
    );
    await expect(page.locator('#chest')).not.toHaveAttribute('required', '');
    for (const [h, w] of [
      ['0', '65'],
      ['1.70', '65'],
      ['170cm', '65'],
      ['170', '-65'],
      ['170', '1e2'],
      ['170', '65.1234'],
      ['170', '1000.001'],
    ]) {
      assert(h && w);
      await input(page, lang, h, w);
      await expect(page.locator('#result')).toBeHidden();
      await expect(page.locator('[aria-invalid=true]')).toHaveCount(1);
    }
    await page.locator('#chest').fill('bad');
    await input(page, lang, '170', '55');
    await expect(page.locator('#chest-error')).toBeVisible();
    await page.locator('#chest').fill('');
    await page.locator('#calculate').click();
    await expect(page.locator('#category')).toContainText('1');
    await expect(page.locator('#missing-chest')).toBeVisible();
    const baselineBmi = await page.locator('#bmi-value').textContent();
    const baselineExactBmi = await page.locator('#exact-bmi').textContent();
    for (const chest of ['81', '70']) {
      await page.locator('#chest').fill(chest);
      await page.locator('#calculate').click();
      await expect(page.locator('#bmi-value')).toHaveText(baselineBmi ?? '');
      await expect(page.locator('#exact-bmi')).toHaveText(
        baselineExactBmi ?? '',
      );
      await expect(page.locator('#bmi-criterion')).toHaveText(c.bmiWithin);
      await expect(page.locator('#category')).toContainText(
        chest === '81' ? '1' : '6',
      );
    }
    await expect(page.locator('#category')).toContainText('6');
    await expect(page.locator('#drivers')).toContainText(
      lang === 'vi' ? 'Vòng ngực' : 'Chest',
    );
    await expect(page.locator('#missing-chest')).toBeHidden();
  });
  test(`keyboard touch and styled native table radios ${lang}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
    });
    try {
      const page = await context.newPage();
      await open(page, app.url, lang);
      const skip = page.getByRole('link', { name: c.skip });
      await page.keyboard.press('Tab');
      if (process.platform === 'win32' && info.project.name === 'webkit') {
        // This port skips links by default; explicitly exercise the skip link.
        await expect(skip).not.toBeFocused();
        await skip.focus();
      }
      await expect(skip).toBeFocused();
      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      if (process.platform === 'win32' && info.project.name === 'webkit')
        await page.locator('#table-male').focus();
      await expect(page.locator('#table-male')).toBeFocused();
      await page.keyboard.press('ArrowDown');
      await expect(page.locator('#table-female')).toBeChecked();
      await expect(page.locator('#table-female')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.locator('#height')).toBeFocused();
      await page.keyboard.type('155');
      await page.keyboard.press('Tab');
      await page.keyboard.type('45');
      await page.keyboard.press('Enter');
      await expect(page.locator('#result')).toBeVisible();
      await page.locator('summary').first().tap();
      await expect(page.locator('details').first()).toHaveAttribute('open', '');
      await expect(page.locator('#chest')).toBeHidden();
      await page
        .locator('label')
        .filter({ has: page.locator('#table-male') })
        .tap();
      await expect(page.locator('#table-male')).toBeChecked();
      await expect(page.locator('#chest')).toBeVisible();
      await capture(
        page,
        `military-${lang}-390x844-${info.project.name}-touch`,
      );
      await page.getByRole('button', { name: c.clear, exact: true }).tap();
      await expect(page.locator('#height')).toHaveValue('');
    } finally {
      await context.close();
    }
  });
  for (const mode of ['disabled', 'blocked'] as const)
    test(`script failure privacy ${lang} ${mode}`, async ({
      browser,
    }, info) => {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        javaScriptEnabled: mode !== 'disabled',
      });
      try {
        const page = await context.newPage();
        const requests: string[] = [];
        page.on('request', (r) => {
          requests.push(r.url());
        });
        if (mode === 'blocked') await page.route('**/*.js', (r) => r.abort());
        await page.goto(app.url + (lang === 'en' ? 'en/' : ''));
        await expect(page.locator('#calculate')).toBeDisabled();
        await page.locator('#height').fill('177.777');
        await page.locator('#weight').fill('77.777');
        for (const key of ['height', 'weight', 'chest'])
          await expect(page.locator('#' + key)).not.toHaveAttribute(
            'name',
            /.+/,
          );
        await page.locator('#weight').press('Enter');
        await capture(
          page,
          `military-${lang}-390x844-${info.project.name}-script-${mode}`,
          false,
        );
        expect(
          requests.some((r) => r.includes('177.777') || r.includes('77.777')),
        ).toBe(false);
        await expect(page.locator('#result')).toBeHidden();
        await expect(page.locator('#compare')).toBeDisabled();
        await expect(page.locator('#print')).toBeDisabled();
        await expect(page.locator('#date-open')).toBeDisabled();
      } finally {
        await context.close();
      }
    });
  test(`offline, metadata and sources ${lang}`, async ({ page, context }) => {
    await open(page, app.url, lang);
    expect(await page.title()).toBe(c.title + ' | VINASIG');
    const canonical =
      'https://vinasig.github.io/nvqs-bmi-calculator/' +
      (lang === 'en' ? 'en/' : '');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
      'href',
      canonical,
    );
    await expect(page.locator('link[hreflang]')).toHaveCount(3);
    await expect(page.locator('#other-tool')).toHaveAttribute(
      'href',
      'https://vinasig.github.io/bmi-calculator/' +
        (lang === 'en' ? 'en/' : ''),
    );
    await expect(page.locator('body')).toHaveAttribute('data-tool', 'military');
    await expand(page);
    await expect(page.locator('#legal-details a').first()).toHaveAttribute(
      'href',
      sources.recruitment,
    );
    const structured: unknown = JSON.parse(
      await page.locator('script[type="application/ld+json"]').innerText(),
    );
    expect(structured).toMatchObject({
      '@type': 'WebApplication',
      name: c.title,
      url: canonical,
      inLanguage: lang,
    });
    await context.setOffline(true);
    await input(page, lang, '170', '50');
    await expect(page.locator('#bmi-criterion')).toHaveText(c.bmiOutside);
  });
  test(`comparison, local text export and print ${lang}`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await open(page, app.url, lang);
    await input(page, lang, '170', '52.6');
    await expand(page);
    await page.locator('#compare').click();
    await expect(page.locator('#record-height-error')).toBeVisible();
    await page.locator('#record-height').fill('170');
    await page.locator('#record-weight').fill('55');
    await page.locator('#compare').click();
    await expect(page.locator('#measurement-differences')).toContainText(
      lang === 'vi' ? '+2,4 kg' : '+2.4 kg',
    );
    await expect(page.locator('#self-outcome')).toContainText(c.ineligible);
    await expect(page.locator('#record-outcome')).toContainText(c.eligible);
    await page.locator('#record-weight').fill('56');
    await expect(page.locator('#comparison-result')).toBeHidden();
    await page.locator('#measurement-date').fill('2026-10-03');
    await page.locator('#witness').fill('<script>not executed</script>');
    await page.locator('#method').fill('A'.repeat(1200));
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#download').click();
    const download = await downloadPromise;
    const saved = await download.path();
    assert(saved);
    const content = await readFile(saved, 'utf8');
    expect(content).toContain('2026-10-03');
    expect(content).toContain('<script>not executed</script>');
    expect(content).toContain(c.recordNotice);
    await expect(page.locator('#print-sheet')).toBeHidden();
    await page.evaluate(() => {
      window.print = () => {
        document.documentElement.dataset['printed'] = 'yes';
      };
    });
    await page.locator('#print').click();
    await expect(page.locator('html')).toHaveAttribute('data-printed', 'yes');
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('#print-sheet')).toBeVisible();
    await expect(page.locator('.app-shell')).toBeHidden();
    await capture(
      page,
      `military-${lang}-390x844-${info.project.name}-print-record`,
      true,
      false,
    );
    await page.emulateMedia({ media: 'screen' });
    await page.getByRole('button', { name: c.clear, exact: true }).click();
    await expect(page.locator('#sheet-content')).toBeEmpty();
  });
}
test('locale navigation and history clear all health and record fields', async ({
  page,
}) => {
  await open(page, app.url, 'vi');
  await input(page, 'vi', '170', '50');
  await expand(page);
  await page.locator('#record-weight').fill('55');
  await page.locator('#witness').fill('Fixture');
  await page.getByRole('link', { name: 'English', exact: true }).click();
  for (const id of ['height', 'record-weight', 'witness'])
    await expect(page.locator('#' + id)).toHaveValue('');
  await expect(page.locator('#result')).toBeHidden();
  await page.goBack();
  await expect(page.locator('#height')).toHaveValue('');
  await page.reload();
  await expect(page.locator('#result')).toBeHidden();
});
for (const reduced of ['no-preference', 'reduce'] as const)
  test(`motion reversal ${reduced}`, async ({ page }, info) => {
    await page.emulateMedia({ reducedMotion: reduced });
    await open(page, app.url, 'vi');
    const button = page.locator('#calculate');
    await button.hover();
    const css = await button.evaluate((e) => ({
      duration: getComputedStyle(e).transitionDuration,
      transform: getComputedStyle(e).transform,
    }));
    if (reduced === 'reduce') {
      expect(css.duration).toBe('0s');
      expect(css.transform).toBe('none');
    } else expect(css.duration).toContain('0.16s');
    await capture(
      page,
      `motion-${info.project.name}-${reduced}-start`,
      true,
      false,
    );
    await page.mouse.move(0, 0);
    await expect
      .poll(() => button.evaluate((e) => getComputedStyle(e).transform))
      .toBe('none');
    await capture(
      page,
      `motion-${info.project.name}-${reduced}-end`,
      true,
      false,
    );
  });
