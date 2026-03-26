import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { ITEMS_QUERY, ITEM_CATEGORIES_QUERY } from "@/sanity/queries";
import CatalogHub from "./CatalogHub";

export const metadata: Metadata = {
  title: "Catalog — Tekton",
  description: "Browse templates, plugins, and services.",
};

export default async function CatalogPage() {
  let items = [];
  let categories = [];
  try {
    [items, categories] = await Promise.all([
      client.fetch(ITEMS_QUERY, {}, { next: { revalidate: 60 } }) ?? [],
      client.fetch(ITEM_CATEGORIES_QUERY, {}, { next: { revalidate: 60 } }) ??
        [],
    ]);
  } catch {
    /* Sanity not configured */
  }
  return <CatalogHub items={items ?? []} categories={categories ?? []} />;
}
