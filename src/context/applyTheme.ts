import { hslToRgb, rgbToHex } from "@/lib/color";
import type { ThemeConfig, ThemeColors } from "./themeTypes";

/* ── Fixed theme values (not user-configurable) ── */
const BG_LIGHTNESS = 4;
const BG_TINT = 0;
const MUTED_LIGHTNESS = 33;

/** Derive computed color values from a theme config. */
export function computeColors(config: ThemeConfig): ThemeColors {
  const { mode, hue } = config;
  const [pr, pg, pb] = hslToRgb(hue, 90, mode === "dark" ? 45 : 42);
  return {
    primary: rgbToHex(pr, pg, pb),
    primaryRgb: `${pr}, ${pg}, ${pb}`,
    accent: rgbToHex(pr, pg, pb),
    accentRgb: `${pr}, ${pg}, ${pb}`,
  };
}

/** Apply theme to <html> via CSS custom properties. */
export function applyTheme(config: ThemeConfig) {
  const root = document.documentElement;
  const { mode, hue } = config;

  const [pr, pg, pb] = hslToRgb(hue, 90, mode === "dark" ? 45 : 42);
  const [ar, ag, ab] = [pr, pg, pb];

  root.dataset.theme = mode;
  root.style.colorScheme = mode;

  // ── Core colors ──
  root.style.setProperty("--color-primary", `rgb(${pr}, ${pg}, ${pb})`);
  root.style.setProperty("--color-primary-rgb", `${pr}, ${pg}, ${pb}`);
  root.style.setProperty("--color-accent", `rgb(${ar}, ${ag}, ${ab})`);
  root.style.setProperty("--color-accent-rgb", `${ar}, ${ag}, ${ab}`);
  root.style.setProperty("--text-accent", `rgb(${pr}, ${pg}, ${pb})`);

  // ── Backgrounds ──
  const sat = BG_TINT;
  if (mode === "light") {
    const baseL = 85 + (BG_LIGHTNESS / 100) * 15;
    const [b0r, b0g, b0b] = hslToRgb(hue, sat, Math.min(baseL, 100));
    const [b1r, b1g, b1b] = hslToRgb(hue, sat, Math.min(baseL - 4, 100));
    const [b2r, b2g, b2b] = hslToRgb(hue, sat, Math.min(baseL + 3, 100));

    root.style.setProperty("--bg-base", rgbToHex(b0r, b0g, b0b));
    root.style.setProperty("--bg-base-rgb", `${b0r}, ${b0g}, ${b0b}`);
    root.style.setProperty("--bg-surface", rgbToHex(b1r, b1g, b1b));
    root.style.setProperty("--bg-panel", `rgba(${b2r}, ${b2g}, ${b2b}, 0.92)`);
    root.style.setProperty("--bg-elevated", rgbToHex(b2r, b2g, b2b));
    root.style.setProperty("--bg-hover", `rgba(255, 255, 255, 0.06)`);
    root.style.setProperty("--bg-active", `rgba(255, 255, 255, 0.10)`);

    root.style.setProperty("--text-primary", "#1a1a1a");
    root.style.setProperty("--text-secondary", "#525252");
    {
      const mL = 56 + ((100 - MUTED_LIGHTNESS) / 100) * 24;
      const [mr, mg, mb] = hslToRgb(hue, 0, mL);
      root.style.setProperty("--text-muted", `rgb(${mr}, ${mg}, ${mb})`);
    }
    root.style.setProperty("--text-bright", "#0a0a0a");
    root.style.setProperty("--text-on-accent", "#ffffff");
  } else {
    const baseL = 2 + (BG_LIGHTNESS / 100) * 16;
    const [b0r, b0g, b0b] = hslToRgb(hue, sat, baseL);
    const [b1r, b1g, b1b] = hslToRgb(hue, sat, baseL + 3);
    const [b2r, b2g, b2b] = hslToRgb(hue, sat, baseL + 6);

    root.style.setProperty("--bg-base", rgbToHex(b0r, b0g, b0b));
    root.style.setProperty("--bg-base-rgb", `${b0r}, ${b0g}, ${b0b}`);
    root.style.setProperty("--bg-surface", rgbToHex(b1r, b1g, b1b));
    root.style.setProperty("--bg-panel", `rgba(${b1r}, ${b1g}, ${b1b}, 0.85)`);
    root.style.setProperty("--bg-elevated", rgbToHex(b2r, b2g, b2b));
    root.style.setProperty("--bg-hover", `rgba(255, 255, 255, 0.06)`);
    root.style.setProperty("--bg-active", `rgba(255, 255, 255, 0.08)`);

    root.style.setProperty("--text-primary", "#e2e8f0");
    root.style.setProperty("--text-secondary", "#a1a1a1");
    {
      const mL = 28 + (MUTED_LIGHTNESS / 100) * 50;
      const [mr, mg, mb] = hslToRgb(hue, 0, mL);
      root.style.setProperty("--text-muted", `rgb(${mr}, ${mg}, ${mb})`);
    }
    root.style.setProperty("--text-bright", "#fafaf9");
    root.style.setProperty("--text-on-accent", "#0a0a0a");
  }

  // ── Borders ──
  const bNeutral = mode === "light" ? [0.1, 0.18] : [0.08, 0.14];
  const bAccent = mode === "light" ? [0.4, 0.45] : [0.35, 0.4];
  root.style.setProperty("--border-subtle", `rgba(255, 255, 255, ${bNeutral[0]})`);
  root.style.setProperty("--border-default", `rgba(255, 255, 255, ${bNeutral[1]})`);
  root.style.setProperty("--border-strong", `rgba(255, 255, 255, ${mode === "light" ? 0.2 : 0.25})`);
  root.style.setProperty("--border-accent", `rgba(${ar}, ${ag}, ${ab}, ${bAccent[1]})`);

  // ── Glows ──
  const gMul = mode === "light" ? 0.5 : 1;
  root.style.setProperty("--glow-sm", `0 0 8px rgba(${pr}, ${pg}, ${pb}, ${0.2 * gMul})`);
  root.style.setProperty("--glow-md", `0 0 16px rgba(${pr}, ${pg}, ${pb}, ${0.25 * gMul})`);
  root.style.setProperty("--glow-lg", `0 0 32px rgba(${pr}, ${pg}, ${pb}, ${0.2 * gMul})`);
  root.style.setProperty("--glow-accent", `0 0 16px rgba(${ar}, ${ag}, ${ab}, ${0.3 * gMul})`);
  root.style.setProperty("--shadow-dropdown", mode === "light" ? "0 8px 24px rgba(0,0,0,0.12)" : "0 8px 24px rgba(0,0,0,0.4)");
}
