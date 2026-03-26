/**
 * Showcase seed — populates Sanity with realistic agency demo content
 * across ALL content types: articles (news + guides), events, catalog items,
 * pages, homepage, navigation, site settings, and FAQ groups.
 *
 * Usage:
 *   SANITY_API_TOKEN=<write-token> npx tsx scripts/seed-showcase.ts
 *
 * Designed to demonstrate the versatility of the platform for potential clients.
 */

import { createClient } from "@sanity/client";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "u2kuytve";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;

if (!token) {
  console.error(
    "⛔  Set SANITY_API_TOKEN env var.\n" +
      "   Create one at https://www.sanity.io/manage → API → Tokens (Editor role)",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

/* ──────────────────────────────────────────────────
   Portable Text helpers
   ────────────────────────────────────────────────── */
let _k = 0;
const key = () => `k${++_k}`;

type Mark = "strong" | "em" | "code";

const span = (text: string, marks: Mark[] = []) => ({
  _type: "span" as const,
  _key: key(),
  text,
  marks,
});

const block = (
  children: ReturnType<typeof span>[],
  style: string = "normal",
) => ({
  _type: "block" as const,
  _key: key(),
  style,
  markDefs: [],
  children,
});

const h2 = (t: string) => block([span(t)], "h2");
const h3 = (t: string) => block([span(t)], "h3");
const p = (t: string) => block([span(t)]);
const pMixed = (...parts: [string, Mark[]][]) =>
  block(parts.map(([text, marks]) => span(text, marks)));

const bullet = (t: string) => ({
  _type: "block" as const,
  _key: key(),
  style: "normal",
  listItem: "bullet" as const,
  level: 1,
  markDefs: [],
  children: [span(t)],
});

const numbered = (t: string) => ({
  _type: "block" as const,
  _key: key(),
  style: "normal",
  listItem: "number" as const,
  level: 1,
  markDefs: [],
  children: [span(t)],
});

const callout = (
  tone: "info" | "tip" | "warning" | "danger",
  text: string,
) => ({
  _type: "callout" as const,
  _key: key(),
  tone,
  body: text,
});

const codeBlock = (
  code: string,
  language = "typescript",
  filename?: string,
) => ({
  _type: "codeBlock" as const,
  _key: key(),
  language,
  code,
  ...(filename ? { filename } : {}),
});

const quote = (t: string) => block([span(t)], "blockquote");

/* ──────────────────────────────────────────────────
   Image upload helper
   ────────────────────────────────────────────────── */
async function uploadImage(
  url: string,
  filename: string,
): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: res.headers.get("content-type") ?? "image/jpeg",
  });
  console.log(`  📸 ${filename} → ${asset._id}`);
  return asset._id;
}

function imageRef(assetId: string, alt?: string) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    ...(alt ? { alt } : {}),
  };
}

/* ──────────────────────────────────────────────────
   MAIN
   ────────────────────────────────────────────────── */
