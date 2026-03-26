import { defineField, defineType } from "sanity";
import { Settings } from "lucide-react";
import { HuePickerInput } from "@/sanity/components/HuePickerInput";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: Settings,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "theme", title: "Theme" },
    { name: "analytics", title: "Analytics" },
    { name: "seo", title: "SEO Defaults" },
    { name: "social", title: "Social Links" },
    { name: "booking", title: "Booking" },
  ],
  fields: [
    /* ── General ── */
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      group: "general",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "siteNameShort",
      title: "Short Name",
      type: "string",
      group: "general",
      description: "Abbreviated name (max 4 chars).",
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "general",
      options: { hotspot: true },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "general",
      description: "32x32 PNG recommended.",
    }),
    defineField({
      name: "placeholderImage",
      title: "Placeholder Image",
      type: "image",
      group: "general",
      options: { hotspot: true },
      description: "Default image for cards when no specific image is set.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),

    /* ── Theme ── */
    defineField({
      name: "navLayout",
      title: "Navigation Layout",
      type: "string",
      group: "theme",
      description: "Type-A: sidebar + top bar. Type-B: standard horizontal nav bar.",
      options: {
        list: [
          { title: "Type-A (Sidebar)", value: "sidebar" },
          { title: "Type-B (Top Nav)", value: "topnav" },
        ],
        layout: "radio",
      },
      initialValue: "sidebar",
    }),
    defineField({
      name: "contentWidth",
      title: "Content Width",
      type: "string",
      group: "theme",
      description: "Max width for body content. Controls how wide page content stretches.",
      options: {
        list: [
          { title: "1200px (compact)", value: "1200" },
          { title: "1440px (standard)", value: "1440" },
          { title: "100% (full width)", value: "full" },
        ],
        layout: "radio",
      },
      initialValue: "1440",
    }),
    defineField({
      name: "skin",
      title: "Visual Skin",
      type: "string",
      group: "theme",
      description: "Choose the visual style for the site.",
      options: {
        list: [
          { title: "Vanilla (clean)", value: "vanilla" },
          { title: "HUD (sci-fi tactical)", value: "hud" },
        ],
        layout: "radio",
      },
      initialValue: "vanilla",
    }),
    defineField({
      name: "defaultThemeHue",
      title: "Default Brand Hue",
      type: "number",
      group: "theme",
      description: "Accent colour for first-time visitors (0-360).",
      validation: (r) => r.min(0).max(360),
      initialValue: 48,
      components: { input: HuePickerInput },
    }),
    defineField({
      name: "defaultThemeMode",
      title: "Default Theme Mode",
      type: "string",
      group: "theme",
      options: {
        list: [
          { title: "Dark", value: "dark" },
          { title: "Light", value: "light" },
        ],
        layout: "radio",
      },
      initialValue: "dark",
    }),

    /* ── Analytics ── */
    defineField({
      name: "gaMeasurementId",
      title: "GA4 Measurement ID",
      type: "string",
      group: "analytics",
      description: "Google Analytics 4 measurement ID (e.g. G-XXXXXXXXXX).",
    }),
    defineField({
      name: "sentryDsn",
      title: "Sentry DSN",
      type: "string",
      group: "analytics",
      description: "Sentry error tracking DSN.",
    }),

    /* ── SEO Defaults ── */
    defineField({
      name: "seoTitle",
      title: "Default SEO Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "Default SEO Description",
      type: "text",
      rows: 2,
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Default OG Image",
      type: "image",
      group: "seo",
    }),
    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "url",
      group: "seo",
      description: "Production URL for canonical tags and sitemaps.",
      validation: (r) => r.uri({ allowRelative: false, scheme: ["https"] }),
    }),

    /* ── Social ── */
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      group: "social",
      of: [
        {
          type: "object",
          name: "socialLink",
          title: "Social Link",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  "discord",
                  "youtube",
                  "twitter",
                  "github",
                  "instagram",
                  "linkedin",
                  "facebook",
                  "twitch",
                  "reddit",
                ],
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),

    /* ── Booking ── */
    defineField({
      name: "bookingAdminEmail",
      title: "Admin Notification Email",
      type: "string",
      group: "booking",
      description: "Where booking notifications are sent.",
    }),
    defineField({
      name: "bookingEmailFromName",
      title: "Email Sender Name",
      type: "string",
      group: "booking",
      description: "Display name for booking notification emails.",
    }),
    defineField({
      name: "bookingConfirmationMessage",
      title: "Confirmation Message",
      type: "text",
      rows: 3,
      group: "booking",
      description: "Shown to the customer after a successful booking.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
