/* ── Shared types & helpers for news ── */

import type { SanityImageObject } from "@/types/sanity";

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  featured?: boolean;
  coverImage?: SanityImageObject;
  author?: { name: string; avatar?: SanityImageObject };
  categories?: { title: string; slug: { current: string } }[];
}

export type SortOption = "newest" | "oldest" | "featured";

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
