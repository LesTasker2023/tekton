"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui";
import styles from "./SiteHero.module.scss";

interface SiteHeroProps {
  /** Main title — wrap key word in * for accent styling */
  title: string;
  /** Tagline displayed below the title */
  tagline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Array of video paths for the background */
  videos?: string[];
}

/* ── Stagger orchestration ── */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const slideUp: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const fadeScale: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Render the title, splitting `*word*` segments into accent spans.
 */
function renderTitle(raw: string) {
  const parts = raw.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <span key={i} className={styles.titleAccent} data-part="title-accent">
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
}

export function SiteHero({
  title,
  tagline,
  primaryCta,
  secondaryCta,
  videos = [],
}: SiteHeroProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const transitioningRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  const hasVideos = videos.length > 0;

  useEffect(() => setMounted(true), []);

  /* Fade to black -> advance -> snap back in */
  const triggerTransition = useCallback(() => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setVisible(false);
    timerRef.current = setTimeout(() => {
      if (videos.length > 1) {
        setActiveIdx((prev) => (prev + 1) % videos.length);
      } else {
        const vid = videoRef.current;
        if (vid) {
          vid.currentTime = 0;
          vid.play().catch(() => {});
        }
        transitioningRef.current = false;
        setTimeout(() => setVisible(true), 100);
      }
    }, 800);
  }, [videos.length]);

  const handleTimeUpdate = useCallback(() => {
    const vid = videoRef.current;
    if (!vid || transitioningRef.current) return;
    const remaining = vid.duration - vid.currentTime;
    if (isFinite(remaining) && remaining < 1.0) triggerTransition();
  }, [triggerTransition]);

  useEffect(() => {
    if (!hasVideos) return;
    transitioningRef.current = false;
    const vid = videoRef.current;
    if (!vid) return;
    vid.load();
    vid.play().catch(() => {});
    setTimeout(() => setVisible(true), 0);
  }, [activeIdx, hasVideos]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  useEffect(() => {
    if (videos.length < 2) return;
    const nextIdx = (activeIdx + 1) % videos.length;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = videos[nextIdx];
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [activeIdx, videos]);

  return (
    <section className={styles.hero} data-component="site-hero">
      {/* Video background */}
      {hasVideos && <div className={styles.videoBackdrop} aria-hidden />}
      {hasVideos && (
        <div
          className={`${styles.videoBg} ${visible ? styles.videoVisible : ""}`}
        >
          <video
            ref={videoRef}
            className={styles.video}
            src={videos[activeIdx]}
            muted
            playsInline
            autoPlay
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={triggerTransition}
          />
        </div>
      )}

      <div className={styles.overlay} aria-hidden />

      {/* Content */}
      <motion.div
        className={styles.content}
        variants={stagger}
        initial="hidden"
        animate={mounted ? "show" : "hidden"}
      >
        <motion.h1 className={styles.title} variants={slideUp} data-part="title">
          {renderTitle(title)}
        </motion.h1>

        {tagline && (
          <motion.p className={styles.tagline} variants={slideUp}>
            {tagline}
          </motion.p>
        )}

        {(primaryCta || secondaryCta) && (
          <motion.div className={styles.actions} variants={fadeScale}>
            {primaryCta && (
              <Link href={primaryCta.href} className={styles.ctaLink}>
                <Button variant="primary" size="lg">
                  {primaryCta.label}
                </Button>
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className={styles.ctaLink}>
                <Button variant="ghost" size="lg">
                  {secondaryCta.label}
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>

    </section>
  );
}
