import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SkinProvider, useSkin, useDecorator } from "./SkinContext";
import type { SkinConfig } from "./SkinContext";

/* ── Helpers ── */

function SkinDisplay() {
  const skin = useSkin();
  return (
    <div>
      <span data-testid="skin-name">{skin.name}</span>
      <span data-testid="decorator-count">
        {Object.keys(skin.decorators).length}
      </span>
    </div>
  );
}

function DecoratorDisplay({ decoratorKey }: { decoratorKey: "Panel" | "Button" | "Hero" | "SectionHeader" }) {
  const Decorator = useDecorator(decoratorKey);
  return <span data-testid="has-decorator">{Decorator ? "yes" : "no"}</span>;
}

/* ── Tests ── */

describe("SkinContext", () => {
  describe("default (vanilla) skin", () => {
    it("has name 'vanilla' by default", () => {
      render(
        <SkinProvider>
          <SkinDisplay />
        </SkinProvider>,
      );
      expect(screen.getByTestId("skin-name")).toHaveTextContent("vanilla");
    });

    it("has empty decorators by default", () => {
      render(
        <SkinProvider>
          <SkinDisplay />
        </SkinProvider>,
      );
      expect(screen.getByTestId("decorator-count")).toHaveTextContent("0");
    });
  });

  describe("useSkin", () => {
    it("returns the skin config from provider", () => {
      render(
        <SkinProvider skinName="vanilla">
          <SkinDisplay />
        </SkinProvider>,
      );
      expect(screen.getByTestId("skin-name")).toHaveTextContent("vanilla");
    });

    it("returns vanilla for unknown skin names", () => {
      render(
        <SkinProvider skinName="nonexistent">
          <SkinDisplay />
        </SkinProvider>,
      );
      expect(screen.getByTestId("skin-name")).toHaveTextContent("vanilla");
    });
  });

  describe("useDecorator", () => {
    it("returns undefined for vanilla skin decorators", () => {
      render(
        <SkinProvider>
          <DecoratorDisplay decoratorKey="Panel" />
        </SkinProvider>,
      );
      expect(screen.getByTestId("has-decorator")).toHaveTextContent("no");
    });

    it("returns undefined for all decorator keys on vanilla", () => {
      const keys = ["Panel", "Button", "Hero", "SectionHeader"] as const;
      for (const key of keys) {
        const { unmount } = render(
          <SkinProvider>
            <DecoratorDisplay decoratorKey={key} />
          </SkinProvider>,
        );
        expect(screen.getByTestId("has-decorator")).toHaveTextContent("no");
        unmount();
      }
    });
  });

  describe("without provider (bare context default)", () => {
    it("useSkin returns vanilla when no provider wraps", () => {
      render(<SkinDisplay />);
      expect(screen.getByTestId("skin-name")).toHaveTextContent("vanilla");
    });

    it("useDecorator returns undefined when no provider wraps", () => {
      render(<DecoratorDisplay decoratorKey="Hero" />);
      expect(screen.getByTestId("has-decorator")).toHaveTextContent("no");
    });
  });
});
