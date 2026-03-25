import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LogoCloudSection } from "./LogoCloudSection";

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
    width: () => ({
      height: () => ({ url: () => "https://picsum.photos/200/80" }),
    }),
  }),
}));

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

vi.mock("@/components/ui", () => ({
  SectionHeader: ({ title }: { title: string }) => <h2>{title}</h2>,
}));

const stub = { asset: { _ref: "stub" } };
const logos = [
  { name: "Acme", image: stub },
  { name: "Globex", image: stub },
  { name: "Initech", image: stub },
];

describe("LogoCloudSection", () => {
  it("renders logos", () => {
    render(<LogoCloudSection logos={logos} />);
    expect(screen.getByAltText("Acme")).toBeInTheDocument();
    expect(screen.getByAltText("Globex")).toBeInTheDocument();
  });

  it("shows heading when provided", () => {
    render(<LogoCloudSection heading="Our Partners" logos={logos} />);
    expect(screen.getByText("Our Partners")).toBeInTheDocument();
  });

  it("applies grayscale class by default", () => {
    const { container } = render(<LogoCloudSection logos={logos} />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("grayscale");
  });

  it("renders links when href provided", () => {
    const logosWithLinks = logos.map((l) => ({
      ...l,
      href: "https://example.com",
    }));
    const { container } = render(
      <LogoCloudSection logos={logosWithLinks} />,
    );
    const links = container.querySelectorAll("a");
    expect(links.length).toBe(3);
  });

  it("applies column count via grid style", () => {
    const { container } = render(
      <LogoCloudSection logos={logos} columns={4} />,
    );
    const grid = container.querySelectorAll("section > div")[
      container.querySelectorAll("section > div").length - 1
    ] as HTMLElement;
    expect(grid?.style.gridTemplateColumns).toBe("repeat(4, 1fr)");
  });
});
