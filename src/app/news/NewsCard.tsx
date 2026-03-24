"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { Newspaper, Star } from "lucide-react";
import { type Post, formatDate } from "./news.types";
import styles from "./page.module.scss";

interface NewsCardProps {
  post: Post;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  placeholder?: any;
}

export function NewsCard({ post, placeholder }: NewsCardProps) {
  return (
    <Link href={`/news/${post.slug.current}`} className={styles.card}>
      {post.coverImage ? (
        <div className={styles.cardImageWrap}>
          <Image
            src={urlFor(post.coverImage)
              .width(600)
              .height(340)
              .auto("format")
              .url()}
            alt={post.title}
            width={600}
            height={340}
            className={styles.cardImage}
          />
          {post.featured && (
            <span className={styles.starBadge}>
              <Star size={12} />
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
            alt={post.title}
            width={600}
            height={340}
            className={styles.cardImage}
          />
          {post.featured && (
            <span className={styles.starBadge}>
              <Star size={12} />
            </span>
          )}
        </div>
      ) : (
        <div className={styles.cardImagePlaceholder}>
          <Newspaper size={28} />
        </div>
      )}
      <div className={styles.cardBody}>
        {post.categories?.length ? (
          <div className={styles.tags}>
            {post.categories.map((c) => (
              <span key={c.slug.current} className={styles.tag}>
                {c.title}
              </span>
            ))}
          </div>
        ) : null}
        <h2 className={styles.cardTitle}>{post.title}</h2>
        {post.excerpt && (
          <p className={styles.cardExcerpt}>{post.excerpt}</p>
        )}
        <div className={styles.cardMeta}>
          {post.author?.name && (
            <span className={styles.authorName}>{post.author.name}</span>
          )}
          {post.publishedAt && (
            <time className={styles.date}>
              {formatDate(post.publishedAt)}
            </time>
          )}
        </div>
      </div>
    </Link>
  );
}
