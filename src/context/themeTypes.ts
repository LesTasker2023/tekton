export interface ThemeConfig {
  mode: "dark" | "light";
  hue: number; // 0-360  — set by CMS, not user-changeable
}

export interface ThemeColors {
  primary: string; // e.g. "#b8a206"
  primaryRgb: string; // e.g. "184, 162, 6"
  accent: string;
  accentRgb: string;
}
