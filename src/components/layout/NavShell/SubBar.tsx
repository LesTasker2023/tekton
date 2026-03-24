"use client";

import Link from "next/link";
import { useTopBar } from "@/context/TopBarContext";
import styles from "./NavShell.module.scss";

export function SubBar() {
  const {
    subTabs,
    activeSubTab,
    setActiveSubTab,
    activeSubTabs,
    subTabMultiSelect,
    toggleSubTab,
  } = useTopBar();

  if (subTabs.length === 0) return null;

  return (
    <div className={styles.subbar}>
      <div className={styles.subTabs}>
        {subTabs.map((tab) => {
          const isActive = subTabMultiSelect
            ? activeSubTabs.size === 0 || activeSubTabs.has(tab.key)
            : activeSubTab === tab.key;

          const accentStyle =
            subTabMultiSelect && isActive && tab.color
              ? { borderBottomColor: tab.color, color: tab.color }
              : undefined;

          return tab.href ? (
            <Link
              key={tab.key}
              href={tab.href}
              className={styles.subTab}
              data-active={isActive}
              style={accentStyle}
            >
              {tab.label}
            </Link>
          ) : (
            <button
              key={tab.key}
              className={styles.subTab}
              data-active={isActive}
              style={accentStyle}
              onClick={() =>
                subTabMultiSelect
                  ? toggleSubTab(tab.key)
                  : setActiveSubTab(tab.key)
              }
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
