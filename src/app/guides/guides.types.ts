/* ── Shared types & helpers for guides ── */

import type { SanityImageObject } from "@/types/sanity";

export interface Guide {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  difficulty?: string;
  order?: number;
  publishedAt?: string;
  coverImage?: SanityImageObject;
  category?: { title: string; slug: { current: string } };
}

export type SortOption = "default" | "newest" | "oldest" | "az" | "za";

export const DIFF_META: Record<string, { label: string; variant: string }> = {
  beginner: { label: "Beginner", variant: "success" },
  intermediate: { label: "Intermediate", variant: "warning" },
  advanced: { label: "Advanced", variant: "danger" },
};
