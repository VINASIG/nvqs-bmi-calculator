# Recognizable Clear all action

Date: 2026-10-04

## Scope and baseline

The owner reported a Clear action that looked like ordinary text. A Chromium live baseline covered both locales/themes at 390x844 and 1440x900. Clear had a transparent border. Immutable before images are in `output/responsive/inline-errors-clear-2026-10-04/before`. The shared baseline manifest is `../qr-generator/output/inline-errors-clear-before.json`. Clear from valid input reset the measurements without immediate required-field errors.

## Implementation and regression coverage

The reset action now uses a contrasting outlined button, a decorative Lucide Trash icon and the visible label Clear all or Xóa tất cả. It retains native reset behavior and the existing pointer-intent guard. Existing automatic-input tests now assert the label, visible icon, nontransparent border and a target height of at least 44 CSS px throughout the locale/theme/viewport matrix. Existing validation, automatic result, reset, privacy and accessibility assertions remain enabled. Capture paths honor CAPTURE_RUN so historical before/after evidence remains separate.

The local owner guidance requires errors beside their own input and a recognizable reset button. Measurement arithmetic, physique scoring, legal thresholds and rights guidance are unchanged.

## Verification

- `npm run check`, `npm test` and `npm run build` passed. The unit suite passed 55/55. Standards/license checks and built HTML, metadata and supplied-asset digest checks remained enabled.
- The complete Playwright suite passed 474/474 on Chromium, Firefox and WebKit, with zero skipped, unexpected or flaky cases and no retries. It covers both routes, themes, automatic calculation/comparison, validation, recovery, records, calendars, keyboard/touch, accessibility, privacy and responsive states. No assertions, limits or budgets were weakened.
- Opened before/after captures include the five required sizes, 320x800 with 200% text, and WebKit at 390x844. Additional breakpoint/intermediate sizes remain in the full suite. Images are under `output/responsive/inline-errors-clear-2026-10-04/`; the shared viewport/style manifest is `../qr-generator/output/inline-errors-clear-visual-workspaces.json`.
- `npm run test:performance` passed 12 cold lab navigations, three per locale/device size. Median LCP was 1803.4 ms for Vietnamese/mobile, 1803.4 ms for English/mobile, 405.7 ms for Vietnamese/desktop and 402.6 ms for English/desktop. All medians had CLS 0 and TBT 0. Budgets remain LCP 2500 ms, CLS 0.1 and TBT 200 ms. Summaries are `output/lighthouse/after/vi/summary.json` and `output/lighthouse/after/en/summary.json`.

Source/gate logs are `output/inline-errors-clear-{check,unit,build,browser,performance}.log`. Publication and deployed-browser evidence is recorded separately in the companion QR checkout's `output/inline-errors-clear-publication.json`. Real devices, screen readers and field performance are NOT_RUN.
