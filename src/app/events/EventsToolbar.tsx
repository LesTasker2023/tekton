"use client";

import { SearchInput, Select } from "@/components/ui";
import { type TimeFilter, type ViewMode, EVENT_TYPE_META } from "./events.types";
import styles from "./page.module.scss";

interface EventsToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  timeFilter: TimeFilter;
  onTimeFilterChange: (v: TimeFilter) => void;
  typeFilter: string;
  onTypeFilterChange: (v: string) => void;
  allTypes: string[];
  viewMode: ViewMode;
  onViewModeChange: (v: ViewMode) => void;
  onClearSelectedDate: () => void;
}

export function EventsToolbar({
  search,
  onSearchChange,
  timeFilter,
  onTimeFilterChange,
  typeFilter,
  onTypeFilterChange,
  allTypes,
  viewMode,
  onViewModeChange,
  onClearSelectedDate,
}: EventsToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchWrap}>
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search events..."
        />
      </div>
      <div className={styles.filters}>
        <Select
          value={timeFilter}
          onChange={(v) => onTimeFilterChange(v as TimeFilter)}
          options={[
            { label: "Upcoming", value: "upcoming" },
            { label: "Past Events", value: "past" },
            { label: "All Events", value: "all" },
          ]}
        />
        <Select
          value={typeFilter}
          onChange={onTypeFilterChange}
          options={[
            { label: "All Types", value: "all" },
            ...allTypes.map((t) => ({
              label: EVENT_TYPE_META[t]?.label ?? t,
              value: t,
            })),
          ]}
        />
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewBtn} ${viewMode === "list" ? styles.viewBtnActive : ""}`}
            onClick={() => {
              onViewModeChange("list");
              onClearSelectedDate();
            }}
            aria-label="List view"
          >
            LIST
          </button>
          <button
            className={`${styles.viewBtn} ${viewMode === "calendar" ? styles.viewBtnActive : ""}`}
            onClick={() => onViewModeChange("calendar")}
            aria-label="Calendar view"
          >
            CAL
          </button>
        </div>
      </div>
    </div>
  );
}
