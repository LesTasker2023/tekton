/* ── Types ── */
export interface CalendarEvent {
  _id: string;
  title: string;
  slug: { current: string };
  startDate: string;
  endDate?: string;
  eventType?: string;
  featured?: boolean;
}

export interface EventCalendarProps {
  events: CalendarEvent[];
  onSelectDate?: (date: Date) => void;
  selectedDate?: Date | null;
}

/* ── Constants ── */
export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const DAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

/* ── Helpers ── */
export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isWithinRange(date: Date, start: Date, end?: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  if (!end) return d.getTime() === s.getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return d >= s && d <= e;
}

/** Build a 6-week grid of dates (null = blank cell). */
export function buildWeeks(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month, 1);
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];

  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const rows: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }
  return rows;
}

/** Map dates to overlapping events for a given month. */
export function buildEventsByDate(
  events: CalendarEvent[],
  year: number,
  month: number,
): Map<string, CalendarEvent[]> {
  const map = new Map<string, CalendarEvent[]>();
  events.forEach((ev) => {
    const start = new Date(ev.startDate);
    const end = ev.endDate ? new Date(ev.endDate) : undefined;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      if (isWithinRange(date, start, end)) {
        const key = date.toISOString().slice(0, 10);
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(ev);
      }
    }
  });
  return map;
}
