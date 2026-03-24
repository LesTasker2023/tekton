"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePlaceholderImage } from "@/context/PlaceholderImageContext";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { Newspaper } from "lucide-react";
import { type Post, type SortOption } from "./news.types";
import { NewsCard } from "./NewsCard";
import { FeaturedNewsCard } from "./FeaturedNewsCard";
import { NewsToolbar } from "./NewsToolbar";
import { NewsFilterChip } from "./NewsFilterChip";
import styles from "./page.module.scss";

/* ═══════════════════════════════════════════════════════════════════════════
   NewsHub — client-side filterable / sortable news listing
   ═══════════════════════════════════════════════════════════════════════════ */
export default function NewsHub({ posts }: { posts: Post[] }) {
  const placeholder = usePlaceholderImage();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sort, setSort] = useState<SortOption>("newest");

  /* ── Derive unique categories ── */
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((p) => p.categories?.forEach((c) => cats.add(c.title)));
    return Array.from(cats).sort();
  }, [posts]);

  /* ── Filter & sort ── */
  const filtered = useMemo(() => {
    let result = [...posts];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.author?.name.toLowerCase().includes(q) ||
          p.categories?.some((c) => c.title.toLowerCase().includes(q)),
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((p) =>
        p.categories?.some((c) => c.title === categoryFilter),
      );
    }

    result.sort((a, b) => {
      if (sort === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
      }
      const dA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return sort === "oldest" ? dA - dB : dB - dA;
    });

    return result;
  }, [posts, search, categoryFilter, sort]);

  const featuredPost =
    !search && categoryFilter === "all" && sort === "newest"
      ? filtered.find((p) => p.featured)
      : null;

  const regularPosts = featuredPost
    ? filtered.filter((p) => p._id !== featuredPost._id)
    : filtered;

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("all");
  };

  /* ── Empty CMS state ── */
  if (!posts.length) {
    return (
      <div className={styles.empty}>
        <Newspaper size={48} className={styles.emptyIcon} />
        <h1 className={styles.emptyTitle}>No Posts Yet</h1>
        <p className={styles.emptyText}>
          Create your first news post in the Sanity Studio.
        </p>
        <Link href="/studio" className={styles.studioLink}>
          Open Studio →
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>News</h1>
        <p className={styles.subtitle}>
          {posts.length} post{posts.length !== 1 ? "s" : ""} — latest updates
          and announcements
        </p>
      </header>

      <NewsToolbar
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        allCategories={allCategories}
        sort={sort}
        onSortChange={setSort}
      />

      <NewsFilterChip
        search={search}
        categoryFilter={categoryFilter}
        filteredCount={filtered.length}
        onClear={clearFilters}
      />

      {featuredPost && (
        <FeaturedNewsCard post={featuredPost} placeholder={placeholder} />
      )}

      {regularPosts.length > 0 ? (
        <motion.div
          key={`${categoryFilter}-${sort}-${search}`}
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {regularPosts.map((post) => (
            <motion.div key={post._id} variants={fadeUp}>
              <NewsCard post={post} placeholder={placeholder} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className={styles.noResults}>
          <Newspaper size={36} className={styles.emptyIcon} />
          <p>No posts match your filters.</p>
          <button className={styles.clearBtn} onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
