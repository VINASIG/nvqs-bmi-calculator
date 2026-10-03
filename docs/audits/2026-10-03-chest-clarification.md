# BMI inputs and optional chest clarification

Date: **3 October 2026**. Scope: Vietnamese `/` and English `/en/` in `VINASIG/nvqs-bmi-calculator`. This audit records checks before the clarification is published; CI and live checks verify the committed revision separately.

## Finding and correction

The public revision `7f7c123852710338047c18ef4c46b5ef5b222f6c` placed height, weight and optional chest in one input grid. Its explanation described chest measurement but did not explicitly state that chest is excluded from BMI. This could confuse BMI arithmetic with the separate physique grade. The calculation itself was already correct.

Circular 105/2023 Appendix I Section IV.1.b defines BMI as weight in kilograms divided by squared height in meters. Section I includes chest as a separate male-table physique indicator. The source and example are recorded in [RESEARCH.md](../RESEARCH.md).

- State the BMI formula beside height and weight in both languages.
- Place optional chest after a divider, explain its separate scoring purpose and allow omission.
- Associate each input with the relevant accessible description, including recorded measurements.
- Explain that missing chest makes the physique grade partial; entering chest changes neither BMI nor the separate BMI-criterion conclusion.
- Add a unit regression and strengthen the existing browser regression for omitted, 81 cm and 70 cm chest.

No calculation, grading rule, dependency, design token, breakpoint, artwork or font was changed.

## Observed outcomes

On the actual public baseline and the rebuilt local site, 170 cm / 55 kg produced approximately **BMI 19.03** at all tested chest states. Omitted chest and 81 cm gave reference grade 1; 70 cm gave grade 6. The separate BMI-criterion conclusion remained identical. Selecting the female table removed both chest inputs and retained the same BMI. Self/recorded comparison showed the independent grade difference for equal height/weight and different chest.

Each check ran at 360×800, 390×844, 768×1024, 1024×768 and 1440×900 in both languages. The targeted baseline and after checks each passed 10/10 cases with no measurement-triggered requests, cookies, storage or page errors.

The additional local layout check passed **56/56** combinations: both languages, 100%/200% root text and 320×800, 360×800, 390×844, 440×800, 600×800, 759×1024, 760×1024, 761×1024, 768×1024, 900×800, 1023×768, 1024×768, 1439×900 and 1440×900. It checked computed bounds, page overflow and visible control sizes and scrolled the whole page before each capture. Before/after required-size contact sheets, all-width sheets at both text sizes, readable mobile/desktop crops and the 320 px/200% form crops were opened. No content clipping or overlap was observed in those reviewed images; enlarged text wraps into longer pages. Contact-sheet review is distinct from opening every original capture individually.

Evidence is in ignored `output/responsive/chest-clarification-2026-10-03/`: immutable public `before/`, local `after/`, `layout/` and diagnostic `inspection/`. Each phase has a JSON report. Previous specialization evidence remains in its separate directory.

## Checks and publication boundary

- PASS: strict Astro typecheck (0 errors, warnings or hints), typed ESLint, Stylelint, formatting, 37 managed standards files, unit tests **49/49**, build, generated HTML/metadata and preserved asset bytes.
- PASS: **66/66** Chromium/WebKit product and axe accessibility tests (`--grep-invert responsive`), with zero skipped, unexpected or flaky tests. This covers both locales, result bands, chest invariance, invalid input, keyboard/touch, dark/reduced motion, script failure, offline/privacy, comparison, print/export and navigation. The separate 56-case layout check above covers the local width/text matrix; CI runs the entire browser suite on all three supported engines.
- PASS: Lighthouse budgets for both languages, three mobile and three desktop runs each. Median mobile LCP was **1,660 ms (vi)** and **1,671 ms (en)**; desktop **384 ms** in both. Median CLS and TBT were **0** throughout. Performance scores were 99–100; accessibility, SEO and best practices were 100. These are local cold-navigation lab results, not field metrics.
- Exact-commit CI, Pages deployment and final public clarification: checked after push, not claimed by this pre-publication audit.

Real devices, screen readers, field performance and independent professional medical/legal review remain **NOT_RUN**. Browser emulation and automated accessibility checks do not establish those outcomes.
