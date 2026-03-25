import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-01-01";

/**
 * Use a dummy projectId ("placeholder") so createClient() doesn't throw
 * at import time when the env var is missing (Vercel build, Storybook).
 * Queries will fail at runtime with a clear 404, not a cryptic crash.
 */
const safeProjectId = projectId || "placeholder";

export const client = createClient({
  projectId: safeProjectId,
  dataset,
  apiVersion,
  useCdn: true,
});

/** Preview client — no CDN, sees drafts */
export const previewClient = createClient({
  projectId: safeProjectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

/** Use previewClient when draftMode is active, otherwise normal client */
export function getClient(preview = false) {
  return preview ? previewClient : client;
}
