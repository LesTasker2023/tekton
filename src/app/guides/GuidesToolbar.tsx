"use client";

import { SearchInput, Select } from "@/components/ui";
import type { SortOption } from "./guides.types";
import styles from "./page.module.scss";

interface GuidesToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (v: string) => void;
  allCategories: string[];
  difficultyFilter: string;
  onDifficultyFilterChange: (v: string) => void;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
}

export function GuidesToolbar({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  allCategories,
  difficultyFilter,
  onDifficultyFilterChange,
  sort,
  onSortChange,
}: GuidesToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchWrap}>
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search guides..."
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
          value={difficultyFilter}
          onChange={onDifficultyFilterChange}
          options={[
            { label: "All Levels", value: "all" },
            { label: "Beginner", value: "beginner" },
            { label: "Intermediate", value: "intermediate" },
            { label: "Advanced", value: "advanced" },
          ]}
        />
        <Select
          value={sort}
          onChange={(v) => onSortChange(v as SortOption)}
          options={[
            { label: "Default Order", value: "default" },
            { label: "Newest First", value: "newest" },
            { label: "Oldest First", value: "oldest" },
            { label: "A → Z", value: "az" },
            { label: "Z → A", value: "za" },
          ]}
        />
      </div>
    </div>
  );
}
