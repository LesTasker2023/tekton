"use client";

import styles from "./page.module.scss";

interface NewsFilterChipProps {
  search: string;
  categoryFilter: string;
  filteredCount: number;
  onClear: () => void;
}

export function NewsFilterChip({
  search,
  categoryFilter,
  filteredCount,
  onClear,
}: NewsFilterChipProps) {
  if (!search && categoryFilter === "all") return null;

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
