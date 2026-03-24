import { render } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { StatsRowSection } from "./StatsRowSection";

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

vi.mock("@/lib/motion", () => ({
  fadeIn: {},
  staggerContainer: {},
  fadeUp: {},
}));

vi.mock("@/components/ui", () => ({
  StatBlock: (props: Record<string, unknown>) => (
    <div data-testid="stat-block">{props.label as string}</div>
  ),
  SectionHeader: ({ title }: { title: string }) => <h2>{title}</h2>,
}));

describe("StatsRowSection", () => {
  it("renders without crashing with stats", () => {
    render(
      <StatsRowSection
        stats={[
          { label: "Users", value: "1,000" },
          { label: "Revenue", value: "$50k" },
        ]}
      />,
    );
  });
});
