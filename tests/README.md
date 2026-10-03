# Verification coverage

CI runs Chromium, Firefox and WebKit in separate jobs on both Ubuntu and Windows. All six jobs must pass before Pages deployment. Each job installs and selects its own engine to bound temporary trace storage, socket use and browser resource pressure. The complete project matrix remains in Playwright configuration, which rejects a CI subset supplied through BROWSER_ENGINES. There are no retries or disabled tests.

Unit tests cover exact decimal math, invalid input, rounding and every specialized category/score boundary. The two repositories have independent product tests and independent browser entry points. Only pure arithmetic is duplicated.

Playwright checks both actual translations at 320, 360, 390, 440, 600, 759, 760, 761, 768, 900, 1023, 1024, 1439 and 1440 px widths, at 100% and 200% root text sizes. Captures include idle, validation, result, boundary with expanded notes, and long result states; assertions inspect bounding boxes, unintended overflow and touch target heights. The scoring table is an intentional local horizontal scroll region.

Additional coverage: WCAG axe checks across all result bands, 390/1440 px, light/dark and reduced/full motion; native disclosure touch, keyboard focus, exact boundary conclusions, disabled/blocked scripts, offline local calculation, no request body/health URLs, no cookies/storage, stale result invalidation, Clear, language navigation/history, real structured-data values, source and absolute cross-links. Military tests also cover table selection, optional chest, record comparison, safe advice, local text download, escaped text and a print-media screenshot.

`output/responsive/specialization-2026-10-03/` contains immutable before evidence and after captures. Tests alone do not establish visual correctness: open the screenshots and record observations in the publication audit. HTML, metadata, preserved assets and notices have separate built-output checks.

Calendar unit tests cover real ISO dates, Gregorian leap years, UTC navigation, clamped month ends, six-week grids and the supported year bounds. Browser regressions cover invalid manual dates, local record export, arrow/Home/End/month/year navigation, modal focus containment, Escape/close/backdrop dismissal, focus restoration, Today/Clear and touch selection. Open calendar screenshots and computed bounds cover both languages, both themes, all 14 widths and 100%/200% text. Space Grotesk, 44 px target heights, no page/modal overflow and no measurement requests or storage are asserted.

Placeholder regressions cover both translations, both themes and all three browser engines. They require empty initial/reset values, localized example prefixes, a smaller font and a different color from entered values, at least 4.5:1 computed contrast, and no measurement-triggered requests or storage. Screenshots retain empty and entered states for comparison.

The control and placeholder follow-up stores owner-provided before images, rebuilt local captures, layout states and diagnostic inspection sheets in `output/responsive/controls-2026-10-03/`. The controls audit distinguishes original screenshots from readable crops and contact-sheet review. Older specialization and chest-clarification evidence is preserved.

The Windows WebKit port skips some controls/links during Tab navigation by default. Styled native radio arrow-key behavior and explicit DOM-focused skip-link activation are exercised separately where required. No claim is made that Tab visits every link in that port. Real devices and assistive-technology sessions are separate NOT_RUN items unless observed.
