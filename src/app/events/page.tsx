import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { EVENTS_QUERY } from "@/sanity/queries";
import EventsHub from "./EventsHub";

export const metadata: Metadata = {
  title: "Events — Tekton",
  description: "Upcoming events, meetups, and community happenings.",
};

export default async function EventsPage() {
  let events = [];
  try {
    events =
      (await client.fetch(EVENTS_QUERY, {}, { next: { revalidate: 60 } })) ??
      [];
  } catch {
    /* Sanity not configured yet */
  }

  return <EventsHub events={events} />;
}
