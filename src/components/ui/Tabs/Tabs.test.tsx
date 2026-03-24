import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Tabs } from "./Tabs";

const items = [
  { key: "a", label: "Tab A", content: "Content A" },
  { key: "b", label: "Tab B", content: "Content B" },
  { key: "c", label: "Tab C", content: "Content C" },
];

describe("Tabs", () => {
  it("renders all tabs", () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole("tab", { name: "Tab A" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab B" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab C" })).toBeInTheDocument();
  });

  it("shows first tab content by default", () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content A");
  });

  it("switches tab on click", async () => {
    render(<Tabs items={items} />);
    await userEvent.click(screen.getByRole("tab", { name: "Tab B" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content B");
  });

  it("calls onChange", async () => {
    const onChange = vi.fn();
    render(<Tabs items={items} onChange={onChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Tab C" }));
    expect(onChange).toHaveBeenCalledWith("c");
  });

  it("navigates with arrow keys", async () => {
    render(<Tabs items={items} />);
    const tabA = screen.getByRole("tab", { name: "Tab A" });
    tabA.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content B");
  });

  it("respects defaultActiveKey", () => {
    render(<Tabs items={items} defaultActiveKey="c" />);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content C");
  });

  it("skips disabled tabs", async () => {
    const withDisabled = [
      items[0],
      { ...items[1], disabled: true },
      items[2],
    ];
    render(<Tabs items={withDisabled} />);
    const tabA = screen.getByRole("tab", { name: "Tab A" });
    tabA.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Content C");
  });

  it("sets aria-selected on active tab", () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole("tab", { name: "Tab A" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Tab B" })).toHaveAttribute("aria-selected", "false");
  });
});
