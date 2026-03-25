import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="No items" />);
    expect(screen.getByText("No items")).toBeInTheDocument();
  });

  it("shows description when provided", () => {
    render(
      <EmptyState title="Empty" description="Nothing to see here." />,
    );
    expect(screen.getByText("Nothing to see here.")).toBeInTheDocument();
  });

  it("shows icon when provided", () => {
    const { container } = render(
      <EmptyState title="Empty" icon={<svg data-testid="icon" />} />,
    );
    expect(container.querySelector("[class*='empty-state__icon']")).toBeInTheDocument();
  });

  it("renders action button", () => {
    render(
      <EmptyState
        title="Empty"
        action={{ label: "Create", onClick: () => {} }}
      />,
    );
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("calls onClick on action click", () => {
    const handleClick = vi.fn();
    render(
      <EmptyState
        title="Empty"
        action={{ label: "Create", onClick: handleClick }}
      />,
    );
    fireEvent.click(screen.getByText("Create"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies size class", () => {
    const { container } = render(<EmptyState title="Small" size="sm" />);
    expect(container.firstChild).toHaveClass(/empty-state--sm/);
  });
});
