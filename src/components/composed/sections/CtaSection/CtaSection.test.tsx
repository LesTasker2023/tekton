import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { CtaSection } from "./CtaSection";

vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <section {...props}>{children}</section>
    ),
  },
}));

vi.mock("@/lib/motion", () => ({
  fadeIn: {},
}));

vi.mock("@/components/ui", () => ({
  Panel: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  Button: ({ children }: React.PropsWithChildren) => <button>{children}</button>,
  SectionHeader: ({ title }: { title: string }) => <h2>{title}</h2>,
}));

describe("CtaSection", () => {
  it("renders without crashing", () => {
    render(<CtaSection heading="Join Us" />);
    expect(screen.getByText("Join Us")).toBeInTheDocument();
  });
});
