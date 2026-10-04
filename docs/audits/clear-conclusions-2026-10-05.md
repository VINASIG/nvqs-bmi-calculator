# Clear enlistment conclusions and retired records

## Scope and baseline

The owner requested removal of the recorded-measurement comparison and personal self-measurement record, then requested ordinary-language explanations and one prominent final enlistment conclusion with two outcomes. The checkout was clean on `main` at `9cacf92b6d69048bee9814cda97b9a7170f6c76e`. Sibling repositories, preserved brand exports, font assets, arithmetic and legal scoring rules are outside this change.

The existing production build was opened at the actual preview URL `http://127.0.0.1:58628/`. Chromium captured 48 result states across both languages, both themes and 320/360/390/768/1024/1440 px, with 200% text at 320 px. Comparison and print disclosures were also opened at 390/1440 px. The original result gave a grade number after a long label and listed all tied highest-score indicators as “drivers” without explaining their meaning. The before manifest is `output/clear-conclusions-before.json`. Screenshots are immutable under `output/responsive/clear-conclusions-2026-10-05/before/`.

## Changes

- Remove the comparison form, personal sheet, date, witness, notes, calendar and print/text-export actions, including unused source and copy.
- Explain the highest score in a sentence. For example, a BMI score of 4 gives physical grade 4 because it is the highest score. Ties are explained together rather than presented as a bare list.
- Put individual score details, whole-unit scoring and rounding in a closed explanation. Keep BMI exclusions, missing chest, unresolved table gaps and the 18.0-to-below-18.5 case explicit.
- End the primary result with a prominent summary that checks exact BMI and entered physical measurements together. The positive outcome states that these requirements are met. The negative outcome states that the entered measurements do not meet enlistment requirements.
- State the actual scope. Passing partial measurements means recruitment is possible, not guaranteed. A failed criterion remains disqualifying when official measurements match the entries. Neither outcome cancels a summons to attend an examination.
- Keep automatic updates, input error placement, Clear, safe general health advice, both translations, accurate official-measurement guidance and static citizen-rights information.
- Update local agent guidance to require these conclusions and prevent restoring retired features.

The retirement is an explicit product decision. This audit does not make a legal finding that all personal records lack evidentiary value.

## Sources

On 5 October 2026, rechecked [Circular 68 in the government transcription](https://xaydungchinhsach.chinhphu.vn/tuyen-chon-va-goi-cong-dan-nhap-ngu-sua-doi-bo-sung-quy-dinh-ve-trach-nhiem-cua-dia-phuong-giao-quan-119250708001023475.htm), Article 1(1)(a)-(b), and [Circular 105 government full text](https://xaydungchinhsach.chinhphu.vn/toan-van-thong-tu-quy-dinh-kham-suc-khoe-cho-cac-doi-tuong-thuoc-quan-ly-cua-bo-quoc-phong-119231211181442997.htm), Article 6. Recruitment requires health grades 1, 2 or 3. BMI below 18.0 or above 29.9 is excluded independently. The highest score determines the grade. No scoring/threshold engine change was made. Detailed effective dates, original table and unresolved printed gaps remain in `docs/RESEARCH.md`.

## Regression changes and verification

The owner retired the only feature using the calendar. Remove `tests/calendar.test.ts`, `tests/browser/calendar.spec.ts` and `tests/browser/calendar-spacing.spec.ts` together with that feature. Remove comparison/print-only assertions from mixed suites while retaining every surviving exact-scoring, BMI/chest independence, health advice, automatic-input, privacy, accessibility, geometry, keyboard, localization and publication assertion. Replace grade-label assertions with the complete grade explanation. Add `tests/conclusion.test.ts` and `tests/browser/conclusion.spec.ts` for both final outcomes, ties, chest, table gaps, reset, feature absence and no measurement-triggered requests. Do not alter budgets, retries, browser selection or CI requirements.

| Check                      | Result                                                                            | Evidence                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `npm run check`            | PASS, zero diagnostics/warnings                                                   | `output/clear-conclusions-check.log`                                                       |
| `npm test`                 | PASS, 92/92, no skips                                                             | `output/clear-conclusions-unit.log`                                                        |
| `npm run build`            | PASS, both routes, metadata, notices and unchanged asset bytes                    | `output/clear-conclusions-build.log`                                                       |
| `npm run test:browser`     | PASS, 570/570 across Chromium, Firefox and WebKit, no skips/retries/flaky results | `output/clear-conclusions-browser-report.json`                                             |
| `npm run test:performance` | PASS, 12 cold navigations across both locales and mobile/desktop                  | `output/clear-conclusions-performance.log`, `output/lighthouse/after/{vi,en}/summary.json` |

The full browser suite covers 14 widths from 320 to 1440 px, including breakpoint neighbors 759/760/761 and 1023/1024, at 100% and 200% text. Required viewports are 360x800, 390x844, 768x1024, 1024x768 and 1440x900. Both translations, both themes, valid/invalid input, high/low BMI, the separate BMI-pass/physical-fail result, expanded notes, long results, optional chest, keyboard/touch, motion preferences, offline, disabled/blocked scripts, locale navigation/history and Clear were exercised. Axe, interface/brand/control inspection, bounding boxes and no health request/storage assertions remain enabled.

Opened representative before screenshots across all six standard/extra widths and after full-page, result and summary captures across both languages/themes and all three engines. The new summary and complete score explanation are readable. Closed details reduce the exposed scoring text. Removed controls are absent, and no unintended horizontal overflow or overlapping/clipped conclusion was found. The score table retains its intentional local horizontal scroll. At 320 px with 200% text, the summary wraps vertically without losing content. This visual review covers the listed representative images, not a claim that every automated capture was manually opened.

Additional six-state result/summary capture sets with measured bounds are in `output/clear-conclusions-detail.json` and `output/clear-conclusions-detail-{firefox,webkit}.json`. Local screenshots are under `output/responsive/clear-conclusions-2026-10-05/after/`. Baseline browser/performance summaries were preserved under `output/clear-conclusions-baseline/`.

Cold-navigation median LCP was 1804.089 ms mobile / 402.772 ms desktop in Vietnamese and 1804.015 ms / 402.508 ms in English. CLS and TBT were zero in all twelve runs. Lighthouse performance was 99 mobile and 100 desktop, with accessibility, best practices and SEO at 100. These are lab measurements and do not establish field latency or actual call-up eligibility.

Publication follows the existing all-six-job Ubuntu/Windows and browser matrix, then Pages deployment. The handoff verifies the exact pushed revision, workflow result and live checks under `output/clear-conclusions-publication.json` and `output/clear-conclusions-live.json`. Live screenshots are kept separately under `output/responsive/clear-conclusions-2026-10-05/live/`.

The initial published change passed all six verification jobs, Pages deployment and 72 live states. Final copy review corrected singular/plural English score wording inside the detailed explanation. Unit and browser assertions now distinguish “1 point” from “4 points”. The follow-up reruns source checks, all 92 unit tests, build and the affected 72-case conclusion matrix locally. Exact-revision CI reruns the complete browser/OS matrix before publication and the handoff repeats all 72 live states. Earlier publication/live evidence is preserved with an `adbdad1` suffix. The original full local 570-case run remains valid evidence for the main change, while follow-up reports are recorded separately.

Real devices, screen-reader sessions, field performance and independent SI-agent user trials are NOT_RUN. Browser engines provide emulated viewport evidence only.
