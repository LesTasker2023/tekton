import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    open: true,
    title: "Modal Title",
    children: "This is the modal body content.",
  },
};

export const WithFooter: Story = {
  args: {
    open: true,
    title: "Confirm Action",
    children: "Are you sure you want to proceed?",
    footer: (
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button>Cancel</button>
        <button>Confirm</button>
      </div>
    ),
  },
};

export const Small: Story = {
  args: { open: true, title: "Small Modal", size: "sm", children: "Compact content." },
};

export const Large: Story = {
  args: { open: true, title: "Large Modal", size: "lg", children: "Wider content area." },
};

export const NoTitle: Story = {
  args: { open: true, children: "Modal without a title bar." },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Modal</button>
        <Modal open={open} onClose={() => setOpen(false)} title="Interactive Demo">
          Click the backdrop or press Escape to close.
        </Modal>
      </>
    );
  },
};
