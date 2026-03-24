#!/usr/bin/env node

/**
 * Seed the Homepage singleton with example sections showcasing every section type.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<your-token> node scripts/seed-homepage.mjs
 *
 * Generate a write token at: sanity.io/manage → your project → API → Tokens → Add token (Editor)
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing env vars. Run with:\n  SANITY_WRITE_TOKEN=<token> node scripts/seed-homepage.mjs",
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

const homepage = {
  _id: "homepage",
  _type: "homepage",
  title: "Homepage",
  seo: {
    _type: "seoFields",
    title: "Tekton — Build Something Great",
    description:
      "A modern agency starter kit. Customize everything from one CMS.",
  },
  sections: [
    // 1. Hero Banner
    {
      _type: "heroSection",
      _key: "hero-banner-1",
      heading: "Build Something *Great*",
      subheading:
        "A modern, configurable starter kit for agencies. Launch client sites in hours, not weeks.",
      cta: {
        label: "Get Started",
        href: "/guides",
      },
      align: "center",
    },

    // 2. Stats Row
    {
      _type: "statsRowSection",
      _key: "stats-row-1",
      heading: "By the Numbers",
      accent: true,
      stats: [
        {
          _key: "stat-1",
          label: "Sites Launched",
          value: "120+",
          trendDirection: "up",
          trendValue: "24%",
          subtitle: "this quarter",
        },
        {
          _key: "stat-2",
          label: "Avg. Build Time",
          value: "4 hrs",
          trendDirection: "down",
          trendValue: "60%",
          subtitle: "from 10 hrs",
        },
        {
          _key: "stat-3",
          label: "Client Satisfaction",
          value: "99.2%",
          trendDirection: "up",
          trendValue: "3%",
          subtitle: "NPS score",
        },
        {
          _key: "stat-4",
          label: "Components",
          value: "30+",
          trendDirection: "none",
          subtitle: "and growing",
        },
      ],
    },

    // 3. Feature Grid
    {
      _type: "featureGridSection",
      _key: "feature-grid-1",
      heading: "Everything You Need",
      subheading:
        "A complete toolkit for building modern websites. Every component is customizable through the CMS.",
      columns: 3,
      features: [
        {
          _key: "feat-1",
          title: "Page Builder",
          description:
            "Drag-and-drop sections to compose any page. No code changes needed for new layouts.",
          icon: "layout",
        },
        {
          _key: "feat-2",
          title: "Skin System",
          description:
            "Switch between visual themes with a single setting. Vanilla, HUD, Corporate — or build your own.",
          icon: "paintbrush",
        },
        {
          _key: "feat-3",
          title: "CMS-Powered",
          description:
            "Every piece of content managed through Sanity Studio. Real-time preview, collaborative editing.",
          icon: "database",
        },
        {
          _key: "feat-4",
          title: "Performance First",
          description:
            "Server-rendered, optimized images, code splitting. Sub-2.5s LCP out of the box.",
          icon: "zap",
        },
        {
          _key: "feat-5",
          title: "Fully Accessible",
          description:
            "WCAG 2.1 AA compliant components. Semantic HTML, keyboard navigation, screen reader tested.",
          icon: "eye",
        },
        {
          _key: "feat-6",
          title: "Analytics Ready",
          description:
            "GA4 integration with event tracking. Know exactly how visitors interact with every page.",
          icon: "bar-chart-2",
        },
      ],
    },

    // 4. Rich Text
    {
      _type: "richTextSection",
      _key: "rich-text-1",
      heading: "Our Approach",
      maxWidth: "narrow",
      body: [
        {
          _type: "block",
          _key: "rt-block-1",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "rt-span-1",
              text: "We believe great websites start with great foundations. Tekton gives you a production-ready base — fully typed, tested, and documented — so you can focus on what makes each project unique.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "rt-block-2",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "rt-span-2",
              text: "Every component follows BEM naming conventions, uses SCSS modules for styling, and ships with Storybook stories and unit tests. The modular CMS schema means you only include what each client needs.",
              marks: [],
            },
          ],
        },
      ],
    },

    // 5. CTA Section (default variant)
    {
      _type: "ctaSection",
      _key: "cta-section-1",
      heading: "Ready to Ship?",
      body: "Spin up a new client project in under an hour. Configure the skin, enable the CMS modules you need, and deploy.",
      primaryAction: {
        label: "View the Docs",
        href: "/guides",
      },
      secondaryAction: {
        label: "Browse Components",
        href: "/storybook",
      },
      variant: "default",
    },

    // 6. Page Hero (Compact) — showing it as a mid-page section divider
    {
      _type: "pageHeroSection",
      _key: "page-hero-1",
      heading: "Explore the Toolkit",
      subheading:
        "Browse articles, guides, and events to get the most out of Tekton.",
      breadcrumb: "// RESOURCES",
      align: "center",
    },

    // 7. Image Gallery
    {
      _type: "imageGallerySection",
      _key: "image-gallery-1",
      heading: "Gallery Showcase",
      layout: "grid",
      columns: 3,
      images: [
        {
          _key: "img-1",
          alt: "Dashboard design example",
          caption: "Modern dashboard layout",
        },
        {
          _key: "img-2",
          alt: "Mobile responsive view",
          caption: "Fully responsive on all devices",
        },
        {
          _key: "img-3",
          alt: "Dark mode interface",
          caption: "Beautiful in dark mode",
        },
      ],
    },

    // 8. CTA Section (accent variant)
    {
      _type: "ctaSection",
      _key: "cta-section-2",
      heading: "Let's Build Together",
      body: "Have a project in mind? Get in touch and we'll help you launch something great.",
      primaryAction: {
        label: "Contact Us",
        href: "/contact",
      },
      variant: "accent",
    },
  ],
};

async function seed() {
  console.log(`Seeding homepage to ${projectId}/${dataset}...`);
  const result = await client.createOrReplace(homepage);
  console.log(`Done! Document ID: ${result._id}`);
  console.log("Open Sanity Studio → Homepage to edit.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
