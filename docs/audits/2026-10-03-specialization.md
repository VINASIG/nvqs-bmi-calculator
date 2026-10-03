# Military BMI specialization verification

Date: **3 October 2026**. Scope: the independent product in `VINASIG/nvqs-bmi-calculator`. This audit records local checks before publication; exact-commit CI and live deployment are subsequent publication checks.

## Product and source decisions

- This new repository contains `MilitaryCalculator.astro`, military-specific copy, scoring/presentation/client code and tests. Vietnamese `/` and English `/en/` are actual translations. The separate adult repository has an absolute reciprocal link at the bottom. There is no combined UI, mode switch or shared conclusion component; only a copy of pure arithmetic is common.
- Reproduced the six-row physique table and highest-score rule from Circular 105/2023. Male/female tables are selected through a native control. Male chest is optional and its omission is disclosed. Raw and whole-unit scoring measurements are shown independently, following Appendix I IV.1.a.
- Separated the grade 1–3 recruitment standard, exact BMI exclusion below 18.0 or above 29.9, and the limits of a partial physique calculation. BMI 18.0 to below 18.5 displays both its direct-BMI status and its score-4 physique exclusion. Generic wording that could obscure the exclusion was removed.
- Kept literal sub-tenth gaps explicit rather than inventing an official BMI rounding rule. Unresolved table scores display adjacent grade bounds unless another scored indicator fixes the maximum. Exact recruitment thresholds remain independent.
- Added illustrative ±0.5 cm/±0.5 kg boundary checks, threshold distances and official remeasurement guidance. This assumed variation is not represented as a legal tolerance or validated equipment error.
- Added safe adult-health reference weights within BMI 18.5–24.9, inward 0.1 kg rounding, distances to both boundaries and general guidance. No weight target outside that reference range or height-growth advice is supplied.
- Added self/recorded measurement comparison, differences and effects on the reference grade/conclusions. Added current citizens' rights sources and review channels, including the distinction between an examination notice and enlistment.
- Added an optional local date, witness and method to a self-measurement record. Browser print and plain-text download work locally; the record is explicitly not an official examination form. User text is escaped and never interpreted as HTML.
- Moved boundary/advice information beneath the primary panels after desktop visual review. Preserved tokens, logos, fonts and short CSS motion. No dependency was added or upgraded.

Current primary medical/legal sources, effective dates, the reviewed signed PDF pages, measurement rounding and uncertainty decisions are documented in [RESEARCH.md](../RESEARCH.md). No private user context or allegations were published.

## Local checks

| Check                                                     | Result                                                             | Evidence                                       |
| --------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------- |
| Astro strictest typecheck                                 | PASS: 0 errors, warnings or hints                                  | `npm run check`                                |
| Strict typed ESLint, Stylelint, Prettier                  | PASS                                                               | `npm run check`                                |
| Managed standards integrity                               | PASS: 37 owned files and the pinned instruction block              | `output/checks/standards.json`                 |
| Unit tests                                                | PASS: 48/48                                                        | `tests/military.test.ts`, `tests/math.test.ts` |
| Build, generated HTML, metadata, preserved assets/notices | PASS                                                               | `npm run build`, `output/checks/`              |
| Chromium and WebKit product/browser tests                 | PASS: 178/178; 0 skipped, unexpected or flaky                      | `output/playwright/report.json`                |
| Local Firefox product suite                               | NOT_RUN: the installed engine fails to launch with `spawn UNKNOWN` | `output/checks/local-firefox.json`             |
| Lighthouse budgets, both languages                        | PASS: 3 mobile and 3 desktop runs per language                     | `output/lighthouse/after/{vi,en}/summary.json` |

Mobile median LCP was **1,659 ms (vi)** and **1,658 ms (en)**; desktop **385 ms (vi)** and **384 ms (en)**. Median CLS and TBT were **0** in all four groups. Every navigation scored 100 for performance, accessibility, SEO and best practices in this local lab. Budgets remain LCP ≤2,500 ms, CLS ≤0.1 and TBT ≤200 ms. Reports describe simulated throttling and cold navigations; these are not field metrics or a ranking promise.

Unit coverage includes all requested fixtures, height/weight/chest cutoffs, half-unit rounding, exact BMI thresholds, literal printed gaps, maximum-score logic and safe reference weights. Representative male-table fixtures without chest include:

| Entered measurements | BMI (two-decimal approximation) | Reference grade from entered indicators | Conclusion                                                                                     |
| -------------------- | ------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 170 cm / 50 kg       | 17.30                           | 4                                       | Direct BMI exclusion and physique grade 4                                                      |
| 171 cm / 52 kg       | 17.78                           | 4                                       | Direct BMI exclusion and physique grade 4                                                      |
| 170 cm / 55 kg       | 19.03                           | 1                                       | Entered physique indicators meet the grade 1–3 standard; further examination remains necessary |
| 170 cm / 52.6 kg     | 18.20                           | 4                                       | Inside the direct BMI interval, but physique grade 4 fails the grade 1–3 standard              |

## Browser and visual review

Actual tests ran at 320×800, 360×800, 390×844, 440×800, 600×800, 759×1024, 760×1024, 761×1024, 768×1024, 900×800, 1023×768, 1024×768, 1439×900 and 1440×900, with 100% and 200% root text sizes and both languages. Captures cover idle, errors, direct exclusion, boundary/record comparison with all disclosures expanded, and long/extreme results. Additional checks cover native table selection, optional chest, every result band with axe, light/dark, reduced/full motion, keyboard/touch, disabled/blocked scripts, offline calculation, stale state, Clear/navigation/history, structured data, source links, local download and print media.

Original military Vietnamese before captures were opened at the five required sizes. They are byte-identical copies of the immutable baseline from the original combined repository. A previous English military page did not exist. Final required-size and intermediate-width contact sheets were opened; readable mobile/desktop crops and the updated print record were inspected. The 320 px, 200% text expanded page was also inspected through its complete segment overview. No unintended page overflow or overlap was observed in the reviewed images. The legal table remains a deliberate local horizontal scroll region. Bounding-box/touch assertions passed separately across the automated matrix. Automated capture coverage is broader than individually opened image coverage.

Evidence remains in ignored `output/responsive/specialization-2026-10-03/`: immutable `before/`, browser `after/`, and diagnostic `inspection/` crops/contact sheets. WebKit cannot encode a full-page image above 32,767 px; pages taller than 30,000 px are captured in real-scale viewport segments without reducing content or UI size. The final Vietnamese 320 px/200% expanded page has 45 segments. Windows WebKit's native form-control tab behavior is documented in `tests/README.md`.

## Publication and limits

CI requires **Chromium, Firefox and WebKit on Ubuntu and Windows**; local selection cannot bypass it. Deployment needs both verification jobs. The expanded matrix receives a 45-minute job allowance; no product assertion or performance budget was weakened. Git attributes preserve the managed instruction block and payload bytes across operating systems. Artwork/font digests and notices remain unchanged.

Real-device tests, screen-reader sessions, field Core Web Vitals, independent medical/legal professional review, equipment-error validation and independent SI-agent trials are **NOT_RUN**. No accounts, cookies, analytics, measurement storage, query-string health data or remote calculation API were introduced. Measurements, record comparison and self-record export stay in the current browser; a fresh page load still needs static assets.
