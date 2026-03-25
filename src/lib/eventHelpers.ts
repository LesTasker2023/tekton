/** Format a date string as "1 January 2026". */
export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Format a date string as a time with timezone. */
export function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

/** Format a start/end date pair as a readable range. */
export function formatDateRange(start: string, end?: string) {
  const s = formatDate(start);
  if (!end) return s;
  const e = formatDate(end);
  return s === e ? s : `${s} — ${e}`;
}

/** Determine whether an event is upcoming, live, or past. */
export function getEventStatus(
  start: string,
  end?: string,
): "upcoming" | "live" | "past" {
  const now = Date.now();
  const s = new Date(start).getTime();
  const e = end ? new Date(end).getTime() : s + 86400000;
  if (now < s) return "upcoming";
  if (now <= e) return "live";
  return "past";
}

export const EVENT_TYPE_LABELS: Record<string, string> = {
  meetup: "Meetup",
  workshop: "Workshop",
  webinar: "Webinar",
  launch: "Launch",
  conference: "Conference",
  special: "Special",
};
