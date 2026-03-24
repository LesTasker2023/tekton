"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import {
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Newspaper,
  BookOpen,
  CalendarDays,
  UserPlus,
} from "lucide-react";
import { dynamicIcon } from "@/lib/dynamicIcon";
import { Footer } from "@/components/layout/Footer";
import { useTopBar } from "@/context/TopBarContext";
import type { SiteSettings } from "@/types/siteSettings";
import { TopBar } from "./TopBar";
import { SubBar } from "./SubBar";
import styles from "./NavShell.module.scss";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const DEFAULT_NAV: NavItem[] = [
  { label: "News", href: "/news", icon: <Newspaper size={20} /> },
  { label: "Guides", href: "/guides", icon: <BookOpen size={20} /> },
  { label: "Events", href: "/events", icon: <CalendarDays size={20} /> },
  { label: "Join", href: "/join", icon: <UserPlus size={20} /> },
];

export interface NavShellProps {
  children: React.ReactNode;
  settings?: SiteSettings;
  logoUrl?: string;
}

export function NavShell({ children, settings = {}, logoUrl }: NavShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("nav-expanded");
    return stored !== null ? stored === "true" : true;
  });

  useEffect(() => {
    localStorage.setItem("nav-expanded", String(expanded));
  }, [expanded]);

  const { subTabs } = useTopBar();

  const navItems = useMemo<NavItem[]>(() => {
    const HIDDEN = ["/cms-guide"];
    if (!settings.mainNav?.length) return DEFAULT_NAV;
    return settings.mainNav
      .filter((link) => !HIDDEN.includes(link.href))
      .map((link) => {
        const Icon = link.icon ? dynamicIcon(link.icon) : dynamicIcon("box");
        return { label: link.label, href: link.href, icon: <Icon size={20} /> };
      });
  }, [settings.mainNav]);

  const siteName = settings.siteName ?? "Tekton";

  if (pathname.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <>
      <Analytics />
      <div
        className={styles.shell}
        data-expanded={expanded}
        data-has-subbar={subTabs.length > 0}
      >
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <aside
          className={styles.sidebar}
          data-open={mobileOpen}
          data-expanded={expanded}
        >
          <Link
            href="/"
            className={styles.logo}
            data-expanded={expanded}
            onClick={() => window.dispatchEvent(new CustomEvent("hero:reset"))}
          >
            <Image
              src={logoUrl ?? "/images/logo.webp"}
              alt=""
              width={24}
              height={20}
              className={styles.logoIcon}
              priority
            />
            <span className={styles.logoLabel}>{siteName}</span>
          </Link>

          <nav className={styles.nav}>
            <div className={styles.navGroup}>
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.navItem}
                    data-active={isActive}
                    title={!expanded ? item.label : undefined}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.icon}
                    <span className={styles.navLabel}>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <button
            className={styles.expandToggle}
            onClick={() => setExpanded((e) => !e)}
            title={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        </aside>

        <TopBar />
        <SubBar />

        <main className={styles.content}>
          {children}
          <Footer text={settings.footerText} />
        </main>
      </div>
    </>
  );
}
