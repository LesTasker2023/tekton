"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { StructureResolver } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schema } from "@/sanity/schema";
import { resolve } from "@/sanity/presentation/resolve";
import { tektonTheme } from "@/sanity/studioTheme";
import { StudioLogo, StudioLoading } from "@/sanity/studioComponents";
import {
  Settings,
  Newspaper,
  Calendar,
  FileText,
  User,
  Tag,
  Navigation,
  HelpCircle,
  Home,
  Package,
  CalendarCheck,
} from "lucide-react";
import "./src/sanity/studio.css";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/* ── Custom desk structure ── */
const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Homepage (singleton)
      S.listItem()
        .title("Homepage")
        .id("homepage")
        .icon(Home)
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homepage")
            .title("Homepage"),
        ),

      // Pages
      S.listItem()
        .title("Pages")
        .id("pages")
        .icon(FileText)
        .child(S.documentTypeList("page").title("Pages")),

      // Articles (replaces Posts + Guides)
      S.listItem()
        .title("Articles")
        .id("articles")
        .icon(Newspaper)
        .child(
          S.documentTypeList("article")
            .title("Articles")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
        ),

      // Events (module)
      S.listItem()
        .title("Events")
        .id("events")
        .icon(Calendar)
        .child(
          S.documentTypeList("event")
            .title("Events")
            .defaultOrdering([{ field: "startDate", direction: "asc" }]),
        ),

      // FAQ Groups (module)
      S.listItem()
        .title("FAQ")
        .id("faq")
        .icon(HelpCircle)
        .child(S.documentTypeList("faqGroup").title("FAQ Groups")),

      // Catalog (module)
      S.listItem()
        .title("Catalog")
        .id("catalog")
        .icon(Package)
        .child(
          S.list()
            .title("Catalog")
            .items([
              S.listItem()
                .title("Items")
                .id("items")
                .icon(Package)
                .child(
                  S.documentTypeList("item")
                    .title("Items")
                    .defaultOrdering([{ field: "sortOrder", direction: "asc" }]),
                ),
              S.listItem()
                .title("Categories")
                .id("itemCategories")
                .icon(Tag)
                .child(
                  S.documentTypeList("itemCategory")
                    .title("Item Categories")
                    .defaultOrdering([{ field: "sortOrder", direction: "asc" }]),
                ),
            ]),
        ),

      // Bookings (module) — top-level for easy access
      S.listItem()
        .title("Bookings")
        .id("bookings")
        .icon(CalendarCheck)
        .child(
          S.list()
            .title("Bookings")
            .items([
              S.listItem()
                .title("All Bookings")
                .id("bookings-all")
                .icon(CalendarCheck)
                .child(
                  S.documentTypeList("booking")
                    .title("All Bookings")
                    .defaultOrdering([{ field: "createdAt", direction: "desc" }]),
                ),
              S.listItem()
                .title("Pending")
                .id("bookings-pending")
                .child(
                  S.documentTypeList("booking")
                    .title("Pending")
                    .filter('_type == "booking" && status == "pending"')
                    .defaultOrdering([{ field: "date", direction: "asc" }]),
                ),
              S.listItem()
                .title("Confirmed")
                .id("bookings-confirmed")
                .child(
                  S.documentTypeList("booking")
                    .title("Confirmed")
                    .filter('_type == "booking" && status == "confirmed"')
                    .defaultOrdering([{ field: "date", direction: "asc" }]),
                ),
              S.listItem()
                .title("Cancelled")
                .id("bookings-cancelled")
                .child(
                  S.documentTypeList("booking")
                    .title("Cancelled")
                    .filter('_type == "booking" && status == "cancelled"')
                    .defaultOrdering([{ field: "createdAt", direction: "desc" }]),
                ),
            ]),
        ),

      S.divider(),

      // Settings section
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .icon(Settings)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),

      S.listItem()
        .title("Navigation")
        .id("navigation")
        .icon(Navigation)
        .child(
          S.document()
            .schemaType("navigation")
            .documentId("navigation")
            .title("Navigation"),
        ),

      S.divider(),

      // Taxonomy
      S.listItem()
        .title("Authors")
        .id("authors")
        .icon(User)
        .child(S.documentTypeList("author").title("Authors")),

      S.listItem()
        .title("Categories")
        .id("categories")
        .icon(Tag)
        .child(S.documentTypeList("category").title("Categories")),
    ]);

export default defineConfig({
  name: "tekton",
  title: "Tekton",

  projectId,
  dataset,
  basePath: "/studio",

  theme: tektonTheme,

  studio: {
    components: {
      logo: StudioLogo,
      loading: StudioLoading,
    },
  },

  form: {
    image: {
      directUploads: true,
    },
  },

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve,
    }),
    visionTool({ defaultApiVersion: "2025-01-01" }),
  ],

  schema,
});
