import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders placeholder", () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<Input label="Email" error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("shows helper text", () => {
    render(<Input label="Name" helperText="Your full name" />);
    expect(screen.getByText("Your full name")).toBeInTheDocument();
  });

  it("hides helper when error is shown", () => {
    render(<Input label="Name" helperText="Help" error="Error" />);
    expect(screen.queryByText("Help")).not.toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("sets aria-invalid on error", () => {
    render(<Input label="Email" error="Bad" />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("handles typing", async () => {
    const onChange = vi.fn();
    render(<Input label="Name" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("Name"), "hello");
    expect(onChange).toHaveBeenCalled();
  });

  it("applies size class", () => {
    const { container } = render(<Input size="lg" />);
    expect(container.firstChild).toHaveAttribute("data-size", "lg");
  });
});
