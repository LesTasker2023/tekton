import Script from "next/script";

export interface GoogleAnalyticsProps {
  /** GA4 measurement ID (e.g. G-XXXXXXXXXX) */
  measurementId: string;
}

/**
 * Loads Google Analytics 4 via next/script.
 * Renders nothing if no measurement ID is provided.
 * Should be placed in the root layout inside <body>.
 */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
