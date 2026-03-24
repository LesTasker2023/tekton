import { render } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { PortableTextBody } from "./PortableTextBody";

vi.mock("@portabletext/react", () => ({
  PortableText: ({ value }: { value: unknown[] }) => (
    <div data-testid="portable-text">{JSON.stringify(value)}</div>
  ),
}));

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

vi.mock("@/sanity/image", () => ({
  urlFor: () => ({
    width: () => ({ auto: () => ({ url: () => "https://example.com/img.png" }) }),
  }),
}));

describe("PortableTextBody", () => {
  it("renders without crashing", () => {
    render(<PortableTextBody value={[]} />);
  });

  it("returns null when value is falsy", () => {
    const { container } = render(<PortableTextBody value={null} />);
    expect(container.innerHTML).toBe("");
  });
});
