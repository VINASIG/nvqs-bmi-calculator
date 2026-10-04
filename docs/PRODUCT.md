# Product scope

This repository contains **one independent tool**: Vietnam Military BMI & Physique. Vietnamese `/` and English `/en/` are translations of that same tool. There is no mode switch, shared UI or combined interpretation. The other tool lives in [VINASIG/bmi-calculator](https://github.com/VINASIG/bmi-calculator); the purpose block at the bottom links to its matching locale with an absolute deployed URL.

## Privacy and interaction

Direct text inputs accept centimeters/kilograms and up to three decimal places, with a point or comma. No sliders, accounts, date of birth, analytics, remote computation, input URL parameters or persistent health storage. Reload, locale navigation, history restoration and Clear remove measurements and stale results. Scripts must enable calculation only after loading; absent or blocked scripts cannot submit measurements. Static explanations, source links, navigation and disclosure controls remain available without JavaScript.

Entering valid height and weight immediately updates BMI, the physique reference and related conclusions without a Calculate button. Table selection and optional chest measurements also update the physique result. The record comparison updates whenever either measurement group changes, without a Compare button. Incomplete or invalid input clears the affected results and any prepared print sheet. Updates preserve input focus and scroll position. Errors appear after blur or explicit Enter validation. IME composition postpones calculation until composition ends. Measurement inputs, table choices and actions start disabled until their client handlers are installed. Legal scoring, exact thresholds and health advice remain unchanged. Printing and downloading remain explicit actions.

Measurement fields start empty. Their muted, smaller placeholders use localized example wording, such as "Ví dụ 170" in Vietnamese and "For example 170" in English, to distinguish examples from entered values. Neither placeholder numbers nor the optional calendar supply a measurement default.

## Specialized behavior

Score the entered male/female physique table, height, weight, BMI and optional male chest. Show each score and the highest-score reference grade. Separate this from the exact BMI exclusion in Circular 68/2025 and from the overall medical examination. Explain the 18.0–below-18.5 mismatch and the literal sub-tenth gaps in the printed table.

BMI needs only height and weight: weight in kilograms divided by squared height in meters. The main form states that formula and separates optional chest behind a visual divider with its own explanation. Chest can change the male-table physique grade but never changes BMI or the separate BMI-criterion conclusion. Leaving it blank still produces BMI and a reference grade from the entered indicators.

Provide illustrative boundary uncertainty, arithmetic distance to both recruitment thresholds, safe adult-health reference weights and general health guidance. The recruitment threshold weights are measurement checks, never weight-change recommendations.

The separate health section uses ordinary language. It shows the weight reference and one lighter/heavier comparison, followed by general meal/activity guidance and a concise medical limitation. Adult age 20+ and pregnancy limits remain visible, as does the distinction from recruitment standards. The range calculation and comparisons with both health-range ends are available in a closed disclosure. Additional BMI precision has its own closed explanation. Exact legal scoring, recruitment exclusions, uncertainty warnings, printed records and citizen-rights modules remain unchanged. Healthy BMI below 25 receives maintenance guidance even if the prominent number rounds to 25.0 or weight is slightly above the reference calculated at BMI 24.9.

A separate disclosure compares self-measured and recorded values, including score effects. Another creates a local text download or printable personal record with optional measurement date (not birth date), witness and method. Two styled native radio choices select the legal scoring table with standard keyboard behavior and full-label touch targets. The optional date accepts a real `YYYY-MM-DD` value or a localized calendar in a native modal dialog. The calendar uses the same Space Grotesk and semantic colors, supports keyboard navigation, restores focus when dismissed and fits narrow/enlarged-text viewports. Date, witness and notes are never submitted or saved. The personal record is not an official examination form, medical certificate or recruitment conclusion. Static citizens-rights guidance covers accurate records, public information, correction requests, complaints and medical reassessment through the commune council.

## Design and publication

Preserve the existing Space Grotesk, VINASIG assets, Lucide, semantic colors, light/dark surfaces, 760 px breakpoint and quiet reduced-motion-aware interactions. Native disclosure elements keep supplementary material accessible without crowding the first screen. Use the existing strict toolchain and multi-engine Playwright/axe regression coverage. Publish as an independent GitHub Pages project; no medical measurements go to GitHub.

## Explicit limits

No diagnosis, individualized medical plan, height-growth promises, weight targets below BMI 18.5, or advice to manipulate recruitment status. Health reference conversions stay inside BMI 18.5–24.9 and do not establish fitness. No guaranteed enlistment or exemption claims.
