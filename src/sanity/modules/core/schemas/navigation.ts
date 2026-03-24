import { defineField, defineType } from "sanity";
import { Navigation } from "lucide-react";
import { IconPickerInput } from "@/sanity/components/IconPickerInput";
import { NavLinkPreview } from "@/sanity/components/NavLinkPreview";

export const navigationType = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: Navigation,
  groups: [
    { name: "main", title: "Main Nav", default: true },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "mainNav",
      title: "Main Navigation",
      type: "array",
      group: "main",
      description: "Primary navigation links.",
      of: [
        {
          type: "object",
          name: "navLink",
          title: "Link",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
              validation: (r) => r.required(),
              description: "Internal path (e.g. /news) or external URL.",
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Lucide icon name.",
              components: { input: IconPickerInput },
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href", icon: "icon" },
          },
          components: {
            preview: NavLinkPreview as never,
          },
        },
      ],
    }),
    defineField({
      name: "footerNav",
      title: "Footer Links",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          name: "footerLink",
          title: "Link",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "string",
      group: "footer",
      description: "Copyright / tagline. Use {year} for current year.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navigation" };
    },
  },
});
