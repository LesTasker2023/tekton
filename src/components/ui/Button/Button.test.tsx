import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies variant class", () => {
    render(<Button variant="secondary">Test</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/btn--secondary/);
  });

  it("applies size class", () => {
    render(<Button size="lg">Test</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/btn--lg/);
  });

  it("handles click events", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire click when disabled", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} disabled>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies fullWidth class", () => {
    render(<Button fullWidth>Wide</Button>);
    expect(screen.getByRole("button").className).toMatch(/btn--full/);
  });
});
