import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { DropdownMenu, type DropdownMenuItem } from "./DropdownMenu";

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

const items: DropdownMenuItem[] = [
  { label: "Edit", value: "edit" },
  { label: "Copy", value: "copy" },
  { label: "Delete", value: "delete", danger: true },
];

const disabledItems: DropdownMenuItem[] = [
  { label: "View", value: "view" },
  { label: "Locked", value: "locked", disabled: true },
  { label: "Settings", value: "settings" },
];

describe("DropdownMenu", () => {
  it("renders trigger", () => {
    render(
      <DropdownMenu trigger="Actions" items={items} onSelect={() => {}} />,
    );
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("opens on click and shows items", () => {
    render(
      <DropdownMenu trigger="Actions" items={items} onSelect={() => {}} />,
    );
    fireEvent.click(screen.getByText("Actions"));
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Copy")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("selects item and closes", () => {
    const handleSelect = vi.fn();
    render(
      <DropdownMenu trigger="Actions" items={items} onSelect={handleSelect} />,
    );
    fireEvent.click(screen.getByText("Actions"));
    fireEvent.click(screen.getByText("Edit"));
    expect(handleSelect).toHaveBeenCalledWith("edit");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("disabled item cannot be selected", () => {
    const handleSelect = vi.fn();
    render(
      <DropdownMenu
        trigger="Actions"
        items={disabledItems}
        onSelect={handleSelect}
      />,
    );
    fireEvent.click(screen.getByText("Actions"));
    fireEvent.click(screen.getByText("Locked"));
    expect(handleSelect).not.toHaveBeenCalled();
  });

  it("closes on Escape", () => {
    render(
      <DropdownMenu trigger="Actions" items={items} onSelect={() => {}} />,
    );
    const trigger = screen.getByText("Actions");
    fireEvent.click(trigger);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on outside click", () => {
    render(
      <div>
        <span>Outside</span>
        <DropdownMenu trigger="Actions" items={items} onSelect={() => {}} />
      </div>,
    );
    fireEvent.click(screen.getByText("Actions"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByText("Outside"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("supports keyboard navigation", () => {
    const handleSelect = vi.fn();
    render(
      <DropdownMenu trigger="Actions" items={items} onSelect={handleSelect} />,
    );
    const trigger = screen.getByText("Actions");
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(handleSelect).toHaveBeenCalledWith("copy");
  });
});
