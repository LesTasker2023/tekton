"use client";

import { useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Accordion.module.scss";

export interface AccordionItem {
  key: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  /** Accordion items to render */
  items: AccordionItem[];
  /** Allow multiple items open (default: false) */
  multiple?: boolean;
  /** Additional className */
  className?: string;
}

export function Accordion({
  items,
  multiple = false,
  className = "",
}: AccordionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(
    (e: React.ToggleEvent<HTMLDetailsElement>) => {
      if (multiple || !e.currentTarget.open) return;
      const siblings = containerRef.current?.querySelectorAll("details[open]");
      siblings?.forEach((el) => {
        if (el !== e.currentTarget) (el as HTMLDetailsElement).open = false;
      });
    },
    [multiple],
  );

  return (
    <div
      ref={containerRef}
      className={`${styles.accordion} ${className}`}
      data-component="accordion"
    >
      {items.map((item) => (
        <details
          key={item.key}
          className={styles.accordion__item}
          onToggle={handleToggle}
        >
          <summary
            className={styles.accordion__trigger}
            aria-disabled={item.disabled}
            onClick={(e) => {
              if (item.disabled) e.preventDefault();
            }}
          >
            <span className={styles.accordion__title}>{item.title}</span>
            <ChevronDown size={16} className={styles.accordion__chevron} />
          </summary>
          <div className={styles.accordion__content}>{item.content}</div>
        </details>
      ))}
    </div>
  );
}
