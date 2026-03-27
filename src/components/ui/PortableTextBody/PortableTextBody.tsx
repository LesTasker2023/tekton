import {
  PortableText,
  type PortableTextReactComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import styles from "./PortableTextBody.module.scss";

interface ImageWithAltValue {
  asset?: { _ref: string };
  alt?: string;
  caption?: string;
}

interface CodeBlockValue {
  code: string;
  language?: string;
  filename?: string;
}

interface CalloutValue {
  tone?: string;
  body?: PortableTextBlock[] | string;
}

interface VideoEmbedValue {
  url?: string;
  caption?: string;
}

interface ShowcaseItemValue {
  _key?: string;
  image?: { asset?: { _ref: string } };
  label: string;
  description?: string;
}

interface ObjectShowcaseValue {
  title?: string;
  items?: ShowcaseItemValue[];
}

function toEmbedUrl(url?: string): string | null {
  if (!url) return null;
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/,
  );
  if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
}

const components: Partial<PortableTextReactComponents> = {
  block: {
    h2: ({ children, value }) => <h2 id={value._key} className={styles.h2}>{children}</h2>,
    h3: ({ children, value }) => <h3 id={value._key} className={styles.h3}>{children}</h3>,
    h4: ({ children, value }) => <h4 id={value._key} className={styles.h4}>{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className={styles.blockquote}>{children}</blockquote>
    ),
    normal: ({ children }) => <p className={styles.p}>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className={styles.ul}>{children}</ul>,
    number: ({ children }) => <ol className={styles.ol}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className={styles.li}>{children}</li>,
    number: ({ children }) => <li className={styles.li}>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className={styles.inlineCode}>{children}</code>
    ),
    "strike-through": ({ children }) => <s>{children}</s>,
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const blank = value?.blank;
      return (
        <a
          href={href}
          className={styles.link}
          {...(blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    imageWithAlt: ({ value }: { value: ImageWithAltValue }) => {
      if (!value?.asset) return null;
      return (
        <figure className={styles.figure}>
          <Image
            src={urlFor(value).width(1200).auto("format").url()}
            alt={value.alt ?? ""}
            width={1200}
            height={675}
            className={styles.image}
          />
          {value.caption && (
            <figcaption className={styles.caption}>{value.caption}</figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }: { value: CodeBlockValue }) => (
      <div className={styles.codeWrapper}>
        {value.filename && (
          <div className={styles.codeFilename}>{value.filename}</div>
        )}
        <pre className={styles.pre} data-language={value.language}>
          <code>{value.code}</code>
        </pre>
      </div>
    ),
    callout: ({ value }: { value: CalloutValue }) => (
      <aside className={styles.callout} data-tone={value.tone}>
        {Array.isArray(value.body) ? (
          <PortableText value={value.body} />
        ) : (
          <p>{value.body}</p>
        )}
      </aside>
    ),
    videoEmbed: ({ value }: { value: VideoEmbedValue }) => {
      const embedUrl = toEmbedUrl(value.url);
      if (!embedUrl) return null;
      return (
        <figure className={styles.videoFigure}>
          <div className={styles.videoWrapper}>
            <iframe
              src={embedUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.videoIframe}
              title={value.caption || "Embedded video"}
            />
          </div>
          {value.caption && (
            <figcaption className={styles.caption}>{value.caption}</figcaption>
          )}
        </figure>
      );
    },
    objectShowcase: ({ value }: { value: ObjectShowcaseValue }) => {
      const items = value.items ?? [];
      if (items.length === 0) return null;
      return (
        <div className={styles.showcase}>
          {value.title && (
            <h3 className={styles.showcaseTitle}>{value.title}</h3>
          )}
          <div
            className={styles.showcaseGrid}
            data-count={Math.min(items.length, 4)}
          >
            {items.map((item, i) => (
              <figure key={item._key ?? i} className={styles.showcaseItem}>
                {item.image?.asset && (
                  <Image
                    src={urlFor(item.image).width(400).height(400).auto("format").url()}
                    alt={item.label}
                    width={400}
                    height={400}
                    className={styles.showcaseImage}
                  />
                )}
                <figcaption className={styles.showcaseCaption}>
                  <span className={styles.showcaseLabel}>{item.label}</span>
                  {item.description && (
                    <span className={styles.showcaseDesc}>{item.description}</span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      );
    },
  },
};

/**
 * Split a Portable Text array into sections at H2 boundaries.
 * Content before the first H2 is returned as a section with no heading.
 */
function splitByH2(
  blocks: PortableTextBlock[],
): { heading: PortableTextBlock | null; content: PortableTextBlock[] }[] {
  const sections: { heading: PortableTextBlock | null; content: PortableTextBlock[] }[] = [];
  let current: { heading: PortableTextBlock | null; content: PortableTextBlock[] } = {
    heading: null,
    content: [],
  };

  for (const block of blocks) {
    const isH2 =
      block._type === "block" && (block as { style?: string }).style === "h2";

    if (isH2) {
      if (current.heading || current.content.length > 0) {
        sections.push(current);
      }
      current = { heading: block, content: [] };
    } else {
      current.content.push(block);
    }
  }

  if (current.heading || current.content.length > 0) {
    sections.push(current);
  }

  return sections;
}

interface Props {
  value: PortableTextBlock[];
}

export function PortableTextBody({ value }: Props) {
  if (!value) return null;

  const sections = splitByH2(value);
  const hasAnySections = sections.some((s) => s.heading !== null);

  // No H2s at all — render flat, no wrappers
  if (!hasAnySections) {
    return (
      <div className={styles.body} data-component="portable-text">
        <PortableText value={value} components={components} />
      </div>
    );
  }

  return (
    <div className={styles.body} data-component="portable-text">
      {sections.map((section, i) => {
        // Content before the first H2 — render unwrapped
        if (!section.heading) {
          return (
            <PortableText
              key={`preamble-${i}`}
              value={section.content}
              components={components}
            />
          );
        }

        // Sectioned content
        return (
          <section
            key={section.heading._key ?? `section-${i}`}
            className={styles.section}
          >
            <PortableText
              value={[section.heading, ...section.content]}
              components={components}
            />
          </section>
        );
      })}
    </div>
  );
}
