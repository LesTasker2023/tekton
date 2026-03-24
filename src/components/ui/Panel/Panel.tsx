"use client";

import { useId, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { useDecorator } from "@/skins/SkinContext";
import styles from "./Panel.module.scss";

export type PanelVariant =
  | "default"
  | "interactive"
  | "accent"
  | "danger"
  | "ghost";
export type PanelSize = "sm" | "md" | "lg" | "flush";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: PanelVariant;
  size?: PanelSize;
  as?: "div" | "section" | "article" | "aside";
  noAnimation?: boolean;
  children: React.ReactNode;
}

const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
};

export function Panel({
  variant = "default",
  size = "md",
  as = "div",
  noAnimation = false,
  className = "",
  children,
  ...props
}: PanelProps) {
  const uid = useId();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const Decorator = useDecorator("Panel");

  const classes = [
    styles.panel,
    variant !== "default" && styles[`panel--${variant}`],
    size !== "md" && styles[`panel--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Tag = motionTags[as];

  return (
    <Tag
      className={classes}
      data-component="panel"
      data-variant={variant}
      {...(noAnimation
        ? {}
        : {
            variants: fadeIn,
            initial: "hidden",
            whileInView: "show",
            viewport: { once: true, margin: "-40px" },
          })}
      {...(props as Record<string, unknown>)}
    >
      <div className={styles.panelBg} data-part="bg" />
      {mounted && Decorator && <Decorator uid={uid} />}
      <div className={styles.content}>{children}</div>
    </Tag>
  );
}
