# VINASIG Military BMI

Read README.md, docs/PRODUCT.md, docs/RESEARCH.md, docs/BRAND.md and docs/TOOLCHAIN.md before changing this Astro and TypeScript product.

- This repository contains only Vietnamese military BMI and physique reference checks. Root Vietnamese and /en/ are actual translations with reciprocal hreflang. Link to the other independent repository at the bottom; never embed it or add mode/profile branches.
- Direct numeric text inputs, local computation, no accounts, sliders, DOB, analytics, health storage or remote calculation APIs. Never serialize measurements into URLs. Recalculate automatically as valid measurements or the scoring table change. Update record comparisons from either side. Invalid/incomplete input, Clear and navigation must clear stale results and printable sheets. Keep focus and scroll at the input, defer errors until blur or explicit Enter, and do not calculate unfinished IME composition. Inputs remain disabled until their handlers load. Do not restore calculate or compare buttons.
- Verify medical/legal changes using current primary sources and dated research. Compare exact decimal BMI before rounding. Do not recommend changing weight to alter recruitment status. Health reference targets stay inside BMI 18.5–24.9; do not suggest height growth or diagnose individuals.
- Height, weight and male chest scoring uses the whole-unit rule in TT 105/2023 Appendix I IV.1.a. The printed BMI gaps need explicit uncertainty, not invented rounding. Separate BMI exclusion, physique grade and overall-health limitations. Styled native radio choices select the physique table; optional male chest is a separate scoring input; optional record date, witness and notes are authorized only for a local self-measurement record. Clear them with all measurements. Do not publish private user context or allegations.
- Adopt Bright Playful Minimalism, preserved VINASIG exports, local Space Grotesk and Lucide. Technical documentation and commits are English; product text is Vietnamese/English. Respond in Vietnamese. Use SI agents in VINASIG-authored prose.
- Run npm run check, npm test, npm run build, Playwright and performance checks. Inspect screenshots at all standard sizes, 320 px, breakpoint neighbors, intermediate widths and enlarged text. Check both locales, invalid input, result bands, keyboard, touch, dark/reduced motion, offline and script failure. Preserve assets, notices and all quality gates.
- Keep immutable before captures and reports in ignored output/; record durable audits in docs/audits/. Before authorized publication inspect the staged diff, then verify remote HEAD, exact-commit CI, deployment and live pages. Preserve unrelated work and sibling repositories.
- Report real devices, screen readers, field metrics and independent SI-agent trials as NOT_RUN unless observed.
- Calendar content needs at least 16 CSS px of internal padding on every side, using the adopted spacing tokens. Measure actual content and first/last-column day buttons against the inner border, including selected and focused states. Scroll to the last content and check its bottom inset. Keep these checks at 320 px, 200% text, both locales/themes and all supported engines. Viewport containment alone does not establish a safe internal gutter.

## Canonical domain

The owner authorized the custom-domain migration on 4 October 2026. Publish this site at https://nvqs-bmi.vinasig.io.vn/ with an origin-root base. Preserve that domain in canonical/social metadata, sitemap, robots, package homepage, preview and browser assertions. Keep GitHub repository/source links intact. Read docs/DOMAIN.md. GitHub Actions deploys through the repository Pages custom-domain setting; a CNAME file alone does not configure an Actions deployment.

## Language and appearance

Read `docs/LOCALIZATION.md`. Both locales must include navigation, accessible names, validation, loading and result copy. Keep native reciprocal language links and locale metadata. Preserve technical identifiers, code and user content. Only the optional light or dark preference uses `vinasig-theme` storage. Never save or send measurements, files or generator content. Verify both locales and themes before publishing.

<!-- VINASIG STANDARDS BEGIN -->
## VINASIG SI agent standards 0.1.0

Read `.vinasig/standards/policies/core.md` and `language.md` before repository work. Respect platform instructions, current user authorization and local project guidance. Preserve unrelated changes. Never invent verification or weaken a quality gate to pass.

Active profile is `web-typescript`. Read `.vinasig/standards/profiles/web-typescript.md` and the task-relevant policies. Core is valid for CLI and documentation projects and installs no browser dependencies.

Use `$vinasig-workflow` for implementation work and `$vinasig-dependencies` when adding or upgrading dependencies. Report PASS, FAIL, NOT_RUN or NOT_APPLICABLE with evidence and reasons. Commit, push and publish only within the task authorization.

For license selection, imported material or distribution changes read `policies/licensing.md` and `LICENSES.md` inside the snapshot. LIC-001 through LIC-004 require purpose-based selection, authority and dependency review, separate documentation/font/data/brand rights, consistent SPDX metadata and delivery evidence. Importing this standard does not relicense the host project.

For UI changes read `policies/web.md` inside the snapshot. Apply LANG-004/LANG-005 to all visible copy and locales. WEB-001 requires original transparent header logos matched to the actual surface, without a padded or rounded logo card, linking to https://vinasig.io.vn/. Run inspectHeaderBrand and exercise the logo link on local and deployed pages. WEB-008 requires a full control inventory and styled initial/open/scrolled states, including popup scrollbars, checkbox/radio, search clear, range/progress parts and disclosure indicators. Use the reviewed control-surfaces CSS, preserve native form/keyboard/touch behavior and test forced colors. Run inspectControlSurfaces and inspectControlIndicators with nonzero expected counts. Ordinary dropdown indicators need a measured 16 px inner trailing inset, a 12 px value gap and their declared SVG size. Open before/after and deployed screenshots. Use `$vinasig-responsive` for layout/accessibility, `$vinasig-motion` for movement, `$vinasig-search` for SEO/AEO/GEO, `$vinasig-performance` for speed, and `$vinasig-agent-readiness` for browser-agent tasks. Space Grotesk, Lucide and Simple Icons follow their separate roles.

The local manifest pins the approved snapshot. A Markdown path is a reading instruction, not an automatic import. Stop and report unresolved conflicts with mandatory policy. Record approved exceptions with owner, reason and review date.
<!-- VINASIG STANDARDS END -->
