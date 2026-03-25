import type { SanityImageSource } from "@sanity/image-url";
export type { SanityImageSource };

/**
 * A Sanity image object as returned by GROQ queries.
 * Narrower than SanityImageSource — guarantees the `asset` field exists.
 */
export interface SanityImageObject {
  _type?: "image";
  asset?: { _ref?: string; _id?: string; url?: string };
  hotspot?: { x: number; y: number; height?: number; width?: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}
