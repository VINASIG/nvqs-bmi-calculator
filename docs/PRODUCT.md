# Product scope

This repository contains **one independent tool**: Vietnam Military BMI & Physique. Vietnamese `/` and English `/en/` are translations of that same tool. There is no mode switch, shared UI or combined interpretation. The other tool lives in [VINASIG/bmi-calculator](https://github.com/VINASIG/bmi-calculator); the purpose block at the bottom links to its matching locale with an absolute deployed URL.

## Privacy and interaction

Direct text inputs accept centimeters/kilograms and up to three decimal places, with a point or comma. No sliders, accounts, date of birth, analytics, remote computation, input URL parameters or persistent health storage. Reload, locale navigation, history restoration and Clear remove measurements and stale results. Scripts must enable calculation only after loading; absent or blocked scripts cannot submit measurements. Static explanations, source links, navigation and disclosure controls remain available without JavaScript.

## Specialized behavior

Score the entered male/female physique table, height, weight, BMI and optional male chest. Show each score and the highest-score reference grade. Separate this from the exact BMI exclusion in Circular 68/2025 and from the overall medical examination. Explain the 18.0–below-18.5 mismatch and the literal sub-tenth gaps in the printed table.

Provide illustrative boundary uncertainty, arithmetic distance to both recruitment thresholds, safe adult-health reference weights and general health guidance. The recruitment threshold weights are measurement checks, never weight-change recommendations.

A separate disclosure compares self-measured and recorded values, including score effects. Another creates a local text download or printable personal record with optional measurement date (not birth date), witness and method. Native select intentionally uses platform keyboard/touch behavior for two legal scoring tables. Date, witness and notes are optional and are never submitted or saved. The personal record is not an official examination form, medical certificate or recruitment conclusion. Static citizens-rights guidance covers accurate records, public information, correction requests, complaints and medical reassessment through the commune council.

## Design and publication

Preserve the existing Space Grotesk, VINASIG assets, Lucide, semantic colors, light/dark surfaces, 760 px breakpoint and quiet reduced-motion-aware interactions. Native disclosure elements keep supplementary material accessible without crowding the first screen. Use the existing strict toolchain and multi-engine Playwright/axe regression coverage. Publish as an independent GitHub Pages project; no medical measurements go to GitHub.

## Explicit limits

No diagnosis, individualized medical plan, height-growth promises, weight targets below BMI 18.5, or advice to manipulate recruitment status. Health reference conversions stay inside BMI 18.5–24.9 and do not establish fitness. No guaranteed enlistment or exemption claims.
