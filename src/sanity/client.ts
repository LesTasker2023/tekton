import { createClient, type SanityClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-01-01";

/**
 * Lazily-created clients — avoids crashing at import time when
 * NEXT_PUBLIC_SANITY_PROJECT_ID isn't set (e.g. during `next build`
 * on Vercel before env vars are wired, or in Storybook).
 */
let _client: SanityClient | undefined;
let _previewClient: SanityClient | undefined;

function ensureProjectId() {
  if (!projectId) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID — set it in .env.local or your hosting environment.",
    );
  }
}

export function getClient(preview = false): SanityClient {
  ensureProjectId();
  if (preview) {
    if (!_previewClient) {
      _previewClient = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: process.env.SANITY_API_READ_TOKEN,
      });
    }
    return _previewClient;
  }
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }
  return _client;
}

/** @deprecated Use getClient() instead */
export const client = new Proxy({} as SanityClient, {
  get(_, prop) {
    return (getClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

/** @deprecated Use getClient(true) instead */
export const previewClient = new Proxy({} as SanityClient, {
  get(_, prop) {
    return (getClient(true) as unknown as Record<string | symbol, unknown>)[prop];
  },
});
