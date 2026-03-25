import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders children", () => {
    render(<Alert>Test message</Alert>);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    const { container } = render(
      <Alert variant="success">OK</Alert>,
    );
    expect(container.firstChild).toHaveClass(/alert--success/);
  });

  it("shows title when provided", () => {
    render(<Alert title="Heads up">Body text</Alert>);
    expect(screen.getByText("Heads up")).toBeInTheDocument();
  });

  it("shows icon by default", () => {
    const { container } = render(<Alert>With icon</Alert>);
    const icon = container.querySelector("[class*='alert__icon']");
    expect(icon).toBeInTheDocument();
  });

  it("hides icon when icon is false", () => {
    const { container } = render(<Alert icon={false}>No icon</Alert>);
    const icon = container.querySelector("[class*='alert__icon']");
    expect(icon).not.toBeInTheDocument();
  });

  it("calls onDismiss on close click", () => {
    const handleDismiss = vi.fn();
    render(
      <Alert dismissible onDismiss={handleDismiss}>
        Dismiss me
      </Alert>,
    );
    fireEvent.click(screen.getByLabelText("Dismiss alert"));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("only shows close button when dismissible", () => {
    const { container, rerender } = render(<Alert>Not dismissible</Alert>);
    expect(
      container.querySelector("[class*='alert__close']"),
    ).not.toBeInTheDocument();

    rerender(<Alert dismissible>Dismissible</Alert>);
    expect(
      container.querySelector("[class*='alert__close']"),
    ).toBeInTheDocument();
  });
});
