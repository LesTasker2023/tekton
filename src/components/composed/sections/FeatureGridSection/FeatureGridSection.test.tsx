import { render } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { FeatureGridSection } from "./FeatureGridSection";

vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <section {...props}>{children}</section>
    ),
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

vi.mock("@/sanity/image", () => ({
  urlFor: () => ({
    width: () => ({ auto: () => ({ url: () => "https://example.com/img.png" }) }),
  }),
}));

vi.mock("@/lib/motion", () => ({
  fadeIn: {},
  staggerContainer: {},
  fadeUp: {},
}));

vi.mock("@/components/ui", () => ({
  Card: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SectionHeader: ({ title }: { title: string }) => <h2>{title}</h2>,
}));

vi.mock("./iconMap", () => ({
  dynamicIcon: () => () => <span data-testid="icon" />,
}));

describe("FeatureGridSection", () => {
  it("renders without crashing with empty features", () => {
    render(<FeatureGridSection features={[]} />);
  });

  it("renders features", () => {
    render(
      <FeatureGridSection
        features={[{ title: "Fast", description: "Very fast" }]}
      />,
    );
  });
});
