"use client";

import styles from "./page.module.scss";

interface EventsFilterChipProps {
  search: string;
  typeFilter: string;
  selectedDate: Date | null;
  filteredCount: number;
  onClear: () => void;
}

export function EventsFilterChip({
  search,
  typeFilter,
  selectedDate,
  filteredCount,
  onClear,
}: EventsFilterChipProps) {
  if (!search && typeFilter === "all" && !selectedDate) return null;

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
        {selectedDate && (
          <>
            {" "}
            on{" "}
            <strong>
              {selectedDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
            </strong>
          </>
        )}
      </span>
      <button className={styles.clearBtn} onClick={onClear}>
        Clear filters
      </button>
    </div>
  );
}
