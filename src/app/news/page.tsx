import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { ARTICLES_BY_CATEGORY_QUERY, ARTICLES_QUERY } from "@/sanity/queries";
import NewsHub from "./NewsHub";

export const metadata: Metadata = {
  title: "News — Tekton",
  description: "Latest news, updates, and announcements.",
};

export default async function NewsPage() {
  let posts = [];
  try {
    // Try fetching news-category articles; fall back to all articles
    posts =
      (await client.fetch(
        ARTICLES_BY_CATEGORY_QUERY,
        { category: "news" },
        { next: { revalidate: 60 } },
      )) ?? [];
    if (!posts.length) {
      posts =
        (await client.fetch(ARTICLES_QUERY, {}, { next: { revalidate: 60 } })) ??
        [];
    }
  } catch {
    /* Sanity not configured yet */
  }

  return <NewsHub posts={posts} />;
}
