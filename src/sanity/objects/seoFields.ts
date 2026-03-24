import { defineField, defineType } from "sanity";

/**
 * Reusable SEO object — embed in any document for per-page SEO control.
 */
export const seoFieldsType = defineType({
  name: "seoFields",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO Title",
      type: "string",
      description: "Override the page <title>. ~60 chars recommended.",
      validation: (r) => r.max(70),
    }),
    defineField({
      name: "description",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "Meta description. ~155 chars recommended.",
      validation: (r) => r.max(200),
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      description: "1200x630 recommended. Falls back to site default.",
    }),
  ],
});
