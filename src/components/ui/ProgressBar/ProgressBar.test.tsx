import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders without crashing", () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    const { container } = render(<ProgressBar value={50} variant="danger" />);
    expect(container.firstChild).toHaveAttribute("data-variant", "danger");
  });

  it("applies size class", () => {
    const { container } = render(<ProgressBar value={50} size="lg" />);
    expect(container.firstChild).toHaveAttribute("data-size", "lg");
  });

  it("fill width matches value", () => {
    const { container } = render(<ProgressBar value={75} />);
    const fill = container.querySelector("[class*='fill']") as HTMLElement;
    expect(fill.style.width).toBe("75%");
  });

  it("shows label", () => {
    render(<ProgressBar value={50} label="Loading" />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("shows percentage text by default", () => {
    render(<ProgressBar value={42} />);
    expect(screen.getByText("42%")).toBeInTheDocument();
  });

  it("hides percentage text when showValue is false", () => {
    render(<ProgressBar value={42} showValue={false} />);
    expect(screen.queryByText("42%")).not.toBeInTheDocument();
  });

  it("handles value of 0", () => {
    const { container } = render(<ProgressBar value={0} />);
    const fill = container.querySelector("[class*='fill']") as HTMLElement;
    expect(fill.style.width).toBe("0%");
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("handles value of 100", () => {
    const { container } = render(<ProgressBar value={100} />);
    const fill = container.querySelector("[class*='fill']") as HTMLElement;
    expect(fill.style.width).toBe("100%");
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("clamps value above 100", () => {
    const { container } = render(<ProgressBar value={150} />);
    const fill = container.querySelector("[class*='fill']") as HTMLElement;
    expect(fill.style.width).toBe("100%");
  });

  it("clamps value below 0", () => {
    const { container } = render(<ProgressBar value={-10} />);
    const fill = container.querySelector("[class*='fill']") as HTMLElement;
    expect(fill.style.width).toBe("0%");
  });
});
