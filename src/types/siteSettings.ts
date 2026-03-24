/** Shared TypeScript types for the siteSettings singleton */

export interface SanityImageRef {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
}

export interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  siteName?: string;
  siteNameShort?: string;
  tagline?: string;
  logo?: SanityImageRef;
  favicon?: SanityImageRef;
  placeholderImage?: { asset: { _id: string; url: string }; alt?: string };
  navLayout?: "sidebar" | "topnav";
  contentWidth?: "1200" | "1440" | "full";
  skin?: string;
  mainNav?: NavLink[];
  footerText?: string;
  footerLinks?: FooterLink[];
  socialLinks?: SocialLink[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImageRef;
  siteUrl?: string;
  defaultThemeHue?: number;
  defaultThemeMode?: "dark" | "light";
  gaMeasurementId?: string;
  sentryDsn?: string;
}
