"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Panel, SectionHeader } from "@/components/ui";
import { fadeIn, staggerContainer, fadeUp } from "@/lib/motion";
import { urlFor } from "@/sanity/image";
import styles from "./TestimonialSection.module.scss";

interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: { asset: { _ref: string } };
}

interface TestimonialSectionProps {
  heading?: string;
  testimonials: Testimonial[];
  layout?: "grid" | "carousel" | "stacked";
  columns?: number;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const roleCompany = [testimonial.role, testimonial.company]
    .filter(Boolean)
    .join(", ");

  return (
    <motion.div variants={fadeUp}>
      <Panel>
        <div className={styles.card} data-part="card">
          <blockquote className={styles.quote}>
            <p>{testimonial.quote}</p>
          </blockquote>
          <div className={styles.author}>
            <div className={styles.avatar}>
              {testimonial.avatar ? (
                <Image
                  src={urlFor(testimonial.avatar).width(64).height(64).url()}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                />
              ) : (
                <span className={styles.initials} aria-label={`Avatar for ${testimonial.name}`}>
                  {getInitials(testimonial.name)}
                </span>
              )}
            </div>
            <div>
              <div className={styles.name}>{testimonial.name}</div>
              {roleCompany && (
                <div className={styles.role}>{roleCompany}</div>
              )}
            </div>
          </div>
        </div>
      </Panel>
    </motion.div>
  );
}

export function TestimonialSection({
  heading,
  testimonials,
  layout = "grid",
  columns = 3,
}: TestimonialSectionProps) {
  if (!testimonials?.length) return null;

  const sectionClass = [
    styles.section,
    layout === "stacked" && styles["section--stacked"],
    layout === "carousel" && styles["section--carousel"],
  ]
    .filter(Boolean)
    .join(" ");

  const displayItems =
    layout === "carousel" ? testimonials.slice(0, 1) : testimonials;

  return (
    <motion.section
      className={sectionClass}
      data-component="testimonial-section"
      data-layout={layout}
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {heading && <SectionHeader title={heading} />}
      <motion.div
        className={styles.grid}
        style={
          layout === "grid"
            ? { gridTemplateColumns: `repeat(${columns}, 1fr)` }
            : undefined
        }
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {displayItems.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} />
        ))}
      </motion.div>
    </motion.section>
  );
}
