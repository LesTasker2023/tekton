"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "@/components/ui";
import { fadeIn, staggerContainer, fadeUp } from "@/lib/motion";
import { urlFor } from "@/sanity/image";
import styles from "./LogoCloudSection.module.scss";

interface LogoItem {
  name: string;
  image: { asset: { _ref: string } };
  href?: string;
}

interface LogoCloudSectionProps {
  heading?: string;
  subheading?: string;
  logos: LogoItem[];
  columns?: number;
  grayscale?: boolean;
}

export function LogoCloudSection({
  heading,
  subheading,
  logos,
  columns = 5,
  grayscale = true,
}: LogoCloudSectionProps) {
  if (!logos?.length) return null;

  const sectionClass = [styles.section, grayscale && styles["section--grayscale"]]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.section
      className={sectionClass}
      data-component="logo-cloud"
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {(heading || subheading) && (
        <div className={styles.header}>
          {heading && <SectionHeader title={heading} />}
          {subheading && (
            <p className={styles.subheading}>{subheading}</p>
          )}
        </div>
      )}
      <motion.div
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {logos.map((logo, i) => {
          const img = (
            <Image
              className={styles.image}
              src={urlFor(logo.image).width(200).height(80).url()}
              alt={logo.name}
              width={200}
              height={80}
            />
          );

          return (
            <motion.div key={i} className={styles.item} variants={fadeUp}>
              {logo.href ? (
                <a
                  href={logo.href}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${logo.name} (opens in new window)`}
                >
                  {img}
                </a>
              ) : (
                img
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
