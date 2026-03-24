/**
 * Seed script — pushes sample content into Sanity.
 *
 * Usage:
 *   SANITY_API_TOKEN=<your-write-token> npx tsx scripts/seed-test-content.ts
 *
 * If you don't have a write token yet, create one in
 *   https://www.sanity.io/manage → project → API → Tokens → Add token (Editor)
 *
 * You can also just paste these into Studio manually — the script is a
 * convenience.
 */

import { createClient } from "@sanity/client";

const projectId = "u2kuytve";
const dataset = "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error(
    "⛔  Set SANITY_API_TOKEN env var to a write-capable token.\n" +
      "   Create one at https://www.sanity.io/manage",
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

/* ────────────────────────────────────────────────── */
/*  Helper: Portable Text block                       */
/* ────────────────────────────────────────────────── */
let blockKey = 0;
const key = () => `k${++blockKey}`;

type Mark = "strong" | "em" | "code";

function span(text: string, marks: Mark[] = []) {
  return { _type: "span", _key: key(), text, marks };
}

function block(children: ReturnType<typeof span>[], style: string = "normal") {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children,
  };
}

function heading(text: string, level: "h2" | "h3" | "h4" = "h2") {
  return block([span(text)], level);
}

function bullet(text: string) {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [span(text)],
  };
}

function numbered(text: string, n: number) {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    listItem: "number",
    level: 1,
    markDefs: [],
    children: [span(`${text}`)],
  };
}

function callout(tone: "info" | "tip" | "warning" | "danger", text: string) {
  return {
    _type: "callout",
    _key: key(),
    tone,
    body: [block([span(text)])],
  };
}

function codeBlock(code: string, language = "typescript", filename?: string) {
  return {
    _type: "codeBlock",
    _key: key(),
    language,
    code,
    ...(filename ? { filename } : {}),
  };
}

/* ────────────────────────────────────────────────── */
/*  Helper: imageWithAlt block from an asset ref      */
/* ────────────────────────────────────────────────── */
function imageBlock(assetRef: string, alt: string, caption?: string) {
  return {
    _type: "imageWithAlt",
    _key: key(),
    asset: { _type: "reference", _ref: assetRef },
    alt,
    ...(caption ? { caption } : {}),
  };
}

/** Upload an image from a URL and return the asset _id */
async function uploadImageFromUrl(
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
  console.log(`   📸 Uploaded ${filename} → ${asset._id}`);
  return asset._id;
}

