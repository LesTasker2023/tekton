"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { Badge } from "@/components/ui";
import { type Post, formatDate } from "./news.types";
import styles from "./page.module.scss";

interface FeaturedNewsCardProps {
  post: Post;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  placeholder?: any;
}

export function FeaturedNewsCard({ post, placeholder }: FeaturedNewsCardProps) {
  return (
    <Link
      href={`/news/${post.slug.current}`}
      className={styles.featuredCard}
    >
      {(post.coverImage || placeholder?.asset) && (
        <div className={styles.featuredImageWrap}>
          <Image
            src={
              post.coverImage
                ? urlFor(post.coverImage)
                    .width(1200)
                    .height(500)
                    .auto("format")
                    .url()
                : urlFor(placeholder!)
                    .width(1200)
                    .height(500)
                    .auto("format")
                    .url()
            }
            alt={post.title}
            width={1200}
            height={500}
            className={styles.featuredImg}
          />
          <div className={styles.featuredOverlay} />
        </div>
      )}
      <div className={styles.featuredBody}>
        <div className={styles.featuredMeta}>
          <Badge variant="accent">
            Featured
          </Badge>
          {post.categories?.map((c) => (
            <Badge key={c.slug.current} variant="default">
              {c.title}
            </Badge>
          ))}
        </div>
        <h2 className={styles.featuredTitle}>{post.title}</h2>
        {post.excerpt && (
          <p className={styles.featuredExcerpt}>{post.excerpt}</p>
        )}
        <div className={styles.featuredFooter}>
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
