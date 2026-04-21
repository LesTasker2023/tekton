import { defineField, defineType } from "sanity";

export const logoCloudSectionType = defineType({
  name: "logoCloudSection",
  title: "Logo Cloud",
  type: "object",
  icon: () => "🏢",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (r) => r.max(120),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Company Name",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "image",
              title: "Logo Image",
              type: "image",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "href",
              title: "Link (optional)",
              type: "url",
              validation: (r) =>
                r.uri({
                  allowRelative: true,
                  scheme: ["http", "https"],
                }),
            }),
          ],
          preview: {
            select: { title: "name", media: "image" },
          },
        },
      ],
      validation: (r) => r.min(1).max(20),
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      options: { list: [3, 4, 5, 6] },
      initialValue: 5,
    }),
    defineField({
      name: "grayscale",
      title: "Grayscale Logos",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { heading: "heading" },
    prepare({ heading }) {
      return { title: `🏢 Logos: ${heading ?? "Untitled"}` };
    },
  },
});
