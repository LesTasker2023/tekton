import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    const { container } = render(<Badge variant="success">OK</Badge>);
    expect(container.firstChild).toHaveClass(/badge--success/);
  });

  it("renders dot indicator when dot prop is true", () => {
    const { container } = render(<Badge dot>Online</Badge>);
    const dot = container.querySelector("[class*='badge__dot']");
    expect(dot).toBeInTheDocument();
  });

  it("does not render dot by default", () => {
    const { container } = render(<Badge>Offline</Badge>);
    const dot = container.querySelector("[class*='badge__dot']");
    expect(dot).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Badge className="custom">Test</Badge>);
    expect(container.firstChild).toHaveClass("custom");
  });
});
