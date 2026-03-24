import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { HeroSection } from "./HeroSection";

vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <section {...props}>{children}</section>
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
}));

describe("HeroSection", () => {
  it("renders without crashing", () => {
    render(<HeroSection heading="Hello World" />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
