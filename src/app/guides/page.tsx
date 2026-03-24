import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { ARTICLES_BY_CATEGORY_QUERY, ARTICLES_QUERY } from "@/sanity/queries";
import GuidesHub from "./GuidesHub";

export const metadata: Metadata = {
  title: "Guides — Tekton",
  description: "Tutorials, walkthroughs, and how-to guides.",
};

export default async function GuidesPage() {
  let guides = [];
  try {
    // Try fetching guide-category articles; fall back to all articles
    guides =
      (await client.fetch(
        ARTICLES_BY_CATEGORY_QUERY,
        { category: "guides" },
        { next: { revalidate: 60 } },
      )) ?? [];
    if (!guides.length) {
      guides =
        (await client.fetch(ARTICLES_QUERY, {}, { next: { revalidate: 60 } })) ??
        [];
    }
  } catch {
    /* Sanity not configured yet */
  }

  return <GuidesHub guides={guides} />;
}
