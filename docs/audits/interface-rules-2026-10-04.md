# Interface writing and control audit

## Scope and cause

The owner requested ordinary visible punctuation, natural labels and complete custom controls across VINASIG. LANG-004, LANG-005 and WEB-008 are adopted through the standards installer.

Several authored Vietnamese and English strings used rigid labels, parentheses, semicolons or slash separators. The corrected strings use natural prose and clear units. Necessary regulatory identifiers and mathematical notation are retained. BMI calculation, physique thresholds, recruitment rules and health advice constraints are unchanged.

## Source corrections

- Rewrite visible labels, optional fields, result explanations, measurement-record text and source introductions in both locales.
- Replace round score-list markers with custom hyphen rows while retaining list semantics.
- Use natural date placeholders and readable Vietnamese weekday labels in the existing custom calendar.
- Update exact browser copy assertions for the approved ASCII range separators while retaining all numerical, legal and privacy assertions.
- Add rendered-interface regressions for initial, expanded, invalid, calculated and official-record comparison states on both routes.

Changes are in `src/lib/military-copy.ts`, `src/lib/presentation.ts`, `src/scripts/military-calculator.ts`, `src/components/MilitaryCalculator.astro`, `src/components/MeasurementDate.astro`, `src/styles/app.css` and the browser tests. Managed files are updated through the installer.

## Executed verification

Strict type, JavaScript, CSS, formatting and snapshot checks pass. All 54 unit tests pass, including the unchanged medical and regulatory engine cases. Both localized routes build and preserved asset digests pass.

The default before/after screenshot sets and their opened contact sheets are retained under `output/responsive/ui-language-2026-10-03/`. Open calendar screenshots were inspected in Vietnamese dark mode and English light mode at 390 x 844. The browser matrix includes both locales/themes, 320 px and actual breakpoint neighbors, 200 percent text, calendar touch/keyboard behavior, generated records, physique results, comparison and privacy checks.

All 369 browser tests pass across Chromium, Firefox and WebKit, including both locales/themes, enlarged text, calendar interactions, generated records, physique results and measurement comparison. The same assertions are retained after the copy changes. Publication and CI are verified at the committed revision separately. Emulated browser results do not establish physical-device or assistive-technology behavior.
