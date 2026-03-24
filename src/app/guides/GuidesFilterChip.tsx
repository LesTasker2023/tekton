"use client";

import styles from "./page.module.scss";

interface GuidesFilterChipProps {
  search: string;
  categoryFilter: string;
  difficultyFilter: string;
  filteredCount: number;
  onClear: () => void;
}

export function GuidesFilterChip({
  search,
  categoryFilter,
  difficultyFilter,
  filteredCount,
  onClear,
}: GuidesFilterChipProps) {
  if (!search && categoryFilter === "all" && difficultyFilter === "all")
    return null;

  return (
    <div className={styles.activeFilters}>
      <span className={styles.resultCount}>
        {filteredCount} result{filteredCount !== 1 ? "s" : ""}
        {search && (
          <>
            {" "}
            for &ldquo;<strong>{search}</strong>&rdquo;
          </>
        )}
      </span>
      <button className={styles.clearBtn} onClick={onClear}>
        Clear filters
      </button>
    </div>
  );
}
