import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import {
  ITEM_BY_SLUG_QUERY,
  ITEM_SLUGS_QUERY,
  BOOKING_SETTINGS_QUERY,
  BOOKINGS_FOR_ITEM_QUERY,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { getPlaceholderImage } from "@/sanity/getPlaceholderImage";
import { PortableTextBody } from "@/components/ui/PortableTextBody";
import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "@/components/ui/BookingForm";
import type { BookingSettings, ExistingBooking } from "@/components/ui/BookingForm";
import { ExternalLink, MessageSquare } from "lucide-react";
import styles from "./page.module.scss";

export const revalidate = 30;

interface Props {
  params: Promise<{ slug: string }>;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  GBP: "\u00A3",
  USD: "$",
  EUR: "\u20AC",
};

function formatPrice(price: number, currency?: string): string {
  const symbol = CURRENCY_SYMBOLS[currency ?? "GBP"] ?? "\u00A3";
  return `${symbol}${price.toFixed(2)}`;
}

/* ── Static params ── */
export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(ITEM_SLUGS_QUERY);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

/* ── Metadata ── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const item = await client.fetch(ITEM_BY_SLUG_QUERY, { slug });
    if (!item) return {};
    return {
      title: `${item.title} — Catalog — Tekton`,
      description: item.excerpt ?? undefined,
      openGraph: {
        title: item.title,
        description: item.excerpt ?? undefined,
        type: "article",
        ...(item.image
          ? {
              images: [
                {
                  url: urlFor(item.image)
                    .width(1200)
                    .height(1200)
                    .auto("format")
                    .url(),
                  width: 1200,
                  height: 1200,
                },
              ],
            }
          : {}),
      },
    };
  } catch {
    return {};
  }
}

/* ── Page ── */
export default async function CatalogItemPage({ params }: Props) {
  const { slug } = await params;
  let item;
  try {
    item = await client.fetch(ITEM_BY_SLUG_QUERY, { slug });
  } catch {
    notFound();
  }
  if (!item) notFound();

  const coverImage = item.image ?? (await getPlaceholderImage());

  // Booking data (only for bookable items)
  let bookingSettings: BookingSettings | null = null;
  let existingBookings: ExistingBooking[] = [];
  if (item.bookable) {
    const today = new Date();
    const fromDate = today.toISOString().slice(0, 10);
    const rawSettings = await client.fetch<{
      bookingConfirmationMessage?: string;
      bookingOpeningHours?: { day: string; open: string; close: string }[];
      bookingSlotDuration?: number;
      bookingMaxPerSlot?: number;
      bookingAdvanceDays?: number;
    } | null>(BOOKING_SETTINGS_QUERY);

    const advanceDays = rawSettings?.bookingAdvanceDays ?? 30;
    const toDate = new Date(today);
    toDate.setDate(toDate.getDate() + advanceDays);

    // Default opening hours: Mon–Fri 09:00–17:00
    const defaultHours = ["monday", "tuesday", "wednesday", "thursday", "friday"].map(
      (day) => ({ day, open: "09:00", close: "17:00" }),
    );

    bookingSettings = {
      openingHours: rawSettings?.bookingOpeningHours?.length
        ? rawSettings.bookingOpeningHours
        : defaultHours,
      slotDuration: rawSettings?.bookingSlotDuration ?? 60,
      maxPerSlot: rawSettings?.bookingMaxPerSlot ?? 1,
      advanceDays,
      confirmationMessage: rawSettings?.bookingConfirmationMessage,
    };

    existingBookings = await client.fetch<ExistingBooking[]>(
      BOOKINGS_FOR_ITEM_QUERY,
      { itemId: item._id, fromDate, toDate: toDate.toISOString().slice(0, 10) },
    ) ?? [];
  }

  return (
    <article className={styles.article}>
      <Link href="/catalog" className={styles.back}>
        ← Catalog
      </Link>

      <div className={styles.layout}>
        {/* ── Left column: images + body ── */}
        <div className={styles.main}>
          {/* Cover image */}
          {coverImage && (
            <Image
              src={urlFor(coverImage)
                .width(1200)
                .height(1200)
                .auto("format")
                .url()}
              alt={item.image?.alt ?? item.title}
              width={1200}
              height={1200}
              className={styles.cover}
              priority
            />
          )}

          {/* Gallery */}
          {item.gallery && item.gallery.length > 0 && (
            <div className={styles.gallery}>
              {item.gallery.map(
                (
                  img: {
                    asset?: { _id: string; url: string };
                    alt?: string;
                    caption?: string;
                  },
                  i: number,
                ) =>
                  img.asset ? (
                    <div key={img.asset._id ?? i} className={styles.galleryItem}>
                      <Image
                        src={urlFor(img)
                          .width(400)
                          .height(400)
                          .auto("format")
                          .url()}
                        alt={img.alt ?? `${item.title} image ${i + 1}`}
                        width={400}
                        height={400}
                        className={styles.galleryImg}
                      />
                      {img.caption && (
                        <span className={styles.galleryCaption}>
                          {img.caption}
                        </span>
                      )}
                    </div>
                  ) : null,
              )}
            </div>
          )}

          {/* Rich text body */}
          {item.body && (
            <div className={styles.body}>
              <PortableTextBody value={item.body} />
            </div>
          )}
        </div>

        {/* ── Right column: sticky sidebar ── */}
        <aside className={styles.sidebar}>
          <h1 className={styles.title}>{item.title}</h1>

          {/* Price */}
          <div className={styles.priceBlock}>
            {item.price != null && (
              <span className={styles.price}>
                {formatPrice(item.price, item.currency)}
              </span>
            )}
            {item.compareAtPrice != null && (
              <span className={styles.comparePrice}>
                {formatPrice(item.compareAtPrice, item.currency)}
              </span>
            )}
          </div>

          {item.excerpt && (
            <p className={styles.excerpt}>{item.excerpt}</p>
          )}

          {/* Variants */}
          {item.variants && item.variants.length > 0 && (
            <div className={styles.variantsSection}>
              <h3 className={styles.sidebarLabel}>Variants</h3>
              <div className={styles.variants}>
                {item.variants.map(
                  (
                    v: {
                      label: string;
                      sku?: string;
                      price?: number;
                      inStock?: boolean;
                    },
                    i: number,
                  ) => (
                    <button
                      key={v.sku ?? i}
                      className={`${styles.variantBtn} ${!v.inStock ? styles.variantOos : ""}`}
                      disabled={!v.inStock}
                      title={
                        v.inStock === false
                          ? "Out of stock"
                          : v.price != null
                            ? formatPrice(v.price, item.currency)
                            : undefined
                      }
                    >
                      {v.label}
                      {v.price != null && (
                        <span className={styles.variantPrice}>
                          {formatPrice(v.price, item.currency)}
                        </span>
                      )}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}

          {/* Attributes */}
          {item.attributes && item.attributes.length > 0 && (
            <div className={styles.attributesSection}>
              <h3 className={styles.sidebarLabel}>Details</h3>
              <dl className={styles.attributes}>
                {item.attributes.map(
                  (attr: { key: string; value: string }, i: number) => (
                    <div key={i} className={styles.attrRow}>
                      <dt className={styles.attrKey}>{attr.key}</dt>
                      <dd className={styles.attrValue}>{attr.value}</dd>
                    </div>
                  ),
                )}
              </dl>
            </div>
          )}

          {/* External URL */}
          {item.externalUrl && (
            <a
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalBtn}
            >
              <ExternalLink size={14} />
              View External
            </a>
          )}

          {/* Categories */}
          {item.categories && item.categories.length > 0 && (
            <div className={styles.categoriesSection}>
              <div className={styles.categoryTags}>
                {item.categories.map(
                  (c: { _id: string; title: string }) => (
                    <span key={c._id} className={styles.badge}>
                      {c.title}
                    </span>
                  ),
                )}
              </div>
            </div>
          )}

          {/* Status */}
          {item.status && (
            <span className={styles.statusBadge}>{item.status}</span>
          )}

          {/* Booking */}
          {item.bookable && bookingSettings && (
            <>
              <BookingForm
                itemId={item._id}
                itemTitle={item.title}
                settings={bookingSettings}
                existingBookings={existingBookings}
              />
              <a href="/contact" className={styles.enquireLink}>
                <MessageSquare size={14} />
                Or send us an enquiry
              </a>
            </>
          )}
        </aside>
      </div>
    </article>
  );
}
