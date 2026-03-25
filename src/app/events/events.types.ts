/* ── Shared types & helpers for events ── */

import type { SanityImageObject } from "@/types/sanity";

export interface GameEvent {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  eventType?: string;
  featured?: boolean;
  coverImage?: SanityImageObject;
}

export type ViewMode = "list" | "calendar";
export type TimeFilter = "upcoming" | "past" | "all";

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export function formatDateRange(start: string, end?: string) {
  const s = formatDate(start);
  if (!end) return s;
  const e = formatDate(end);
  return s === e ? s : `${s} — ${e}`;
}

export function getEventStatus(
  start: string,
  end?: string,
): "upcoming" | "live" | "past" {
  const now = Date.now();
  const s = new Date(start).getTime();
  const e = end ? new Date(end).getTime() : s + 86400000; // default 1 day
  if (now < s) return "upcoming";
  if (now <= e) return "live";
  return "past";
}

export const EVENT_TYPE_META: Record<
  string,
  { label: string; icon: string; variant: string }
> = {
  meetup: { label: "Meetup", icon: "Users", variant: "primary" },
  workshop: { label: "Workshop", icon: "Wrench", variant: "accent" },
  webinar: { label: "Webinar", icon: "Video", variant: "success" },
  launch: { label: "Launch", icon: "Rocket", variant: "warning" },
  conference: { label: "Conference", icon: "Building2", variant: "primary" },
  special: { label: "Special", icon: "Sparkles", variant: "accent" },
};
