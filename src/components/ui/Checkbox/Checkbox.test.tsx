import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders without crashing", () => {
    render(<Checkbox checked={false} onChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("toggles on click", async () => {
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange} label="Toggle me" />);
    await userEvent.click(screen.getByLabelText("Toggle me"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("shows label", () => {
    render(<Checkbox checked={false} onChange={() => {}} label="My label" />);
    expect(screen.getByText("My label")).toBeInTheDocument();
  });

  it("shows description", () => {
    render(
      <Checkbox
        checked={false}
        onChange={() => {}}
        label="Option"
        description="Some help text"
      />,
    );
    expect(screen.getByText("Some help text")).toBeInTheDocument();
  });

  it("disabled prevents toggle", async () => {
    const onChange = vi.fn();
    render(
      <Checkbox checked={false} onChange={onChange} label="Nope" disabled />,
    );
    await userEvent.click(screen.getByLabelText("Nope"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("applies checked class", () => {
    const { container } = render(
      <Checkbox checked={true} onChange={() => {}} />,
    );
    expect(container.firstChild).toHaveAttribute("data-component", "checkbox");
    expect((container.firstChild as HTMLElement).className).toMatch(/checked/);
  });

  it("sets indeterminate state on the input", () => {
    render(
      <Checkbox
        checked={false}
        onChange={() => {}}
        indeterminate
        label="Partial"
      />,
    );
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });
});
