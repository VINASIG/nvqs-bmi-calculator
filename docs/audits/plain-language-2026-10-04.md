# Plain-language BMI results and health guidance

Date: 2026-10-04

## Scope and baseline

The owner found the result precision and health-weight section difficult to understand. The live baseline included both locales/themes at 390x844 and 1440x900 in Chromium. Each repository has eight baseline cases, with both the result and advice captured. Original images remain in `output/responsive/plain-language-2026-10-04/before/`. The combined 16-case manifest is `../qr-generator/output/plain-language-before.json`.

## Implementation

The main health section now shows a reference weight range, one lighter/heavier comparison and general meal/activity guidance. For 170 cm and 50 kg, it displays 53.5 - 71.9 kg and explains that the entered weight is about 3.5 kg below 53.5 kg. The technical calculation, inward rounding and comparisons with both ends remain in a closed disclosure. Additional BMI precision has its own closed explanation. The detailed number remains a finite rounded representation that preserves threshold relations, not an infinite exact decimal.

Vietnamese and English use ordinary words instead of lower/upper-boundary labels and arithmetic jargon. Advice remains general and does not replace medical care. Underweight advice explicitly says not to continue losing weight. The narrower reference calculated at BMI 24.9 is not confused with the healthy category extending to below 25. At 200 cm and 99.999 kg, the prominent BMI rounds to 25.0, but guidance correctly describes the healthy category without recommending weight loss.

Adult age 20+ and pregnancy limitations remain visible in the separate health section. The section explicitly distinguishes health information from recruitment standards. Physique scoring, exact legal exclusion, measurement uncertainty, official-record comparison, print/download and citizen-rights guidance were preserved.

Local `AGENTS.md`, product/research documentation and verification coverage now require simple main-result wording and closed supporting calculation details. No dependency, supplied brand asset, pinned standard, formula or category threshold was changed.

## Regression design

The independent guidance unit suite covers both languages, underweight/healthy/overweight readings, exact reference-weight equality, immediately below BMI 18.5 and immediately below BMI 25. New browser coverage checks six sizes, both locales/themes and all three engines, with 200% text at 320 px. It checks default-closed disclosures, keyboard opening/closing, advice bands, category/rounding separation, full-page scrolling, width containment, interface/control inspectors, reset and no new requests from measurements.

The existing expansion helper now opens only visible closed disclosures and asserts that they are open. Accessibility tests reopen result disclosures after valid measurements and scan all existing bands with axe. The old helper tried to click result summaries while the result was hidden and timed out. This test-setup adjustment preserves all accessibility/privacy assertions. The new tests separately verify the required default-closed state. Capture paths honor `CAPTURE_RUN` to keep this change's images separate from earlier after captures.

The expected reference string now includes spaces around the hyphen, matching the readable UI. The numerical range assertion remains exact. An initial focused run also overlapped a second test process using the same artifact directory. Its single failure was ENOENT while closing a trace file, rather than a product assertion. The log and available evidence are preserved in `output/plain-language-diagnostic/`. Final verification must run without overlapping test processes in this repository.

## Verification

- `npm run check`, `npm test` and `npm run build` passed. Unit tests passed 67/67. Type checking had zero errors, warnings or hints. Source formatting, lint/CSS lint, standards/license integrity and built HTML/metadata/asset-digest checks remained enabled.
- The final complete Playwright run passed 546/546 on Chromium, Firefox and WebKit, with zero skipped, unexpected or flaky cases and retries disabled. Both routes, both themes, automatic input, validation/recovery, keyboard/touch, accessibility, privacy and the existing specialized behaviors remain covered.
- The existing responsive matrix covers 320, 360, 390, 440, 600, 759, 760, 761, 768, 900, 1023, 1024, 1439 and 1440 px, at 100% and 200% text. New guidance coverage independently checks 320x800 with 200% text, 360x800, 390x844, 768x1024, 1024x768 and 1440x900. Representative before/after screenshots were opened across both languages, themes, all three engines, the required sizes and the two new open disclosures. No unintended overflow was observed in those inspected states.
- `npm run test:performance` passed 12 cold lab navigations, three per locale/device size. Each original report and summary is preserved. Budgets remained LCP 2500 ms, CLS 0.1 and TBT 200 ms.

- vi mobile median LCP 1804.9 ms, CLS 0 and TBT 0 ms.
- vi desktop median LCP 406.9 ms, CLS 0 and TBT 0 ms.
- en mobile median LCP 1805.2 ms, CLS 0 and TBT 0 ms.
- en desktop median LCP 403.5 ms, CLS 0 and TBT 0 ms.

Logs are `output/plain-language-{check,unit,build,browser,performance}.log`. The final browser JSON is `output/plain-language-browser-report.json`. Current performance summaries are `output/lighthouse/after/{vi,en}/summary.json`; the preceding change's reports were copied to `output/plain-language-baseline/` before running this task.

This audit records local verification. Exact-commit CI/deployment and live-browser evidence are recorded separately in the companion QR checkout's `output/plain-language-publication.json` and `output/plain-language-live.json`. Real devices, screen readers, field metrics, independent SI-agent trials and professional clinical review are NOT_RUN.
