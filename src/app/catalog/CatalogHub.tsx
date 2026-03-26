"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePlaceholderImage } from "@/context/PlaceholderImageContext";
import { urlFor } from "@/sanity/image";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { Package, Search, Star } from "lucide-react";
import styles from "./page.module.scss";

/* ── Types ── */
interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

interface ItemCategory {
  _id: string;
  title: string;
  slug: { current: string };
}

interface ItemImage {
  asset?: { _id: string; url: string; metadata?: { lqip?: string; dimensions?: { width: number; height: number } } };
  alt?: string;
  hotspot?: unknown;
  crop?: unknown;
}

interface CatalogItem {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  status?: string;
  featured?: boolean;
  price?: number;
  currency?: string;
  compareAtPrice?: number;
  image?: ItemImage;
  categories?: ItemCategory[];
  attributes?: { key: string; value: string }[];
  location?: string;
}

type SortOption = "default" | "price-asc" | "price-desc";

const CURRENCY_SYMBOLS: Record<string, string> = {
  GBP: "£",
  USD: "$",
  EUR: "€",
};

function formatPrice(price: number, currency?: string): string {
  const symbol = CURRENCY_SYMBOLS[currency ?? "GBP"] ?? "£";
  return `${symbol}${price.toFixed(2)}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CatalogHub — client-side filterable / sortable catalog listing
   ═══════════════════════════════════════════════════════════════════════════ */
export default function CatalogHub({
  items,
  categories,
}: {
  items: CatalogItem[];
  categories: Category[];
}) {
  const placeholder = usePlaceholderImage();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sort, setSort] = useState<SortOption>("default");

  /* ── Filter & sort ── */
  const filtered = useMemo(() => {
    let result = [...items];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.excerpt?.toLowerCase().includes(q) ||
          item.categories?.some((c) => c.title.toLowerCase().includes(q)),
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((item) =>
        item.categories?.some((c) => c.title === categoryFilter),
      );
    }

    if (sort === "price-asc") {
      result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sort === "price-desc") {
      result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    return result;
  }, [items, search, categoryFilter, sort]);

  const featuredItem =
    !search && categoryFilter === "all" && sort === "default"
      ? filtered.find((item) => item.featured)
      : null;

  const regularItems = featuredItem
    ? filtered.filter((item) => item._id !== featuredItem._id)
    : filtered;

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setSort("default");
  };

  /* ── Empty CMS state ── */
  if (!items.length) {
    return (
      <div className={styles.empty}>
        <Package size={48} className={styles.emptyIcon} />
        <h1 className={styles.emptyTitle}>No Items Yet</h1>
        <p className={styles.emptyText}>
          Create your first catalog item in the Sanity Studio.
        </p>
        <Link href="/studio" className={styles.studioLink}>
          Open Studio →
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Catalog</h1>
        <p className={styles.subtitle}>
          {items.length} item{items.length !== 1 ? "s" : ""} — templates,
          plugins, and services
        </p>
      </header>

      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <div className={styles.searchInput}>
            <Search size={14} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search catalog…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.search}
            />
          </div>
        </div>

        <div className={styles.filters}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={styles.select}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className={styles.select}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* ── Active filter bar ── */}
      {(search || categoryFilter !== "all") && (
        <div className={styles.activeFilters}>
          <span className={styles.resultCount}>
            <strong>{filtered.length}</strong> result
            {filtered.length !== 1 ? "s" : ""}
          </span>
          <button className={styles.clearBtn} onClick={clearFilters}>
            Clear
          </button>
        </div>
      )}

      {/* ── Featured hero card ── */}
      {featuredItem && (
        <Link
          href={`/catalog/${featuredItem.slug.current}`}
          className={styles.featuredCard}
        >
          <div className={styles.featuredImageWrap}>
            {featuredItem.image?.asset ? (
              <Image
                src={urlFor(featuredItem.image)
                  .width(800)
                  .height(800)
                  .auto("format")
                  .url()}
                alt={featuredItem.image.alt ?? featuredItem.title}
                width={800}
                height={800}
                className={styles.featuredImg}
              />
            ) : placeholder ? (
              <Image
                src={urlFor(placeholder).width(800).height(800).auto("format").url()}
                alt="Placeholder"
                width={800}
                height={800}
                className={styles.featuredImg}
              />
            ) : (
              <div className={styles.cardImagePlaceholder}>
                <Package size={48} />
              </div>
            )}
            <div className={styles.featuredOverlay} />
          </div>

          <div className={styles.featuredBody}>
            <div className={styles.featuredMeta}>
              <span className={`${styles.badge} ${styles.badgeFeatured}`}>
                <Star size={10} /> Featured
              </span>
              {featuredItem.categories?.map((c) => (
                <span key={c._id} className={styles.badge}>
                  {c.title}
                </span>
              ))}
            </div>
            <h2 className={styles.featuredTitle}>{featuredItem.title}</h2>
            {featuredItem.excerpt && (
              <p className={styles.featuredExcerpt}>{featuredItem.excerpt}</p>
            )}
            <div className={styles.featuredPricing}>
              {featuredItem.price != null && (
                <span className={styles.featuredPrice}>
                  {formatPrice(featuredItem.price, featuredItem.currency)}
                </span>
              )}
              {featuredItem.compareAtPrice != null && (
                <span className={styles.comparePrice}>
                  {formatPrice(featuredItem.compareAtPrice, featuredItem.currency)}
                </span>
              )}
            </div>
          </div>
        </Link>
      )}

      {/* ── Item grid ── */}
      {regularItems.length > 0 ? (
        <motion.div
          key={`${categoryFilter}-${sort}-${search}`}
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {regularItems.map((item) => (
            <motion.div key={item._id} variants={fadeUp}>
              <Link
                href={`/catalog/${item.slug.current}`}
                className={styles.card}
              >
                <div className={styles.cardImageWrap}>
                  {item.image?.asset ? (
                    <Image
                      src={urlFor(item.image)
                        .width(600)
                        .height(600)
                        .auto("format")
                        .url()}
                      alt={item.image.alt ?? item.title}
                      width={600}
                      height={600}
                      className={styles.cardImage}
                    />
                  ) : placeholder ? (
                    <Image
                      src={urlFor(placeholder)
                        .width(600)
                        .height(600)
                        .auto("format")
                        .url()}
                      alt="Placeholder"
                      width={600}
                      height={600}
                      className={styles.cardImage}
                    />
                  ) : (
                    <div className={styles.cardImagePlaceholder}>
                      <Package size={32} />
                    </div>
                  )}
                  {item.featured && (
                    <span className={styles.starBadge}>
                      <Star size={14} />
                    </span>
                  )}
                </div>

                <div className={styles.cardBody}>
                  {item.categories && item.categories.length > 0 && (
                    <div className={styles.tags}>
                      {item.categories.map((c) => (
                        <span key={c._id} className={styles.tag}>
                          {c.title}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3 className={styles.cardTitle}>{item.title}</h3>

                  {item.excerpt && (
                    <p className={styles.cardExcerpt}>{item.excerpt}</p>
                  )}

                  <div className={styles.cardFooter}>
                    <div className={styles.pricing}>
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
                    {item.status && (
                      <span className={styles.statusBadge}>{item.status}</span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className={styles.noResults}>
          <Package size={36} className={styles.emptyIcon} />
          <p>No items match your filters.</p>
          <button className={styles.clearBtn} onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
