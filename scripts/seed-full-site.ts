/**
 * Full site seed — populates Sanity with a complete set of pages, news & guides.
 *
 * Usage:
 *   SANITY_API_TOKEN=<write-token> npx tsx scripts/seed-full-site.ts
 */

import { createClient } from "@sanity/client";

const projectId = "u2kuytve";
const dataset = "production";
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
const h4 = (t: string) => block([span(t)], "h4");

const p = (t: string) => block([span(t)]);
const pBold = (t: string) => block([span(t, ["strong"])]);

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
async function uploadImage(url: string, filename: string): Promise<string> {
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

function imageRef(assetId: string) {
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

/* ──────────────────────────────────────────────────
   Lorem content
   ────────────────────────────────────────────────── */
const L = {
  short:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  med: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  sentence:
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  para2:
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.",
  para3:
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.",
  para4:
    "Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.",
};

/* ──────────────────────────────────────────────────
   Rich body builder (for news/guides)
   ────────────────────────────────────────────────── */
function richBody(topic: string) {
  return [
    p(L.long),
    h2(`Lorem ${topic}`),
    p(L.med),
    p(L.para2),
    callout(
      "info",
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    ),
    h3("Dolor Sit Amet"),
    bullet("Lorem ipsum dolor sit amet, consectetur adipiscing elit"),
    bullet("Ut enim ad minim veniam, quis nostrud exercitation"),
    bullet("Duis aute irure dolor in reprehenderit in voluptate"),
    bullet("Excepteur sint occaecat cupidatat non proident"),
    p(L.para3),
    h3("Consectetur Adipiscing"),
    p(L.med),
    codeBlock(
      `// Lorem ipsum configuration\nconst config = {\n  mode: "lorem",\n  threshold: 0.75,\n  maxRetries: 3,\n  timeout: 5000,\n};\n\nexport default config;`,
      "typescript",
      `lorem-config.ts`,
    ),
    p(L.para4),
    callout(
      "tip",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    ),
    h2("Sed Eiusmod Tempor"),
    p(L.long),
    h3("Incididunt Ut Labore"),
    numbered("Lorem ipsum dolor sit amet consectetur adipiscing"),
    numbered("Ut enim ad minim veniam quis nostrud exercitation"),
    numbered("Duis aute irure dolor in reprehenderit voluptate"),
    numbered("Excepteur sint occaecat cupidatat non proident"),
    numbered("Curabitur pretium tincidunt lacus nulla gravida"),
    p(L.para2),
    h3("Et Dolore Magna"),
    p(L.med),
    callout(
      "warning",
      "Lorem ipsum dolor sit amet. Consectetur adipiscing elit sed do eiusmod tempor.",
    ),
    p(L.para3),
    quote(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    ),
    h2("Ut Labore Et Dolore"),
    p(L.med),
    p(L.para4),
    callout(
      "danger",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    ),
  ];
}

/* ──────────────────────────────────────────────────
   MAIN
   ────────────────────────────────────────────────── */
async function main() {
  console.log("🌱 Seeding full site content…\n");

  // ── Upload placeholder images ──
  console.log("📸 Uploading placeholder images…");
  const images = {
    hero1: await uploadImage(
      "https://picsum.photos/seed/tk-hero1/1600/900",
      "hero-1.jpg",
    ),
    hero2: await uploadImage(
      "https://picsum.photos/seed/tk-hero2/1600/900",
      "hero-2.jpg",
    ),
    cover1: await uploadImage(
      "https://picsum.photos/seed/tk-cover1/800/450",
      "cover-1.jpg",
    ),
    cover2: await uploadImage(
      "https://picsum.photos/seed/tk-cover2/800/450",
      "cover-2.jpg",
    ),
    cover3: await uploadImage(
      "https://picsum.photos/seed/tk-cover3/800/450",
      "cover-3.jpg",
    ),
    cover4: await uploadImage(
      "https://picsum.photos/seed/tk-cover4/800/450",
      "cover-4.jpg",
    ),
    cover5: await uploadImage(
      "https://picsum.photos/seed/tk-cover5/800/450",
      "cover-5.jpg",
    ),
    cover6: await uploadImage(
      "https://picsum.photos/seed/tk-cover6/800/450",
      "cover-6.jpg",
    ),
    feature1: await uploadImage(
      "https://picsum.photos/seed/tk-feat1/600/400",
      "feature-1.jpg",
    ),
    feature2: await uploadImage(
      "https://picsum.photos/seed/tk-feat2/600/400",
      "feature-2.jpg",
    ),
    feature3: await uploadImage(
      "https://picsum.photos/seed/tk-feat3/600/400",
      "feature-3.jpg",
    ),
    feature4: await uploadImage(
      "https://picsum.photos/seed/tk-feat4/600/400",
      "feature-4.jpg",
    ),
    gallery1: await uploadImage(
      "https://picsum.photos/seed/tk-gal1/800/600",
      "gallery-1.jpg",
    ),
    gallery2: await uploadImage(
      "https://picsum.photos/seed/tk-gal2/800/600",
      "gallery-2.jpg",
    ),
    gallery3: await uploadImage(
      "https://picsum.photos/seed/tk-gal3/800/600",
      "gallery-3.jpg",
    ),
    gallery4: await uploadImage(
      "https://picsum.photos/seed/tk-gal4/800/600",
      "gallery-4.jpg",
    ),
    gallery5: await uploadImage(
      "https://picsum.photos/seed/tk-gal5/800/600",
      "gallery-5.jpg",
    ),
    gallery6: await uploadImage(
      "https://picsum.photos/seed/tk-gal6/800/600",
      "gallery-6.jpg",
    ),
  };
  console.log("");

  // ── Author ──
  const author = {
    _id: "author-tekton",
    _type: "author",
    name: "Lorem Ipsum",
    slug: { _type: "slug", current: "lorem-ipsum" },
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };

  // ── Categories ──
  const categories = [
    {
      _id: "cat-tutorials",
      _type: "category",
      title: "Categoria Alpha",
      slug: { _type: "slug", current: "tutorials" },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      _id: "cat-development",
      _type: "category",
      title: "Categoria Beta",
      slug: { _type: "slug", current: "development" },
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    },
    {
      _id: "cat-design",
      _type: "category",
      title: "Categoria Gamma",
      slug: { _type: "slug", current: "design" },
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit.",
    },
    {
      _id: "cat-deployment",
      _type: "category",
      title: "Categoria Delta",
      slug: { _type: "slug", current: "deployment" },
      description: "Excepteur sint occaecat cupidatat non proident.",
    },
    {
      _id: "cat-news",
      _type: "category",
      title: "Categoria Epsilon",
      slug: { _type: "slug", current: "news" },
      description: "Curabitur pretium tincidunt lacus. Nulla gravida orci.",
    },
    {
      _id: "cat-community",
      _type: "category",
      title: "Categoria Zeta",
      slug: { _type: "slug", current: "community" },
      description: "Pellentesque habitant morbi tristique senectus et netus.",
    },
  ];

  // ── Guides (6) ──
  const guides = [
    {
      _id: "guide-getting-started",
      _type: "guide",
      title: "Lorem Ipsum — Dolor Sit Amet",
      slug: { _type: "slug", current: "getting-started" },
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      coverImage: imageRef(images.cover1),
      category: { _type: "reference", _ref: "cat-tutorials" },
      difficulty: "beginner",
      order: 1,
      publishedAt: "2026-01-15T10:00:00Z",
      body: richBody("Lorem Ipsum"),
    },
    {
      _id: "guide-component-library",
      _type: "guide",
      title: "Consectetur Adipiscing — Elit Sed Do",
      slug: { _type: "slug", current: "component-library" },
      excerpt:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      coverImage: imageRef(images.cover2),
      category: { _type: "reference", _ref: "cat-development" },
      difficulty: "intermediate",
      order: 2,
      publishedAt: "2026-01-20T10:00:00Z",
      body: richBody("Dolor Sit Amet"),
    },
    {
      _id: "guide-sanity-schemas",
      _type: "guide",
      title: "Eiusmod Tempor — Incididunt Ut Labore",
      slug: { _type: "slug", current: "sanity-schemas" },
      excerpt:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
      coverImage: imageRef(images.cover3),
      category: { _type: "reference", _ref: "cat-development" },
      difficulty: "advanced",
      order: 3,
      publishedAt: "2026-01-25T10:00:00Z",
      body: richBody("Consectetur Adipiscing"),
    },
    {
      _id: "guide-theming",
      _type: "guide",
      title: "Magna Aliqua — Veniam Quis Nostrud",
      slug: { _type: "slug", current: "theming-guide" },
      excerpt:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      coverImage: imageRef(images.cover4),
      category: { _type: "reference", _ref: "cat-design" },
      difficulty: "beginner",
      order: 4,
      publishedAt: "2026-02-01T10:00:00Z",
      body: richBody("Curabitur Pretium"),
    },
    {
      _id: "guide-deployment",
      _type: "guide",
      title: "Pellentesque Habitant — Morbi Tristique",
      slug: { _type: "slug", current: "deployment-guide" },
      excerpt:
        "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius turpis et commodo pharetra.",
      coverImage: imageRef(images.cover5),
      category: { _type: "reference", _ref: "cat-deployment" },
      difficulty: "intermediate",
      order: 5,
      publishedAt: "2026-02-05T10:00:00Z",
      body: richBody("Nulla Gravida"),
    },
    {
      _id: "guide-seo-performance",
      _type: "guide",
      title: "Aenean Ultricies — Mi Vitae Est",
      slug: { _type: "slug", current: "seo-performance" },
      excerpt:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      coverImage: imageRef(images.cover6),
      category: { _type: "reference", _ref: "cat-tutorials" },
      difficulty: "beginner",
      order: 6,
      publishedAt: "2026-02-08T10:00:00Z",
      body: richBody("Vestibulum Tortor"),
    },
  ];

  // ── News Posts (6) ──
  const now = Date.now();
  const day = 86400000;
  const posts = [
    {
      _id: "post-v1-release",
      _type: "post",
      title: "Lorem Ipsum Dolor Sit Amet — Consectetur Adipiscing",
      slug: { _type: "slug", current: "tekton-v1-release" },
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      coverImage: imageRef(images.cover1),
      author: { _type: "reference", _ref: "author-tekton" },
      categories: [{ _type: "reference", _ref: "cat-news", _key: key() }],
      publishedAt: new Date(now - day * 1).toISOString(),
      featured: true,
      body: richBody("Lorem Ipsum"),
    },
    {
      _id: "post-weekly-update",
      _type: "post",
      title: "Ut Enim Ad Minim — Veniam Quis Nostrud",
      slug: { _type: "slug", current: "weekly-dev-update" },
      excerpt:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      coverImage: imageRef(images.cover2),
      author: { _type: "reference", _ref: "author-tekton" },
      categories: [{ _type: "reference", _ref: "cat-news", _key: key() }],
      publishedAt: new Date(now - day * 3).toISOString(),
      featured: false,
      body: richBody("Dolor Sit"),
    },
    {
      _id: "post-community-showcase",
      _type: "post",
      title: "Duis Aute Irure — Dolor In Reprehenderit",
      slug: { _type: "slug", current: "community-showcase" },
      excerpt:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      coverImage: imageRef(images.cover3),
      author: { _type: "reference", _ref: "author-tekton" },
      categories: [
        { _type: "reference", _ref: "cat-community", _key: key() },
        { _type: "reference", _ref: "cat-news", _key: key() },
      ],
      publishedAt: new Date(now - day * 5).toISOString(),
      featured: true,
      body: richBody("Amet Consectetur"),
    },
    {
      _id: "post-changelog",
      _type: "post",
      title: "Excepteur Sint Occaecat — Cupidatat Non Proident",
      slug: { _type: "slug", current: "changelog-component-updates" },
      excerpt:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      coverImage: imageRef(images.cover4),
      author: { _type: "reference", _ref: "author-tekton" },
      categories: [{ _type: "reference", _ref: "cat-news", _key: key() }],
      publishedAt: new Date(now - day * 8).toISOString(),
      featured: false,
      body: richBody("Eiusmod Tempor"),
    },
    {
      _id: "post-security-update",
      _type: "post",
      title: "Curabitur Pretium — Tincidunt Lacus",
      slug: { _type: "slug", current: "security-audit-report" },
      excerpt:
        "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius turpis et commodo pharetra.",
      coverImage: imageRef(images.cover5),
      author: { _type: "reference", _ref: "author-tekton" },
      categories: [
        { _type: "reference", _ref: "cat-news", _key: key() },
        { _type: "reference", _ref: "cat-community", _key: key() },
      ],
      publishedAt: new Date(now - day * 12).toISOString(),
      featured: false,
      body: richBody("Nulla Gravida"),
    },
    {
      _id: "post-new-contributors",
      _type: "post",
      title: "Pellentesque Habitant — Morbi Tristique Senectus",
      slug: { _type: "slug", current: "welcome-new-contributors-feb-2026" },
      excerpt:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      coverImage: imageRef(images.cover6),
      author: { _type: "reference", _ref: "author-tekton" },
      categories: [{ _type: "reference", _ref: "cat-community", _key: key() }],
      publishedAt: new Date(now - day * 15).toISOString(),
      featured: false,
      body: richBody("Vestibulum Tortor"),
    },
  ];

  // ── Pages (5) — built with section page builder ──
  const pages = [
    // ─── About Page ───
    {
      _id: "page-about",
      _type: "page",
      title: "Lorem Ipsum",
      slug: { _type: "slug", current: "about" },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      sections: [
        {
          _type: "pageHeroSection",
          _key: key(),
          heading: "Lorem Ipsum",
          subheading:
            "Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
          breadcrumb: "About",
          align: "center",
        },
        {
          _type: "richTextSection",
          _key: key(),
          heading: "Dolor Sit Amet",
          body: [
            p(L.long),
            p(L.para2),
            p(L.para3),
            h3("Consectetur Adipiscing"),
            p(L.med),
            bullet(
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            ),
            bullet("Ut enim ad minim veniam, quis nostrud exercitation"),
            bullet("Duis aute irure dolor in reprehenderit in voluptate"),
            bullet("Excepteur sint occaecat cupidatat non proident"),
            p(L.para4),
          ],
          maxWidth: "narrow",
        },
        {
          _type: "statsRowSection",
          _key: key(),
          heading: "Lorem Ipsum",
          stats: [
            {
              _key: key(),
              label: "Lorem",
              value: "000",
              trendDirection: "up",
              trendValue: "+00%",
            },
            {
              _key: key(),
              label: "Ipsum",
              value: "00",
              trendDirection: "up",
              trendValue: "+00%",
            },
            { _key: key(), label: "Dolor", value: "000" },
            { _key: key(), label: "Sit", value: "00" },
          ],
          accent: true,
        },
        {
          _type: "ctaSection",
          _key: key(),
          heading: "Lorem Ipsum Dolor?",
          body: "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          primaryAction: {
            label: "Lorem Ipsum",
            href: "https://discord.gg/example",
          },
          secondaryAction: { label: "Dolor Sit", href: "/guides" },
          variant: "accent",
        },
      ],
    },
    // ─── Features Page ───
    {
      _id: "page-features",
      _type: "page",
      title: "Lorem Ipsum",
      slug: { _type: "slug", current: "features" },
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      sections: [
        {
          _type: "pageHeroSection",
          _key: key(),
          heading: "Lorem Ipsum Dolor",
          subheading:
            "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
          breadcrumb: "Features",
          align: "center",
        },
        {
          _type: "featureGridSection",
          _key: key(),
          heading: "Dolor Sit Amet",
          subheading:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          features: [
            {
              _key: key(),
              title: "Lorem Ipsum",
              description:
                "Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
              icon: "map",
              href: "/guides",
            },
            {
              _key: key(),
              title: "Dolor Sit",
              description:
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
              icon: "bar-chart-3",
            },
            {
              _key: key(),
              title: "Amet Consectetur",
              description:
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
              icon: "calculator",
            },
            {
              _key: key(),
              title: "Adipiscing Elit",
              description:
                "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
              icon: "book-open",
              href: "/guides",
            },
            {
              _key: key(),
              title: "Sed Eiusmod",
              description:
                "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius turpis.",
              icon: "clipboard-list",
            },
            {
              _key: key(),
              title: "Tempor Incididunt",
              description:
                "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis.",
              icon: "message-circle",
            },
          ],
          columns: 3,
        },
        {
          _type: "ctaSection",
          _key: key(),
          heading: "Lorem Ipsum Dolor",
          body: "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
          primaryAction: { label: "Lorem Ipsum", href: "/guides" },
          secondaryAction: { label: "Dolor Sit", href: "/guides" },
          variant: "default",
        },
      ],
    },
    // ─── Gallery Page ───
    {
      _id: "page-gallery",
      _type: "page",
      title: "Lorem Ipsum",
      slug: { _type: "slug", current: "gallery" },
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      sections: [
        {
          _type: "pageHeroSection",
          _key: key(),
          heading: "Lorem Ipsum",
          subheading:
            "Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
          breadcrumb: "Gallery",
          align: "center",
        },
        {
          _type: "imageGallerySection",
          _key: key(),
          heading: "Dolor Sit Amet",
          images: [
            {
              _key: key(),
              image: imageRef(images.gallery1),
              alt: "Lorem ipsum dolor sit amet",
              caption: "Consectetur adipiscing elit",
            },
            {
              _key: key(),
              image: imageRef(images.gallery2),
              alt: "Sed do eiusmod tempor",
              caption: "Incididunt ut labore et dolore",
            },
            {
              _key: key(),
              image: imageRef(images.gallery3),
              alt: "Ut enim ad minim veniam",
              caption: "Quis nostrud exercitation ullamco",
            },
            {
              _key: key(),
              image: imageRef(images.gallery4),
              alt: "Duis aute irure dolor",
              caption: "In reprehenderit in voluptate",
            },
            {
              _key: key(),
              image: imageRef(images.gallery5),
              alt: "Excepteur sint occaecat",
              caption: "Cupidatat non proident",
            },
            {
              _key: key(),
              image: imageRef(images.gallery6),
              alt: "Curabitur pretium tincidunt",
              caption: "Nulla gravida orci a odio",
            },
          ],
          layout: "grid",
          columns: 3,
        },
      ],
    },
    // ─── FAQ Page ───
    {
      _id: "page-faq",
      _type: "page",
      title: "FAQ",
      slug: { _type: "slug", current: "faq" },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      sections: [
        {
          _type: "pageHeroSection",
          _key: key(),
          heading: "Lorem Ipsum Dolor",
          subheading:
            "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
          breadcrumb: "FAQ",
          align: "center",
        },
        {
          _type: "richTextSection",
          _key: key(),
          heading: "Lorem Ipsum",
          body: [
            h3("Lorem ipsum dolor sit amet?"),
            p(L.med),
            h3("Ut enim ad minim veniam?"),
            p(L.med),
            h3("Duis aute irure dolor?"),
            p(L.med),
            h3("Excepteur sint occaecat?"),
            p(L.med),
          ],
          maxWidth: "narrow",
        },
        {
          _type: "richTextSection",
          _key: key(),
          heading: "Dolor Sit Amet",
          body: [
            h3("Curabitur pretium tincidunt?"),
            p(L.med),
            h3("Pellentesque habitant morbi?"),
            p(L.med),
            h3("Aenean ultricies mi vitae?"),
            p(L.long),
            callout(
              "warning",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
            ),
            h3("Vestibulum tortor quam?"),
            p(L.med),
          ],
          maxWidth: "narrow",
        },
        {
          _type: "ctaSection",
          _key: key(),
          heading: "Lorem Ipsum Dolor?",
          body: "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
          primaryAction: {
            label: "Lorem Ipsum",
            href: "https://discord.gg/example",
          },
          variant: "default",
        },
      ],
    },
    // ─── Contact Page ───
    {
      _id: "page-contact",
      _type: "page",
      title: "Lorem Ipsum",
      slug: { _type: "slug", current: "contact" },
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      sections: [
        {
          _type: "pageHeroSection",
          _key: key(),
          heading: "Lorem Ipsum",
          subheading:
            "Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
          breadcrumb: "Contact",
          align: "center",
        },
        {
          _type: "richTextSection",
          _key: key(),
          heading: "Dolor Sit Amet",
          body: [
            p(L.med),
            h3("Lorem Ipsum"),
            p(L.short),
            h3("Dolor Sit"),
            p(L.short),
            h3("Amet Consectetur"),
            p(L.short),
            callout(
              "info",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
            ),
          ],
          maxWidth: "narrow",
        },
        {
          _type: "statsRowSection",
          _key: key(),
          heading: "Lorem Ipsum",
          stats: [
            { _key: key(), label: "Lorem", value: "< 0h" },
            { _key: key(), label: "Ipsum", value: "< 00h" },
            { _key: key(), label: "Dolor", value: "< 00h" },
          ],
          accent: false,
        },
      ],
    },
  ];

  // ── Write everything ──
  console.log("📝 Writing documents…");
  const tx = client.transaction();

  tx.createOrReplace(author);
  console.log("  ✓ Author");

  for (const cat of categories) {
    tx.createOrReplace(cat);
  }
  console.log(`  ✓ ${categories.length} categories`);

  for (const guide of guides) {
    tx.createOrReplace(guide);
  }
  console.log(`  ✓ ${guides.length} guides`);

  for (const post of posts) {
    tx.createOrReplace(post);
  }
  console.log(`  ✓ ${posts.length} news posts`);

  for (const page of pages) {
    tx.createOrReplace(page);
  }
  console.log(`  ✓ ${pages.length} pages`);

  await tx.commit();

  console.log("\n✅ Done! Full site seeded successfully.");
  console.log("   Pages:  about, features, gallery, faq, contact");
  console.log("   News:   6 posts (2 featured)");
  console.log("   Guides: 6 guides (beginner → advanced)");
  console.log(
    "   Categories: tutorials, development, design, deployment, news, community",
  );
}

main().catch((err) => {
  console.error("💥 Seed failed:", err);
  process.exit(1);
});
