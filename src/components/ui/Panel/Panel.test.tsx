import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Panel } from "./Panel";

// Mock framer-motion to avoid animation complexity in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...filterDomProps(props)}>{children}</div>
    ),
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <section {...filterDomProps(props)}>{children}</section>
    ),
    article: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <article {...filterDomProps(props)}>{children}</article>
    ),
    aside: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <aside {...filterDomProps(props)}>{children}</aside>
    ),
  },
}));

// Filter out framer-motion-specific props
function filterDomProps(props: Record<string, unknown>) {
  const { variants, initial, whileInView, viewport, animate, exit, transition, ...rest } = props;
  return rest;
}

// Mock SkinContext
vi.mock("@/skins/SkinContext", () => ({
  useDecorator: () => undefined,
}));

describe("Panel", () => {
  it("renders children", () => {
    render(<Panel>Hello</Panel>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    const { container } = render(<Panel variant="accent">Test</Panel>);
    const panel = container.firstChild as HTMLElement;
    expect(panel.className).toMatch(/panel--accent/);
  });

  it("applies size class", () => {
    const { container } = render(<Panel size="lg">Test</Panel>);
    const panel = container.firstChild as HTMLElement;
    expect(panel.className).toMatch(/panel--lg/);
  });
});
