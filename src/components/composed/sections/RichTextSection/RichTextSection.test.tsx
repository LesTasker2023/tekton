import { render } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { RichTextSection } from "./RichTextSection";

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
  SectionHeader: ({ title }: { title: string }) => <h2>{title}</h2>,
}));

vi.mock("@/components/ui/PortableTextBody/PortableTextBody", () => ({
  PortableTextBody: ({ value }: { value: unknown }) => (
    <div data-testid="portable-text">{JSON.stringify(value)}</div>
  ),
}));

describe("RichTextSection", () => {
  it("renders without crashing", () => {
    render(<RichTextSection richBody={[]} />);
  });
});
