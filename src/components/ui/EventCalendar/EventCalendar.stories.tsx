import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { EventCalendar } from "./EventCalendar";
import type { CalendarEvent } from "./calendarUtils";

/* ── Helpers to build dates relative to today ── */
function offsetDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function makeEvent(
  id: string,
  title: string,
  startOffset: number,
  endOffset?: number,
  eventType?: string,
): CalendarEvent {
  return {
    _id: id,
    title,
    slug: { current: id },
    startDate: offsetDate(startOffset),
    endDate: endOffset !== undefined ? offsetDate(endOffset) : undefined,
    eventType,
  };
}

/* ── Sample datasets ── */
const defaultEvents: CalendarEvent[] = [
  makeEvent("e1", "Sprint Planning", 1, undefined, "meeting"),
  makeEvent("e2", "Client Kickoff: Acme", 3, 4, "workshop"),
  makeEvent("e3", "Design Review", 7, undefined, "review"),
  makeEvent("e4", "Quarterly Retro", 12, undefined, "meeting"),
  makeEvent("e5", "Product Launch", 18, 19, "launch"),
  makeEvent("e6", "Team Standup", 0, undefined, "meeting"),
];

const manyEvents: CalendarEvent[] = [
  makeEvent("m1", "Stakeholder Sync", -2, undefined, "meeting"),
  makeEvent("m2", "UX Workshop", 0, 1, "workshop"),
  makeEvent("m3", "Backend Deploy", 2, undefined, "release"),
  makeEvent("m4", "Client Call: Globex", 3, undefined, "meeting"),
  makeEvent("m5", "Sprint Demo", 5, undefined, "demo"),
  makeEvent("m6", "1:1 with Manager", 6, undefined, "meeting"),
  makeEvent("m7", "Design System Review", 7, undefined, "review"),
  makeEvent("m8", "Marketing Handoff", 8, undefined, "meeting"),
  makeEvent("m9", "QA Regression", 9, 10, "testing"),
  makeEvent("m10", "Board Presentation", 12, undefined, "meeting"),
  makeEvent("m11", "Hackathon", 14, 16, "event"),
  makeEvent("m12", "Release v2.5", 17, undefined, "release"),
  makeEvent("m13", "Client Onboarding", 19, 20, "workshop"),
  makeEvent("m14", "Security Audit", 21, undefined, "review"),
  makeEvent("m15", "End-of-Month Wrap", 25, undefined, "meeting"),
  makeEvent("m16", "Planning Poker", 4, undefined, "meeting"),
];

/* ── Meta ── */
const meta: Meta<typeof EventCalendar> = {
  title: "UI/EventCalendar",
  component: EventCalendar,
  args: {
    onSelectDate: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof EventCalendar>;

export const Default: Story = {
  args: { events: defaultEvents },
};

export const Empty: Story = {
  args: { events: [] },
};

export const SingleEvent: Story = {
  args: {
    events: [makeEvent("s1", "Board Meeting", 10, undefined, "meeting")],
  },
};

export const ManyEvents: Story = {
  args: { events: manyEvents },
};

export const WithSelectedDate: Story = {
  args: {
    events: defaultEvents,
    selectedDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3),
  },
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | null>(null);
    return (
      <div>
        <EventCalendar
          events={defaultEvents}
          selectedDate={selected}
          onSelectDate={setSelected}
        />
        <p style={{ marginTop: "1rem", color: "#888" }}>
          Selected: {selected ? selected.toLocaleDateString() : "none"}
        </p>
      </div>
    );
  },
};
