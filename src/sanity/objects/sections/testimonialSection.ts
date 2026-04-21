import { defineField, defineType } from "sanity";

export const testimonialSectionType = defineType({
  name: "testimonialSection",
  title: "Testimonials",
  type: "object",
  icon: () => "💬",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (r) => r.max(120),
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            }),
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "role",
              title: "Role / Title",
              type: "string",
            }),
            defineField({
              name: "company",
              title: "Company",
              type: "string",
            }),
            defineField({
              name: "avatar",
              title: "Avatar",
              type: "image",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "company" },
          },
        },
      ],
      validation: (r) => r.min(1).max(12),
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Grid", value: "grid" },
          { title: "Carousel", value: "carousel" },
          { title: "Stacked", value: "stacked" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      options: { list: [2, 3, 4] },
      initialValue: 3,
      hidden: ({ parent }) => parent?.layout !== "grid",
    }),
  ],
  preview: {
    select: { heading: "heading" },
    prepare({ heading }) {
      return { title: `💬 Testimonials: ${heading ?? "Untitled"}` };
    },
  },
});
