/* ═══════════════════════════════════════════════════════════════════════════
   seed-events.ts — Seeds sample events for the Events page
   Run: npx tsx scripts/seed-events.ts
   ═══════════════════════════════════════════════════════════════════════════ */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "u2kuytve",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

/* ── Sample events ── */
const events = [
  {
    _type: "event" as const,
    _id: "event-sample-alpha",
    title: "Lorem Ipsum Event Alpha",
    slug: { _type: "slug" as const, current: "sample-event-alpha" },
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    startDate: "2026-02-21T19:00:00Z",
    endDate: "2026-02-21T22:00:00Z",
    location: "Lorem Ipsum",
    eventType: "meeting",
    featured: true,
  },
  {
    _type: "event" as const,
    _id: "event-sample-beta",
    title: "Dolor Sit Amet Workshop",
    slug: { _type: "slug" as const, current: "sample-event-beta" },
    excerpt:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    startDate: "2026-03-08T18:00:00Z",
    endDate: "2026-03-08T23:00:00Z",
    location: "Lorem Ipsum",
    eventType: "workshop",
    featured: false,
  },
  {
    _type: "event" as const,
    _id: "event-sample-gamma",
    title: "Consectetur Adipiscing Meetup",
    slug: { _type: "slug" as const, current: "sample-event-gamma" },
    excerpt:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    startDate: "2026-02-28T20:00:00Z",
    endDate: "2026-02-28T22:00:00Z",
    location: "Lorem Ipsum",
    eventType: "community",
    featured: false,
  },
  {
    _type: "event" as const,
    _id: "event-sample-delta",
    title: "Tempor Incididunt Hackathon",
    slug: { _type: "slug" as const, current: "sample-event-delta" },
    excerpt:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    startDate: "2026-03-15T17:00:00Z",
    endDate: "2026-03-15T21:00:00Z",
    location: "Lorem Ipsum",
    eventType: "hackathon",
    featured: true,
  },
  {
    _type: "event" as const,
    _id: "event-sample-epsilon",
    title: "Magna Aliqua Showcase",
    slug: { _type: "slug" as const, current: "sample-event-epsilon" },
    excerpt:
      "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.",
    startDate: "2026-03-22T12:00:00Z",
    endDate: "2026-03-24T20:00:00Z",
    location: "Lorem Ipsum",
    eventType: "showcase",
    featured: false,
  },
  {
    _type: "event" as const,
    _id: "event-sample-zeta",
    title: "Vestibulum Tortor Celebration",
    slug: { _type: "slug" as const, current: "sample-event-zeta" },
    excerpt:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    startDate: "2026-04-05T16:00:00Z",
    endDate: "2026-04-06T22:00:00Z",
    location: "Lorem Ipsum",
    eventType: "special",
    featured: true,
  },
];

async function seed() {
  console.log("🗓️  Seeding events…");

  for (const event of events) {
    const result = await client.createOrReplace(event);
    console.log(`  ✓ ${result._id} — ${event.title}`);
  }

  console.log(`\n✅ Done — ${events.length} events seeded.`);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
