# Verification coverage

Unit tests cover exact decimal math, invalid input, rounding and every specialized category/score boundary. The two repositories have independent product tests and independent browser entry points. Only pure arithmetic is duplicated.

Playwright checks both actual translations at 320, 360, 390, 440, 600, 759, 760, 761, 768, 900, 1023, 1024, 1439 and 1440 px widths, at 100% and 200% root text sizes. Captures include idle, validation, result, boundary with expanded notes, and long result states; assertions inspect bounding boxes, unintended overflow and touch target heights. The scoring table is an intentional local horizontal scroll region.

Additional coverage: WCAG axe checks across all result bands, 390/1440 px, light/dark and reduced/full motion; native disclosure touch, keyboard focus, exact boundary conclusions, disabled/blocked scripts, offline local calculation, no request body/health URLs, no cookies/storage, stale result invalidation, Clear, language navigation/history, real structured-data values, source and absolute cross-links. Military tests also cover table selection, optional chest, record comparison, safe advice, local text download, escaped text and a print-media screenshot.

`output/responsive/specialization-2026-10-03/` contains immutable before evidence and after captures. Tests alone do not establish visual correctness: open the screenshots and record observations in the publication audit. HTML, metadata, preserved assets and notices have separate built-output checks.

The Windows WebKit port defaults to tabbing native form controls, skipping links. The military select is reached before the numeric text inputs. Its native keyboard path and explicit DOM-focused skip-link activation are recorded separately. No claim is made that Tab visits every link in that port. Real devices and assistive-technology sessions are separate NOT_RUN items unless observed.
