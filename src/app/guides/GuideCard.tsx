"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { Badge } from "@/components/ui";
import type { BadgeVariant } from "@/components/ui/Badge/Badge";
import { BookOpen } from "lucide-react";
import { type Guide, DIFF_META } from "./guides.types";
import type { SanityImageObject } from "@/types/sanity";
import styles from "./page.module.scss";

interface GuideCardProps {
  guide: Guide;
  placeholder?: SanityImageObject | null;
}

export function GuideCard({ guide, placeholder }: GuideCardProps) {
  return (
    <Link
      href={`/guides/${guide.slug.current}`}
      className={styles.card}
    >
      {guide.coverImage ? (
        <div className={styles.cardImageWrap}>
          <Image
            src={urlFor(guide.coverImage)
              .width(600)
              .height(340)
              .auto("format")
              .url()}
            alt={guide.title}
            width={600}
            height={340}
            className={styles.cardImage}
          />
        </div>
      ) : placeholder?.asset ? (
        <div className={styles.cardImageWrap}>
          <Image
            src={urlFor(placeholder)
              .width(600)
              .height(340)
              .auto("format")
              .url()}
            alt={guide.title}
            width={600}
            height={340}
            className={styles.cardImage}
          />
        </div>
      ) : (
        <div className={styles.cardImagePlaceholder}>
          <BookOpen size={28} />
        </div>
      )}
      <div className={styles.cardBody}>
        <div className={styles.cardBadges}>
          {guide.difficulty && (
            <Badge
              variant={
                (DIFF_META[guide.difficulty]?.variant ??
                  "default") as BadgeVariant
              }
              dot
            >
              {DIFF_META[guide.difficulty]?.label ?? guide.difficulty}
            </Badge>
          )}
          {guide.category && (
            <Badge variant="default">{guide.category.title}</Badge>
          )}
        </div>
        <h3 className={styles.cardTitle}>{guide.title}</h3>
        {guide.excerpt && (
          <p className={styles.cardExcerpt}>{guide.excerpt}</p>
        )}
        <span className={styles.readMore}>Read guide →</span>
      </div>
    </Link>
  );
}
