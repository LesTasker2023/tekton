"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTopBar } from "@/context/TopBarContext";
import styles from "./NavShell.module.scss";

export function TopBar() {
  const pathname = usePathname();
  const { tabs, activeTab, setActiveTab } = useTopBar();

  const pageTitle = (() => {
    if (pathname === "/") return "Welcome";
    const seg = pathname.split("/").filter(Boolean)[0];
    return seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ");
  })();

  return (
    <header className={styles.topbar}>
      <div className={styles.tabs}>
        {tabs.length === 0 && (
          <span className={styles.tab} data-active={true}>
            {pageTitle}
          </span>
        )}
        {tabs.map((tab) =>
          tab.href ? (
            <Link
              key={tab.key}
              href={tab.href}
              className={styles.tab}
              data-active={activeTab === tab.key}
            >
              {tab.label}
            </Link>
          ) : (
            <button
              key={tab.key}
              className={styles.tab}
              data-active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              {tab.label}
            </button>
          ),
        )}
      </div>
    </header>
  );
}