async function main() {
  console.log("🌱 Seeding showcase content…\n");

  // ── Upload images ──
  console.log("📸 Uploading images…");
  const img = {
    hero: await uploadImage("https://picsum.photos/seed/tk-hero/1600/900", "hero-main.jpg"),
    heroAbout: await uploadImage("https://picsum.photos/seed/tk-about/1600/900", "hero-about.jpg"),
    heroServices: await uploadImage("https://picsum.photos/seed/tk-services/1600/900", "hero-services.jpg"),
    // Article covers
    a1: await uploadImage("https://picsum.photos/seed/tk-a1/800/450", "article-1.jpg"),
    a2: await uploadImage("https://picsum.photos/seed/tk-a2/800/450", "article-2.jpg"),
    a3: await uploadImage("https://picsum.photos/seed/tk-a3/800/450", "article-3.jpg"),
    a4: await uploadImage("https://picsum.photos/seed/tk-a4/800/450", "article-4.jpg"),
    a5: await uploadImage("https://picsum.photos/seed/tk-a5/800/450", "article-5.jpg"),
    a6: await uploadImage("https://picsum.photos/seed/tk-a6/800/450", "article-6.jpg"),
    a7: await uploadImage("https://picsum.photos/seed/tk-a7/800/450", "article-7.jpg"),
    a8: await uploadImage("https://picsum.photos/seed/tk-a8/800/450", "article-8.jpg"),
    // Events
    ev1: await uploadImage("https://picsum.photos/seed/tk-ev1/800/450", "event-1.jpg"),
    ev2: await uploadImage("https://picsum.photos/seed/tk-ev2/800/450", "event-2.jpg"),
    ev3: await uploadImage("https://picsum.photos/seed/tk-ev3/800/450", "event-3.jpg"),
    ev4: await uploadImage("https://picsum.photos/seed/tk-ev4/800/450", "event-4.jpg"),
    // Catalog items
    p1: await uploadImage("https://picsum.photos/seed/tk-p1/600/600", "product-1.jpg"),
    p2: await uploadImage("https://picsum.photos/seed/tk-p2/600/600", "product-2.jpg"),
    p3: await uploadImage("https://picsum.photos/seed/tk-p3/600/600", "product-3.jpg"),
    p4: await uploadImage("https://picsum.photos/seed/tk-p4/600/600", "product-4.jpg"),
    p5: await uploadImage("https://picsum.photos/seed/tk-p5/600/600", "product-5.jpg"),
    p6: await uploadImage("https://picsum.photos/seed/tk-p6/600/600", "product-6.jpg"),
    // Features
    f1: await uploadImage("https://picsum.photos/seed/tk-f1/600/400", "feature-1.jpg"),
    f2: await uploadImage("https://picsum.photos/seed/tk-f2/600/400", "feature-2.jpg"),
    f3: await uploadImage("https://picsum.photos/seed/tk-f3/600/400", "feature-3.jpg"),
    // Gallery
    g1: await uploadImage("https://picsum.photos/seed/tk-g1/800/600", "gallery-1.jpg"),
    g2: await uploadImage("https://picsum.photos/seed/tk-g2/800/600", "gallery-2.jpg"),
    g3: await uploadImage("https://picsum.photos/seed/tk-g3/800/600", "gallery-3.jpg"),
    g4: await uploadImage("https://picsum.photos/seed/tk-g4/800/600", "gallery-4.jpg"),
    g5: await uploadImage("https://picsum.photos/seed/tk-g5/800/600", "gallery-5.jpg"),
    g6: await uploadImage("https://picsum.photos/seed/tk-g6/800/600", "gallery-6.jpg"),
  };
  console.log("");

  /* ══════════════════════════════════════════════════
     AUTHORS
     ══════════════════════════════════════════════════ */
  const authors = [
    {
      _id: "author-sarah",
      _type: "author",
      name: "Sarah Chen",
      slug: { _type: "slug", current: "sarah-chen" },
      bio: "Head of Strategy at Tekton. 10 years in digital transformation, specialising in brand systems and design operations.",
    },
    {
      _id: "author-marcus",
      _type: "author",
      name: "Marcus Webb",
      slug: { _type: "slug", current: "marcus-webb" },
      bio: "Lead Developer at Tekton. Full-stack engineer with a focus on performance, accessibility, and developer experience.",
    },
    {
      _id: "author-elena",
      _type: "author",
      name: "Elena Rossi",
      slug: { _type: "slug", current: "elena-rossi" },
      bio: "Creative Director at Tekton. Passionate about visual storytelling, motion design, and user-centred interfaces.",
    },
  ];

  /* ══════════════════════════════════════════════════
     CATEGORIES (article categories)
     ══════════════════════════════════════════════════ */
  const categories = [
    { _id: "cat-news", _type: "category", title: "News", slug: { _type: "slug", current: "news" }, description: "Latest announcements, releases, and company updates." },
    { _id: "cat-guides", _type: "category", title: "Guides", slug: { _type: "slug", current: "guides" }, description: "Step-by-step tutorials and how-to articles." },
    { _id: "cat-case-studies", _type: "category", title: "Case Studies", slug: { _type: "slug", current: "case-studies" }, description: "Real-world project deep-dives showcasing our work." },
    { _id: "cat-design", _type: "category", title: "Design", slug: { _type: "slug", current: "design" }, description: "Insights on branding, UI/UX, and visual design." },
    { _id: "cat-development", _type: "category", title: "Development", slug: { _type: "slug", current: "development" }, description: "Technical articles on web development, architecture, and tooling." },
    { _id: "cat-strategy", _type: "category", title: "Strategy", slug: { _type: "slug", current: "strategy" }, description: "Business strategy, digital transformation, and growth." },
  ];

  /* ══════════════════════════════════════════════════
     ARTICLES — News (4) + Guides (4)
     ══════════════════════════════════════════════════ */
  const now = Date.now();
  const day = 86400000;

  const articles = [
    // ─── News ───
    {
      _id: "article-platform-launch",
      _type: "article",
      title: "Tekton 1.0: Our Open-Source Agency Starter Kit Is Live",
      slug: { _type: "slug", current: "tekton-1-launch" },
      excerpt: "After months of development, Tekton is officially available. A fully-featured website framework built for agencies who want to move fast without sacrificing quality.",
      coverImage: imageRef(img.a1, "Tekton 1.0 launch announcement"),
      author: { _type: "reference", _ref: "author-sarah" },
      categories: [{ _type: "reference", _ref: "cat-news", _key: key() }],
      publishedAt: new Date(now - day * 1).toISOString(),
      featured: true,
      body: [
        p("Today marks a milestone we've been building toward for a long time. Tekton 1.0 is officially live — an open-source, production-ready website framework designed specifically for agencies, studios, and freelancers."),
        h2("Why We Built Tekton"),
        p("Every agency faces the same challenge: each new client site starts from scratch, or worse, from a bloated template that takes longer to strip down than to build up. We wanted a middle ground — something opinionated enough to be productive on day one, but flexible enough to handle any brand."),
        p("Tekton ships with a modular Sanity CMS backend, a component library built with SCSS modules, a skin system for visual customisation, and a page builder that lets content editors assemble pages from pre-built sections."),
        callout("info", "Tekton is free and open-source under the MIT licence. Fork it, customise it, ship it."),
        h2("What's Included"),
        bullet("Next.js 15 with App Router and server components"),
        bullet("Sanity CMS with modular schema system (core, events, catalog, FAQ)"),
        bullet("Three visual skins: Vanilla, HUD, and Corporate"),
        bullet("30+ UI components with full Storybook documentation"),
        bullet("Page builder with 10 section types"),
        bullet("Multi-client tooling: bootstrapper script, .env templates, CI pipeline"),
        h2("What's Next"),
        p("We're already working on v1.1 with e-commerce integration, internationalisation support, and additional skins. Follow our news section for updates."),
      ],
    },
    {
      _id: "article-corporate-skin",
      _type: "article",
      title: "Introducing the Corporate Skin: Light-Mode Done Right",
      slug: { _type: "slug", current: "corporate-skin-release" },
      excerpt: "The new Corporate skin brings a refined, professional aesthetic with light backgrounds, subtle shadows, and clean typography — perfect for B2B and enterprise clients.",
      coverImage: imageRef(img.a2, "Corporate skin preview"),
      author: { _type: "reference", _ref: "author-elena" },
      categories: [
        { _type: "reference", _ref: "cat-news", _key: key() },
        { _type: "reference", _ref: "cat-design", _key: key() },
      ],
      publishedAt: new Date(now - day * 4).toISOString(),
      featured: false,
      body: [
        p("Not every brand lives in dark mode. For clients in finance, healthcare, legal, or professional services, a clean light aesthetic communicates trust and clarity. That's why we built the Corporate skin."),
        h2("Design Principles"),
        p("The Corporate skin uses a deliberately restrained palette: white backgrounds, soft grey borders, and a single accent colour for CTAs and interactive elements. Typography is set in a clean sans-serif with generous spacing."),
        bullet("White panel backgrounds with refined box shadows"),
        bullet("12px border radius for panels, 8px for buttons"),
        bullet("Pill-shaped badges and underline section headers"),
        bullet("Focus rings for accessibility"),
        h2("How Skins Work in Tekton"),
        p("Tekton's skin system uses a two-layer architecture. The first layer is pure CSS: custom properties scoped to a data-skin attribute on the root element. The second layer is a component decorator system that can swap in different component variants."),
        codeBlock(`/* Corporate skin — scoped overrides */\n[data-skin="corporate"] {\n  --bg-base: #ffffff;\n  --bg-surface: #f8f9fa;\n  --text-primary: #1a1a2e;\n  --radius-lg: 12px;\n  --shadow-card: 0 1px 3px rgba(0,0,0,0.08);\n}`, "css", "corporate.skin.scss"),
        p("Switching skins is a single attribute change — no JavaScript, no re-render, no layout shift."),
      ],
    },
    {
      _id: "article-q1-retrospective",
      _type: "article",
      title: "Q1 Retrospective: What We Shipped and What We Learned",
      slug: { _type: "slug", current: "q1-2026-retrospective" },
      excerpt: "A look back at Q1 2026 — new features, community contributions, and lessons learned from shipping an open-source project.",
      coverImage: imageRef(img.a3, "Q1 retrospective"),
      author: { _type: "reference", _ref: "author-sarah" },
      categories: [{ _type: "reference", _ref: "cat-news", _key: key() }],
      publishedAt: new Date(now - day * 10).toISOString(),
      featured: false,
      body: [
        p("Q1 has been our most productive quarter yet. Here's a summary of what we shipped, what worked, and what we'd do differently."),
        h2("By the Numbers"),
        bullet("142 commits merged to main"),
        bullet("38 issues closed (12 from community contributors)"),
        bullet("3 new section types: Testimonial, Pricing, Logo Cloud"),
        bullet("6 new UI primitives: ProgressBar, Checkbox, RadioGroup, Alert, DropdownMenu, EmptyState"),
        h2("Community Highlights"),
        p("We were blown away by the community response. Within the first month, three external contributors submitted pull requests — including a full accessibility audit of the component library. Special thanks to contributors who helped identify edge cases in the skin system."),
        h2("Lessons Learned"),
        p("The biggest lesson: schema design is an API. Changing Sanity schemas after content exists is painful. We've adopted a policy of writing migration scripts alongside any schema change, even in development."),
        callout("tip", "Treat your CMS schema like a database migration — version it, test it, and never assume you can change it without consequences."),
      ],
    },
    {
      _id: "article-perf-audit",
      _type: "article",
      title: "How We Got a 98 Lighthouse Score Without Sacrificing Features",
      slug: { _type: "slug", current: "lighthouse-98-performance" },
      excerpt: "Performance isn't about removing features — it's about loading the right things at the right time. Here's how we optimised Tekton.",
      coverImage: imageRef(img.a4, "Lighthouse performance score"),
      author: { _type: "reference", _ref: "author-marcus" },
      categories: [
        { _type: "reference", _ref: "cat-news", _key: key() },
        { _type: "reference", _ref: "cat-development", _key: key() },
      ],
      publishedAt: new Date(now - day * 16).toISOString(),
      featured: false,
      body: [
        p("When we first audited Tekton, our Lighthouse score was 74. Three weeks later, it was 98. Here's exactly what we changed."),
        h2("The Low-Hanging Fruit"),
        numbered("Replaced all client-side Sanity image transforms with pre-computed srcSet URLs"),
        numbered("Added explicit width/height to every Image component to prevent layout shift"),
        numbered("Moved Framer Motion to dynamic imports — only loaded on pages that use animation"),
        numbered("Switched from Google Fonts API to self-hosted WOFF2 with font-display: swap"),
        h2("The Hard Part: JavaScript Budget"),
        p("Our biggest chunk was the Sanity Studio — 4MB of JavaScript. But since it's only loaded on the /studio route (which is admin-only), it doesn't affect real user metrics. The actual client bundle is under 180KB gzipped."),
        codeBlock(`// next.config.js — bundle analysis\nconst withBundleAnalyzer = require("@next/bundle-analyzer")({\n  enabled: process.env.ANALYZE === "true",\n});\nmodule.exports = withBundleAnalyzer(nextConfig);`, "javascript", "next.config.js"),
        callout("warning", "Lighthouse scores are synthetic benchmarks. Always validate with Real User Metrics (Core Web Vitals in Search Console) before declaring victory."),
        h2("Results"),
        p("Performance: 98. Accessibility: 100. Best Practices: 100. SEO: 100. And we didn't remove a single feature to get there."),
      ],
    },

    // ─── Guides ───
    {
      _id: "article-getting-started",
      _type: "article",
      title: "Getting Started with Tekton: From Clone to Deploy in 15 Minutes",
      slug: { _type: "slug", current: "getting-started" },
      excerpt: "Everything you need to go from git clone to a live site on Vercel. Covers Sanity setup, environment variables, local development, and your first deployment.",
      coverImage: imageRef(img.a5, "Getting started with Tekton"),
      author: { _type: "reference", _ref: "author-marcus" },
      categories: [{ _type: "reference", _ref: "cat-guides", _key: key() }],
      publishedAt: new Date(now - day * 20).toISOString(),
      featured: true,
      difficulty: "beginner",
      sortOrder: 1,
      body: [
        p("This guide walks you through setting up Tekton from scratch. By the end, you'll have a working site with CMS content, deployed to Vercel."),
        h2("Prerequisites"),
        bullet("Node.js 18+ installed"),
        bullet("A Sanity.io account (free tier is fine)"),
        bullet("A Vercel account for deployment"),
        h2("Step 1: Clone and Install"),
        codeBlock(`git clone https://github.com/your-org/tekton.git my-site\ncd my-site\nnpm install`, "bash", "terminal"),
        h2("Step 2: Configure Sanity"),
        p("Create a new Sanity project at sanity.io/manage, then add your project ID and dataset to .env.local:"),
        codeBlock(`NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id\nNEXT_PUBLIC_SANITY_DATASET=production\nSANITY_API_TOKEN=your-write-token`, "bash", ".env.local"),
        h2("Step 3: Seed Content"),
        p("Run the seed script to populate your CMS with demo content:"),
        codeBlock(`SANITY_API_TOKEN=your-write-token npx tsx scripts/seed-showcase.ts`, "bash", "terminal"),
        h2("Step 4: Run Locally"),
        codeBlock(`npm run dev`, "bash", "terminal"),
        p("Open http://localhost:3000 to see your site. Visit http://localhost:3000/studio to manage content."),
        callout("tip", "Run the bootstrapper script (scripts/setup-client.sh) to automatically configure a new client project with the correct names, slugs, and environment variables."),
        h2("Step 5: Deploy"),
        p("Push to GitHub and connect the repo in Vercel. Add the same environment variables from .env.local to your Vercel project settings, and deploy."),
      ],
    },
    {
      _id: "article-skin-system",
      _type: "article",
      title: "The Skin System: How to Create a Custom Visual Theme",
      slug: { _type: "slug", current: "custom-skin-guide" },
      excerpt: "Tekton's skin system lets you transform the entire look and feel of a site without touching component code. Learn how to build your own skin from scratch.",
      coverImage: imageRef(img.a6, "Custom skin creation guide"),
      author: { _type: "reference", _ref: "author-elena" },
      categories: [
        { _type: "reference", _ref: "cat-guides", _key: key() },
        { _type: "reference", _ref: "cat-design", _key: key() },
      ],
      publishedAt: new Date(now - day * 25).toISOString(),
      featured: false,
      difficulty: "intermediate",
      sortOrder: 2,
      body: [
        p("Tekton ships with three skins — Vanilla, HUD, and Corporate. But the real power is in creating your own. This guide shows you how."),
        h2("Understanding the Architecture"),
        p("A skin has two layers:"),
        numbered("CSS custom property overrides scoped to [data-skin=\"your-skin\"]"),
        numbered("Optional component decorator slots via the SkinProvider context"),
        p("Most skins only need the CSS layer. Component decorators are for when you need to structurally change a component — like adding a glow border or swapping an icon set."),
        h2("Creating a Skin: Step by Step"),
        h3("1. Create the Directory"),
        codeBlock(`mkdir src/skins/neon\ntouch src/skins/neon/index.ts\ntouch src/skins/neon/neon.skin.scss`, "bash"),
        h3("2. Define Your Tokens"),
        codeBlock(`/* src/skins/neon/neon.skin.scss */\n@layer skin {\n  [data-skin="neon"] {\n    --bg-base: #0d0221;\n    --bg-surface: #150734;\n    --text-primary: #e0e0ff;\n    --color-primary: #ff00ff;\n    --color-primary-rgb: 255, 0, 255;\n    --glow-sm: 0 0 12px rgba(255, 0, 255, 0.3);\n    --border-default: rgba(255, 0, 255, 0.2);\n  }\n}`, "css", "neon.skin.scss"),
        h3("3. Register the Skin"),
        p("Export the skin config from index.ts, add it to the registry, and import the SCSS file in globals.scss. That's it — the skin will appear in the Storybook switcher and can be activated in site settings."),
        callout("info", "The CSS @layer directive ensures skin overrides have the correct specificity without resorting to !important."),
      ],
    },
    {
      _id: "article-page-builder",
      _type: "article",
      title: "Building Landing Pages with the Section-Based Page Builder",
      slug: { _type: "slug", current: "page-builder-guide" },
      excerpt: "Learn how to use Tekton's page builder to create rich, dynamic landing pages without writing any code. Covers all 10 section types.",
      coverImage: imageRef(img.a7, "Page builder guide"),
      author: { _type: "reference", _ref: "author-sarah" },
      categories: [{ _type: "reference", _ref: "cat-guides", _key: key() }],
      publishedAt: new Date(now - day * 30).toISOString(),
      featured: false,
      difficulty: "beginner",
      sortOrder: 3,
      body: [
        p("Tekton's page builder lets content editors create complete landing pages by stacking pre-built sections. No developer needed — just open the Sanity Studio, create a Page document, and start adding sections."),
        h2("Available Section Types"),
        numbered("Hero Section — full-width hero with background image/video and CTA"),
        numbered("Page Hero — compact banner for inner pages with breadcrumb"),
        numbered("Stats Row — up to 6 animated statistics with trend indicators"),
        numbered("Feature Grid — responsive card grid with icons or images"),
        numbered("CTA Section — call-to-action banner with primary/secondary buttons"),
        numbered("Rich Text — free-form content with full formatting support"),
        numbered("Image Gallery — grid, masonry, or single-image layouts"),
        numbered("Testimonial Section — customer quotes in grid, carousel, or stacked"),
        numbered("Pricing Section — tier comparison cards with feature lists"),
        numbered("Logo Cloud — client/partner logo grid with grayscale hover"),
        h2("Best Practices"),
        bullet("Start every page with a Hero or Page Hero section for visual impact"),
        bullet("Use Stats Row after a hero to establish credibility immediately"),
        bullet("Alternate between visual sections (gallery, features) and text sections for rhythm"),
        bullet("End with a CTA section — every page should have a clear next step"),
        callout("tip", "The page builder sections are also available in Homepage documents, so you can build a completely custom homepage without touching code."),
      ],
    },
    {
      _id: "article-catalog-module",
      _type: "article",
      title: "Using the Catalog Module: Products, Services, and More",
      slug: { _type: "slug", current: "catalog-module-guide" },
      excerpt: "The Catalog module is Tekton's most flexible content type. Use it for products, services, portfolio pieces, team members, or any structured listing.",
      coverImage: imageRef(img.a8, "Catalog module guide"),
      author: { _type: "reference", _ref: "author-marcus" },
      categories: [
        { _type: "reference", _ref: "cat-guides", _key: key() },
        { _type: "reference", _ref: "cat-development", _key: key() },
      ],
      publishedAt: new Date(now - day * 35).toISOString(),
      featured: false,
      difficulty: "intermediate",
      sortOrder: 4,
      body: [
        p("The Item document type in Tekton's Catalog module is deliberately generic. It has fields for pricing, variants, custom attributes, gallery images, and geolocation — making it suitable for almost any kind of structured content."),
        h2("Use Cases"),
        h3("E-commerce Product Catalog"),
        p("Set a price, currency, and compare-at price. Add variants for sizes or colours. Use the gallery for product photography and attributes for specs like weight, dimensions, or materials."),
        h3("Service Directory"),
        p("Skip the pricing fields. Use the excerpt for a one-liner, the body for full descriptions, and attributes for metadata like 'Duration: 2 hours' or 'Format: Remote'."),
        h3("Portfolio / Case Studies"),
        p("Use the gallery to showcase project screenshots. Link to the live site with the external URL field. Add attributes for tech stack, client name, and project duration."),
        h3("Team / Directory"),
        p("One item per person. Primary image as headshot, excerpt as role/title, attributes for skills or contact info."),
        callout("info", "Item categories are separate from article categories, so you can organise products and blog posts independently."),
        h2("Custom Attributes"),
        p("The attributes field is an array of key-value pairs — completely freeform. This means you can add any metadata without modifying the schema:"),
        codeBlock(`// Example attributes for a product\n[\n  { key: "Material", value: "Recycled aluminium" },\n  { key: "Weight", value: "340g" },\n  { key: "Warranty", value: "2 years" },\n]`, "typescript"),
      ],
    },
  ];

  /* ══════════════════════════════════════════════════
     EVENTS (4)
     ══════════════════════════════════════════════════ */
  const events = [
    {
      _id: "event-design-systems",
      _type: "event",
      title: "Design Systems in Practice: A Live Workshop",
      slug: { _type: "slug", current: "design-systems-workshop" },
      excerpt: "A hands-on workshop covering component libraries, design tokens, and the workflows that make design systems actually work in production.",
      coverImage: imageRef(img.ev1, "Design systems workshop"),
      startDate: new Date(now + day * 14).toISOString(),
      endDate: new Date(now + day * 14 + 3 * 3600000).toISOString(),
      location: "Online (Zoom)",
      eventType: "workshop",
      featured: true,
      body: [
        p("Join Elena Rossi for a 3-hour workshop on building and maintaining design systems that actually get adopted by your team."),
        h2("What You'll Learn"),
        bullet("How to structure a component library for maximum reuse"),
        bullet("Design tokens: naming conventions, theming, and dark mode"),
        bullet("Bridging the gap between Figma and code"),
        bullet("Measuring adoption and identifying friction points"),
        h2("Who Should Attend"),
        p("This workshop is ideal for designers and front-end developers working on multi-brand or multi-product platforms. Intermediate experience with React and CSS is recommended."),
        callout("info", "All attendees will receive a Figma template and a companion GitHub repo with starter code."),
      ],
    },
    {
      _id: "event-agency-meetup",
      _type: "event",
      title: "Agency Builders Meetup: London Q2 2026",
      slug: { _type: "slug", current: "agency-meetup-london-q2" },
      excerpt: "An evening of lightning talks, demos, and networking for agency founders, developers, and designers in the London area.",
      coverImage: imageRef(img.ev2, "London agency meetup"),
      startDate: new Date(now + day * 30).toISOString(),
      endDate: new Date(now + day * 30 + 4 * 3600000).toISOString(),
      location: "The Trampery, Old Street, London",
      eventType: "meetup",
      featured: true,
      body: [
        p("Our quarterly meetup brings together agency professionals for an evening of knowledge sharing. This edition focuses on scaling delivery without scaling headcount."),
        h2("Schedule"),
        bullet("18:00 — Doors open, drinks and networking"),
        bullet("18:30 — Lightning talk: 'One Repo, Ten Clients' by Marcus Webb"),
        bullet("18:50 — Lightning talk: 'The Art of the Proposal' by Sarah Chen"),
        bullet("19:10 — Demo: Tekton live site build in 15 minutes"),
        bullet("19:30 — Open discussion and networking"),
        bullet("21:00 — Close"),
        callout("tip", "Spaces are limited to 40 attendees. Register early to secure your spot."),
      ],
    },
    {
      _id: "event-webinar-headless",
      _type: "event",
      title: "Webinar: Why Headless CMS is the Future for Agencies",
      slug: { _type: "slug", current: "headless-cms-webinar" },
      excerpt: "A 45-minute webinar exploring why headless CMS architectures are transforming how agencies deliver websites — and how to make the transition.",
      coverImage: imageRef(img.ev3, "Headless CMS webinar"),
      startDate: new Date(now + day * 7).toISOString(),
      location: "Online (YouTube Live)",
      eventType: "webinar",
      featured: false,
      body: [
        p("Traditional CMS platforms tie your frontend to your backend. Headless architectures decouple them — giving you freedom to use any framework, deploy anywhere, and iterate independently."),
        h2("Topics Covered"),
        numbered("The limitations of monolithic CMS platforms"),
        numbered("How headless CMS works: API-first content delivery"),
        numbered("Choosing a headless CMS: Sanity vs Contentful vs Strapi"),
        numbered("Real-world case study: migrating a 500-page site from WordPress to Sanity"),
        numbered("Live Q&A"),
      ],
    },
    {
      _id: "event-launch-party",
      _type: "event",
      title: "Tekton v2.0 Launch Party",
      slug: { _type: "slug", current: "tekton-v2-launch" },
      excerpt: "Celebrating the release of Tekton 2.0 with live demos, partner showcases, and an exclusive preview of the roadmap.",
      coverImage: imageRef(img.ev4, "Tekton v2 launch party"),
      startDate: new Date(now + day * 60).toISOString(),
      endDate: new Date(now + day * 60 + 5 * 3600000).toISOString(),
      location: "Shoreditch Studios, London",
      eventType: "launch",
      featured: false,
      body: [
        p("Join us for the official launch of Tekton 2.0 — the biggest update since our initial release."),
        h2("What's New in v2.0"),
        bullet("E-commerce integration with Stripe and Shopify"),
        bullet("Internationalisation (i18n) with per-locale content"),
        bullet("Two new skins: Brutalist and Editorial"),
        bullet("Visual page builder with drag-and-drop reordering"),
        h2("Event Highlights"),
        p("We'll have live demos from the core team, showcases from agencies already using Tekton, and an exclusive preview of the 2026 roadmap. Drinks and food provided."),
      ],
    },
  ];

  /* ══════════════════════════════════════════════════
     ITEM CATEGORIES + CATALOG ITEMS (6)
     ══════════════════════════════════════════════════ */
  const itemCategories = [
    { _id: "icat-templates", _type: "itemCategory", title: "Templates", slug: { _type: "slug", current: "templates" }, description: "Pre-built website templates ready for customisation.", sortOrder: 1 },
    { _id: "icat-plugins", _type: "itemCategory", title: "Plugins", slug: { _type: "slug", current: "plugins" }, description: "Add-on modules that extend Tekton's functionality.", sortOrder: 2 },
    { _id: "icat-services", _type: "itemCategory", title: "Services", slug: { _type: "slug", current: "services" }, description: "Professional services from the Tekton team.", sortOrder: 3 },
  ];

  const items = [
    {
      _id: "item-starter-template",
      _type: "item",
      title: "Agency Starter Template",
      slug: { _type: "slug", current: "agency-starter" },
      excerpt: "A complete agency website template with homepage, about, services, portfolio, and contact pages. Pre-configured with the Corporate skin.",
      image: imageRef(img.p1, "Agency starter template"),
      categories: [{ _type: "reference", _ref: "icat-templates", _key: key() }],
      status: "active",
      featured: true,
      sortOrder: 1,
      price: 0,
      currency: "USD",
      attributes: [
        { _key: key(), key: "Pages", value: "5" },
        { _key: key(), key: "Sections", value: "12" },
        { _key: key(), key: "Skin", value: "Corporate" },
        { _key: key(), key: "License", value: "MIT" },
      ],
      body: [
        p("The Agency Starter Template is the fastest way to launch a professional agency website. It includes five pre-built pages, all wired up to the Sanity CMS page builder."),
        h2("Included Pages"),
        bullet("Homepage with hero, stats, feature grid, testimonials, and CTA"),
        bullet("About page with team section and company story"),
        bullet("Services page with feature grid and pricing tiers"),
        bullet("Portfolio page with filterable project gallery"),
        bullet("Contact page with form and location map"),
      ],
    },
    {
      _id: "item-saas-template",
      _type: "item",
      title: "SaaS Landing Page Template",
      slug: { _type: "slug", current: "saas-landing" },
      excerpt: "A conversion-optimised landing page template for SaaS products. Features pricing tables, feature comparisons, and testimonial sections.",
      image: imageRef(img.p2, "SaaS landing page template"),
      categories: [{ _type: "reference", _ref: "icat-templates", _key: key() }],
      status: "active",
      featured: true,
      sortOrder: 2,
      price: 49,
      currency: "USD",
      compareAtPrice: 79,
      attributes: [
        { _key: key(), key: "Pages", value: "3" },
        { _key: key(), key: "Conversion Rate", value: "4.2% avg" },
        { _key: key(), key: "Skin", value: "Vanilla" },
      ],
      body: [
        p("Designed for SaaS companies that need a high-converting landing page without hiring a design team. Every element has been tested for conversion performance."),
        h2("Key Features"),
        bullet("Above-the-fold hero with animated value proposition"),
        bullet("Social proof section with logos and testimonials"),
        bullet("Feature comparison grid with check/cross indicators"),
        bullet("Three-tier pricing table with highlighted recommended plan"),
        bullet("FAQ accordion to handle objections"),
      ],
    },
    {
      _id: "item-analytics-plugin",
      _type: "item",
      title: "Advanced Analytics Plugin",
      slug: { _type: "slug", current: "analytics-plugin" },
      excerpt: "Drop-in analytics integration with GA4, Plausible, and Fathom. Includes cookie consent banner, event tracking helpers, and a Sanity dashboard widget.",
      image: imageRef(img.p3, "Analytics plugin"),
      categories: [{ _type: "reference", _ref: "icat-plugins", _key: key() }],
      status: "active",
      featured: false,
      sortOrder: 3,
      price: 29,
      currency: "USD",
      attributes: [
        { _key: key(), key: "Providers", value: "GA4, Plausible, Fathom" },
        { _key: key(), key: "GDPR Compliant", value: "Yes" },
        { _key: key(), key: "Bundle Size", value: "+2.1KB gzipped" },
      ],
      body: [
        p("Analytics shouldn't be an afterthought. This plugin gives you production-ready analytics integration with zero configuration beyond adding your tracking ID."),
        h2("What's Included"),
        bullet("Automatic page view tracking with Next.js App Router support"),
        bullet("Custom event helpers: trackClick, trackForm, trackScroll"),
        bullet("Cookie consent banner with configurable categories"),
        bullet("Sanity Studio dashboard widget showing key metrics"),
      ],
    },
    {
      _id: "item-seo-plugin",
      _type: "item",
      title: "SEO Toolkit Plugin",
      slug: { _type: "slug", current: "seo-toolkit" },
      excerpt: "Automated sitemap generation, structured data (JSON-LD), Open Graph image generation, and a Sanity-powered SEO audit panel.",
      image: imageRef(img.p4, "SEO toolkit plugin"),
      categories: [{ _type: "reference", _ref: "icat-plugins", _key: key() }],
      status: "active",
      featured: false,
      sortOrder: 4,
      price: 39,
      currency: "USD",
      attributes: [
        { _key: key(), key: "Structured Data", value: "Article, FAQ, Product, Event" },
        { _key: key(), key: "OG Images", value: "Auto-generated from templates" },
      ],
      body: [
        p("Technical SEO shouldn't require an SEO specialist on every project. This plugin handles the fundamentals automatically."),
        h2("Features"),
        numbered("Dynamic sitemap.xml generation from all published content"),
        numbered("JSON-LD structured data for Articles, Products, Events, and FAQs"),
        numbered("Automatic Open Graph image generation using customisable templates"),
        numbered("SEO audit panel in Sanity Studio: checks titles, descriptions, alt text, and internal links"),
      ],
    },
    {
      _id: "item-site-build",
      _type: "item",
      title: "Custom Site Build",
      slug: { _type: "slug", current: "custom-site-build" },
      excerpt: "Full-service website design and development by the Tekton core team. From brand strategy to deployment, we handle everything.",
      image: imageRef(img.p5, "Custom site build service"),
      categories: [{ _type: "reference", _ref: "icat-services", _key: key() }],
      status: "active",
      featured: true,
      sortOrder: 5,
      price: 5000,
      currency: "GBP",
      variants: [
        { _key: key(), label: "Starter (5 pages)", price: 5000, inStock: true },
        { _key: key(), label: "Growth (10 pages)", price: 8500, inStock: true },
        { _key: key(), label: "Enterprise (unlimited)", price: 15000, inStock: true },
      ],
      attributes: [
        { _key: key(), key: "Timeline", value: "4-8 weeks" },
        { _key: key(), key: "Includes", value: "Design, Development, CMS Setup, Deployment" },
        { _key: key(), key: "Support", value: "3 months post-launch" },
      ],
      body: [
        p("Let the team behind Tekton build your site. We bring the same quality and attention to detail that went into the framework itself."),
        h2("What's Included"),
        bullet("Discovery session and brand strategy workshop"),
        bullet("Custom skin design tailored to your brand"),
        bullet("Full site build with CMS content modelling"),
        bullet("Performance optimisation and accessibility audit"),
        bullet("Deployment to Vercel with CI/CD pipeline"),
        bullet("3 months of maintenance and support"),
      ],
    },
    {
      _id: "item-design-retainer",
      _type: "item",
      title: "Monthly Design Retainer",
      slug: { _type: "slug", current: "design-retainer" },
      excerpt: "Ongoing design support for agencies and startups. Dedicated hours each month for UI design, brand updates, and creative direction.",
      image: imageRef(img.p6, "Design retainer service"),
      categories: [{ _type: "reference", _ref: "icat-services", _key: key() }],
      status: "active",
      featured: false,
      sortOrder: 6,
      price: 2000,
      currency: "GBP",
      variants: [
        { _key: key(), label: "20 hours/month", price: 2000, inStock: true },
        { _key: key(), label: "40 hours/month", price: 3500, inStock: true },
      ],
      attributes: [
        { _key: key(), key: "Turnaround", value: "48 hours" },
        { _key: key(), key: "Tools", value: "Figma, Storybook, Sanity" },
        { _key: key(), key: "Contract", value: "Rolling monthly" },
      ],
      body: [
        p("Not every project needs a full agency engagement. Our retainer service gives you access to senior design talent on a flexible monthly basis."),
        h2("How It Works"),
        numbered("Choose your monthly hours (20 or 40)"),
        numbered("Submit requests via Slack or email — we'll scope and prioritise"),
        numbered("We deliver within 48 hours (or sooner for urgent requests)"),
        numbered("Unused hours roll over for one month"),
        callout("tip", "Retainer clients get priority scheduling and 15% off any full project engagements."),
      ],
    },
  ];

  /* ══════════════════════════════════════════════════
     FAQ GROUPS (2)
     ══════════════════════════════════════════════════ */
  const faqGroups = [
    {
      _id: "faq-general",
      _type: "faqGroup",
      title: "General",
      slug: { _type: "slug", current: "general" },
      items: [
        { _key: key(), question: "What is Tekton?", answer: "Tekton is an open-source agency starter kit built with Next.js and Sanity CMS. It provides a complete foundation for building client websites — including a component library, page builder, skin system, and multi-client tooling." },
        { _key: key(), question: "Is Tekton free to use?", answer: "Yes. Tekton is released under the MIT licence. You can use it for personal projects, client work, or commercial products without any restrictions." },
        { _key: key(), question: "Do I need to know how to code?", answer: "Content editors can manage everything through the Sanity Studio — creating pages, writing articles, and updating settings without touching code. However, developers are needed for initial setup, custom skins, and new component development." },
        { _key: key(), question: "What hosting do you recommend?", answer: "Tekton is optimised for Vercel, which offers a generous free tier and seamless integration with Next.js. However, any platform that supports Node.js (Netlify, Railway, Render, etc.) will work." },
      ],
    },
    {
      _id: "faq-technical",
      _type: "faqGroup",
      title: "Technical",
      slug: { _type: "slug", current: "technical" },
      items: [
        { _key: key(), question: "Can I use a different CMS?", answer: "Tekton is designed around Sanity, but the component library and skin system are CMS-agnostic. You could replace the data layer with any headless CMS — it would require rewriting the data fetching and schema definitions." },
        { _key: key(), question: "How does the skin system work?", answer: "Skins use CSS custom properties scoped to a data-skin attribute. Changing the skin is a single attribute swap — no JavaScript, no re-render. Each skin can also provide optional component decorators for structural changes." },
        { _key: key(), question: "Can I add my own components?", answer: "Absolutely. Tekton follows a strict 5-file convention for every component: TSX, SCSS module, Storybook story, test file, and barrel export. Follow the same pattern and your components will integrate seamlessly." },
        { _key: key(), question: "Is Tekton accessible?", answer: "Accessibility is a core priority. All components are built with semantic HTML, ARIA attributes, keyboard navigation, and focus indicators. We aim for WCAG 2.1 AA compliance across the board." },
      ],
    },
  ];

  /* ══════════════════════════════════════════════════
     HOMEPAGE (page builder sections)
     ══════════════════════════════════════════════════ */
  const homepage = {
    _id: "homepage",
    _type: "homepage",
    title: "Homepage",
    sections: [
      {
        _type: "heroSection",
        _key: key(),
        heading: "Build Client Sites at Startup Speed",
        subheading: "Tekton is the open-source agency starter kit that gives you a production-ready foundation — so you can focus on what makes each client unique.",
        backgroundImage: imageRef(img.hero, "Abstract geometric background"),
        cta: { label: "Get Started →", href: "/guides" },
        align: "center",
      },
      {
        _type: "statsRowSection",
        _key: key(),
        heading: "Trusted by Agencies Worldwide",
        stats: [
          { _key: key(), label: "Components", value: "30+", subtitle: "UI primitives & sections" },
          { _key: key(), label: "Lighthouse", value: "98", trendDirection: "up", trendValue: "+24" },
          { _key: key(), label: "Deploy Time", value: "15 min", subtitle: "Clone to production" },
          { _key: key(), label: "Skins", value: "3", subtitle: "Vanilla, HUD, Corporate" },
        ],
        accent: true,
      },
      {
        _type: "featureGridSection",
        _key: key(),
        heading: "Everything You Need to Ship",
        subheading: "A modular, production-tested toolkit that handles the infrastructure — so you can focus on design and content.",
        features: [
          { _key: key(), title: "Page Builder", description: "10 section types that content editors can arrange to build any landing page. No developer required for routine pages.", icon: "layout-grid" },
          { _key: key(), title: "Skin System", description: "Transform the entire look with CSS custom properties. Ship the same codebase to a tech startup and a law firm.", icon: "palette" },
          { _key: key(), title: "Sanity CMS", description: "Structured content with a modular schema system. Enable only the modules each client needs: blog, events, catalog, FAQ.", icon: "database" },
          { _key: key(), title: "Component Library", description: "30+ accessible UI components with full Storybook documentation. Built with SCSS Modules and BEM naming.", icon: "component" },
          { _key: key(), title: "Multi-Client Tooling", description: "Bootstrapper script, CI pipeline, and environment templates. Spin up a new client project in minutes.", icon: "git-branch" },
          { _key: key(), title: "Performance First", description: "Server components, optimised images, lazy-loaded interactions. Lighthouse 98+ out of the box.", icon: "zap" },
        ],
        columns: 3,
      },
      {
        _type: "imageGallerySection",
        _key: key(),
        heading: "Built for Every Brand",
        images: [
          { _key: key(), image: imageRef(img.g1), alt: "Corporate skin demo", caption: "Corporate — clean, professional, light" },
          { _key: key(), image: imageRef(img.g2), alt: "HUD skin demo", caption: "HUD — sci-fi, data-driven, dark" },
          { _key: key(), image: imageRef(img.g3), alt: "Vanilla skin demo", caption: "Vanilla — minimal, neutral, flexible" },
          { _key: key(), image: imageRef(img.g4), alt: "Mobile responsive view", caption: "Fully responsive on all devices" },
          { _key: key(), image: imageRef(img.g5), alt: "Sanity Studio interface", caption: "Intuitive content editing in Sanity Studio" },
          { _key: key(), image: imageRef(img.g6), alt: "Storybook component library", caption: "Complete Storybook documentation" },
        ],
        layout: "grid",
        columns: 3,
      },
      {
        _type: "ctaSection",
        _key: key(),
        heading: "Ready to Ship Faster?",
        body: "Fork the repo, run the bootstrapper, and deploy your first client site in under 15 minutes. It's free, open-source, and built by people who run agencies.",
        primaryAction: { label: "Read the Guide", href: "/articles/getting-started" },
        secondaryAction: { label: "View on GitHub", href: "https://github.com" },
        variant: "accent",
      },
    ],
    seo: {
      title: "Tekton — The Agency Starter Kit",
      description: "Open-source website framework for agencies. Next.js, Sanity CMS, skin system, page builder, and 30+ components. Deploy client sites in minutes.",
    },
  };

  /* ══════════════════════════════════════════════════
     PAGES (3 page-builder pages)
     ══════════════════════════════════════════════════ */
  const pages = [
    {
      _id: "page-about",
      _type: "page",
      title: "About",
      slug: { _type: "slug", current: "about" },
      description: "The story behind Tekton — who we are, what we believe, and why we built this.",
      sections: [
        {
          _type: "pageHeroSection",
          _key: key(),
          heading: "We Build Tools for Builders",
          subheading: "Tekton started as an internal toolkit at a London design agency. We got tired of rebuilding the same infrastructure for every client — so we built it once, properly.",
          breadcrumb: "About",
          backgroundImage: imageRef(img.heroAbout, "Team working"),
          align: "center",
        },
        {
          _type: "richTextSection",
          _key: key(),
          heading: "Our Story",
          body: [
            p("In 2024, our agency was juggling twelve active client projects. Each one started with the same three weeks of scaffolding: setting up Next.js, configuring the CMS, building basic components, wiring up deployment. It was good engineering — but it was the same good engineering, over and over."),
            p("So we extracted it. We took the patterns that worked across every project — the component architecture, the skin system, the page builder, the multi-client tooling — and turned them into a standalone framework."),
            p("We called it Tekton (Greek for 'builder'). And then we open-sourced it, because the best tools get better when more people use them."),
            h3("What We Believe"),
            bullet("Frameworks should be opinionated about architecture but flexible about aesthetics"),
            bullet("Content editors should be able to build pages without filing a Jira ticket"),
            bullet("Performance and accessibility aren't features — they're table stakes"),
            bullet("The best code is the code you don't have to write twice"),
          ],
          maxWidth: "narrow",
        },
        {
          _type: "statsRowSection",
          _key: key(),
          stats: [
            { _key: key(), label: "Founded", value: "2024" },
            { _key: key(), label: "Team", value: "12", subtitle: "Designers & developers" },
            { _key: key(), label: "Sites Shipped", value: "47", trendDirection: "up", trendValue: "+18 this year" },
            { _key: key(), label: "Open Source", value: "MIT", subtitle: "Free forever" },
          ],
          accent: false,
        },
        {
          _type: "ctaSection",
          _key: key(),
          heading: "Want to Work With Us?",
          body: "Whether you need a custom site build or ongoing design support, we'd love to hear from you.",
          primaryAction: { label: "View Services", href: "/catalog" },
          secondaryAction: { label: "Get in Touch", href: "/contact" },
          variant: "default",
        },
      ],
    },
    {
      _id: "page-services",
      _type: "page",
      title: "Services",
      slug: { _type: "slug", current: "services" },
      description: "Professional services from the Tekton team — site builds, design retainers, and custom development.",
      sections: [
        {
          _type: "pageHeroSection",
          _key: key(),
          heading: "Services",
          subheading: "From quick-turnaround template customisation to full bespoke builds, we offer the expertise behind the framework.",
          breadcrumb: "Services",
          backgroundImage: imageRef(img.heroServices, "Services overview"),
          align: "center",
        },
        {
          _type: "featureGridSection",
          _key: key(),
          heading: "What We Offer",
          features: [
            { _key: key(), title: "Custom Site Build", description: "Full-service website design and development, from brand strategy to deployment. Starting at £5,000.", icon: "monitor", href: "/catalog/custom-site-build" },
            { _key: key(), title: "Design Retainer", description: "Ongoing design support on a flexible monthly basis. 20 or 40 hours with 48-hour turnaround.", icon: "pen-tool", href: "/catalog/design-retainer" },
            { _key: key(), title: "Template Customisation", description: "Take one of our starter templates and adapt it to your brand. Includes skin creation and content migration.", icon: "copy" },
            { _key: key(), title: "Performance Audit", description: "In-depth analysis of your existing site with actionable recommendations for speed, accessibility, and SEO.", icon: "gauge" },
            { _key: key(), title: "CMS Migration", description: "Move your content from WordPress, Contentful, or any other CMS to Sanity with zero downtime.", icon: "arrow-right-left" },
            { _key: key(), title: "Training & Workshops", description: "Hands-on sessions for your team on React, Next.js, Sanity, or design systems. Remote or on-site.", icon: "graduation-cap" },
          ],
          columns: 3,
        },
        {
          _type: "ctaSection",
          _key: key(),
          heading: "Let's Talk About Your Project",
          body: "Every engagement starts with a free 30-minute discovery call. No pressure, no commitment — just a conversation about what you're building.",
          primaryAction: { label: "Book a Call", href: "https://calendly.com" },
          variant: "accent",
        },
      ],
    },
    {
      _id: "page-contact",
      _type: "page",
      title: "Contact",
      slug: { _type: "slug", current: "contact" },
      description: "Get in touch with the Tekton team.",
      sections: [
        {
          _type: "pageHeroSection",
          _key: key(),
          heading: "Get in Touch",
          subheading: "Whether you have a question about the framework, need help with a project, or just want to say hello — we'd love to hear from you.",
          breadcrumb: "Contact",
          align: "center",
        },
        {
          _type: "richTextSection",
          _key: key(),
          heading: "How to Reach Us",
          body: [
            h3("Email"),
            p("hello@tekton.dev — we respond within 24 hours on weekdays."),
            h3("GitHub"),
            p("Open an issue or start a discussion on our GitHub repo. This is the best place for technical questions and feature requests."),
            h3("Social"),
            p("Follow us on Twitter/X for updates, or join our Discord for real-time community chat."),
            callout("info", "For urgent support on active projects, retainer clients have access to a dedicated Slack channel with 4-hour SLA."),
          ],
          maxWidth: "narrow",
        },
        {
          _type: "statsRowSection",
          _key: key(),
          stats: [
            { _key: key(), label: "Response Time", value: "< 24h" },
            { _key: key(), label: "Retainer SLA", value: "< 4h" },
            { _key: key(), label: "Time Zone", value: "GMT" },
          ],
          accent: false,
        },
      ],
    },
  ];

  /* ══════════════════════════════════════════════════
     NAVIGATION
     ══════════════════════════════════════════════════ */
  const navigation = {
    _id: "navigation",
    _type: "navigation",
    mainNav: [
      { _key: key(), label: "News", href: "/news", icon: "newspaper" },
      { _key: key(), label: "Guides", href: "/guides", icon: "book-open" },
      { _key: key(), label: "Events", href: "/events", icon: "calendar" },
      { _key: key(), label: "Catalog", href: "/catalog", icon: "package" },
      { _key: key(), label: "About", href: "/about", icon: "info" },
    ],
    footerNav: [
      { _key: key(), label: "About", href: "/about" },
      { _key: key(), label: "Services", href: "/services" },
      { _key: key(), label: "Contact", href: "/contact" },
      { _key: key(), label: "Privacy", href: "/privacy" },
      { _key: key(), label: "Studio", href: "/studio" },
    ],
    footerText: "© {year} Tekton. Built for agencies, by an agency.",
  };

  /* ══════════════════════════════════════════════════
     SITE SETTINGS
     ══════════════════════════════════════════════════ */
  const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Tekton",
    siteNameShort: "TK",
    tagline: "The Agency Starter Kit",
    navLayout: "sidebar",
    contentWidth: "1200",
    skin: "vanilla",
    defaultThemeHue: 220,
    defaultThemeMode: "dark",
    socialLinks: [
      { _key: key(), platform: "github", url: "https://github.com" },
      { _key: key(), platform: "discord", url: "https://discord.gg" },
      { _key: key(), platform: "twitter", url: "https://twitter.com" },
      { _key: key(), platform: "youtube", url: "https://youtube.com" },
    ],
    seoTitle: "Tekton — The Open-Source Agency Starter Kit",
    seoDescription: "Production-ready website framework for agencies. Next.js, Sanity CMS, component library, skin system, and page builder. Deploy client sites in minutes.",
    siteUrl: "https://tekton.vercel.app",
  };

  /* ══════════════════════════════════════════════════
     WRITE EVERYTHING
     ══════════════════════════════════════════════════ */
  console.log("📝 Writing documents…");
  const tx = client.transaction();

  for (const a of authors) tx.createOrReplace(a);
  console.log(`  ✓ ${authors.length} authors`);

  for (const c of categories) tx.createOrReplace(c);
  console.log(`  ✓ ${categories.length} article categories`);

  for (const a of articles) tx.createOrReplace(a);
  console.log(`  ✓ ${articles.length} articles (news + guides)`);

  for (const e of events) tx.createOrReplace(e);
  console.log(`  ✓ ${events.length} events`);

  for (const ic of itemCategories) tx.createOrReplace(ic);
  console.log(`  ✓ ${itemCategories.length} item categories`);

  for (const i of items) tx.createOrReplace(i);
  console.log(`  ✓ ${items.length} catalog items`);

  for (const f of faqGroups) tx.createOrReplace(f);
  console.log(`  ✓ ${faqGroups.length} FAQ groups`);

  tx.createOrReplace(homepage);
  console.log("  ✓ Homepage (with page builder sections)");

  for (const pg of pages) tx.createOrReplace(pg);
  console.log(`  ✓ ${pages.length} pages`);

  tx.createOrReplace(navigation);
  console.log("  ✓ Navigation");

  tx.createOrReplace(siteSettings);
  console.log("  ✓ Site settings");

  await tx.commit();

  console.log("\n✅ Done! Showcase content seeded successfully.");
  console.log("────────────────────────────────────");
  console.log("  Authors:          3 (Sarah, Marcus, Elena)");
  console.log("  Article Categories: 6 (News, Guides, Case Studies, Design, Dev, Strategy)");
  console.log("  Articles:         8 (4 news + 4 guides)");
  console.log("  Events:           4 (workshop, meetup, webinar, launch)");
  console.log("  Item Categories:  3 (Templates, Plugins, Services)");
  console.log("  Catalog Items:    6 (2 templates + 2 plugins + 2 services)");
  console.log("  FAQ Groups:       2 (General + Technical, 8 questions)");
  console.log("  Homepage:         1 (hero, stats, features, gallery, CTA)");
  console.log("  Pages:            3 (About, Services, Contact)");
  console.log("  Navigation:       5 main links + 5 footer links");
  console.log("  Site Settings:    configured with SEO, socials, theme");
  console.log("────────────────────────────────────");
  console.log("  Visit /studio to manage all content.");
}

main().catch((err) => {
  console.error("💥 Seed failed:", err);
  process.exit(1);
});
