import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { FAQ_GROUPS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { Accordion } from "@/components/ui/Accordion";
import styles from "./page.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 3600 } });
    return {
      title: `FAQ — ${settings?.siteName ?? "Tekton"}`,
      description: "Frequently asked questions.",
    };
  } catch {
    return { title: "FAQ" };
  }
}

interface FaqItem {
  _key: string;
  question: string;
  answer: string;
}

interface FaqGroup {
  _id: string;
  title: string;
  slug: { current: string };
  items: FaqItem[];
}

export default async function FaqPage() {
  let groups: FaqGroup[] = [];
  try {
    groups = (await client.fetch(FAQ_GROUPS_QUERY, {}, { next: { revalidate: 60 } })) ?? [];
  } catch {
    /* Sanity not configured */
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <p className={styles.breadcrumb}>// FAQ</p>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <p className={styles.subtitle}>
          Can&apos;t find what you&apos;re looking for?{" "}
          <a href="/contact" className={styles.link}>Get in touch</a>.
        </p>
      </div>

      {!groups.length ? (
        <p className={styles.empty}>No FAQ content yet. Check back soon.</p>
      ) : (
        <div className={styles.groups}>
          {groups.map((group) => (
            <section key={group._id} className={styles.group}>
              <h2 className={styles.groupTitle}>{group.title}</h2>
              <Accordion
                items={(group.items ?? []).map((item) => ({
                  key: item._key,
                  title: item.question,
                  content: item.answer,
                }))}
                multiple
              />
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
