/* ── Shared types & helpers for news ── */

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  featured?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  author?: { name: string; avatar?: any };
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
