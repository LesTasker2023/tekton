"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Panel, SectionHeader } from "@/components/ui";
import { fadeIn, staggerContainer, fadeUp } from "@/lib/motion";
import styles from "./PricingSection.module.scss";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: PricingFeature[];
  cta?: { label: string; href: string };
  featured?: boolean;
}

interface PricingSectionProps {
  heading?: string;
  subheading?: string;
  tiers: PricingTier[];
}

function TierCard({ tier }: { tier: PricingTier }) {
  const cardClass = [styles.tier, tier.featured && styles["tier--featured"]]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div className={cardClass} variants={fadeUp}>
      <Panel>
        <div className={styles.tierInner}>
          {tier.featured && (
            <div className={styles.badge}>Popular</div>
          )}
          <div className={styles.name}>{tier.name}</div>
          <div className={styles.priceRow}>
            <span className={styles.price}>{tier.price}</span>
            {tier.period && (
              <span className={styles.period}>{tier.period}</span>
            )}
          </div>
          {tier.description && (
            <p className={styles.description}>{tier.description}</p>
          )}
          <ul className={styles.features}>
            {tier.features.map((f, i) => (
              <li
                key={i}
                className={
                  f.included
                    ? styles["feature--included"]
                    : styles["feature--excluded"]
                }
              >
                <span className={styles.featureIcon}>
                  {f.included ? (
                    <Check size={16} aria-hidden="true" />
                  ) : (
                    <X size={16} aria-hidden="true" />
                  )}
                </span>
                {f.text}
              </li>
            ))}
          </ul>
          {tier.cta && (
            <div className={styles.cta}>
              <a href={tier.cta.href} className={styles.ctaLink}>
                {tier.cta.label}
              </a>
            </div>
          )}
        </div>
      </Panel>
    </motion.div>
  );
}

export function PricingSection({
  heading,
  subheading,
  tiers,
}: PricingSectionProps) {
  if (!tiers?.length) return null;

  return (
    <motion.section
      className={styles.section}
      data-component="pricing-section"
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
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {tiers.map((tier, i) => (
          <TierCard key={i} tier={tier} />
        ))}
      </motion.div>
    </motion.section>
  );
}
