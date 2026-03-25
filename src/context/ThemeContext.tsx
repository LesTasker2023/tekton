"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { computeColors, applyTheme } from "./applyTheme";
import type { ThemeConfig, ThemeColors } from "./themeTypes";

/* ── Types (re-exported for consumers) ── */
export type { ThemeConfig, ThemeColors } from "./themeTypes";

interface ThemeContextValue {
  config: ThemeConfig;
  colors: ThemeColors;
  setMode: (mode: "dark" | "light") => void;
}

const DEFAULT_CONFIG: ThemeConfig = {
  mode: "dark",
  hue: 220,
};

const MODE_STORAGE_KEY = "tekton-mode";

const DEFAULT_COLORS = computeColors(DEFAULT_CONFIG);

const ThemeContext = createContext<ThemeContextValue>({
  config: DEFAULT_CONFIG,
  colors: DEFAULT_COLORS,
  setMode: () => {},
});

/* ── Provider ── */
export function ThemeProvider({
  children,
  defaultHue,
  defaultMode,
}: {
  children: ReactNode;
  defaultHue?: number;
  defaultMode?: "dark" | "light";
}) {
  const cmsHue = defaultHue ?? DEFAULT_CONFIG.hue;
  const cmsMode = defaultMode ?? DEFAULT_CONFIG.mode;

  const [mode, setModeState] = useState<"dark" | "light">(cmsMode);
  const [hydrated, setHydrated] = useState(false);

  const config: ThemeConfig = { mode, hue: cmsHue };
  const [colors, setColors] = useState<ThemeColors>(computeColors(config));

  // Restore only dark/light preference from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(MODE_STORAGE_KEY);
      if (stored === "dark" || stored === "light") {
        setModeState(stored);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Apply theme whenever mode changes (hue is fixed from CMS props)
  useEffect(() => {
    if (!hydrated) return;
    const cfg: ThemeConfig = { mode, hue: cmsHue };
    applyTheme(cfg);
    setColors(computeColors(cfg));
  }, [mode, cmsHue, hydrated]);

  const setMode = useCallback((m: "dark" | "light") => {
    setModeState(m);
    try {
      localStorage.setItem(MODE_STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ config, colors, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

/** Convenience hook — returns live primary/accent hex & rgb strings. */
export function useThemeColors(): ThemeColors {
  return useContext(ThemeContext).colors;
}
