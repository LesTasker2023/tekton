"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { Badge } from "@/components/ui";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Wrench,
  Video,
  Rocket,
  Building2,
  Sparkles,
} from "lucide-react";
import {
  type GameEvent,
  getEventStatus,
  formatDateRange,
  formatTime,
  EVENT_TYPE_META,
} from "./events.types";
import styles from "./page.module.scss";

const ICON_MAP: Record<string, React.ReactNode> = {
  Users: <Users size={12} />,
  Wrench: <Wrench size={12} />,
  Video: <Video size={12} />,
  Rocket: <Rocket size={12} />,
  Building2: <Building2 size={12} />,
  Sparkles: <Sparkles size={12} />,
};

interface EventCardProps {
  event: GameEvent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  placeholder?: any;
}

export function EventCard({ event, placeholder }: EventCardProps) {
  const status = getEventStatus(event.startDate, event.endDate);
  const meta = event.eventType ? EVENT_TYPE_META[event.eventType] : null;

  return (
    <Link
      href={`/events/${event.slug.current}`}
      className={`${styles.card} ${status === "live" ? styles.cardLive : ""} ${status === "past" ? styles.cardPast : ""}`}
    >
      {/* Image */}
      {event.coverImage ? (
        <div className={styles.cardImageWrap}>
          <Image
            src={urlFor(event.coverImage)
              .width(600)
              .height(340)
              .auto("format")
              .url()}
            alt={event.title}
            width={600}
            height={340}
            className={styles.cardImage}
          />
          {status === "live" && (
            <span className={styles.liveBadge}>
              <span className={styles.liveDot} /> LIVE
            </span>
          )}
        </div>
      ) : placeholder?.asset ? (
        <div className={styles.cardImageWrap}>
          <Image
            src={urlFor(placeholder)
              .width(600)
              .height(340)
              .auto("format")
              .url()}
            alt={event.title}
            width={600}
            height={340}
            className={styles.cardImage}
          />
          {status === "live" && (
            <span className={styles.liveBadge}>
              <span className={styles.liveDot} /> LIVE
            </span>
          )}
        </div>
      ) : (
        <div className={styles.cardImagePlaceholder}>
          <CalendarDays size={28} />
          {status === "live" && (
            <span className={styles.liveBadge}>
              <span className={styles.liveDot} /> LIVE
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <div className={styles.cardBody}>
        {/* Tags */}
        <div className={styles.tags}>
          {meta && (
            <Badge
              variant={
                meta.variant as
                  | "primary"
                  | "accent"
                  | "danger"
                  | "warning"
                  | "success"
                  | "default"
              }
            >
              {ICON_MAP[meta.icon]} {meta.label}
            </Badge>
          )}
          {event.featured && (
            <Badge variant="accent">
              Featured
            </Badge>
          )}
        </div>

        {/* Title */}
        <h2 className={styles.cardTitle}>{event.title}</h2>

        {/* Excerpt */}
        {event.excerpt && (
          <p className={styles.cardExcerpt}>{event.excerpt}</p>
        )}

        {/* Meta row */}
        <div className={styles.cardMeta}>
          <div className={styles.metaItem}>
            <Clock size={12} />
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </div>
          {event.startDate && (
            <div className={styles.metaItem}>
              <span className={styles.metaTime}>
                {formatTime(event.startDate)}
              </span>
            </div>
          )}
          {event.location && (
            <div className={styles.metaItem}>
              <MapPin size={12} />
              <span>{event.location}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
