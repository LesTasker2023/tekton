import { defineField, defineType } from "sanity";
import { CalendarCheck } from "lucide-react";

export const bookingType = defineType({
  name: "booking",
  title: "Booking",
  type: "document",
  icon: CalendarCheck,
  fields: [
    defineField({
      name: "item",
      title: "Item",
      type: "reference",
      to: [{ type: "item" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slot",
      title: "Availability Slot",
      type: "reference",
      to: [{ type: "availabilitySlot" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "customerPhone",
      title: "Customer Phone",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "Denormalized from slot for easy querying.",
      readOnly: true,
    }),
    defineField({
      name: "timeSlot",
      title: "Time Slot",
      type: "string",
      description: 'e.g. "09:00 – 10:00"',
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "createdDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      name: "customerName",
      date: "date",
      timeSlot: "timeSlot",
      status: "status",
    },
    prepare({ name, date, timeSlot, status }) {
      const statusLabel =
        status === "confirmed"
          ? "✓ Confirmed"
          : status === "cancelled"
            ? "✗ Cancelled"
            : "● Pending";
      return {
        title: `${name ?? "Unknown"} — ${date ?? "?"}`,
        subtitle: `${timeSlot ?? "?"} · ${statusLabel}`,
      };
    },
  },
});
