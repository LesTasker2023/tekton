/**
 * Seed script — creates the siteSettings singleton document in Sanity.
 *
 * Usage:
 *   npx tsx scripts/seed-site-settings.ts
 *
 * Reads SANITY_TOKEN (or SANITY_API_TOKEN) from .env.local.
 */

import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "u2kuytve";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN ?? process.env.SANITY_TOKEN;

if (!token) {
  console.error("❌  Missing SANITY_TOKEN or SANITY_API_TOKEN in env");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

async function seed() {
  console.log("🌱  Seeding site settings…");

  const doc = {
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Tekton",
    siteNameShort: "TK",
    tagline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    mainNav: [
      { _key: "nav-news", label: "News", href: "/news", icon: "newspaper" },
      {
        _key: "nav-guides",
        label: "Guides",
        href: "/guides",
        icon: "book-open",
      },
    ],
    footerText: "© {year} Tekton. Lorem ipsum dolor sit amet.",
    footerLinks: [
      { _key: "fl-about", label: "About", href: "/about" },
      { _key: "fl-privacy", label: "Privacy", href: "/privacy" },
      { _key: "fl-studio", label: "Studio", href: "/studio" },
    ],
    socialLinks: [
      {
        _key: "sl-discord",
        platform: "discord",
        url: "https://discord.gg/example",
      },
      {
        _key: "sl-youtube",
        platform: "youtube",
        url: "https://youtube.com/@example",
      },
      {
        _key: "sl-github",
        platform: "github",
        url: "https://github.com/example",
      },
    ],
    seoTitle: "Tekton — Lorem Ipsum Dolor Sit Amet",
    seoDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    defaultThemeHue: 220,
    defaultThemeMode: "dark",
  };

  await client.createOrReplace(doc);
  console.log("✅  Site settings seeded (id: siteSettings)");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  process.exit(1);
});
