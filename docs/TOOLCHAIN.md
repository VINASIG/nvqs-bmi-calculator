# Toolchain selection

Verified against the official npm registry on 3 October 2026. Exact-pinned direct dependencies and a locked resolved graph keep this new project reproducible. Existing portable Node 24.21.0 and npm 12.2.0 are used without a global installation or upgrade.

| Package                   | Latest checked | Selected |
| ------------------------- | -------------- | -------- |
| @lucide/astro             | 1.50.0         | 1.50.0   |
| astro                     | 7.3.5          | 7.3.5    |
| @astrojs/check            | 0.9.10         | 0.9.10   |
| @axe-core/playwright      | 4.13.0         | 4.13.0   |
| @eslint/js                | 10.0.1         | 10.0.1   |
| @playwright/test          | 1.63.0         | 1.63.0   |
| @types/node               | 26.6.4         | 24.19.1  |
| eslint                    | 10.12.0        | 10.12.0  |
| eslint-plugin-astro       | 3.2.1          | 3.2.1    |
| html-validate             | 11.16.1        | 11.16.1  |
| lighthouse                | 13.5.0         | 13.5.0   |
| prettier                  | 3.9.9          | 3.9.9    |
| prettier-plugin-astro     | 1.1.0          | 1.1.0    |
| stylelint                 | 17.16.0        | 17.16.0  |
| stylelint-config-standard | 40.0.0         | 40.0.0   |
| typescript                | 7.0.2          | 6.0.3    |
| typescript-eslint         | 8.71.0         | 8.71.0   |
| npm                       | 12.2.0         | 12.2.0   |

TypeScript 7.0.2 is latest, while the Astro checking and typed ESLint peer ranges accept the selected 6.0.3. Node types follow the supported runtime major 24 rather than latest major 26. No peer ranges are forced. Browser support is Chromium, Firefox and WebKit through pinned Playwright 1.63.0.

Astro supplies static pages and a local TypeScript bundle. BigInt performs the small exact rational calculation. CSS implements the short button response. Calculations need no backend service, and the site includes no tracking SDK or database.

Typed strict ESLint, Astro strictest TypeScript with skipLibCheck false, Stylelint on actual CSS, recommended validation of both generated HTML pages and one Prettier formatter are separate source gates. Browser tests check arithmetic outcomes and privacy in the running site. Lighthouse uses an explicitly validated external runtime boundary because its trace declarations are incompatible with exactOptionalPropertyTypes; project declaration checking stays enabled.

Source and byte-preserved font/artwork notices stay in the project. A single Dependabot configuration proposes weekly updates for review and does not automatically merge. CI actions are pinned to reviewed official release commit IDs.

npm 12 blocked an esbuild postinstall by default. The locked platform binary built this project successfully; no global installation or unrelated allowlist change was made. The dependency audit and raw registry rows are retained under output/research/.
