import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { ARTICLE_BY_SLUG_QUERY, ARTICLE_SLUGS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { getPlaceholderImage } from "@/sanity/getPlaceholderImage";
import { PortableTextBody } from "@/components/ui/PortableTextBody";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock, BarChart3 } from "lucide-react";
import styles from "./page.module.scss";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

interface BodyBlock {
  _key?: string;
  _type?: string;
  style?: string;
  children?: { text?: string }[];
}

function extractHeadings(body: BodyBlock[]): { text: string; key: string; level: number }[] {
  if (!body) return [];
  return body
    .filter((b) => b._type === "block" && (b.style === "h2" || b.style === "h3"))
    .map((b) => ({
      text: b.children?.map((c) => c.text ?? "").join("") ?? "",
      key: b._key ?? "",
      level: b.style === "h2" ? 2 : 3,
    }));
}

function estimateReadingTime(body: BodyBlock[]): number {
  if (!body) return 1;
  let words = 0;
  for (const b of body) {
    if (b.children) {
      for (const child of b.children) {
        words += (child.text ?? "").split(/\s+/).length;
      }
    }
  }
  return Math.max(1, Math.round(words / 230));
}

const DIFFICULTY_LABELS: Record<string, { label: string; level: number }> = {
  beginner: { label: "Beginner", level: 1 },
  intermediate: { label: "Intermediate", level: 2 },
  advanced: { label: "Advanced", level: 3 },
};

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
    const guide = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug });
    if (!guide) return {};
    return {
      title: guide.seo?.title ?? `${guide.title} — Guides — Tekton`,
      description: guide.seo?.description ?? guide.excerpt ?? undefined,
      openGraph: {
        title: guide.seo?.title ?? guide.title,
        description: guide.seo?.description ?? guide.excerpt ?? undefined,
        type: "article",
        ...(guide.coverImage
          ? {
              images: [
                {
                  url: urlFor(guide.coverImage)
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

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  let guide;
  try {
    guide = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug });
  } catch {
    notFound();
  }
  if (!guide) notFound();

  const coverImage = guide.coverImage ?? (await getPlaceholderImage());
  const headings = extractHeadings(guide.body ?? []);
  const readTime = estimateReadingTime(guide.body ?? []);
  const diff = guide.difficulty ? DIFFICULTY_LABELS[guide.difficulty] : null;

  return (
    <article className={styles.article}>
      <Link href="/guides" className={styles.back}>
        ← Guides
      </Link>

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerRow}>
          {guide.categories?.[0]?.title && (
            <span className={styles.category}>{guide.categories[0].title}</span>
          )}
          {guide.difficulty && (
            <span className={styles.difficulty} data-level={guide.difficulty}>
              {guide.difficulty}
            </span>
          )}
        </div>
        <h1 className={styles.title}>{guide.title}</h1>
        {guide.excerpt && (
          <p className={styles.excerpt}>{guide.excerpt}</p>
        )}
        <div className={styles.metaRow}>
          {guide.publishedAt && (
            <span className={styles.metaItem}>
              <Clock size={12} />
              {new Date(guide.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
          <span className={styles.metaItem}>
            <BookOpen size={12} />
            {readTime} min read
          </span>
          {diff && (
            <span className={styles.metaItem}>
              <BarChart3 size={12} />
              {diff.label}
            </span>
          )}
        </div>
      </header>

      {/* ── Cover image ── */}
      {coverImage && (
        <Image
          src={urlFor(coverImage).width(1200).height(500).auto("format").url()}
          alt={guide.coverImage?.alt ?? guide.title}
          width={1200}
          height={500}
          className={styles.cover}
          priority
        />
      )}

      {/* ── Two-column layout: TOC sidebar + body ── */}
      <div className={styles.layout}>
        {/* Sidebar — table of contents */}
        {headings.length > 0 && (
          <aside className={styles.sidebar}>
            <div className={styles.tocCard}>
              <h3 className={styles.tocTitle}>Contents</h3>
              {diff && (
                <div className={styles.difficultyBar}>
                  <div className={styles.difficultyLabel}>{diff.label}</div>
                  <div className={styles.difficultyTrack}>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={styles.difficultyDot}
                        data-active={i <= diff.level ? "true" : "false"}
                        data-level={guide.difficulty}
                      />
                    ))}
                  </div>
                </div>
              )}
              <nav className={styles.tocNav}>
                {headings.map((h) => (
                  <a
                    key={h.key}
                    href={`#${h.key}`}
                    className={h.level === 3 ? styles.tocItemSub : styles.tocItem}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Main body */}
        <div className={styles.body}>
          <PortableTextBody value={guide.body} />
        </div>
      </div>
    </article>
  );
}
