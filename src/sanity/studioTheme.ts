"use client";

/**
 * Sanity Studio theme — uses default Sanity colours with slightly
 * tighter border-radii. No custom colour overrides so the Studio
 * stays neutral regardless of the site's brand colours.
 */
import { buildTheme } from "@sanity/ui/theme";

export const tektonTheme = buildTheme({
  /* Slightly sharper radii than the Sanity default */
  radius: [0, 2, 4, 6, 8, 12],
});
