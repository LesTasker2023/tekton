import { defineField, defineType } from "sanity";

export const pageHeroSectionType = defineType({
  name: "pageHeroSection",
  title: "Page Banner",
  type: "object",
  icon: () => "📄",
  description:
    "A compact banner for inner pages — title, optional subtitle, and optional background.",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
      description: "Optional tagline below the heading.",
    }),
    defineField({
      name: "breadcrumb",
      title: "Breadcrumb Label",
      type: "string",
      description:
        'Small label above the heading (e.g. "// GUIDES", "// NEWS").',
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Optional background — darkened automatically.",
    }),
    defineField({
      name: "align",
      title: "Text Alignment",
      type: "string",
      options: {
        list: [
          { title: "Center", value: "center" },
          { title: "Left", value: "left" },
        ],
        layout: "radio",
      },
      initialValue: "center",
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "subheading" },
    prepare({ title, subtitle }) {
      return { title: title ?? "Page Hero", subtitle };
    },
  },
});
