import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { Modal } from "./Modal";

// jsdom doesn't implement dialog, so stub showModal/close
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute("open");
  });
});

describe("Modal", () => {
  it("renders children when open", () => {
    render(<Modal open onClose={() => {}}>Hello</Modal>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(<Modal open onClose={() => {}} title="Test Title">Content</Modal>);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Close Me">Content</Modal>);
    await userEvent.click(screen.getByLabelText("Close dialog"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("renders footer slot", () => {
    render(
      <Modal open onClose={() => {}} footer={<button>Confirm</button>}>
        Content
      </Modal>,
    );
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });

  it("applies size class", () => {
    render(<Modal open onClose={() => {}} size="lg">Content</Modal>);
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toMatch(/modal--lg/);
  });

  it("hides close button when hideClose is true", () => {
    render(<Modal open onClose={() => {}} hideClose title="No Close">Content</Modal>);
    expect(screen.queryByLabelText("Close dialog")).not.toBeInTheDocument();
  });
});
