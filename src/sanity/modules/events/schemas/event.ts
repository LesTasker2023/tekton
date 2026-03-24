import { defineField, defineType } from "sanity";
import { Calendar } from "lucide-react";

/**
 * Event — generic event type for conferences, meetups, webinars, etc.
 */
export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: Calendar,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "startDate",
      title: "Start Date & Time",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date & Time",
      type: "datetime",
      description: "Leave blank for single-day events.",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g. "Online", "Main Hall", "123 Street, City".',
    }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Meetup", value: "meetup" },
          { title: "Workshop", value: "workshop" },
          { title: "Webinar", value: "webinar" },
          { title: "Conference", value: "conference" },
          { title: "Launch", value: "launch" },
          { title: "Special", value: "special" },
        ],
      },
      initialValue: "meetup",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
    defineField({
      name: "body",
      title: "Details",
      type: "richText",
    }),
  ],
  orderings: [
    {
      title: "Start Date (soonest)",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      startDate: "startDate",
      eventType: "eventType",
      media: "coverImage",
    },
    prepare({ title, startDate, eventType, media }) {
      const d = startDate
        ? new Date(startDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "No date";
      const label = eventType
        ? eventType.replace(/\b\w/g, (c: string) => c.toUpperCase())
        : "";
      return { title, subtitle: `${label} · ${d}`, media };
    },
  },
});
