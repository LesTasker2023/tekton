"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor, hotspotPosition } from "@/sanity/image";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/ui";
import styles from "./HeroSection.module.scss";

interface HeroSectionProps {
  heading: string;
  subheading?: string;
  backgroundImage?: { asset: { _ref: string }; hotspot?: { x: number; y: number } };
  backgroundVideoUrl?: string;
  cta?: { label?: string; href?: string };
  align?: "left" | "center";
}

export function HeroSection({
  heading,
  subheading,
  backgroundImage,
  backgroundVideoUrl,
  cta,
  align = "center",
}: HeroSectionProps) {
  const hasVideo = !!backgroundVideoUrl;
  const hasBg = hasVideo || !!backgroundImage?.asset;

  return (
    <motion.section
      className={`${styles.hero} ${styles[`hero--${align}`]}`}
      data-component="hero-section"
      data-has-bg={hasBg ? "true" : undefined}
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {hasVideo ? (
        <video
          className={styles.bgVideo}
          src={backgroundVideoUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : backgroundImage?.asset ? (
        <Image
          src={urlFor(backgroundImage).width(1920).auto("format").url()}
          alt=""
          fill
          priority
          className={styles.bgImage}
          style={{ objectPosition: hotspotPosition(backgroundImage.hotspot) }}
        />
      ) : null}
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.heading} data-part="heading">{heading}</h1>
        {subheading && <p className={styles.subheading}>{subheading}</p>}
        {cta?.label && cta?.href && (
          <a href={cta.href} className={styles.ctaLink}>
            <Button variant="primary" size="lg">
              {cta.label}
            </Button>
          </a>
        )}
      </div>
    </motion.section>
  );
}
