import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { ARTICLE_BY_SLUG_QUERY, ARTICLE_SLUGS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { getPlaceholderImage } from "@/sanity/getPlaceholderImage";
import { PortableTextBody } from "@/components/ui/PortableTextBody";
import { JsonLd, articleSchema } from "@/lib/jsonLd";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";

export const revalidate = 30;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(ARTICLE_SLUGS_QUERY);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug });
    if (!post) return {};
    return {
      title: post.seo?.title ?? post.title,
      description: post.seo?.description ?? post.excerpt ?? undefined,
      openGraph: {
        title: post.seo?.title ?? post.title,
        description: post.seo?.description ?? post.excerpt ?? undefined,
        type: "article",
        ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
        ...(post.coverImage
          ? {
              images: [
                {
                  url: urlFor(post.coverImage)
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

function estimateReadingTime(body: unknown[]): number {
  if (!body) return 1;
  let words = 0;
  for (const b of body) {
    const block = b as { children?: { text?: string }[] };
    if (block.children) {
      for (const child of block.children) {
        words += (child.text ?? "").split(/\s+/).length;
      }
    }
  }
  return Math.max(1, Math.round(words / 230));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug });
  } catch {
    notFound();
  }
  if (!post) notFound();

  const coverImage = post.coverImage ?? (await getPlaceholderImage());
  const readTime = estimateReadingTime(post.body ?? []);

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt ?? undefined,
          url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"}/news/${slug}`,
          image: post.coverImage
            ? urlFor(post.coverImage)
                .width(1200)
                .height(630)
                .auto("format")
                .url()
            : undefined,
          datePublished: post.publishedAt ?? undefined,
          authorName: post.author?.name ?? undefined,
        })}
      />
      <article className={styles.article}>
        <Link href="/news" className={styles.back}>
          ← News
        </Link>

        {/* ── Full-width cover with overlay ── */}
        {coverImage && (
          <div className={styles.heroWrap}>
            <Image
              src={urlFor(coverImage)
                .width(1600)
                .height(700)
                .auto("format")
                .url()}
              alt={post.coverImage?.alt ?? post.title}
              width={1600}
              height={700}
              className={styles.heroImage}
              priority
            />
            <div className={styles.heroOverlay} />
            <div className={styles.heroContent}>
              {post.categories?.length ? (
                <div className={styles.tags}>
                  {post.categories.map((c: { slug: { current: string }; title: string }) => (
                    <span key={c.slug.current} className={styles.tag}>
                      {c.title}
                    </span>
                  ))}
                </div>
              ) : null}
              <h1 className={styles.title}>{post.title}</h1>
              {post.excerpt && (
                <p className={styles.excerpt}>{post.excerpt}</p>
              )}
            </div>
          </div>
        )}

        {/* ── Author bar ── */}
        <div className={styles.authorBar}>
          <div className={styles.authorInfo}>
            <div className={styles.authorAvatar}>
              {post.author?.name?.[0] ?? "?"}
            </div>
            <div>
              {post.author?.name && (
                <span className={styles.authorName}>{post.author.name}</span>
              )}
              <div className={styles.metaRow}>
                {post.publishedAt && (
                  <time className={styles.date}>
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                )}
                <span className={styles.readTime}>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className={styles.body}>
          <PortableTextBody value={post.body} />
        </div>

        {/* ── Footer ── */}
        <footer className={styles.footer}>
          <div className={styles.footerTags}>
            {post.categories?.map((c: { slug: { current: string }; title: string }) => (
              <span key={c.slug.current} className={styles.footerTag}>
                {c.title}
              </span>
            ))}
          </div>
          <Link href="/news" className={styles.backLink}>
            ← Back to News
          </Link>
        </footer>
      </article>
    </>
  );
}
