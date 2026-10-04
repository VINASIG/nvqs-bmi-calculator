# Brand adoption

This product explicitly adopts the design system's Bright Playful Minimalism proposal for the current brief. It does not change the status of draft guidance for sibling products.

- Design source is VINASIG/web-design-system at `7ca081e190a7baa3682edf4d1d12ec6485332349`.
- Artwork source is VINASIG/vinasig-brand-assets at `673d1392d5d78e87323ca91eac480e25b57210a9`.
- Selected exported logo, mark and 16/32/48 px favicons are byte-preserved copies of the assets already verified for VINASIG Unphar. The asset manifest records their digests.
- Space Grotesk is served locally. The original variable TTF and OFL are preserved. The full-glyph WOFF2 container was derived for Unphar, preserving the 968 glyphs, Vietnamese coverage, shaping tables and 300-700 weight axis. It is reused without subsetting or further editing.
- Semantic tokens are adopted from the pinned design source through the reviewed Unphar token snapshot. Font loading is separated into a public relative CSS file to preserve the GitHub Pages base path and avoid duplicate font requests.
- The owner-requested placeholder treatment is a local semantic role derived from existing neutral text/surface tokens: 94% muted text in light mode, 70% in dark mode. Examples carry a localized prefix and use the existing small-text size. Entered values retain the normal text color/size. Browser checks require placeholder contrast of at least 4.5:1; identity anchors and supplied assets stay unchanged.
- Dark-mode semantic aliases follow the same reviewed Unphar adoption. The system preference changes interface surfaces and text; BMI results retain the same meaning and exact arithmetic in both themes.
- The warning text alias uses the existing Thinker Orange light shade in dark mode so below/above recruitment results remain readable. Identity anchors and exported artwork are unchanged.
- Identity anchors remain Scout Blue #21497b, Thinker Orange #eb7114, Builder Green #47a036, Auditor Red #971607 and Core Graphite #443a3b.
- Lucide supplies the calculator empty-state icon and calendar controls. Simple Icons would supply third-party company marks if needed. This product needs none.

Measurements and BMI results are handled locally and are not added to URLs or external requests. Public visibility does not grant a license for VINASIG artwork.

## Transparent header approved on 4 October 2026

Use the unchanged Primary Color lockup on the light canvas and the unchanged Reversed lockup on the dark canvas. A native picture source selects the existing dark variant without JavaScript. The logo link has no white panel, padded card, rounded artwork, shadow or filter. Its minimum hit height is 44 px, while the image retains the original 540 by 140 aspect ratio.

The newly copied Reversed SVG was reviewed at VINASIG/vinasig-brand-assets commit `83ed7515c81c3b2a28888a75c754e44562d5b107`. Its SHA-256 is `98ceaaace06835138856d3710b4fed38714528573f78b19e710db796aea53d07`. The manifest records this separate review and preserves every earlier asset digest. Existing design/font adoption pins remain historical records of those unchanged files. The retired personal-record print surface is no longer part of this product.
