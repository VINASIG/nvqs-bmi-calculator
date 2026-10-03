import assert from 'node:assert/strict';
import { mkdir, access, writeFile } from 'node:fs/promises';
import { expect } from '@playwright/test';
import type { Page, BrowserContext } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { copy } from '../../src/lib/military-copy.ts';
import type { Locale } from '../../src/lib/math.ts';
export const sizes = [
  [320, 800],
  [360, 800],
  [390, 844],
  [440, 800],
  [600, 800],
  [759, 1024],
  [760, 1024],
  [761, 1024],
  [768, 1024],
  [900, 800],
  [1023, 768],
  [1024, 768],
  [1439, 900],
  [1440, 900],
] as const;
export async function open(
  page: Page,
  url: string,
  lang: Locale,
): Promise<void> {
  await page.goto(url + (lang === 'en' ? 'en/' : ''));
  await expect(page.locator('#calculate')).toBeEnabled();
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
}
export async function input(
  page: Page,
  lang: Locale,
  height: string,
  weight: string,
): Promise<void> {
  await page
    .getByRole('textbox', { name: copy[lang].height, exact: true })
    .fill(height);
  await page
    .getByRole('textbox', { name: copy[lang].weight, exact: true })
    .fill(weight);
  await page.locator('#calculate').click();
}
export async function expand(page: Page): Promise<void> {
  for (const summary of await page.locator('summary').all())
    await summary.click();
}
export async function capture(
  page: Page,
  name: string,
  scriptEnabled = true,
  scroll = true,
): Promise<void> {
  const folder = 'output/responsive/controls-2026-10-03/layout';
  await mkdir(folder, { recursive: true });
  if (scriptEnabled) {
    await page.evaluate(async (shouldScroll) => {
      await document.fonts.ready;
      if (shouldScroll) {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => {
            resolve();
          }),
        );
        window.scrollTo(0, 0);
      }
    }, scroll);
    const bounds = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
      controls: [
        ...document.querySelectorAll<HTMLElement>(
          'input,select,textarea,button,nav,summary,.workspace,#bmi-value,.tool-choice',
        ),
      ]
        .filter((e) => e.getBoundingClientRect().width > 0)
        .map((e) => {
          // A visually hidden native radio is operated through its full label.
          // Measure that real pointer/touch target, not the 1 px focusable input.
          const target =
            e instanceof HTMLInputElement && e.type === 'radio'
              ? (e.closest('label') ?? e)
              : e;
          const r = target.getBoundingClientRect();
          const wordLines: number[] = [];
          if (e instanceof HTMLInputElement && e.type === 'radio') {
            const text = target.querySelector('span')?.firstChild;
            if (text?.nodeType === Node.TEXT_NODE) {
              for (const match of (text.textContent ?? '').matchAll(/\S+/g)) {
                const range = document.createRange();
                range.setStart(text, match.index);
                range.setEnd(text, match.index + match[0].length);
                wordLines.push(range.getClientRects().length);
              }
            }
          }
          return {
            id: e.id,
            tag: e.tagName,
            left: r.left,
            right: r.right,
            width: r.width,
            height: r.height,
            wordLines,
          };
        }),
    }));
    expect(bounds.scroll, JSON.stringify(bounds)).toBeLessThanOrEqual(
      bounds.width + 1,
    );
    expect(bounds.body, JSON.stringify(bounds)).toBeLessThanOrEqual(
      bounds.width + 1,
    );
    for (const control of bounds.controls) {
      expect(control.left).toBeGreaterThanOrEqual(-1);
      expect(control.right).toBeLessThanOrEqual(bounds.width + 1);
      if (['INPUT', 'SELECT', 'BUTTON', 'SUMMARY'].includes(control.tag))
        expect(control.height).toBeGreaterThanOrEqual(44);
      for (const lines of control.wordLines) expect(lines).toBe(1);
    }
    await mkdir('output/checks', { recursive: true });
    await writeFile(
      'output/checks/' + name + '.json',
      JSON.stringify(bounds) + '\n',
    );
  } else {
    await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
    await expect(page.getByRole('contentinfo')).toBeInViewport();
    await page.getByRole('heading', { level: 1 }).scrollIntoViewIfNeeded();
  }
  const pageHeight = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  if (pageHeight > 30_000) {
    // WebKit cannot encode a full-page bitmap exceeding 32767 px. Preserve
    // every part at its real viewport scale instead of shrinking the UI.
    const viewport = page.viewportSize();
    assert(viewport);
    for (
      let top = 0, part = 1;
      top < pageHeight;
      top += viewport.height, part++
    ) {
      await page.evaluate((y) => {
        window.scrollTo(0, y);
      }, top);
      await page.screenshot({
        path: folder + '/' + name + '-part-' + String(part) + '.png',
        fullPage: false,
        timeout: 30_000,
      });
    }
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
  } else {
    await page.screenshot({
      path: folder + '/' + name + '.png',
      fullPage: true,
      timeout: 30_000,
    });
  }
}
export async function axe(page: Page): Promise<void> {
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
}
export async function privacy(
  context: BrowserContext,
  page: Page,
): Promise<void> {
  expect(await context.cookies()).toEqual([]);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
}
export async function placeholderContrast(
  page: Page,
  id: string,
): Promise<void> {
  const result = await page.locator('#' + id).evaluate((e) => {
    const style = getComputedStyle(e);
    const placeholder = getComputedStyle(e, '::placeholder');
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Color measurement needs a 2D context');
    function luminance(color: string): number {
      if (!context) throw new Error('Missing color measurement context');
      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
      const linear = Array.from(context.getImageData(0, 0, 1, 1).data)
        .slice(0, 3)
        .map((channel) => {
          const value = channel / 255;
          return value <= 0.04045
            ? value / 12.92
            : ((value + 0.055) / 1.055) ** 2.4;
        });
      return linear.reduce(
        (sum, value, index) =>
          sum + value * ([0.2126, 0.7152, 0.0722][index] ?? 0),
        0,
      );
    }
    const foreground = luminance(placeholder.color);
    const background = luminance(style.backgroundColor);
    return {
      color: placeholder.color,
      entered: style.color,
      font: parseFloat(placeholder.fontSize),
      enteredFont: parseFloat(style.fontSize),
      contrast:
        (Math.max(foreground, background) + 0.05) /
        (Math.min(foreground, background) + 0.05),
    };
  });
  expect(result.color).not.toBe(result.entered);
  expect(result.font).toBeLessThan(result.enteredFont);
  expect(result.contrast).toBeGreaterThanOrEqual(4.5);
}
export async function immutableBefore(filename: string): Promise<void> {
  let exists = false;
  try {
    await access(filename);
    exists = true;
  } catch {
    /* New baseline. */
  }
  assert(!exists, 'Never overwrite a before capture');
}
