/* ── Shared types & helpers for guides ── */

export interface Guide {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  difficulty?: string;
  order?: number;
  publishedAt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage?: any;
  category?: { title: string; slug: { current: string } };
}

export type SortOption = "default" | "newest" | "oldest" | "az" | "za";

export const DIFF_META: Record<string, { label: string; variant: string }> = {
  beginner: { label: "Beginner", variant: "success" },
  intermediate: { label: "Intermediate", variant: "warning" },
  advanced: { label: "Advanced", variant: "danger" },
};
