"use client";

import { useMemo, useState } from "react";
import styles from "./EventCalendar.module.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  MONTH_NAMES,
  DAY_LABELS,
  buildWeeks,
  buildEventsByDate,
} from "./calendarUtils";
import type { EventCalendarProps } from "./calendarUtils";
import { CalendarCell } from "./CalendarCell";

/* ═══════════════════════════════════════════════════════════════════════════
   EventCalendar — Interactive month calendar with event tracking
   ═══════════════════════════════════════════════════════════════════════════ */
export function EventCalendar({
  events,
  onSelectDate,
  selectedDate,
}: EventCalendarProps) {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const weeks = useMemo(() => buildWeeks(year, month), [year, month]);

  const eventsByDate = useMemo(
    () => buildEventsByDate(events, year, month),
    [events, year, month],
  );

  const monthEventCount = events.filter(
    (e) =>
      new Date(e.startDate).getMonth() === month &&
      new Date(e.startDate).getFullYear() === year,
  ).length;

  return (
    <div className={styles.calendar} data-component="event-calendar">
      {/* Header */}
      <div className={styles.header}>
        <button
          className={styles.navBtn}
          onClick={prevMonth}
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <div className={styles.monthLabel}>
          <span className={styles.monthName}>{MONTH_NAMES[month]}</span>
          <span className={styles.yearLabel}>{year}</span>
        </div>
        <button
          className={styles.navBtn}
          onClick={nextMonth}
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Scan line decoration */}
      <div className={styles.scanLine} aria-hidden />

      {/* Day headers */}
      <div className={styles.dayHeaders}>
        {DAY_LABELS.map((d) => (
          <div key={d} className={styles.dayHeader}>
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {weeks.map((week, wi) =>
          week.map((date, di) => {
            if (!date) {
              return <div key={`${wi}-${di}`} className={styles.cellEmpty} />;
            }
            const key = date.toISOString().slice(0, 10);
            const dayEvents = eventsByDate.get(key) || [];
            return (
              <CalendarCell
                key={key}
                date={date}
                dayEvents={dayEvents}
                today={today}
                selectedDate={selectedDate}
                month={month}
                year={year}
                onSelect={onSelectDate}
              />
            );
          }),
        )}
      </div>

      {/* Footer status */}
      <div className={styles.footer}>
        <span className={styles.footerDot} />
        <span>
          {monthEventCount} EVENT{monthEventCount !== 1 ? "S" : ""} THIS MONTH
        </span>
      </div>
    </div>
  );
}
