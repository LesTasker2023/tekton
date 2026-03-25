import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { EVENT_BY_SLUG_QUERY, EVENT_SLUGS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { getPlaceholderImage } from "@/sanity/getPlaceholderImage";
import { PortableTextBody } from "@/components/ui/PortableTextBody";
import { JsonLd, eventSchema } from "@/lib/jsonLd";
import {
  formatDateRange,
  formatTime,
  getEventStatus,
  EVENT_TYPE_LABELS,
} from "@/lib/eventHelpers";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import styles from "./page.module.scss";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

/* ── Static params ── */
export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(EVENT_SLUGS_QUERY);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

/* ── Metadata ── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const event = await client.fetch(EVENT_BY_SLUG_QUERY, { slug });
    if (!event) return {};
    return {
      title: `${event.title} — Events — Tekton`,
      description: event.excerpt ?? undefined,
      openGraph: {
        title: event.title,
        description: event.excerpt ?? undefined,
        type: "article",
        ...(event.coverImage
          ? {
              images: [
                {
                  url: urlFor(event.coverImage)
                    .width(1200)
                    .height(630)
                    .auto("format")
                    .url(),
                  width: 1200,
                  height: 630,
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
export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  let event;
  try {
    event = await client.fetch(EVENT_BY_SLUG_QUERY, { slug });
  } catch {
    notFound();
  }
  if (!event) notFound();

  const coverImage = event.coverImage ?? (await getPlaceholderImage());
  const status = getEventStatus(event.startDate, event.endDate);
  const typeLabel = event.eventType
    ? (EVENT_TYPE_LABELS[event.eventType] ?? event.eventType)
    : null;

  return (
    <>
      <JsonLd
        data={eventSchema({
          name: event.title,
          description: event.excerpt ?? undefined,
          url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"}/events/${slug}`,
          startDate: event.startDate,
          endDate: event.endDate ?? undefined,
          location: event.location ?? undefined,
          image: event.coverImage
            ? urlFor(event.coverImage)
                .width(1200)
                .height(630)
                .auto("format")
                .url()
            : undefined,
        })}
      />
      <article className={styles.article}>
        <header className={styles.header}>
          <Link href="/events" className={styles.back}>
            ← Events
          </Link>

          {/* Badges row */}
          <div className={styles.badges}>
            {status === "live" && (
              <span className={`${styles.badge} ${styles.badgeLive}`}>
                ● LIVE NOW
              </span>
            )}
            {typeLabel && <span className={styles.badge}>{typeLabel}</span>}
            {event.featured && <span className={styles.badge}>Featured</span>}
          </div>

          <h1 className={styles.title}>{event.title}</h1>

          {/* Meta row */}
          <div className={styles.meta}>
            {event.startDate && (
              <span className={styles.metaItem}>
                <CalendarDays size={12} />
                {formatDateRange(event.startDate, event.endDate)}
              </span>
            )}
            {event.startDate && (
              <span className={styles.metaItem}>
                {formatTime(event.startDate)}
              </span>
            )}
            {event.location && (
              <span className={styles.metaItem}>
                <MapPin size={12} />
                {event.location}
              </span>
            )}
          </div>
        </header>

        {coverImage && (
          <Image
            src={urlFor(coverImage)
              .width(1200)
              .height(630)
              .auto("format")
              .url()}
            alt={event.coverImage?.alt ?? event.title}
            width={1200}
            height={630}
            className={styles.cover}
            priority
          />
        )}

        {event.body && (
          <div className={styles.body}>
            <PortableTextBody value={event.body} />
          </div>
        )}
      </article>
    </>
  );
}
