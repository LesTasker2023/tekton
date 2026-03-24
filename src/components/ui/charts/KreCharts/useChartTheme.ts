"use client";

import { useMemo } from "react";
import { useThemeColors } from "@/context/ThemeContext";

/* ── Chart-specific accent colors for data series ──
   These are intentionally distinct from design tokens — they exist
   for visual separation between data series on charts. */
const SERIES_PINK = "#f472b6";
const SERIES_VIOLET = "#a78bfa";
const SERIES_EMERALD = "#34d399";
const SERIES_CYAN = "#22d3ee";
const SERIES_ORANGE = "#fb923c";
const SERIES_SILVER = "#e2e8f0";

/* ── Semantic colors (mirror tokens.scss values) ──
   Recharts SVG elements need computed hex — CSS vars don't work in SVG fill/stroke. */
const TEXT_PRIMARY = "#e2e8f0";
const TEXT_SECONDARY = "#a1a1a1";
const TEXT_MUTED = "#94a3b8";
const BG_SURFACE_ALPHA = "rgba(18, 18, 18, 0.95)";
const BG_DEEP = "#0a1020";

/**
 * Returns a live chart theme that updates when the user changes the accent
 * colour or switches light/dark mode.
 *
 * Drop-in replacement for the static chart-theme.ts exports.
 */
export function useChartTheme() {
  const { primary, primaryRgb, accent, accentRgb } = useThemeColors();

  return useMemo(() => {
    const PALETTE = [
      primary,
      SERIES_PINK,
      accent,
      SERIES_VIOLET,
      SERIES_EMERALD,
      SERIES_CYAN,
      SERIES_ORANGE,
      SERIES_SILVER,
    ];

    const DUO = { a: primary, b: SERIES_PINK };

    const AXIS = {
      tick: {
        fill: TEXT_SECONDARY,
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
      },
      axisLine: { stroke: `rgba(${primaryRgb}, 0.15)` },
      tickLine: false as const,
    };

    const GRID = {
      stroke: `rgba(${primaryRgb}, 0.08)`,
      strokeDasharray: "3 3",
    };

    const TOOLTIP_STYLE = {
      contentStyle: {
        background: BG_SURFACE_ALPHA,
        border: `1px solid rgba(${primaryRgb}, 0.25)`,
        borderRadius: 4,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        color: TEXT_PRIMARY,
        boxShadow: `0 0 20px rgba(${primaryRgb}, 0.15)`,
      },
      cursor: { fill: `rgba(${primaryRgb}, 0.06)` },
      itemStyle: { color: TEXT_PRIMARY },
      labelStyle: {
        color: TEXT_MUTED,
        fontWeight: 600,
        textTransform: "uppercase" as const,
        letterSpacing: "0.06em",
      },
    };

    const DIM_FILL = `rgba(${primaryRgb}, 0.06)`;
    const POLAR_GRID_STROKE = `rgba(${primaryRgb}, 0.12)`;

    return {
      PALETTE,
      DUO,
      AXIS,
      GRID,
      TOOLTIP_STYLE,
      DIM_FILL,
      POLAR_GRID_STROKE,
      TEXT_MUTED,
      BG_DEEP,
    };
  }, [primary, primaryRgb, accent, accentRgb]);
}
