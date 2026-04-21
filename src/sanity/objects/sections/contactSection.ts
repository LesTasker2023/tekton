import { defineField, defineType } from "sanity";

export const contactSectionType = defineType({
  name: "contactSection",
  title: "Contact Form",
  type: "object",
  icon: () => "✉️",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Get in Touch",
      validation: (r) => r.max(120),
    }),
    defineField({
      name: "confirmationMessage",
      title: "Confirmation Message",
      type: "text",
      rows: 2,
      description: "Shown after successful submission. Leave blank for default.",
    }),
  ],
  preview: {
    select: { heading: "heading" },
    prepare({ heading }) {
      return { title: `✉️ Contact: ${heading ?? "Get in Touch"}` };
    },
  },
});
