import * as icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap = icons as unknown as Record<string, LucideIcon>;

/**
 * Resolves a Lucide icon name string to its React component.
 * Accepts kebab-case (e.g. "arrow-right" → ArrowRight).
 * Falls back to the `Box` icon when the name doesn't match.
 */
export function dynamicIcon(name: string): LucideIcon {
  const pascal = name
    .split("-")
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
    .join("");

  return iconMap[pascal] ?? icons.Box;
}
