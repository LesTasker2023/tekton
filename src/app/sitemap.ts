import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import {
  ARTICLE_SLUGS_QUERY,
  PAGE_SLUGS_QUERY,
  EVENT_SLUGS_QUERY,
} from "@/sanity/queries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* ── Static routes ── */
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/news`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/guides`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/events`, changeFrequency: "weekly", priority: 0.7 },
  ];

  /* ── Dynamic CMS routes ── */
  let articleSlugs: string[] = [];
  let pageSlugs: string[] = [];
  let eventSlugs: string[] = [];

  try {
    [articleSlugs, pageSlugs, eventSlugs] = await Promise.all([
      client.fetch(ARTICLE_SLUGS_QUERY),
      client.fetch(PAGE_SLUGS_QUERY),
      client.fetch(EVENT_SLUGS_QUERY),
    ]);
  } catch {
    // Sanity not configured — return static routes only
  }

  // Articles serve both /news/ and /guides/ routes.
  // For simplicity, list them under /news/. Category-based routing
  // can be refined once the CMS has category data populated.
  const articleRoutes: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${SITE_URL}/news/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const pageRoutes: MetadataRoute.Sitemap = pageSlugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const eventRoutes: MetadataRoute.Sitemap = eventSlugs.map((slug) => ({
    url: `${SITE_URL}/events/${slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...eventRoutes, ...pageRoutes];
}
