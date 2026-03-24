import { defineField, defineType } from "sanity";
import { HelpCircle } from "lucide-react";

export const faqGroupType = defineType({
  name: "faqGroup",
  title: "FAQ Group",
  type: "document",
  icon: HelpCircle,
  fields: [
    defineField({
      name: "title",
      title: "Group Title",
      type: "string",
      description: 'e.g. "General", "Billing", "Technical".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "items",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "FAQ",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", items: "items" },
    prepare({ title, items }) {
      const count = items?.length ?? 0;
      return {
        title,
        subtitle: `${count} question${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
