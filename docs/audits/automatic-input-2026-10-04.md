# Automatic military BMI and record comparison

Date: 4 October 2026. Scope: Vietnamese `/` and English `/en/`.

## Reproduction and implementation

The previous production build required calculation after entering measurements and a separate action for record comparison. Chromium baseline captures cover both languages and themes at 390x844 and 1440x900. Immutable full-page and workspace screenshots are in `output/responsive/automatic-input-2026-10-04/before`. The shared task manifest is `../qr-generator/output/automatic-input-before.json`.

Valid height and weight now immediately update BMI and the physique reference. Table changes and optional chest measurements update the physique result without changing the BMI formula. Record differences update whenever either group changes. Incomplete or invalid input clears the affected result. Changes to the self-measurements invalidate any prepared print sheet. Legal scoring, exact thresholds, rounding, health reference/advice and rights guidance are unchanged.

There are no visible Calculate or Compare buttons. Updates retain input focus and do not scroll to the result. Input errors appear after blur or explicit Enter validation. IME composition waits until composition ends. Fields, table choices and actions start disabled until handlers are installed. Hidden, initially disabled submit controls retain the native Enter paths without disabling the HTML validation rule. Print and download remain explicit actions. No measurements are stored or sent.

The Clear regression recognizes pointer intent before error reflow so that clicking Clear during incomplete/invalid input works in browsers that do not focus buttons. A new radio regression clicks the existing full-label target and asserts the native radio is checked. It does not force a click through the styled label.

## Regression coverage

`tests/browser/automatic-input.spec.ts` covers automatic BMI, live physique/table/chest changes, changes from either comparison group, invalidation/recovery, focus/scroll, Clear during incomplete/invalid input, IME, decimal commas and Enter without navigation. Existing privacy, exact threshold, advice, record export/print, accessibility, responsive and calendar assertions remain enabled.

Both routes run in Chromium, Firefox and WebKit. The new flow has both themes at 360x800, 390x844, 768x1024, 1024x768 and 1440x900, plus 320x800 with 200% text. Existing coverage retains all 14 widths, 100%/200% text and the 759/760/761 breakpoint checks.

The synthetic IME regression sets the field value and dispatches an `InputEvent` with `isComposing` between composition start and end. Mixing synthetic start with Firefox `fill()` ended the simulated session through a complete native composition sequence. The corrected setup retains the hidden-result and exact-value assertions. All six locale/engine cases passed their focused rerun. The shared event diagnostic is in `../qr-generator/output/automatic-input-composition-diagnostic.log`.

## Verification evidence

`npm run check` passed TypeScript/Astro, ESLint, Stylelint, formatting, standards integrity and licensing. `npm test` passed 55/55. `npm run build` passed both language pages, HTML validation, metadata and preserved asset checks. The complete `npm run test:browser` run passed 474/474 across Chromium, Firefox and WebKit, including 90 new automatic-input cases. The final report has zero skipped, unexpected or flaky tests. Logs are under `output/automatic-input-*.log`, with browser results in `output/playwright/report.json`.

Full-page captures and focused input/result viewport captures were opened at all five required sizes and 320x800 with 200% text. The inspected selection covers both languages/themes and WebKit mobile. Automatic physique results, record differences, retained input focus and wrapped mobile layout match the DOM and geometry checks. Before captures remain separate. Images are in `output/responsive/automatic-input-2026-10-04/before` and `after`. The shared focused visual manifest is `../qr-generator/output/automatic-input-visual-workspaces.json`.

`npm run test:performance` passed 12 cold Lighthouse runs, with three runs per language and form factor. Median mobile LCP was 1804 ms in both languages. Desktop medians were 406 ms in Vietnamese and 402 ms in English. Median CLS and TBT were zero in every group. The unchanged budgets are LCP <=2500 ms, CLS <=0.1 and TBT <=200 ms. Reports are in `output/lighthouse/after/vi/summary.json` and `output/lighthouse/after/en/summary.json`.

Real devices, screen readers and field performance are NOT_RUN. Local browser emulation does not establish those outcomes.
