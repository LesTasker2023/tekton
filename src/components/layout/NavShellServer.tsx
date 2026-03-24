import { client } from "@/sanity/client";
import { SITE_SETTINGS_QUERY, NAVIGATION_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import type { SiteSettings } from "@/types/siteSettings";
import { PlaceholderImageProvider } from "@/context/PlaceholderImageContext";
import { NavShell } from "./NavShell";
import { NavTopBar } from "./NavTopBar";

/**
 * Server wrapper that fetches site settings + navigation from Sanity
 * and passes them into the appropriate client-side nav component.
 */
export async function NavShellServer({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings: SiteSettings = {};
  try {
    const [siteSettings, nav] = await Promise.all([
      client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } }),
      client.fetch(NAVIGATION_QUERY, {}, { next: { revalidate: 60 } }),
    ]);
    settings = siteSettings ?? {};
    // Merge navigation data into settings for backward compat
    if (nav) {
      settings.mainNav = nav.mainNav;
      settings.footerText = nav.footerText;
      settings.footerLinks = nav.footerNav;
    }
  } catch {
    // Sanity not configured yet — fall back to defaults
  }

  // Pre-compute image URLs so the client component doesn't need urlFor
  const logoUrl = settings.logo
    ? urlFor(settings.logo).width(48).height(40).auto("format").url()
    : undefined;

  const content = (
    <PlaceholderImageProvider image={settings.placeholderImage ?? null}>
      {children}
    </PlaceholderImageProvider>
  );

  if (settings.navLayout === "topnav") {
    return (
      <NavTopBar settings={settings} logoUrl={logoUrl}>
        {content}
      </NavTopBar>
    );
  }

  return (
    <NavShell settings={settings} logoUrl={logoUrl}>
      {content}
    </NavShell>
  );
}
