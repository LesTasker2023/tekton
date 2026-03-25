import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "UI/ProgressBar",
  component: ProgressBar,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "accent", "success", "warning", "danger"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    value: { control: { type: "range", min: 0, max: 100 } },
    showValue: { control: "boolean" },
    animated: { control: "boolean" },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: { value: 45 },
};

export const Empty: Story = {
  args: { value: 0 },
};

export const Full: Story = {
  args: { value: 100 },
};

export const AllVariants: Story = {
  render: () => {
    const variants = ["primary", "accent", "success", "warning", "danger"] as const;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 400 }}>
        {variants.map((v) => (
          <ProgressBar key={v} value={65} variant={v} label={v} />
        ))}
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const sizes = ["sm", "md", "lg"] as const;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 400 }}>
        {sizes.map((s) => (
          <ProgressBar key={s} value={60} size={s} label={s} />
        ))}
      </div>
    );
  },
};

export const WithLabel: Story = {
  args: { value: 72, label: "Upload progress" },
};

export const Animated: Story = {
  args: { value: 55, animated: true, label: "Processing..." },
};

export const ProgressDashboard: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 400 }}>
      <ProgressBar value={92} variant="success" label="Storage" />
      <ProgressBar value={45} variant="primary" label="Bandwidth" />
      <ProgressBar value={78} variant="warning" label="CPU Usage" />
      <ProgressBar value={15} variant="danger" label="Errors" />
      <ProgressBar value={60} variant="accent" label="Tasks" animated />
    </div>
  ),
};
