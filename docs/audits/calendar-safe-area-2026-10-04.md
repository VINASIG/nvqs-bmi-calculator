# Calendar internal safe area

## Reproduced defect

The published Vietnamese measurement-date calendar at 1440x900 had zero dialog padding. Its first-column selected day was only 1 CSS px inside the inner border. Title/navigation rows used separate 8 px horizontal padding, while the day table used the full surface width. Existing viewport-containment checks therefore passed an interface with an insufficient internal gutter.

Immutable public before captures are in `output/responsive/calendar-safe-area-2026-10-04/before/chromium/`. Fixture measurements and dates are synthetic.

## Source correction

- The calendar owns one shared padding of `clamp(16px, 3vw, var(--space-6))`. Normal desktop padding is 24 px and narrow layouts retain at least 16 px.
- Header, month navigation, grid, footer and help share that gutter. Existing spacing tokens separate rows. The selected day no longer touches the surface border.
- The seven fixed-layout columns use their available width without redundant button margins. On narrow enlarged-text views the popup can use almost the full viewport, retaining its internal gutter and the existing font size, 44 px day heights and readable two-digit labels.
- The popup is centered against the viewport explicitly so a page scrollbar does not shift a nearly full-width modal beyond one edge in WebKit. This translates the calendar for positioning and does not scale the page or its content.
- The title can shrink and wrap beside its fixed-size close button. At 320 px with 200% English text, the long word in the title previously displaced the close button into the gutter.
- Height remains bounded with 16 px above and below the surface. Intentional vertical scrolling keeps the final help text reachable, with padding at the scroll end.

No calculation, legal interpretation, local-record behavior, translations, identity artwork, font bytes or dependencies changed.

## Permanent regression and operating guidance

`tests/browser/calendar-spacing.spec.ts` checks inner padding and actual row/button bounds independently of viewport containment. It covers first-column selection/focus on 4 October and last-column selection/focus on 10 October, all 14 existing viewport sizes, both locales/themes and 100%/200% text in Chromium, Firefox and WebKit. It checks the final scrolled help inset, day size/readability, Escape, restored focus and preserved input. Subpixel geometry has a 0.5 px comparison tolerance. The existing behavioral and accessibility assertions remain enabled.

The project-owned section of `AGENTS.md` now explicitly requires these internal-gutter observations. The generated standards section and pinned snapshot remain intact.

## Release evidence

Local source checks, 55 unit tests, the production build and all 12 bilingual Lighthouse runs passed. All 12 added browser tests passed, covering 336 calendar viewport/text/locale/theme/engine combinations. The full pre-existing browser suite and the exact-commit CI/deployment outcomes are retained separately in the ignored release receipt.

Run and retain `npm run check`, `npm test`, `npm run build`, `npm run test:browser` and `npm run test:performance`. Use the full existing browser suite, not only the added spacing spec. Review before/after top and bottom screenshots, then require exact-commit CI, deployment and an actual published-page check before reporting publication.

The ignored `output/calendar-safe-area-*.log` files retain commands and failures from each repair iteration. `output/calendar-safe-area-after-v3.json` and `output/responsive/calendar-safe-area-2026-10-04/after-v3/` retain the final local browser captures. Published observations belong in the separate `live/` directory and release receipt. Real devices, screen readers and field metrics are NOT_RUN.
