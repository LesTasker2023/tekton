import type { CalendarEvent } from "./calendarUtils";
import { isSameDay, MONTH_NAMES } from "./calendarUtils";
import styles from "./EventCalendar.module.scss";

interface CalendarCellProps {
  date: Date;
  dayEvents: CalendarEvent[];
  today: Date;
  selectedDate: Date | null | undefined;
  month: number;
  year: number;
  onSelect?: (date: Date) => void;
}

export function CalendarCell({
  date,
  dayEvents,
  today,
  selectedDate,
  month,
  year,
  onSelect,
}: CalendarCellProps) {
  const isToday = isSameDay(date, today);
  const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
  const hasEvents = dayEvents.length > 0;
  const hasFeatured = dayEvents.some((e) => e.featured);

  return (
    <button
      className={[
        styles.cell,
        isToday ? styles.cellToday : "",
        isSelected ? styles.cellSelected : "",
        hasEvents ? styles.cellHasEvent : "",
        hasFeatured ? styles.cellFeatured : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => onSelect?.(date)}
      aria-label={`${date.getDate()} ${MONTH_NAMES[month]} ${year}${hasEvents ? `, ${dayEvents.length} event${dayEvents.length > 1 ? "s" : ""}` : ""}`}
    >
      <span className={styles.cellDay}>{date.getDate()}</span>
      {hasEvents && (
        <span className={styles.cellDots}>
          {dayEvents.slice(0, 3).map((ev, i) => (
            <span
              key={i}
              className={[styles.dot, ev.featured ? styles.dotFeatured : ""]
                .filter(Boolean)
                .join(" ")}
            />
          ))}
        </span>
      )}
    </button>
  );
}
