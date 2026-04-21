import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Converts a Sanity hotspot (0–1 x/y) to a CSS object-position value.
 * Apply to Next.js <Image> with fill or object-fit: cover so the focal
 * point stays in frame when the image is cropped at different aspect ratios.
 */
export function hotspotPosition(hotspot?: { x: number; y: number }): string {
  if (!hotspot) return "50% 50%";
  return `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`;
}
