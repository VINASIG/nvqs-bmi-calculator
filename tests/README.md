# Verification coverage

## Plain-language guidance regression

`tests/plain-guidance.test.ts` covers both languages, lighter/heavier/exact-weight comparisons and healthy BMI immediately below 25 despite the conservative reference ending at 24.9. `tests/browser/plain-guidance.spec.ts` checks the concise main section, closed calculation/precision disclosures, keyboard opening and closing, all three health-advice states, exact-category behavior, full-page scrolling, width containment, styled controls, reset and no new requests from measurements. Each of Chromium, Firefox and WebKit covers both locales and themes at 320, 360, 390, 768, 1024 and 1440 px, with 200% text at 320 px. Screenshots are in `output/responsive/plain-language-2026-10-04/after`. The main health guidance does not replace medical care or prescribe an individual weight.

## Automatic input regression

`tests/browser/automatic-input.spec.ts` checks calculation without a button, incomplete input, valid edits, focus and scroll preservation, immediate stale-result removal, blur validation, recovery, Clear, IME composition, decimal commas and Enter without navigation. Additional cases check table/chest changes without altering BMI and removal of stale final conclusions. Both locales, both themes, all five required sizes and 320 px with 200% text run in all three engines. Evidence is saved to `output/responsive/automatic-input-2026-10-04/after` and must be opened.

Existing browser helpers now enter measurements without submitting. Explicit Enter remains for keyboard validation scenarios. Manual-button and automatic-result-focus expectations were updated for the owner's requested interaction. Exact scoring, recruitment thresholds, advice, privacy, accessibility and geometry assertions remain required.

## Clear conclusions and retired features

`tests/conclusion.test.ts` covers both final outcomes, the highest-score explanation, ties, optional chest, exact BMI boundaries and unresolved table scores. `tests/browser/conclusion.spec.ts` verifies the prominent final summary, closed score disclosure, keyboard operation, retired-feature absence, reset and no requests from measurement edits at 320, 360, 390, 768, 1024 and 1440 px. Both languages/themes run in all three engines, with 200% text at 320 px. Evidence belongs in `output/responsive/clear-conclusions-2026-10-05/`.

CI runs Chromium, Firefox and WebKit in separate jobs on both Ubuntu and Windows. All six jobs must pass before Pages deployment. Each job installs and selects its own engine to bound temporary trace storage, socket use and browser resource pressure. The complete project matrix remains in Playwright configuration, which rejects a CI subset supplied through BROWSER_ENGINES. There are no retries or disabled tests.

Unit tests cover exact decimal math, invalid input, rounding and every specialized category/score boundary. The two repositories have independent product tests and independent browser entry points. Only pure arithmetic is duplicated.

Playwright checks both actual translations at 320, 360, 390, 440, 600, 759, 760, 761, 768, 900, 1023, 1024, 1439 and 1440 px widths, at 100% and 200% root text sizes. Captures include idle, validation, result, boundary with expanded notes, and long result states; assertions inspect bounding boxes, unintended overflow and touch target heights. The scoring table is an intentional local horizontal scroll region.

Additional coverage: WCAG axe checks across all result bands, 390/1440 px, light/dark and reduced/full motion; native disclosure touch, keyboard focus, exact boundary conclusions, disabled/blocked scripts, offline local calculation, no request body/health URLs, no cookies/storage, stale result invalidation, Clear, language navigation/history, real structured-data values, source and absolute cross-links. Military tests also cover table selection, optional chest, both enlistment summaries, safe advice and the absence of retired record/calendar controls.

`output/responsive/specialization-2026-10-03/` contains immutable before evidence and after captures. Tests alone do not establish visual correctness: open the screenshots and record observations in the publication audit. HTML, metadata, preserved assets and notices have separate built-output checks.

The owner explicitly retired comparison and personal print/export records on 5 October 2026. The associated calendar library, component, script and tests are removed together. Earlier calendar captures/audits remain historical evidence. Surviving scoring, exact-boundary, health, input, accessibility, privacy, interface, responsive and publication gates remain intact. New absence regressions prevent accidental reintroduction of the retired controls.

Placeholder regressions cover both translations, both themes and all three browser engines. They require empty initial/reset values, localized example prefixes, a smaller font and a different color from entered values, at least 4.5:1 computed contrast, and no measurement-triggered requests or storage. Screenshots retain empty and entered states for comparison.

The control and placeholder follow-up stores owner-provided before images, rebuilt local captures, layout states and diagnostic inspection sheets in `output/responsive/controls-2026-10-03/`. The controls audit distinguishes original screenshots from readable crops and contact-sheet review. Older specialization and chest-clarification evidence is preserved.

The Windows WebKit port skips some controls/links during Tab navigation by default. Styled native radio arrow-key behavior and explicit DOM-focused skip-link activation are exercised separately where required. No claim is made that Tab visits every link in that port. Real devices and assistive-technology sessions are separate NOT_RUN items unless observed.
