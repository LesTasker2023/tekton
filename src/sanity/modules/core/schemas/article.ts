import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

/**
 * Article — unified content type replacing both "post" and "guide".
 * Differentiation is via categories: "News", "Guide", "Tutorial", "Case Study", etc.
 * Optional fields (difficulty, sortOrder) show only when relevant.
 */
export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: Newspaper,
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
      description: "Short summary shown in cards and SEO descriptions.",
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
          description: "Accessible description of the image.",
        }),
      ],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (r) => r.max(5),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Show this article in featured/hero sections.",
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
        ],
        layout: "radio",
      },
      description: "Optional — useful for guides and tutorials.",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description:
        "Optional — lower numbers appear first. Useful for ordering guides within a category.",
      initialValue: 0,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "richText",
    }),
  ],
  orderings: [
    {
      title: "Published (newest first)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Sort Order",
      name: "orderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "coverImage",
      date: "publishedAt",
    },
    prepare({ title, author, media, date }) {
      const d = date ? new Date(date).toLocaleDateString() : "Draft";
      return { title, subtitle: `${author ?? "Unknown"} · ${d}`, media };
    },
  },
});
