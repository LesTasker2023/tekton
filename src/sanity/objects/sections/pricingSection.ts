import { defineField, defineType } from "sanity";

export const pricingSectionType = defineType({
  name: "pricingSection",
  title: "Pricing",
  type: "object",
  icon: () => "💰",
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
      name: "tiers",
      title: "Pricing Tiers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Tier Name",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
              validation: (r) => r.required(),
              description: 'e.g. "$499", "Free", "Custom"',
            }),
            defineField({
              name: "period",
              title: "Period",
              type: "string",
              description: 'e.g. "/month", "/project"',
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "features",
              title: "Features",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "text",
                      title: "Feature",
                      type: "string",
                      validation: (r) => r.required(),
                    }),
                    defineField({
                      name: "included",
                      title: "Included",
                      type: "boolean",
                      initialValue: true,
                    }),
                  ],
                  preview: {
                    select: { text: "text", included: "included" },
                    prepare({ text, included }) {
                      return { title: `${included ? "✓" : "✗"} ${text}` };
                    },
                  },
                },
              ],
            }),
            defineField({
              name: "cta",
              title: "CTA Button",
              type: "object",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                }),
                defineField({
                  name: "href",
                  title: "URL",
                  type: "url",
                  validation: (r) =>
                    r.uri({
                      allowRelative: true,
                      scheme: ["http", "https", "mailto"],
                    }),
                }),
              ],
            }),
            defineField({
              name: "featured",
              title: "Featured / Popular",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { name: "name", price: "price" },
            prepare({ name, price }) {
              return { title: `${name} — ${price}` };
            },
          },
        },
      ],
      validation: (r) => r.min(1).max(5),
    }),
  ],
  preview: {
    select: { heading: "heading" },
    prepare({ heading }) {
      return { title: `💰 Pricing: ${heading ?? "Untitled"}` };
    },
  },
});
