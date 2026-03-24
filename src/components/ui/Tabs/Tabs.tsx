"use client";

import { useState, useRef, useCallback, useId } from "react";
import styles from "./Tabs.module.scss";

export interface TabItem {
  key: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  /** Tab definitions */
  items: TabItem[];
  /** Controlled active tab key */
  activeKey?: string;
  /** Called when active tab changes */
  onChange?: (key: string) => void;
  /** Default active tab (uncontrolled) */
  defaultActiveKey?: string;
  /** Visual style */
  variant?: "underline" | "pills";
}

export function Tabs({
  items,
  activeKey,
  onChange,
  defaultActiveKey,
  variant = "underline",
}: TabsProps) {
  const uid = useId();
  const [internalKey, setInternalKey] = useState(
    defaultActiveKey ?? items[0]?.key ?? "",
  );
  const tabListRef = useRef<HTMLDivElement>(null);

  const current = activeKey ?? internalKey;

  const select = useCallback(
    (key: string) => {
      if (!activeKey) setInternalKey(key);
      onChange?.(key);
    },
    [activeKey, onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const enabledItems = items.filter((t) => !t.disabled);
      const idx = enabledItems.findIndex((t) => t.key === current);
      let next = idx;

      if (e.key === "ArrowRight") next = (idx + 1) % enabledItems.length;
      else if (e.key === "ArrowLeft")
        next = (idx - 1 + enabledItems.length) % enabledItems.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = enabledItems.length - 1;
      else return;

      e.preventDefault();
      const nextKey = enabledItems[next].key;
      select(nextKey);

      const btn = tabListRef.current?.querySelector(
        `[data-tab-key="${nextKey}"]`,
      ) as HTMLButtonElement | null;
      btn?.focus();
    },
    [items, current, select],
  );

  const activeItem = items.find((t) => t.key === current);

  return (
    <div className={styles.tabs} data-component="tabs" data-variant={variant}>
      <div
        ref={tabListRef}
        className={`${styles.tabs__list} ${styles[`tabs__list--${variant}`]}`}
        role="tablist"
        onKeyDown={handleKeyDown}
      >
        {items.map((tab) => {
          const isActive = tab.key === current;
          return (
            <button
              key={tab.key}
              role="tab"
              id={`${uid}-tab-${tab.key}`}
              aria-selected={isActive}
              aria-controls={`${uid}-panel-${tab.key}`}
              aria-disabled={tab.disabled}
              tabIndex={isActive ? 0 : -1}
              data-tab-key={tab.key}
              className={`${styles.tabs__tab} ${isActive ? styles["tabs__tab--active"] : ""}`}
              disabled={tab.disabled}
              onClick={() => select(tab.key)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {activeItem && (
        <div
          role="tabpanel"
          id={`${uid}-panel-${activeItem.key}`}
          aria-labelledby={`${uid}-tab-${activeItem.key}`}
          className={styles.tabs__panel}
          tabIndex={0}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
