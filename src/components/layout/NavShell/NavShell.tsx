"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import {
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
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
  children?: NavItem[];
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

  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

  const toggleGroup = useCallback((label: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }, []);

  const navItems = useMemo<NavItem[]>(() => {
    const HIDDEN = ["/cms-guide"];
    if (!settings.mainNav?.length) return DEFAULT_NAV;
    return settings.mainNav
      .filter((link) => !HIDDEN.includes(link.href))
      .map((link) => {
        const Icon = link.icon ? dynamicIcon(link.icon) : dynamicIcon("box");
        const children = link.children?.length
          ? link.children.map((child) => {
              const ChildIcon = child.icon
                ? dynamicIcon(child.icon)
                : dynamicIcon("circle");
              return {
                label: child.label,
                href: child.href,
                icon: <ChildIcon size={16} />,
              };
            })
          : undefined;
        return {
          label: link.label,
          href: link.href,
          icon: <Icon size={20} />,
          children,
        };
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
                const hasChildren = !!item.children?.length;
                const isGroupOpen = openGroups.has(item.label);
                const childActive = hasChildren && item.children!.some(
                  (c) => pathname === c.href || pathname.startsWith(c.href + "/"),
                );
                const isActive =
                  !hasChildren &&
                  (pathname === item.href ||
                    pathname.startsWith(item.href + "/"));

                if (hasChildren) {
                  return (
                    <div key={item.label} className={styles.navGroupNested}>
                      <button
                        className={styles.navItem}
                        data-active={childActive}
                        title={!expanded ? item.label : undefined}
                        onClick={() => toggleGroup(item.label)}
                      >
                        {item.icon}
                        <span className={styles.navLabel}>{item.label}</span>
                        <ChevronDown
                          size={12}
                          className={styles.navGroupChevron}
                          data-open={isGroupOpen}
                        />
                      </button>
                      {isGroupOpen && (
                        <div className={styles.navChildren}>
                          {item.children!.map((child) => {
                            const isChildActive =
                              pathname === child.href ||
                              pathname.startsWith(child.href + "/");
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={styles.navChild}
                                data-active={isChildActive}
                                title={!expanded ? child.label : undefined}
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.icon}
                                <span className={styles.navLabel}>
                                  {child.label}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

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
