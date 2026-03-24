import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders without crashing", () => {
    render(<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Page" }]} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Page")).toBeInTheDocument();
  });

  it("returns null for empty items", () => {
    const { container } = render(<Breadcrumb items={[]} />);
    expect(container.innerHTML).toBe("");
  });
});
