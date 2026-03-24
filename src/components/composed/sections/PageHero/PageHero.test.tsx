import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { PageHero } from "./PageHero";

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
    width: () => ({ quality: () => ({ url: () => "https://example.com/img.png" }) }),
  }),
}));

vi.mock("@/lib/motion", () => ({
  fadeIn: {},
}));

describe("PageHero", () => {
  it("renders without crashing", () => {
    render(<PageHero heading="Test Page" />);
    expect(screen.getByText("Test Page")).toBeInTheDocument();
  });
});
