"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePlaceholderImage } from "@/context/PlaceholderImageContext";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { BookOpen } from "lucide-react";
import { type Guide, type SortOption } from "./guides.types";
import { GuideCard } from "./GuideCard";
import { GuidesToolbar } from "./GuidesToolbar";
import { GuidesFilterChip } from "./GuidesFilterChip";
import styles from "./page.module.scss";

/* ═══════════════════════════════════════════════════════════════════════════
   GuidesHub — client-side filterable / sortable guide listing
   ═══════════════════════════════════════════════════════════════════════════ */
export default function GuidesHub({ guides }: { guides: Guide[] }) {
  const placeholder = usePlaceholderImage();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sort, setSort] = useState<SortOption>("default");

  /* ── Derive unique categories ── */
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    guides.forEach((g) => {
      if (g.category?.title) cats.add(g.category.title);
    });
    return Array.from(cats).sort();
  }, [guides]);

  /* ── Filter & sort ── */
  const filtered = useMemo(() => {
    let result = [...guides];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.excerpt?.toLowerCase().includes(q) ||
          g.category?.title.toLowerCase().includes(q) ||
          g.difficulty?.toLowerCase().includes(q),
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((g) => g.category?.title === categoryFilter);
    }

    if (difficultyFilter !== "all") {
      result = result.filter((g) => g.difficulty === difficultyFilter);
    }

    result.sort((a, b) => {
      switch (sort) {
        case "newest": {
          const dA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dB - dA;
        }
        case "oldest": {
          const dA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dA - dB;
        }
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        default:
          return (a.order ?? 0) - (b.order ?? 0);
      }
    });

    return result;
  }, [guides, search, categoryFilter, difficultyFilter, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setDifficultyFilter("all");
  };

  /* ── Empty CMS state ── */
  if (!guides.length) {
    return (
      <div className={styles.empty}>
        <BookOpen size={48} className={styles.emptyIcon} />
        <h1 className={styles.emptyTitle}>No Guides Yet</h1>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Guides</h1>
        <p className={styles.subtitle}>
          {guides.length} guide{guides.length !== 1 ? "s" : ""} — tutorials,
          walkthroughs, and tips
        </p>
      </header>

      <GuidesToolbar
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        allCategories={allCategories}
        difficultyFilter={difficultyFilter}
        onDifficultyFilterChange={setDifficultyFilter}
        sort={sort}
        onSortChange={setSort}
      />

      <GuidesFilterChip
        search={search}
        categoryFilter={categoryFilter}
        difficultyFilter={difficultyFilter}
        filteredCount={filtered.length}
        onClear={clearFilters}
      />

      {filtered.length > 0 ? (
        <motion.div
          key={`${categoryFilter}-${difficultyFilter}-${sort}-${search}`}
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {filtered.map((guide) => (
            <motion.div key={guide._id} variants={fadeUp}>
              <GuideCard guide={guide} placeholder={placeholder} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className={styles.noResults}>
          <BookOpen size={36} className={styles.emptyIcon} />
          <p>No guides match your filters.</p>
          <button className={styles.clearBtn} onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
