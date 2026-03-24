import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

/* ── Mock all section components ── */
vi.mock("./HeroSection", () => ({
  HeroSection: (props: Record<string, unknown>) => (
    <div data-testid="hero-section">{JSON.stringify(props)}</div>
  ),
}));

vi.mock("./PageHero", () => ({
  PageHero: (props: Record<string, unknown>) => (
    <div data-testid="page-hero-section">{JSON.stringify(props)}</div>
  ),
}));

vi.mock("./StatsRowSection", () => ({
  StatsRowSection: (props: Record<string, unknown>) => (
    <div data-testid="stats-row-section">{JSON.stringify(props)}</div>
  ),
}));

vi.mock("./FeatureGridSection", () => ({
  FeatureGridSection: (props: Record<string, unknown>) => (
    <div data-testid="feature-grid-section">{JSON.stringify(props)}</div>
  ),
}));

vi.mock("./CtaSection", () => ({
  CtaSection: (props: Record<string, unknown>) => (
    <div data-testid="cta-section">{JSON.stringify(props)}</div>
  ),
}));

vi.mock("./RichTextSection", () => ({
  RichTextSection: (props: Record<string, unknown>) => (
    <div data-testid="rich-text-section">{JSON.stringify(props)}</div>
  ),
}));

vi.mock("./ImageGallerySection", () => ({
  ImageGallerySection: (props: Record<string, unknown>) => (
    <div data-testid="image-gallery-section">{JSON.stringify(props)}</div>
  ),
}));

import { SectionRenderer } from "./SectionRenderer";

/* ── Tests ── */

describe("SectionRenderer", () => {
  it("renders the correct component for a known _type", () => {
    render(
      <SectionRenderer
        sections={[
          { _type: "heroSection", _key: "h1", title: "Welcome" },
        ]}
      />,
    );
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("hero-section")).toHaveTextContent("Welcome");
  });

  it("passes props excluding _type and _key", () => {
    render(
      <SectionRenderer
        sections={[
          { _type: "ctaSection", _key: "c1", label: "Click me", href: "/go" },
        ]}
      />,
    );
    const content = screen.getByTestId("cta-section").textContent ?? "";
    const parsed = JSON.parse(content);
    expect(parsed).toEqual({ label: "Click me", href: "/go" });
    expect(parsed).not.toHaveProperty("_type");
    expect(parsed).not.toHaveProperty("_key");
  });

  it("renders multiple sections in order", () => {
    render(
      <SectionRenderer
        sections={[
          { _type: "heroSection", _key: "h1" },
          { _type: "statsRowSection", _key: "s1" },
          { _type: "featureGridSection", _key: "f1" },
        ]}
      />,
    );
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("stats-row-section")).toBeInTheDocument();
    expect(screen.getByTestId("feature-grid-section")).toBeInTheDocument();
  });

  it("renders all supported section types", () => {
    const types = [
      { _type: "heroSection", _key: "1", testId: "hero-section" },
      { _type: "pageHeroSection", _key: "2", testId: "page-hero-section" },
      { _type: "statsRowSection", _key: "3", testId: "stats-row-section" },
      { _type: "featureGridSection", _key: "4", testId: "feature-grid-section" },
      { _type: "ctaSection", _key: "5", testId: "cta-section" },
      { _type: "richTextSection", _key: "6", testId: "rich-text-section" },
      { _type: "imageGallerySection", _key: "7", testId: "image-gallery-section" },
    ];

    render(
      <SectionRenderer sections={types.map(({ testId, ...s }) => s)} />,
    );

    for (const { testId } of types) {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    }
  });

  describe("unknown _type handling", () => {
    it("renders a warning in development mode", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      const { container } = render(
        <SectionRenderer
          sections={[{ _type: "bogusSection", _key: "b1" }]}
        />,
      );

      expect(container.textContent).toContain("Unknown section type");
      expect(container.textContent).toContain("bogusSection");

      process.env.NODE_ENV = originalEnv;
    });

    it("renders nothing for unknown type in production", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      const { container } = render(
        <SectionRenderer
          sections={[{ _type: "bogusSection", _key: "b1" }]}
        />,
      );

      expect(container.textContent).toBe("");

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe("empty / missing sections", () => {
    it("returns null for empty array", () => {
      const { container } = render(<SectionRenderer sections={[]} />);
      expect(container.innerHTML).toBe("");
    });

    it("returns null for undefined-ish sections", () => {
      // @ts-expect-error testing runtime safety
      const { container } = render(<SectionRenderer sections={null} />);
      expect(container.innerHTML).toBe("");
    });
  });
});
