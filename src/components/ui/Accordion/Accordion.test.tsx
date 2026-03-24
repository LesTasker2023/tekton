import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Accordion } from "./Accordion";

const items = [
  { key: "a", title: "Item A", content: "Content A" },
  { key: "b", title: "Item B", content: "Content B" },
  { key: "c", title: "Item C", content: "Content C" },
];

describe("Accordion", () => {
  it("renders all items", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();
    expect(screen.getByText("Item C")).toBeInTheDocument();
  });

  it("shows content on click", async () => {
    render(<Accordion items={items} />);
    await userEvent.click(screen.getByText("Item A"));
    expect(screen.getByText("Content A")).toBeVisible();
  });

  it("sets data-component attribute", () => {
    const { container } = render(<Accordion items={items} />);
    expect(container.querySelector("[data-component='accordion']")).toBeInTheDocument();
  });

  it("does not toggle disabled items", async () => {
    const disabledItems = [{ ...items[0], disabled: true }];
    render(<Accordion items={disabledItems} />);
    const summary = screen.getByText("Item A");
    await userEvent.click(summary);
    const details = summary.closest("details");
    expect(details?.open).toBeFalsy();
  });
});
