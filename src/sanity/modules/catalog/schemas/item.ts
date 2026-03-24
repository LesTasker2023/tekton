import { defineField, defineType, defineArrayMember } from "sanity";
import { Package } from "lucide-react";

/**
 * Item — flexible catalog entity.
 * Works as a product, point of interest, service, portfolio piece, listing, etc.
 * Custom attributes allow arbitrary key-value metadata per item.
 */
export const itemType = defineType({
  name: "item",
  title: "Item",
  type: "document",
  icon: Package,
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "media", title: "Media" },
    { name: "pricing", title: "Pricing" },
    { name: "attributes", title: "Attributes" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    /* ── Details ── */
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "details",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "details",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short Description",
      type: "text",
      group: "details",
      rows: 3,
      description: "Shown in cards and listings.",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "details",
      of: [{ type: "reference", to: [{ type: "itemCategory" }] }],
      validation: (r) => r.max(10),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Active", value: "active" },
          { title: "Archived", value: "archived" },
          { title: "Sold", value: "sold" },
        ],
        layout: "radio",
      },
      initialValue: "active",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "details",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      group: "details",
      initialValue: 0,
      description: "Lower numbers appear first.",
    }),

    /* ── Media ── */
    defineField({
      name: "image",
      title: "Primary Image",
      type: "image",
      group: "media",
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
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    /* ── Pricing ── */
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      group: "pricing",
      description: "Base price. Leave blank for non-purchasable items.",
      validation: (r) => r.min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      group: "pricing",
      options: {
        list: [
          { title: "GBP (£)", value: "GBP" },
          { title: "USD ($)", value: "USD" },
          { title: "EUR (€)", value: "EUR" },
        ],
      },
      initialValue: "GBP",
      hidden: ({ parent }) => !parent?.price,
    }),
    defineField({
      name: "compareAtPrice",
      title: "Compare-at Price",
      type: "number",
      group: "pricing",
      description: "Original price (shows as strikethrough if higher than price).",
      validation: (r) => r.min(0),
      hidden: ({ parent }) => !parent?.price,
    }),
    defineField({
      name: "variants",
      title: "Variants",
      type: "array",
      group: "pricing",
      description: "Size, colour, tier, etc.",
      of: [
        defineArrayMember({
          type: "object",
          name: "variant",
          title: "Variant",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "sku",
              title: "SKU",
              type: "string",
            }),
            defineField({
              name: "price",
              title: "Price Override",
              type: "number",
              validation: (r) => r.min(0),
            }),
            defineField({
              name: "inStock",
              title: "In Stock",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: { title: "label", sku: "sku", price: "price" },
            prepare({ title, sku, price }) {
              const parts = [sku, price != null ? `£${price}` : null]
                .filter(Boolean)
                .join(" · ");
              return { title, subtitle: parts || undefined };
            },
          },
        }),
      ],
    }),

    /* ── Attributes (flexible key-value metadata) ── */
    defineField({
      name: "attributes",
      title: "Attributes",
      type: "array",
      group: "attributes",
      description: "Custom fields — location, dimensions, specs, anything.",
      of: [
        defineArrayMember({
          type: "object",
          name: "attribute",
          title: "Attribute",
          fields: [
            defineField({
              name: "key",
              title: "Key",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { key: "key", value: "value" },
            prepare({ key, value }) {
              return { title: key, subtitle: value };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
      group: "attributes",
      description: "Map coordinates — useful for POIs, stores, venues.",
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      group: "attributes",
      description: "Link to an external page, shop listing, or booking system.",
    }),

    /* ── Body ── */
    defineField({
      name: "body",
      title: "Body",
      type: "richText",
      group: "details",
    }),

    /* ── SEO ── */
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
    {
      title: "Title (A-Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Price (low to high)",
      name: "priceAsc",
      by: [{ field: "price", direction: "asc" }],
    },
    {
      title: "Newest first",
      name: "createdDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      price: "price",
      currency: "currency",
      media: "image",
    },
    prepare({ title, status, price, currency, media }) {
      const parts: string[] = [];
      if (status) parts.push(status.charAt(0).toUpperCase() + status.slice(1));
      if (price != null) {
        const sym = currency === "USD" ? "$" : currency === "EUR" ? "€" : "£";
        parts.push(`${sym}${price}`);
      }
      return { title, subtitle: parts.join(" · ") || undefined, media };
    },
  },
});
