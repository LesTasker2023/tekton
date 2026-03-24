import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./Toast";

const meta: Meta = {
  title: "UI/Toast",
  decorators: [(Story) => <ToastProvider><Story /></ToastProvider>],
};

export default meta;
type Story = StoryObj;

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <button onClick={() => toast({ message: "Something happened.", variant: "info" })}>
        Info
      </button>
      <button onClick={() => toast({ message: "Operation successful!", variant: "success" })}>
        Success
      </button>
      <button onClick={() => toast({ message: "Check your input.", variant: "warning" })}>
        Warning
      </button>
      <button onClick={() => toast({ message: "Something went wrong.", variant: "danger" })}>
        Danger
      </button>
    </div>
  );
}

export const AllVariants: Story = {
  render: () => <ToastDemo />,
};

function AutoDismissDemo() {
  const { toast } = useToast();
  return (
    <button onClick={() => toast({ message: "Disappears in 2s", duration: 2000 })}>
      Quick Toast
    </button>
  );
}

export const AutoDismiss: Story = {
  render: () => <AutoDismissDemo />,
};
