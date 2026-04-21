import type { SchemaTypeDefinition } from "sanity";

// Documents
import { articleType } from "./schemas/article";
import { homepageType } from "./schemas/homepage";
import { siteSettingsType } from "./schemas/siteSettings";
import { navigationType } from "./schemas/navigation";

// Re-export existing documents (author, category, page stay in /documents/)
import { authorType } from "@/sanity/documents/author";
import { categoryType } from "@/sanity/documents/category";
import { pageType } from "@/sanity/documents/page";

// Objects (reusable blocks)
import { richTextType } from "@/sanity/objects/richText";
import { codeBlockType } from "@/sanity/objects/codeBlock";
import { calloutType } from "@/sanity/objects/callout";
import { imageWithAltType } from "@/sanity/objects/imageWithAlt";
import { videoEmbedType } from "@/sanity/objects/videoEmbed";
import { objectShowcaseType } from "@/sanity/objects/objectShowcase";
import { ctaLinkType } from "@/sanity/objects/ctaLink";
import { seoFieldsType } from "@/sanity/objects/seoFields";

// Page Builder sections
import {
  heroSectionType,
  pageHeroSectionType,
  statsRowSectionType,
  featureGridSectionType,
  ctaSectionType,
  richTextSectionType,
  imageGallerySectionType,
  contactSectionType,
  testimonialSectionType,
  pricingSectionType,
  logoCloudSectionType,
} from "@/sanity/objects/sections";

export const coreSchemas: SchemaTypeDefinition[] = [
  // Documents
  homepageType,
  articleType,
  pageType,
  authorType,
  categoryType,
  siteSettingsType,
  navigationType,
  // Objects
  richTextType,
  codeBlockType,
  calloutType,
  imageWithAltType,
  videoEmbedType,
  objectShowcaseType,
  ctaLinkType,
  seoFieldsType,
  // Page Builder sections
  heroSectionType,
  pageHeroSectionType,
  statsRowSectionType,
  featureGridSectionType,
  ctaSectionType,
  richTextSectionType,
  imageGallerySectionType,
  contactSectionType,
  testimonialSectionType,
  pricingSectionType,
  logoCloudSectionType,
];
