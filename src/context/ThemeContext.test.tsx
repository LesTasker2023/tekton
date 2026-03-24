import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider, useTheme, useThemeColors } from "./ThemeContext";

/* ── Mock localStorage ── */
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

/* ── Helpers ── */

function ThemeDisplay() {
  const { config, colors, setMode } = useTheme();
  return (
    <div>
      <span data-testid="mode">{config.mode}</span>
      <span data-testid="hue">{config.hue}</span>
      <span data-testid="primary">{colors.primary}</span>
      <span data-testid="primary-rgb">{colors.primaryRgb}</span>
      <button data-testid="toggle" onClick={() => setMode(config.mode === "dark" ? "light" : "dark")}>
        Toggle
      </button>
    </div>
  );
}

function ColorsDisplay() {
  const colors = useThemeColors();
  return (
    <div>
      <span data-testid="accent">{colors.accent}</span>
      <span data-testid="accent-rgb">{colors.accentRgb}</span>
    </div>
  );
}

/* ── Tests ── */

describe("ThemeContext", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe("default values", () => {
    it("defaults to dark mode with hue 220", () => {
      render(
        <ThemeProvider>
          <ThemeDisplay />
        </ThemeProvider>,
      );
      expect(screen.getByTestId("mode")).toHaveTextContent("dark");
      expect(screen.getByTestId("hue")).toHaveTextContent("220");
    });

    it("computes non-empty color strings", () => {
      render(
        <ThemeProvider>
          <ThemeDisplay />
        </ThemeProvider>,
      );
      expect(screen.getByTestId("primary").textContent).toMatch(/^#[0-9a-f]{6}$/);
      expect(screen.getByTestId("primary-rgb").textContent).toMatch(/\d+, \d+, \d+/);
    });
  });

  describe("provider passes custom values", () => {
    it("accepts a custom defaultHue", () => {
      render(
        <ThemeProvider defaultHue={180}>
          <ThemeDisplay />
        </ThemeProvider>,
      );
      expect(screen.getByTestId("hue")).toHaveTextContent("180");
    });

    it("accepts a custom defaultMode", () => {
      render(
        <ThemeProvider defaultMode="light">
          <ThemeDisplay />
        </ThemeProvider>,
      );
      expect(screen.getByTestId("mode")).toHaveTextContent("light");
    });
  });

  describe("setMode", () => {
    it("toggles mode from dark to light", async () => {
      render(
        <ThemeProvider>
          <ThemeDisplay />
        </ThemeProvider>,
      );
      expect(screen.getByTestId("mode")).toHaveTextContent("dark");

      await act(async () => {
        screen.getByTestId("toggle").click();
      });

      expect(screen.getByTestId("mode")).toHaveTextContent("light");
    });

    it("persists mode to localStorage on toggle", async () => {
      render(
        <ThemeProvider>
          <ThemeDisplay />
        </ThemeProvider>,
      );

      await act(async () => {
        screen.getByTestId("toggle").click();
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith("tekton-mode", "light");
    });
  });

  describe("localStorage restoration", () => {
    it("restores mode from localStorage on mount", async () => {
      localStorageMock.getItem.mockReturnValue("light");

      await act(async () => {
        render(
          <ThemeProvider>
            <ThemeDisplay />
          </ThemeProvider>,
        );
      });

      expect(localStorageMock.getItem).toHaveBeenCalledWith("tekton-mode");
    });
  });

  describe("useThemeColors", () => {
    it("returns color strings", () => {
      render(
        <ThemeProvider>
          <ColorsDisplay />
        </ThemeProvider>,
      );
      expect(screen.getByTestId("accent").textContent).toMatch(/^#[0-9a-f]{6}$/);
      expect(screen.getByTestId("accent-rgb").textContent).toMatch(/\d+, \d+, \d+/);
    });
  });
});
