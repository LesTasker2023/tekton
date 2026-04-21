import { groq } from "next-sanity";

/* Reusable image projection */
const imageProjection = `{ asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }`;

/* ─── Articles (replaces posts + guides) ─── */
export const ARTICLES_QUERY = groq`
  *[_type == "article" && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featured,
    difficulty,
    sortOrder,
    coverImage ${imageProjection},
    author->{ name, slug, avatar ${imageProjection} },
    categories[]->{ title, slug }
  }
`;

export const ARTICLES_BY_CATEGORY_QUERY = groq`
  *[_type == "article" && $category in categories[]->slug.current && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featured,
    difficulty,
    sortOrder,
    coverImage ${imageProjection},
    author->{ name, slug, avatar ${imageProjection} },
    categories[]->{ title, slug }
  }
`;

export const ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featured,
    difficulty,
    coverImage ${imageProjection},
    author->{ name, slug, avatar ${imageProjection}, bio },
    categories[]->{ title, slug },
    seo,
    body
  }
`;

export const ARTICLE_SLUGS_QUERY = groq`
  *[_type == "article" && defined(slug.current)].slug.current
`;

/* ─── Homepage (singleton) ─── */
export const HOMEPAGE_QUERY = groq`
  *[_type == "homepage"][0] {
    _id,
    title,
    seo,
    sections[] {
      _type,
      _key,
      heading,
      subheading,
      backgroundImage,
      "backgroundVideoUrl": backgroundVideo.asset->url,
      breadcrumb,
      cta,
      align,
      stats[] { label, value, trendDirection, trendValue, subtitle },
      accent,
      features[] { title, description, icon, image, href },
      columns,
      body,
      primaryAction,
      secondaryAction,
      variant,
      "richBody": body,
      maxWidth,
      images[] { image, alt, caption },
      layout
    }
  }
`;

/* ─── Pages ─── */
export const PAGE_BY_SLUG_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    sections[] {
      _type,
      _key,
      heading,
      subheading,
      backgroundImage,
      "backgroundVideoUrl": backgroundVideo.asset->url,
      breadcrumb,
      cta,
      align,
      stats[] { label, value, trendDirection, trendValue, subtitle },
      accent,
      features[] { title, description, icon, image, href },
      columns,
      body,
      primaryAction,
      secondaryAction,
      variant,
      "richBody": body,
      maxWidth,
      images[] { image, alt, caption },
      layout
    }
  }
`;

export const PAGE_SLUGS_QUERY = groq`
  *[_type == "page" && defined(slug.current)].slug.current
`;

/* ─── Events ─── */
export const EVENTS_QUERY = groq`
  *[_type == "event"] | order(startDate asc) {
    _id,
    title,
    slug,
    excerpt,
    startDate,
    endDate,
    location,
    eventType,
    featured,
    coverImage ${imageProjection}
  }
`;

export const EVENT_BY_SLUG_QUERY = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    startDate,
    endDate,
    location,
    eventType,
    featured,
    coverImage ${imageProjection},
    seo,
    body
  }
`;

export const EVENT_SLUGS_QUERY = groq`
  *[_type == "event" && defined(slug.current)].slug.current
`;

/* ─── FAQ ─── */
export const FAQ_GROUPS_QUERY = groq`
  *[_type == "faqGroup"] | order(title asc) {
    _id,
    title,
    slug,
    items[] { _key, question, answer }
  }
`;

/* ─── Catalog ─── */
export const ITEMS_QUERY = groq`
  *[_type == "item" && status == "active"] | order(sortOrder asc) {
    _id,
    title,
    slug,
    excerpt,
    status,
    featured,
    price,
    currency,
    compareAtPrice,
    image ${imageProjection},
    categories[]->{ _id, title, slug },
    attributes[] { key, value },
    location
  }
`;

export const ITEMS_BY_CATEGORY_QUERY = groq`
  *[_type == "item" && status == "active" && $category in categories[]->slug.current] | order(sortOrder asc) {
    _id,
    title,
    slug,
    excerpt,
    status,
    featured,
    price,
    currency,
    compareAtPrice,
    image ${imageProjection},
    categories[]->{ _id, title, slug },
    attributes[] { key, value },
    location
  }
`;

export const ITEM_BY_SLUG_QUERY = groq`
  *[_type == "item" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    status,
    featured,
    price,
    currency,
    compareAtPrice,
    image ${imageProjection},
    gallery[] { asset->{ _id, url, metadata { lqip, dimensions } }, alt, caption },
    categories[]->{ _id, title, slug },
    attributes[] { key, value },
    variants[] { label, sku, price, inStock },
    location,
    externalUrl,
    bookable,
    seo,
    body
  }
`;

export const ITEM_SLUGS_QUERY = groq`
  *[_type == "item" && defined(slug.current)].slug.current
`;

export const ITEM_CATEGORIES_QUERY = groq`
  *[_type == "itemCategory"] | order(sortOrder asc) {
    _id,
    title,
    slug,
    description,
    image ${imageProjection}
  }
`;

/* ─── Booking ─── */
export const BOOKING_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    bookingAdminEmail,
    bookingEmailFromName,
    bookingConfirmationMessage,
    bookingOpeningHours[] { day, open, close },
    bookingSlotDuration,
    bookingMaxPerSlot,
    bookingAdvanceDays
  }
`;

export const BOOKINGS_FOR_ITEM_QUERY = groq`
  *[_type == "booking"
    && item._ref == $itemId
    && date >= $fromDate
    && date <= $toDate
    && status != "cancelled"
  ] {
    date,
    timeSlot
  }
`;

/* ─── Site Settings ─── */
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteNameShort,
    tagline,
    logo,
    favicon,
    placeholderImage { asset->{ _id, url }, alt, hotspot, crop },
    navLayout,
    contentWidth,
    skin,
    defaultThemeHue,
    defaultThemeMode,
    gaMeasurementId,
    sentryDsn,
    seoTitle,
    seoDescription,
    ogImage,
    siteUrl,
    socialLinks[] { platform, url }
  }
`;

/* ─── Navigation ─── */
export const NAVIGATION_QUERY = groq`
  *[_type == "navigation"][0] {
    mainNav[] { label, href, icon, children[] { label, href, icon } },
    footerNav[] { label, href },
    footerText
  }
`;
