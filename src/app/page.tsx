import type { Metadata } from "next";
import { getClient } from "@/sanity/client";
import { HOMEPAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { SectionRenderer } from "@/components/composed/sections/SectionRenderer";
import styles from "./page.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [settings, homepage] = await Promise.all([
      getClient(false).fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } }),
      getClient(false).fetch(HOMEPAGE_QUERY, {}, { next: { revalidate: 60 } }),
    ]);
    return {
      title: homepage?.seo?.title ?? settings?.seoTitle ?? "Tekton",
      description: homepage?.seo?.description ?? settings?.seoDescription ?? undefined,
    };
  } catch {
    return { title: "Tekton" };
  }
}

/**
 * Homepage — rendered via the page builder.
 * Edit the Homepage singleton in Sanity Studio to populate this.
 */
export default async function HomePage() {
  let homepage;
  try {
    homepage = await getClient(false).fetch(
      HOMEPAGE_QUERY,
      {},
      { next: { revalidate: 60 } },
    );
  } catch {
    // Sanity not configured
  }

  if (!homepage?.sections?.length) {
    return (
      <main className={styles.empty}>
        <h1 className={styles.emptyHeading}>Welcome to Tekton</h1>
        <p className={styles.emptyText}>
          Open Sanity Studio and add sections to the Homepage to build your landing page.
        </p>
      </main>
    );
  }

  return (
    <main>
      <SectionRenderer sections={homepage.sections} />
    </main>
  );
}
