import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { NavShellServer } from "@/components/layout";
import { TopBarProvider } from "@/context/TopBarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SkinProvider } from "@/skins/SkinContext";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import { SanityLive } from "@/sanity/live";
import { getClient } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import "@/styles/globals.scss";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono-next",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getClient(false).fetch(
    SITE_SETTINGS_QUERY,
    {},
    { next: { revalidate: 30 } },
  );

  const siteName = settings?.siteName ?? "Tekton";
  const seoTitle = settings?.seoTitle ?? `${siteName} — Built with Tekton`;
  const seoDesc =
    settings?.seoDescription ??
    "A modern content-driven website powered by Next.js and Sanity CMS.";

  const ogImageUrl = settings?.ogImage
    ? urlFor(settings.ogImage).width(1200).height(630).auto("format").url()
    : "/og-image.png";

  // Favicon: prefer CMS image, fall back to static files
  const faviconFromCms = settings?.favicon;
  const iconEntries = faviconFromCms
    ? [
        {
          url: urlFor(faviconFromCms).width(32).height(32).format("png").url(),
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: urlFor(faviconFromCms)
            .width(192)
            .height(192)
            .format("png")
            .url(),
          sizes: "192x192",
          type: "image/png",
        },
      ]
    : [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/icon.webp", sizes: "192x192", type: "image/webp" },
      ];
  const appleIcon = faviconFromCms
    ? urlFor(faviconFromCms).width(180).height(180).format("png").url()
    : "/apple-touch-icon.png";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: seoTitle,
      template: `%s | ${siteName}`,
    },
    description: seoDesc,
    keywords: [
      "Tekton",
      "Next.js",
      "Sanity CMS",
      "content management",
      "website builder",
    ],
    icons: {
      icon: iconEntries,
      apple: appleIcon,
    },
    openGraph: {
      type: "website",
      siteName,
      title: seoTitle,
      description: seoDesc,
      url: SITE_URL,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: [ogImageUrl],
    },
  };
}

// Blocking script to restore dark/light mode before first paint (eliminates FOUC).
// Only restores the color-scheme preference; all color values come from CMS via ThemeContext.
const THEME_INIT_SCRIPT = `(function(){try{var m=localStorage.getItem("tekton-mode");if(m==="dark"||m==="light"){document.documentElement.dataset.theme=m;document.documentElement.style.colorScheme=m}}catch(e){}})()`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch settings for theme defaults (deduped with generateMetadata via Next.js cache)
  let defaultHue: number | undefined;
  let defaultMode: "dark" | "light" | undefined;
  let skinName = "vanilla";
  let contentWidth = "1440";
  let gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
  try {
    const settings = await getClient(false).fetch(
      SITE_SETTINGS_QUERY,
      {},
      { next: { revalidate: 30 } },
    );
    defaultHue = settings?.defaultThemeHue;
    defaultMode = settings?.defaultThemeMode;
    if (settings?.skin) skinName = settings.skin;
    if (settings?.contentWidth) contentWidth = settings.contentWidth;
    if (settings?.gaMeasurementId) gaMeasurementId = settings.gaMeasurementId;
  } catch {
    // Sanity not configured yet
  }

  const contentMaxWidth = contentWidth === "full" ? "100%" : `${contentWidth}px`;

  return (
    <html lang="en" data-skin={skinName} className={`${inter.variable} ${jetbrainsMono.variable}`} style={{ "--content-max-width": contentMaxWidth } as React.CSSProperties} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>
        <SkinProvider skinName={skinName}>
          <ThemeProvider defaultHue={defaultHue} defaultMode={defaultMode}>
            <TopBarProvider>
              <NavShellServer>{children}</NavShellServer>
            </TopBarProvider>
          </ThemeProvider>
        </SkinProvider>
        {gaMeasurementId && <GoogleAnalytics measurementId={gaMeasurementId} />}
        {(await draftMode()).isEnabled && (
          <>
            <SanityLive />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
