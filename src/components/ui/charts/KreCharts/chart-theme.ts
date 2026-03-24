/**
 * Chart Theme — shared palette and helpers for themed chart components.
 *
 * Every chart component in this folder wraps Recharts with a consistent
 * Consistent dark-panel aesthetic with CMS-driven brand color.
 */

/* ── Chart palette — ordered for visual separation ── */
/* First slot uses CSS var so it follows the CMS brand hue */
export const CHART_PALETTE = [
  "var(--color-primary)", // brand accent (CMS-driven)
  "#f472b6", // pink / magenta
  "#f59e0b", // amber
  "#a78bfa", // violet
  "#34d399", // emerald
  "#22d3ee", // cyan
  "#fb923c", // orange
  "#e2e8f0", // silver
] as const;

/* ── Semantic pairs (bar chart duos) ── */
export const CHART_DUO = {
  a: "var(--color-primary)",
  b: "#f472b6",
} as const;

/* ── Background / surface colours matching tokens.css ── */
export const CHART_BG = {
  base: "var(--bg-base)",
  surface: "var(--bg-surface)",
  panel: "var(--bg-panel)",
  elevated: "var(--bg-elevated)",
  grid: "rgba(var(--color-primary-rgb), 0.06)",
  gridStrong: "rgba(var(--color-primary-rgb), 0.12)",
} as const;

/* ── Text ── */
export const CHART_TEXT = {
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  muted: "var(--text-muted)",
} as const;

/* ── Shared axis / grid style applied to Recharts props ── */
export const CHART_AXIS = {
  tick: {
    fill: "var(--text-secondary)",
    fontSize: 11,
    fontFamily: "'JetBrains Mono', monospace",
  },
  axisLine: { stroke: "rgba(var(--color-primary-rgb), 0.15)" },
  tickLine: false as const,
};

export const CHART_GRID = {
  stroke: "rgba(var(--color-primary-rgb), 0.08)",
  strokeDasharray: "3 3",
};

export const CHART_TOOLTIP_STYLE = {
  contentStyle: {
    background: "rgba(18, 18, 18, 0.95)",
    border: "1px solid rgba(var(--color-primary-rgb), 0.25)",
    borderRadius: 4,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    color: "var(--text-primary)",
    boxShadow: "0 0 20px rgba(var(--color-primary-rgb), 0.15)",
  },
  cursor: { fill: "rgba(var(--color-primary-rgb), 0.06)" },
  itemStyle: { color: "var(--text-primary)" },
  labelStyle: {
    color: "var(--text-secondary)",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  },
};

/** Build an SVG filter for a glow used in <defs>. */
export function glowFilterId(color: string): string {
  return `glow-${color.replace("#", "")}`;
}
