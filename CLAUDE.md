# Tekton — Claude Code Instructions

> Vanilla agency starter kit. Blank canvas by default, configurable via skins.

## Project Overview

Tekton is a Next.js 16 + Sanity CMS agency template. It must be **vanilla by default** — zero decorative elements (no SVG brackets, clip-paths, glow effects, scan lines). Decoration is opt-in via the skin system.

**Stack:** Next.js 16 (App Router), React 19, Sanity v5, TypeScript (strict), SCSS Modules (BEM), Framer Motion, Recharts, Vitest, Playwright, Storybook

---

## Standards & Rules

### Styling: SCSS Modules + BEM

- **SCSS Modules** (`.module.scss`) — not CSS Modules, not Tailwind
- **BEM naming**: `block__element--modifier`
  ```scss
  .panel { }
  .panel__content { }
  .panel__header { }
  .panel--accent { }
  .panel--sm { }
  ```
- No global class names outside `globals.scss` and `tokens.scss`
- Design tokens as CSS custom properties in `tokens.scss`
- Skin overrides scope via `[data-skin="hud"] .panel { }` in skin SCSS files
- No inline styles — everything in SCSS modules

### TypeScript: Strict, Everywhere

- `strict: true` in tsconfig — no exceptions
- **Zero `any`** — use `unknown` + type guards, or proper generics
- Every component has an exported `interface {Component}Props`
- Every hook has typed return values
- Sanity schema types auto-generated via `sanity typegen`

### Component Structure: One Component, One Folder

```
src/components/ui/Button/
  Button.tsx              # Component (single default or named export)
  Button.module.scss      # Styles (BEM)
  Button.stories.tsx      # All variants, sizes, states
  Button.test.tsx         # Unit tests (renders, props, a11y)
  index.ts                # Barrel export
```

**Rules:**
- Every component MUST have all 5 files: `.tsx`, `.module.scss`, `.stories.tsx`, `.test.tsx`, `index.ts`
- No component file exceeds **200 lines** — split into sub-components if needed
- Props interface at top of file, exported
- Default values in destructuring, not separately
- No business logic in components — extract to hooks or lib/

### Modularity

- **Zero cross-component imports** between UI primitives
- Components communicate only through props and context
- Shared logic in `src/hooks/` or `src/lib/`
- Shared types in `src/types/`
- Each barrel `index.ts` exports only the component and its Props type

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase folder + file | `Button/Button.tsx` |
| SCSS modules | PascalCase matching component | `Button.module.scss` |
| Stories | PascalCase + `.stories` | `Button.stories.tsx` |
| Tests | PascalCase + `.test` | `Button.test.tsx` |
| Hooks | camelCase with `use` prefix | `useTheme.ts` |
| Utilities | camelCase | `analytics.ts` |
| Types | camelCase | `siteSettings.ts` |
| Sanity schemas | camelCase matching schema name | `post.ts` |
| Skin files | lowercase skin name | `hud.skin.scss` |

### Import Ordering

```tsx
// 1. React/Next
import { useState } from "react";
import Link from "next/link";

// 2. External packages
import { motion } from "framer-motion";

// 3. Internal absolute (@/)
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui";

// 4. Relative (same module)
import styles from "./Panel.module.scss";
```

### Testing

- Every component: renders without crashing, applies variant classes, passes props, meets a11y
- Every story: default state + all variants + all sizes + interactive states
- Coverage target: 80%+ components, 90%+ hooks/lib
- Tests co-located with components

### Git

- Conventional commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`
- No `console.log` in committed code

---

## Architecture: Skin System

Two layers working together:

### Layer 1: CSS — `data-skin` attribute + `@layer`

```css
@layer base;    /* structural: box model, flex, grid, padding */
@layer theme;   /* colors, typography, spacing — token-driven */
@layer skin;    /* decorative: glows, clip-paths, overlays — opt-in */
```

`<html data-skin="vanilla">` set server-side from Sanity. Vanilla = zero decorative CSS. HUD = `hud.skin.scss` scoped to `[data-skin="hud"]`.

### Layer 2: Component Decorator Slots

```tsx
interface SkinConfig {
  name: string;
  decorators: Partial<DecoratorRegistry>;
}

interface DecoratorRegistry {
  Panel?: ComponentType<{ uid: string }>;
  Button?: ComponentType<{ variant: string }>;
  Hero?: ComponentType;
  SectionHeader?: ComponentType<{ title: string }>;
}
```

**Vanilla = empty decorators + no skin CSS.**
**HUD = SVG bracket decorators + glow/notch skin CSS.**

### Skin Files

```
src/skins/
  registry.ts
  SkinContext.tsx
  vanilla/index.ts
  hud/
    index.ts
    hud.skin.scss
    HudPanelDecorator.tsx
    HudHeroOverlays.tsx
    HudButtonDecorator.tsx
    HudSectionHeader.tsx
```

---

## CMS: Modular Schema System

Schemas are organized into toggleable modules:

```ts
const ENABLED_MODULES = ["core", "events", "faq"] as const;
export const schema = buildSchema(ENABLED_MODULES);
```

### Core (always on)
page, article, author, category, siteSettings, navigation

### Optional Modules
ecommerce, team, portfolio, events, faq, testimonials, locations

Each module lives in `src/sanity/modules/<name>/` with schemas/, queries.ts, index.ts.

### Key CMS Decisions
- **Article** replaces both post and guide — categories differentiate
- **Navigation** is its own singleton (not embedded in siteSettings)
- **Homepage** uses the page builder (SectionRenderer) — no bespoke schema
- **siteSettings** fields: siteName, shortName, tagline, logo, favicon, skin, defaultHue, defaultMode, gaMeasurementId, sentryDsn, SEO defaults, social links

---

## Project Structure

```
src/
  app/              # Next.js App Router
  components/
    ui/             # Design system primitives (Panel, Button, Card, etc.)
    composed/       # Multi-primitive compositions (SiteHero, ContactForm, sections/)
    layout/         # Shell components (NavShell, Footer)
  skins/            # Visual skin system
  context/          # React contexts (ThemeContext, SkinContext)
  hooks/            # Custom hooks
  lib/              # Pure functions, utilities
  sanity/           # CMS schemas, queries, client
    modules/        # Toggleable schema modules
  styles/           # tokens.scss, globals.scss
  types/            # Shared TypeScript types
```

### Key Rules
- No file over 200 lines
- No orphan files
- Barrel exports at each directory level
- Co-location: tests, stories, styles next to their component
- Components render, hooks manage state, lib has pure functions

---

## Implementation Phases

0. **Setup & Standards** — CLAUDE.md, SCSS migration, BEM rename, tooling configs
1. **Foundation** — Skin system, strip all HUD decoration from components, verify vanilla + HUD
2. **CMS Rebuild** — Purge dataset, modular schemas, unified article type, page builder homepage
3. **Storybook + Testing** — Stories for all components, Vitest unit tests, Playwright E2E
4. **New Components** — Modal, Toast, Input, Tabs, Accordion, Avatar, forms
5. **Analytics & Error Tracking** — GA4, Sentry, error boundaries
6. **Multi-Client Tooling** — Setup script, CI/CD, corporate skin, documentation
7. **Polish** — Priority 2 components, agency sections, performance/a11y audits

---

## Do NOT

- Add any decorative elements to base components (glows, clip-paths, SVG brackets, scan lines)
- Use `any` type
- Create files without all 5 required component files
- Import between UI primitives
- Use inline styles
- Use Tailwind
- Add `console.log` to committed code
- Skip writing tests and stories for new components
- Create bespoke page schemas — use the page builder
