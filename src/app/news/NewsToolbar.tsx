"use client";

import { SearchInput, Select } from "@/components/ui";
import type { SortOption } from "./news.types";
import styles from "./page.module.scss";

interface NewsToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (v: string) => void;
  allCategories: string[];
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
}

export function NewsToolbar({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  allCategories,
  sort,
  onSortChange,
}: NewsToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchWrap}>
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search posts..."
        />
      </div>
      <div className={styles.filters}>
        <Select
          value={categoryFilter}
          onChange={onCategoryFilterChange}
          options={[
            { label: "All Categories", value: "all" },
            ...allCategories.map((c) => ({ label: c, value: c })),
          ]}
        />
        <Select
          value={sort}
          onChange={(v) => onSortChange(v as SortOption)}
          options={[
            { label: "Newest First", value: "newest" },
            { label: "Oldest First", value: "oldest" },
            { label: "Featured First", value: "featured" },
          ]}
        />
      </div>
    </div>
  );
}
