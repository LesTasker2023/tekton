import { defineField, defineType } from "sanity";
import { Clock } from "lucide-react";

export const availabilitySlotType = defineType({
  name: "availabilitySlot",
  title: "Availability Slot",
  type: "document",
  icon: Clock,
  fields: [
    defineField({
      name: "item",
      title: "Item",
      type: "reference",
      to: [{ type: "item" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "startTime",
      title: "Start Time",
      type: "string",
      description: 'Format: HH:mm (e.g. "09:00")',
      validation: (r) =>
        r.required().regex(/^\d{2}:\d{2}$/, { name: "time", invert: false }),
    }),
    defineField({
      name: "endTime",
      title: "End Time",
      type: "string",
      description: 'Format: HH:mm (e.g. "10:00")',
      validation: (r) =>
        r.required().regex(/^\d{2}:\d{2}$/, { name: "time", invert: false }),
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      type: "number",
      description: "How many bookings this slot can accept.",
      initialValue: 1,
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "booked",
      title: "Booked",
      type: "number",
      description: "Auto-incremented when a booking is created.",
      initialValue: 0,
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Date (ascending)",
      name: "dateAsc",
      by: [
        { field: "date", direction: "asc" },
        { field: "startTime", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      date: "date",
      startTime: "startTime",
      endTime: "endTime",
      capacity: "capacity",
      booked: "booked",
      itemTitle: "item.title",
    },
    prepare({ date, startTime, endTime, capacity, booked, itemTitle }) {
      return {
        title: `${date ?? "?"} · ${startTime ?? "?"} – ${endTime ?? "?"}`,
        subtitle: `${itemTitle ?? "Unknown"} · ${booked ?? 0}/${capacity ?? 1} booked`,
      };
    },
  },
});
