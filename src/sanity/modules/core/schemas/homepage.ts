import { defineField, defineType, defineArrayMember } from "sanity";
import { Home } from "lucide-react";

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: Home,
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Homepage",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sections",
      title: "Page Sections",
      type: "array",
      description: "Build the homepage by adding sections.",
      of: [
        defineArrayMember({ type: "heroSection" }),
        defineArrayMember({ type: "pageHeroSection" }),
        defineArrayMember({ type: "statsRowSection" }),
        defineArrayMember({ type: "featureGridSection" }),
        defineArrayMember({ type: "ctaSection" }),
        defineArrayMember({ type: "richTextSection" }),
        defineArrayMember({ type: "imageGallerySection" }),
        defineArrayMember({ type: "contactSection" }),
        defineArrayMember({ type: "testimonialSection" }),
        defineArrayMember({ type: "pricingSection" }),
        defineArrayMember({ type: "logoCloudSection" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
