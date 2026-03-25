import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TestimonialSection } from "./TestimonialSection";

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

vi.mock("@/sanity/image", () => ({
  urlFor: () => ({
    width: () => ({ height: () => ({ url: () => "https://picsum.photos/64" }) }),
  }),
}));

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

vi.mock("@/components/ui", () => ({
  Panel: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SectionHeader: ({ title }: { title: string }) => <h2>{title}</h2>,
}));

const testimonials = [
  {
    quote: "Great service!",
    name: "Alice Johnson",
    role: "CEO",
    company: "Acme Corp",
  },
  {
    quote: "Highly recommend.",
    name: "Bob Smith",
  },
];

describe("TestimonialSection", () => {
  it("renders testimonials", () => {
    render(<TestimonialSection testimonials={testimonials} />);
    expect(screen.getByText("Great service!")).toBeInTheDocument();
    expect(screen.getByText("Highly recommend.")).toBeInTheDocument();
  });

  it("shows heading when provided", () => {
    render(
      <TestimonialSection
        heading="Testimonials"
        testimonials={testimonials}
      />,
    );
    expect(screen.getByText("Testimonials")).toBeInTheDocument();
  });

  it("shows quote text", () => {
    render(<TestimonialSection testimonials={testimonials} />);
    expect(screen.getByText("Great service!")).toBeInTheDocument();
  });

  it("shows author names", () => {
    render(<TestimonialSection testimonials={testimonials} />);
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
  });

  it("applies layout data attribute", () => {
    const { container } = render(
      <TestimonialSection testimonials={testimonials} layout="stacked" />,
    );
    const section = container.querySelector("section");
    expect(section?.getAttribute("data-layout")).toBe("stacked");
  });
});
