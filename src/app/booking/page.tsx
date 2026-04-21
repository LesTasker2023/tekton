import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { BOOKABLE_ITEMS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { CalendarCheck } from "lucide-react";

function formatPrice(price: number, currency = "GBP"): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(price);
}
import styles from "./page.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 3600 } });
    return {
      title: `Book — ${settings?.siteName ?? "Tekton"}`,
      description: "Browse bookable services and make a reservation.",
    };
  } catch {
    return { title: "Book" };
  }
}

interface BookableItem {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  price?: number;
  currency?: string;
  image?: { asset?: { _id: string; url: string; metadata?: { lqip?: string; dimensions?: { width: number; height: number } } }; alt?: string };
  categories?: { _id: string; title: string; slug: { current: string } }[];
}

export default async function BookingPage() {
  let items: BookableItem[] = [];
  let placeholder: string | undefined;

  try {
    [items, placeholder] = await Promise.all([
      client.fetch(BOOKABLE_ITEMS_QUERY, {}, { next: { revalidate: 60 } }) ?? [],
      client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 3600 } })
        .then((s: any) => s?.placeholderImage?.asset?.url),
    ]);
  } catch {
    /* Sanity not configured */
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <p className={styles.breadcrumb}>// BOOK</p>
        <h1 className={styles.title}>Make a Booking</h1>
        <p className={styles.subtitle}>
          Choose a service below to select a date and time. Questions?{" "}
          <a href="/contact" className={styles.link}>Get in touch</a>.
        </p>
      </div>

      {!items.length ? (
        <div className={styles.empty}>
          <CalendarCheck size={40} className={styles.emptyIcon} />
          <p>No bookable services available right now. Check back soon or <a href="/contact" className={styles.link}>contact us</a> directly.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {items.map((item) => {
            const imgSrc = item.image?.asset
              ? urlFor(item.image).width(640).height(400).fit("crop").url()
              : placeholder;

            return (
              <Link key={item._id} href={`/catalog/${item.slug.current}`} className={styles.card}>
                <div className={styles.cardImg}>
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={item.image?.alt ?? item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                      placeholder={item.image?.asset?.metadata?.lqip ? "blur" : "empty"}
                      blurDataURL={item.image?.asset?.metadata?.lqip}
                    />
                  )}
                </div>
                <div className={styles.cardBody}>
                  {item.categories?.length ? (
                    <p className={styles.cardCat}>{item.categories[0].title}</p>
                  ) : null}
                  <h2 className={styles.cardTitle}>{item.title}</h2>
                  {item.excerpt && <p className={styles.cardExcerpt}>{item.excerpt}</p>}
                  <div className={styles.cardFooter}>
                    {item.price ? (
                      <span className={styles.cardPrice}>
                        {formatPrice(item.price, item.currency ?? "GBP")}
                      </span>
                    ) : null}
                    <span className={styles.cardCta}>
                      <CalendarCheck size={14} /> Book now
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
