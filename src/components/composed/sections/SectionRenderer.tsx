"use client";

import { HeroSection } from "./HeroSection";
import { PageHero } from "./PageHero";
import { StatsRowSection } from "./StatsRowSection";
import { FeatureGridSection } from "./FeatureGridSection";
import { CtaSection } from "./CtaSection";
import { RichTextSection } from "./RichTextSection";
import { ImageGallerySection } from "./ImageGallerySection";
import { TestimonialSection } from "./TestimonialSection";
import { PricingSection } from "./PricingSection";
import { LogoCloudSection } from "./LogoCloudSection";
import { ContactSection } from "./ContactSection";

/**
 * Registry: maps Sanity section `_type` → React component.
 * Add new section types here as they're built.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- dynamic registry: sections are typed at their own boundaries
const SECTION_MAP: Record<string, React.ComponentType<any>> = {
  heroSection: HeroSection,
  pageHeroSection: PageHero,
  statsRowSection: StatsRowSection,
  featureGridSection: FeatureGridSection,
  ctaSection: CtaSection,
  richTextSection: RichTextSection,
  imageGallerySection: ImageGallerySection,
  testimonialSection: TestimonialSection,
  pricingSection: PricingSection,
  logoCloudSection: LogoCloudSection,
  contactSection: ContactSection,
};

interface Section {
  _type: string;
  _key: string;
  [key: string]: unknown;
}

interface SectionRendererProps {
  sections: Section[];
}

/**
 * Iterates over the page's `sections` array from Sanity and renders
 * the matching React component for each one, passing all fields as props.
 */
export function SectionRenderer({ sections }: SectionRendererProps) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section) => {
        const Component = SECTION_MAP[section._type];

        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            return (
              <div
                key={section._key}
                style={{
                  padding: "2rem",
                  margin: "1rem",
                  border: "1px dashed var(--status-warning)",
                  color: "var(--status-warning)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-sm)",
                }}
              >
                ⚠ Unknown section type: <code>{section._type}</code>
              </div>
            );
          }
          return null;
        }

        // Spread all Sanity fields as props (excluding _type and _key)
        const { _type, _key, ...props } = section;
        return <Component key={_key} {...props} />;
      })}
    </>
  );
}
