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
  const folder = 'output/responsive/specialization-2026-10-03/after';
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
          const r = e.getBoundingClientRect();
          return {
            id: e.id,
            tag: e.tagName,
            left: r.left,
            right: r.right,
            width: r.width,
            height: r.height,
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
