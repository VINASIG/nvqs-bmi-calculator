# VINASIG Vietnam Military BMI & Physique

[Vietnam Military BMI & Physique](https://vinasig.github.io/nvqs-bmi-calculator/) is an independent, bilingual Astro tool that computes locally without collecting measurements.

Check Vietnamese military physique scores, exact BMI recruitment exclusions, recorded measurements and citizens’ review options. This is a partial physique reference, not an overall health examination.

The separate [bmi-calculator](https://github.com/VINASIG/bmi-calculator) serves the other purpose. Each website has a purpose guide and links to the matching language of the other tool.

## Run locally

Use Node 24.21.0 and npm 12.2.0 (pinned in the repository).

```sh
npm ci
npm run dev
```

Use the URL printed by Astro. Production preview uses an automatically allocated port:

```sh
npm run build
npm run preview
```

## Verification

```sh
npm run check
npm test
npm run build
npm run test:browser
npm run test:performance
```

CI verifies Ubuntu and Windows with Chromium, Firefox and WebKit, then deploys only after verification. Local browser engines can be selected with `BROWSER_ENGINES`; this option does not relax the all-engine CI gate. Performance checks cover both languages, three mobile and three desktop runs each. Preserve the existing quality budgets and asset hashes.

## Documentation

- [Product scope](docs/PRODUCT.md)
- [Dated primary-source research](docs/RESEARCH.md)
- [Brand adoption](docs/BRAND.md)
- [Toolchain](docs/TOOLCHAIN.md)
- [Verification coverage](tests/README.md)
- [Specialization verification](docs/audits/2026-10-03-specialization.md)

VINASIG SI agent guidance is in `AGENTS.md` and the pinned local standards snapshot. Read [LICENSES.md](LICENSES.md) for the software, documentation, font and identity scopes.

## License scopes

VINASIG-authored software uses **AGPL-3.0-or-later**. Authored documentation uses **CC-BY-SA-4.0**. Commercial use is allowed under those standard licenses. Fonts and third-party components retain their original terms. Official VINASIG identity assets follow the separate brand policy.

Read [LICENSE](LICENSE), [LICENSES.md](LICENSES.md), [VINASIG Brand Usage Policy](BRAND_POLICY.md) and [the licensing review](docs/audits/licensing-2026-10-04.md) for exact scopes, rationale and remaining review.
