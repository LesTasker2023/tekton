import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { RadioGroup } from "./RadioGroup";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];

describe("RadioGroup", () => {
  it("renders all options", () => {
    render(<RadioGroup name="test" options={options} />);
    expect(screen.getByLabelText("Option A")).toBeInTheDocument();
    expect(screen.getByLabelText("Option B")).toBeInTheDocument();
    expect(screen.getByLabelText("Option C")).toBeInTheDocument();
  });

  it("selects on click", async () => {
    const onChange = vi.fn();
    render(<RadioGroup name="test" options={options} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText("Option B"));
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("shows group label", () => {
    render(<RadioGroup name="test" options={options} label="Pick one" />);
    expect(screen.getByText("Pick one")).toBeInTheDocument();
  });

  it("disabled option cannot be selected", async () => {
    const onChange = vi.fn();
    const opts = [
      { value: "a", label: "Available" },
      { value: "b", label: "Unavailable", disabled: true },
    ];
    render(<RadioGroup name="test" options={opts} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText("Unavailable"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("applies horizontal class", () => {
    const { container } = render(
      <RadioGroup name="test" options={options} direction="horizontal" />,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(
      /horizontal/,
    );
  });

  it("value prop selects correct option", () => {
    render(<RadioGroup name="test" options={options} value="b" />);
    const radio = screen.getByLabelText("Option B") as HTMLInputElement;
    expect(radio.checked).toBe(true);
  });

  it("shows option descriptions", () => {
    const opts = [
      { value: "a", label: "Plan A", description: "Basic plan" },
      { value: "b", label: "Plan B", description: "Pro plan" },
    ];
    render(<RadioGroup name="test" options={opts} />);
    expect(screen.getByText("Basic plan")).toBeInTheDocument();
    expect(screen.getByText("Pro plan")).toBeInTheDocument();
  });
});
