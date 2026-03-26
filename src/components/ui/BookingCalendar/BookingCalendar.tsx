"use client";

import { useState } from "react";
import {
  buildWeeks,
  isSameDay,
  MONTH_NAMES,
  DAY_LABELS,
} from "@/components/ui/EventCalendar/calendarUtils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./BookingCalendar.module.scss";

export interface BookingCalendarProps {
  /** Set of "YYYY-MM-DD" strings that have available slots */
  availableDates: Set<string>;
  /** Called when user selects a date */
  onSelectDate: (date: Date) => void;
  /** Currently selected date */
  selectedDate: Date | null;
  /** Earliest selectable date (default: today) */
  minDate?: Date;
}

export function BookingCalendar({
  availableDates,
  onSelectDate,
  selectedDate,
  minDate,
}: BookingCalendarProps) {
  const today = new Date();
  const earliest = minDate ?? today;
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const weeks = buildWeeks(year, month);

  const prev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const next = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={prev}
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <span className={styles.monthLabel}>
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          type="button"
          className={styles.navBtn}
          onClick={next}
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className={styles.dayHeaders}>
        {DAY_LABELS.map((d) => (
          <span key={d} className={styles.dayLabel}>
            {d}
          </span>
        ))}
      </div>

      {weeks.map((week, wi) => (
        <div key={wi} className={styles.week}>
          {week.map((date, di) => {
            if (!date) {
              return <span key={di} className={styles.cell} />;
            }

            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
            const isPast =
              date < new Date(earliest.getFullYear(), earliest.getMonth(), earliest.getDate());
            const isAvailable = availableDates.has(key);
            const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
            const isToday = isSameDay(date, today);

            return (
              <button
                key={di}
                type="button"
                className={styles.cell}
                data-available={isAvailable && !isPast}
                data-selected={isSelected}
                data-today={isToday}
                data-past={isPast}
                disabled={isPast || !isAvailable}
                onClick={() => onSelectDate(date)}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
