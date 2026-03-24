import { render } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { ImageGallerySection } from "./ImageGallerySection";

vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <section {...props}>{children}</section>
    ),
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    figure: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <figure {...props}>{children}</figure>
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
  SectionHeader: ({ title }: { title: string }) => <h2>{title}</h2>,
}));

describe("ImageGallerySection", () => {
  it("renders without crashing with empty images", () => {
    render(<ImageGallerySection images={[]} />);
  });
});
