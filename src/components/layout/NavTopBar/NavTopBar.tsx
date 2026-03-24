"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import {
  Menu,
  X,
  Newspaper,
  BookOpen,
  CalendarDays,
  UserPlus,
} from "lucide-react";
import { dynamicIcon } from "@/lib/dynamicIcon";
import { Footer } from "@/components/layout/Footer";
import type { SiteSettings } from "@/types/siteSettings";
import styles from "./NavTopBar.module.scss";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const DEFAULT_NAV: NavItem[] = [
  { label: "News", href: "/news", icon: <Newspaper size={18} /> },
  { label: "Guides", href: "/guides", icon: <BookOpen size={18} /> },
  { label: "Events", href: "/events", icon: <CalendarDays size={18} /> },
  { label: "Join", href: "/join", icon: <UserPlus size={18} /> },
];

interface NavTopBarProps {
  children: React.ReactNode;
  settings?: SiteSettings;
  logoUrl?: string;
}

export function NavTopBar({ children, settings = {}, logoUrl }: NavTopBarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = useMemo<NavItem[]>(() => {
    const HIDDEN = ["/cms-guide"];
    if (!settings.mainNav?.length) return DEFAULT_NAV;
    return settings.mainNav
      .filter((link) => !HIDDEN.includes(link.href))
      .map((link) => {
        const Icon = link.icon ? dynamicIcon(link.icon) : dynamicIcon("box");
        return { label: link.label, href: link.href, icon: <Icon size={18} /> };
      });
  }, [settings.mainNav]);

  const siteName = settings.siteName ?? "Tekton";

  const isStudio = pathname.startsWith("/studio");
  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Analytics />
      <div className={styles.layout}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
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

            {/* Desktop nav */}
            <nav className={styles.desktopNav}>
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.navLink}
                    data-active={isActive}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile hamburger */}
            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            className={styles.overlay}
            onClick={() => setMobileOpen(false)}
          />
        )}
        <nav
          className={styles.mobileNav}
          data-open={mobileOpen}
        >
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={styles.mobileLink}
                data-active={isActive}
                onClick={() => setMobileOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Content */}
        <main className={styles.content}>
          {children}
          <Footer text={settings.footerText} />
        </main>
      </div>
    </>
  );
}
