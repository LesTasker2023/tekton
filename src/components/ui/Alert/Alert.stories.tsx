import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: { children: "This is an informational alert message." },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Operation completed successfully.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Please review before continuing.",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Something went wrong. Please try again.",
  },
};

export const WithTitle: Story = {
  args: {
    variant: "info",
    title: "Heads up!",
    children: "This alert has a title and a body.",
  },
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Alert
        variant="warning"
        title="Dismissible Alert"
        dismissible
        onDismiss={() => setVisible(false)}
      >
        Click the X to dismiss this alert.
      </Alert>
    ) : (
      <p>Alert dismissed.</p>
    );
  },
};

export const WithoutIcon: Story = {
  args: {
    icon: false,
    children: "This alert has no icon.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Alert variant="info" title="Info">Informational message.</Alert>
      <Alert variant="success" title="Success">Operation succeeded.</Alert>
      <Alert variant="warning" title="Warning">Proceed with caution.</Alert>
      <Alert variant="danger" title="Danger">Critical failure.</Alert>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    variant: "info",
    title: "Detailed Information",
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
};
