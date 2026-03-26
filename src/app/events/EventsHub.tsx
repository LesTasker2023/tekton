"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePlaceholderImage } from "@/context/PlaceholderImageContext";
import { EventCalendar } from "@/components/ui/EventCalendar";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { CalendarDays } from "lucide-react";
import {
  type GameEvent,
  type ViewMode,
  type TimeFilter,
  getEventStatus,
} from "./events.types";
import { EventCard } from "./EventCard";
import { EventsToolbar } from "./EventsToolbar";
import { EventsFilterChip } from "./EventsFilterChip";
import styles from "./page.module.scss";

/* ═══════════════════════════════════════════════════════════════════════════
   EventsHub — client-side filterable event listing with calendar view
   ═══════════════════════════════════════════════════════════════════════════ */
export default function EventsHub({ events }: { events: GameEvent[] }) {
  const placeholder = usePlaceholderImage();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("upcoming");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  /* ── Derive unique event types ── */
  const allTypes = useMemo(() => {
    const types = new Set<string>();
    events.forEach((e) => {
      if (e.eventType) types.add(e.eventType);
    });
    return Array.from(types).sort();
  }, [events]);

  /* ── Filter & sort ── */
  const filtered = useMemo(() => {
    let result = [...events];

    if (timeFilter !== "all") {
      result = result.filter((e) => {
        const status = getEventStatus(e.startDate, e.endDate);
        if (timeFilter === "upcoming")
          return status === "upcoming" || status === "live";
        return status === "past";
      });
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.excerpt?.toLowerCase().includes(q) ||
          e.location?.toLowerCase().includes(q),
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((e) => e.eventType === typeFilter);
    }

    if (selectedDate && viewMode === "calendar") {
      result = result.filter((e) => {
        const start = new Date(e.startDate);
        const end = e.endDate ? new Date(e.endDate) : undefined;
        const sd = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
        );
        const ss = new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
        );
        if (!end) return sd.getTime() === ss.getTime();
        const se = new Date(end.getFullYear(), end.getMonth(), end.getDate());
        return sd >= ss && sd <= se;
      });
    }

    result.sort((a, b) => {
      const aStatus = getEventStatus(a.startDate, a.endDate);
      const bStatus = getEventStatus(b.startDate, b.endDate);
      if (aStatus === "live" && bStatus !== "live") return -1;
      if (bStatus === "live" && aStatus !== "live") return 1;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

    return result;
  }, [events, search, typeFilter, timeFilter, selectedDate, viewMode]);

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setSelectedDate(null);
  };

  /* ── Empty CMS state ── */
  if (!events.length) {
    return (
      <div className={styles.empty}>
        <CalendarDays size={48} className={styles.emptyIcon} />
        <h1 className={styles.emptyTitle}>No Events Yet</h1>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Events</h1>
        <p className={styles.subtitle}>
          {events.length} event{events.length !== 1 ? "s" : ""} — in-game
          activities and community gatherings
        </p>
      </header>

      <EventsToolbar
        search={search}
        onSearchChange={setSearch}
        timeFilter={timeFilter}
        onTimeFilterChange={setTimeFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        allTypes={allTypes}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onClearSelectedDate={() => setSelectedDate(null)}
      />

      <EventsFilterChip
        search={search}
        typeFilter={typeFilter}
        selectedDate={selectedDate}
        filteredCount={filtered.length}
        onClear={clearFilters}
      />

      <div
        className={
          viewMode === "calendar" ? styles.calendarLayout : styles.listLayout
        }
      >
        {viewMode === "calendar" && (
          <aside className={styles.calendarSidebar}>
            <EventCalendar
              events={events}
              selectedDate={selectedDate}
              onSelectDate={(d) =>
                setSelectedDate((prev) =>
                  prev &&
                  prev.getFullYear() === d.getFullYear() &&
                  prev.getMonth() === d.getMonth() &&
                  prev.getDate() === d.getDate()
                    ? null
                    : d,
                )
              }
            />
          </aside>
        )}

        {filtered.length > 0 ? (
          <motion.div
            className={styles.grid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {filtered.map((event) => (
              <motion.div key={event._id} variants={fadeUp}>
                <EventCard event={event} placeholder={placeholder} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className={styles.noResults}>
            <CalendarDays size={36} className={styles.emptyIcon} />
            <p>No events match your filters.</p>
            <button className={styles.clearBtn} onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
