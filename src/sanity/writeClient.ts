import "server-only";
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./client";

/**
 * Sanity client with write permissions — server-only.
 * Used by server actions to create/update documents (bookings, etc.).
 */
export const writeClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
