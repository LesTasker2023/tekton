import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionHeader } from "./SectionHeader";

describe("SectionHeader", () => {
  it("renders the title text", () => {
    render(<SectionHeader title="My Section" />);
    expect(screen.getByText("My Section")).toBeInTheDocument();
  });

  it("applies size class", () => {
    const { container } = render(<SectionHeader title="Test" size="lg" />);
    expect(container.firstChild).toHaveClass(/header--lg/);
  });

  it("applies accent class", () => {
    const { container } = render(<SectionHeader title="Test" accent />);
    expect(container.firstChild).toHaveClass(/header--accent/);
  });

  it("applies custom className", () => {
    const { container } = render(<SectionHeader title="Test" className="custom" />);
    expect(container.firstChild).toHaveClass("custom");
  });
});
