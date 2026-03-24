/**
 * Seed script — creates the homepage singleton document in Sanity.
 *
 * Usage:
 *   npx tsx scripts/seed-homepage.ts
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
  console.log("🌱  Seeding homepage…");

  const doc = {
    _id: "homepage",
    _type: "homepage",

    /* ── Hero ── */
    heroEyebrow: "LOREM · IPSUM · DOLOR SIT",
    heroTitle: "LOREM *IPSUM*",
    heroTagline:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor **incididunt** ut labore et dolore **magna aliqua**.",
    heroDepositLine: "Excepteur Sint Occaecat",
    heroCta: {
      label: "Lorem Ipsum →",
      href: "#",
    },
    heroTrustBadges: [
      "Lorem ipsum",
      "Dolor sit",
      "Amet consectetur",
      "Adipiscing elit",
    ],
    heroCoords: ["v0.0.0", "LOREM", "IPSUM", "DOLOR"],

    /* ── Stats ── */
    stats: [
      { _key: "s1", value: "00", label: "Lorem Ipsum" },
      { _key: "s2", value: "00", label: "Dolor Sit" },
      { _key: "s3", value: "00", label: "Amet Consectetur" },
      { _key: "s4", value: "00", label: "Adipiscing Elit" },
    ],

    /* ── Earnings ── */
    earningsTitle: "Lorem Ipsum Dolor",
    earningsSubtitle:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    earningsItems: [
      {
        _key: "e1",
        label: "Lorem Ipsum",
        value: "00",
        usd: "Dolor sit amet consectetur",
        highlight: false,
      },
      {
        _key: "e2",
        label: "Dolor Sit",
        value: "00",
        usd: "Adipiscing elit sed do",
        highlight: false,
      },
      {
        _key: "e3",
        label: "Amet",
        value: "00",
        usd: "Eiusmod tempor incididunt",
        highlight: true,
      },
      {
        _key: "e4",
        label: "Consectetur",
        value: "00",
        usd: "Ut labore et dolore",
        highlight: false,
      },
    ],
    earningsNote:
      "* Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius turpis et commodo pharetra.",
    earningsCta: {
      label: "Lorem Ipsum →",
      href: "#",
    },

    /* ── Steps ── */
    stepsTitle: "Lorem Ipsum Dolor Sit",
    steps: [
      {
        _key: "st1",
        icon: "shield",
        title: "Lorem Ipsum",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      },
      {
        _key: "st2",
        icon: "rocket",
        title: "Dolor Sit Amet",
        description:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      },
      {
        _key: "st3",
        icon: "crosshair",
        title: "Consectetur Adipiscing",
        description:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
      },
      {
        _key: "st4",
        icon: "banknote",
        title: "Eiusmod Tempor",
        description:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
      },
    ],
    stepsCta: {
      label: "Lorem Ipsum →",
      href: "#",
    },

    /* ── About ── */
    aboutTitle: "Lorem Ipsum",
    aboutName: "Dolor Sit Amet",
    aboutMetaTags: ["Lorem", "Ipsum", "Dolor"],
    aboutParagraphs: [
      "**Dolor Sit Amet** — lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
    ],

    /* ── FAQ ── */
    faqTitle: "Lorem Ipsum Dolor",
    faqs: [
      {
        _key: "f1",
        question: "Lorem ipsum dolor sit amet?",
        answer:
          "Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      },
      {
        _key: "f2",
        question: "Ut enim ad minim veniam?",
        answer:
          "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
      },
      {
        _key: "f3",
        question: "Duis aute irure dolor?",
        answer:
          "In voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      },
      {
        _key: "f4",
        question: "Excepteur sint occaecat?",
        answer:
          "Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus.",
      },
      {
        _key: "f5",
        question: "Curabitur pretium tincidunt?",
        answer:
          "Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis.",
      },
      {
        _key: "f6",
        question: "Pellentesque habitant morbi?",
        answer:
          "Tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae.",
      },
      {
        _key: "f7",
        question: "Aenean ultricies mi vitae?",
        answer:
          "Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi.",
      },
    ],

    /* ── Final CTA ── */
    finalCtaTitle: "Lorem Ipsum Dolor.|Sit Amet Consectetur.",
    finalCtaBody:
      "Adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    finalCtaButton: {
      label: "Lorem Ipsum →",
      href: "#",
    },

    /* ── SEO ── */
    seoTitle: "Tekton — Lorem Ipsum Dolor Sit Amet",
    seoDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    seoKeywords: [
      "lorem",
      "ipsum",
      "dolor",
      "sit",
      "amet",
      "consectetur",
      "adipiscing",
      "elit",
      "sed",
      "eiusmod",
      "tempor",
      "incididunt",
      "labore",
      "dolore",
      "magna",
      "aliqua",
      "veniam",
      "nostrud",
    ],
    ogTitle: "Tekton — Lorem Ipsum Dolor",
    ogDescription:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    twitterTitle: "Tekton — Lorem Ipsum Dolor",
    twitterDescription:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    twitterCreator: "@example",
    signupBaseUrl: "#",
  };

  await client.createOrReplace(doc);
  console.log("✅  Homepage seeded (id: homepage)");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  process.exit(1);
});
