"use client";

import { motion } from "framer-motion";
import { Panel } from "@/components/ui";
import { ContactForm } from "@/components/ui/ContactForm";
import { fadeIn } from "@/lib/motion";
import styles from "./ContactSection.module.scss";

interface ContactSectionProps {
  heading?: string;
  confirmationMessage?: string;
}

export function ContactSection({
  heading,
  confirmationMessage,
}: ContactSectionProps) {
  return (
    <motion.section
      className={styles.section}
      data-component="contact-section"
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      <Panel size="lg">
        <div className={styles.inner}>
          <ContactForm
            heading={heading}
            confirmationMessage={confirmationMessage}
          />
        </div>
      </Panel>
    </motion.section>
  );
}
