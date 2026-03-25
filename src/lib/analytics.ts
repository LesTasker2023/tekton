/**
 * GA4 Analytics — thin gtag wrapper.
 *
 * The measurement ID comes from either:
 *   - NEXT_PUBLIC_GA_MEASUREMENT_ID env var (build-time)
 *   - Sanity siteSettings.gaMeasurementId (runtime, passed to GoogleAnalytics component)
 *
 * Recharts SVG elements need computed hex — CSS vars don't work in SVG fill/stroke,
 * but analytics is pure JS so no styling concerns here.
 */

type GtagCommand = "config" | "event" | "set" | "consent";

declare global {
  interface Window {
    gtag?: (...args: [GtagCommand, string, Record<string, unknown>?]) => void;
    dataLayer?: unknown[];
  }
}

/** Check if gtag is loaded and available */
function isGtagReady(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

/**
 * Track a custom GA4 event.
 *
 * @example
 *   trackEvent("cta_click", { label: "Get Started", section: "hero" });
 *   trackEvent("form_submit", { form: "contact" });
 */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (!isGtagReady()) return;
  window.gtag!("event", name, params ?? {});
}

/**
 * Track a page view manually (useful for SPA navigation).
 * Next.js App Router triggers page_view automatically via the gtag config,
 * but this can be called explicitly if needed.
 */
export function trackPageView(url: string, title?: string): void {
  if (!isGtagReady()) return;
  window.gtag!("event", "page_view", {
    page_location: url,
    ...(title ? { page_title: title } : {}),
  });
}

/* ── Predefined event helpers ── */

export function trackCtaClick(label: string, section?: string): void {
  trackEvent("cta_click", { label, ...(section ? { section } : {}) });
}

export function trackFormSubmit(form: string): void {
  trackEvent("form_submit", { form });
}

export function trackSectionView(section: string): void {
  trackEvent("section_view", { section });
}
