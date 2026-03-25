import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PricingSection } from "./PricingSection";

vi.mock("framer-motion", () => ({
  motion: {
    section: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <section {...props}>{children}</section>
    ),
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

vi.mock("@/lib/motion", () => ({
  fadeIn: {},
  staggerContainer: {},
  fadeUp: {},
}));

vi.mock("lucide-react", () => ({
  Check: () => <span data-testid="check-icon" />,
  X: () => <span data-testid="x-icon" />,
}));

vi.mock("@/components/ui", () => ({
  Panel: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  Button: ({ children }: React.PropsWithChildren) => (
    <button>{children}</button>
  ),
  SectionHeader: ({ title }: { title: string }) => <h2>{title}</h2>,
}));

const tiers = [
  {
    name: "Free",
    price: "$0",
    features: [
      { text: "Basic features", included: true },
      { text: "Premium support", included: false },
    ],
    cta: { label: "Get Started", href: "/signup" },
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    featured: true,
    features: [
      { text: "Basic features", included: true },
      { text: "Premium support", included: true },
    ],
    cta: { label: "Start Trial", href: "/signup?plan=pro" },
  },
];

describe("PricingSection", () => {
  it("renders tiers", () => {
    render(<PricingSection tiers={tiers} />);
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
  });

  it("shows tier names", () => {
    render(<PricingSection tiers={tiers} />);
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
  });

  it("shows prices", () => {
    render(<PricingSection tiers={tiers} />);
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("$29")).toBeInTheDocument();
  });

  it("shows features with check and x icons", () => {
    render(<PricingSection tiers={tiers} />);
    const checks = screen.getAllByTestId("check-icon");
    const xs = screen.getAllByTestId("x-icon");
    expect(checks.length).toBeGreaterThan(0);
    expect(xs.length).toBeGreaterThan(0);
  });

  it("renders CTA buttons", () => {
    render(<PricingSection tiers={tiers} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Start Trial")).toBeInTheDocument();
  });

  it("shows heading when provided", () => {
    render(<PricingSection heading="Pricing" tiers={tiers} />);
    expect(screen.getByText("Pricing")).toBeInTheDocument();
  });
});
