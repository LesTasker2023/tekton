---
name: component_extraction_candidates
description: Page-level composites that could be extracted into standalone 5-file components when reuse is needed
type: project
---

Several UI elements are currently inline in page files and are candidates for extraction into proper components (TSX + SCSS module + story + test + barrel) when reuse is needed:

**Catalog:**
- `CatalogCard` — product card with 1:1 image, price, compare-at strikethrough, category badges (in `catalog/CatalogHub.tsx`)
- `PriceDisplay` — currency-aware price with optional strikethrough compare-at (in `CatalogHub.tsx` + `catalog/[slug]/page.tsx`)
- `VariantSelector` — button group for item variants with out-of-stock state (in `catalog/[slug]/page.tsx`)
- `AttributesTable` — key-value definition list for item metadata (in `catalog/[slug]/page.tsx`)

**Guides:**
- `TableOfContents` — sticky sidebar TOC extracted from portable text h2/h3 headings (in `guides/[slug]/page.tsx`)
- `DifficultyIndicator` — three-dot difficulty level display with color coding (in `guides/[slug]/page.tsx`)

**Events:**
- `CountdownDisplay` — days/hrs/min countdown grid for upcoming events (in `events/[slug]/page.tsx`)
- `EventInfoCard` — labeled info card with icon, value, and detail line (in `events/[slug]/page.tsx`)
- `EventStatusBadge` — color-coded live/upcoming/past status indicator (in `events/[slug]/page.tsx`)

**News:**
- `AuthorBar` — avatar initial + name + date + reading time row (in `news/[slug]/page.tsx`)
- `HeroCover` — full-width image with gradient overlay and content slot (in `news/[slug]/page.tsx` and `events/[slug]/page.tsx`)

**Why:** These are currently only used in one place each so extraction would be premature. Extract when a second use case appears.

**How to apply:** When building a feature that needs one of these, extract it into `src/components/ui/` or `src/components/composed/` with the 5-file convention rather than duplicating the inline code.