/* ────────────────────────────────────────────────── */
/*  Category                                          */
/* ────────────────────────────────────────────────── */
const tutorialsCategory = {
  _id: "cat-tutorials",
  _type: "category",
  title: "Categoria Alpha",
  slug: { _type: "slug", current: "tutorials" },
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

const developmentCategory = {
  _id: "cat-development",
  _type: "category",
  title: "Categoria Beta",
  slug: { _type: "slug", current: "development" },
  description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
};

/* ────────────────────────────────────────────────── */
/*  Test Guide                                        */
/* ────────────────────────────────────────────────── */
const testGuide = {
  _id: "guide-getting-started",
  _type: "guide",
  title: "Lorem Ipsum \u2014 Dolor Sit Amet",
  slug: { _type: "slug", current: "getting-started" },
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
  difficulty: "beginner",
  order: 1,
  publishedAt: new Date().toISOString(),
  category: { _type: "reference", _ref: "cat-tutorials" },
  body: [
    heading("Lorem Ipsum Dolor"),
    block([
      span("Lorem ipsum "),
      span("dolor sit amet", ["em"]),
      span(
        ", consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ",
      ),
      span("exercitation", ["strong"]),
      span("."),
    ]),

    heading("Consectetur Adipiscing"),
    bullet("Lorem ipsum dolor sit amet"),
    bullet("Consectetur adipiscing elit"),
    bullet("Sed do eiusmod tempor incididunt"),
    bullet("Ut labore et dolore magna aliqua"),

    callout(
      "tip",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    ),

    heading("Dolor Sit Amet"),
    block([
      span("Ut enim ad minim veniam, "),
      span("quis nostrud", ["strong"]),
      span(" exercitation ullamco laboris:"),
    ]),
    numbered("Lorem ipsum dolor sit amet consectetur", 1),
    numbered("Ut enim ad minim veniam quis nostrud", 2),
    numbered(
      "Duis aute irure dolor in reprehenderit",
      3,
    ),

    heading("Eiusmod Tempor", "h3"),
    block([
      span(
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ),
    ]),

    codeBlock(
      `// Lorem ipsum\ngit clone https://example.com/lorem.git\ncd lorem\ncp .env.example .env.local\nnpm install && npm run dev`,
      "bash",
      "setup.sh",
    ),

    heading("Sed Do Eiusmod", "h3"),
    block([
      span("Curabitur pretium tincidunt "),
      span("lacus", ["code"]),
      span(". Nulla gravida orci a odio. Nullam varius "),
      span("turpis", ["code"]),
      span(
        " et commodo pharetra, est eros bibendum elit.",
      ),
    ]),

    callout(
      "warning",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    ),

    heading("Magna Aliqua"),
    block([
      span("Pellentesque habitant morbi tristique "),
      span("senectus et netus", ["strong"]),
      span(" et malesuada fames:"),
    ]),
    bullet("Lorem ipsum dolor sit amet consectetur"),
    bullet("Ut enim ad minim veniam quis nostrud"),
    bullet("Duis aute irure dolor in reprehenderit"),
    bullet("Excepteur sint occaecat cupidatat non proident"),

    callout(
      "info",
      "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius turpis.",
    ),

    heading("Veniam Quis Nostrud"),
    block([
      span("Aenean ultricies mi vitae est. Mauris placerat "),
      span("eleifend leo", ["strong"]),
      span(". Quisque sit amet est et sapien:"),
    ]),
    bullet("Lorem ipsum dolor sit amet consectetur"),
    bullet("Pellentesque habitant morbi tristique"),
    bullet("Vestibulum tortor quam feugiat vitae"),
    bullet("Donec eu libero sit amet quam egestas"),

    block([
      span("Lorem ipsum dolor sit amet — "),
      span("consectetur adipiscing elit, sed do eiusmod tempor incididunt.", [
        "em",
      ]),
    ]),
  ],
};

/* ────────────────────────────────────────────────── */
/*  Test Page (generic CMS page)                      */
/* ────────────────────────────────────────────────── */
const testPage = {
  _id: "page-about",
  _type: "page",
  title: "Lorem Ipsum",
  slug: { _type: "slug", current: "about" },
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
  body: [
    heading("Lorem Ipsum Dolor?"),
    block([
      span("Lorem ipsum "),
      span("dolor sit amet, consectetur adipiscing", ["strong"]),
      span(
        " elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      ),
    ]),

    heading("Ut Enim Ad Minim"),
    block([
      span(
        "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      ),
    ]),

    heading("Dolor Sit Amet"),
    bullet("Lorem ipsum dolor sit amet consectetur"),
    bullet("Ut enim ad minim veniam quis nostrud"),
    bullet("Duis aute irure dolor in reprehenderit"),
    bullet("Excepteur sint occaecat cupidatat non proident"),
    bullet("Curabitur pretium tincidunt lacus nulla gravida"),

    callout(
      "tip",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    ),

    heading("Consectetur Adipiscing"),
    block([
      span(
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, ",
      ),
      span("feugiat vitae", ["strong"]),
      span(" ultricies eget, tempor sit amet, ante."),
    ]),

    heading("Sed Do Eiusmod"),
    block([
      span(
        "Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.",
      ),
    ]),
    bullet("Lorem ipsum dolor sit amet consectetur"),
    bullet("Pellentesque habitant morbi tristique"),
    bullet("Vestibulum tortor quam feugiat vitae"),

    block([span("Lorem ipsum dolor sit amet. 🚀")]),
  ],
};

/* ────────────────────────────────────────────────── */
/*  News Post                                         */
/* ────────────────────────────────────────────────── */
const newsPost: Record<string, any> = {
  _id: "post-tekton-v1-launch",
  _type: "post",
  title: "Lorem Ipsum Dolor — Sit Amet Consectetur",
  slug: { _type: "slug", current: "tekton-v1-launch" },
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  publishedAt: new Date().toISOString(),
  featured: true,
  categories: [{ _type: "reference", _ref: "cat-tutorials" }],
  body: [
    heading("Lorem Ipsum 🎉"),
    block([
      span(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      ),
      span("Ut enim ad minim", ["strong"]),
      span(" veniam, quis nostrud exercitation."),
    ]),

    heading("Dolor Sit Amet?"),
    block([
      span("Duis aute irure dolor in "),
      span("reprehenderit in voluptate", ["strong"]),
      span(
        " velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      ),
    ]),

    heading("Consectetur Adipiscing"),
    bullet("Lorem ipsum dolor sit amet consectetur"),
    bullet("Ut enim ad minim veniam quis nostrud"),
    bullet("Duis aute irure dolor in reprehenderit"),
    bullet("Excepteur sint occaecat cupidatat non proident"),
    bullet("Curabitur pretium tincidunt lacus nulla gravida"),
    bullet("Pellentesque habitant morbi tristique senectus"),

    callout(
      "info",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    ),

    heading("Sed Do Eiusmod?"),
    block([span("Curabitur pretium tincidunt lacus:")]),
    bullet("Lorem ipsum dolor sit amet consectetur"),
    bullet("Pellentesque habitant morbi tristique"),
    bullet("Vestibulum tortor quam feugiat vitae"),
    bullet("Aenean ultricies mi vitae est mauris"),

    callout(
      "tip",
      "Lorem ipsum dolor sit amet! Consectetur adipiscing elit sed do eiusmod tempor.",
    ),

    heading("Magna Aliqua"),
    block([
      span("Nullam varius, turpis et commodo pharetra, "),
      span("est eros bibendum", ["em"]),
      span(
        " elit. Nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.",
      ),
    ]),

    block([span("Lorem ipsum dolor sit amet! 🚀")]),
  ],
};

/* ────────────────────────────────────────────────── */
/*  Push everything                                   */
/* ────────────────────────────────────────────────── */
async function seed() {
  /* ── Upload placeholder images ── */
  console.log("📤 Uploading images...");
  const [heroImg, hudImg, claimImg, aboutImg, featuresImg, newsImg] =
    await Promise.all([
      uploadImageFromUrl(
        "https://picsum.photos/seed/tekton-hero/1200/675",
        "tekton-hero.jpg",
      ),
      uploadImageFromUrl(
        "https://picsum.photos/seed/tekton-dashboard/1200/675",
        "tekton-dashboard.jpg",
      ),
      uploadImageFromUrl(
        "https://picsum.photos/seed/tekton-studio/1200/675",
        "tekton-studio.jpg",
      ),
      uploadImageFromUrl(
        "https://picsum.photos/seed/about-hero/1200/675",
        "about-hero.jpg",
      ),
      uploadImageFromUrl(
        "https://picsum.photos/seed/features/1200/675",
        "features-dashboard.jpg",
      ),
      uploadImageFromUrl(
        "https://picsum.photos/seed/news-launch/1200/675",
        "news-launch.jpg",
      ),
    ]);

  /* ── Set news post cover image ── */
  newsPost.coverImage = {
    _type: "image",
    asset: { _type: "reference", _ref: newsImg },
  };

  /* ── Inject images into guide body ── */
  // After "Welcome, Developer" heading (index 0–1) → insert hero image at index 2
  testGuide.body.splice(
    2,
    0,
    imageBlock(
      heroImg,
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
    ),
  );
  // After "Project Structure" heading + paragraph → insert screenshot
  const structureHeadingIdx = testGuide.body.findIndex(
    (b: any) => b.style === "h2" && b.children?.[0]?.text === "Project Structure",
  );
  if (structureHeadingIdx !== -1) {
    testGuide.body.splice(
      structureHeadingIdx + 2,
      0,
      imageBlock(
        hudImg,
        "Sed do eiusmod tempor incididunt",
        "Ut labore et dolore magna aliqua",
      ),
    );
  }
  // After "Understanding Components" heading + paragraph → insert component image
  const componentHeadingIdx = testGuide.body.findIndex(
    (b: any) =>
      b.style === "h3" && b.children?.[0]?.text === "Understanding Components",
  );
  if (componentHeadingIdx !== -1) {
    testGuide.body.splice(
      componentHeadingIdx + 2,
      0,
      imageBlock(
        claimImg,
        "Ut enim ad minim veniam",
        "Quis nostrud exercitation",
      ),
    );
  }

  /* ── Inject images into about page body ── */
  // After first paragraph → insert hero image
  testPage.body.splice(
    2,
    0,
    imageBlock(
      aboutImg,
      "Duis aute irure dolor",
      "In reprehenderit in voluptate",
    ),
  );
  // After "Features" heading + bullets → insert features screenshot
  const featuresHeadingIdx = testPage.body.findIndex(
    (b: any) => b.style === "h2" && b.children?.[0]?.text === "Features",
  );
  if (featuresHeadingIdx !== -1) {
    // Skip the heading + 5 bullets + callout = insert after index+7
    testPage.body.splice(
      featuresHeadingIdx + 7,
      0,
      imageBlock(
        featuresImg,
        "Excepteur sint occaecat cupidatat",
        "Non proident sunt in culpa",
      ),
    );
  }

  /* ── Push documents ── */
  const tx = client.transaction();

  tx.createOrReplace(tutorialsCategory);
  tx.createOrReplace(developmentCategory);
  tx.createOrReplace(testGuide);
  tx.createOrReplace(testPage);
  tx.createOrReplace(newsPost);

  const result = await tx.commit();
  console.log("✅ Seeded test content — transaction:", result.transactionId);
  console.log("   📄 Page:  /about");
  console.log("   📘 Guide: /guides/getting-started");
  console.log("   📰 News:  /news/tekton-v1-launch");
  console.log("   🏷️  Categories: Tutorials, Development");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
