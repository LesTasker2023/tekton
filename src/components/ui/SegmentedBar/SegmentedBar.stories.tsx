import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedBar } from "./SegmentedBar";

const meta: Meta<typeof SegmentedBar> = {
  title: "UI/SegmentedBar",
  component: SegmentedBar,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "accent", "success", "warning", "danger"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    segments: { control: { type: "number", min: 2, max: 30 } },
    showValue: { control: "boolean" },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedBar>;

export const Default: Story = {
  args: { value: 60 },
};

export const Empty: Story = {
  args: { value: 0, label: "Capacity" },
};

export const Full: Story = {
  args: { value: 100, label: "Storage", variant: "success" },
};

export const WithLabel: Story = {
  args: { value: 45, label: "Sprint Progress" },
};

export const AllVariants: Story = {
  render: () => {
    const variants = [
      { variant: "primary" as const, value: 72, label: "Revenue Target" },
      { variant: "accent" as const, value: 55, label: "Client Onboarding" },
      { variant: "success" as const, value: 90, label: "Deliverables" },
      { variant: "warning" as const, value: 38, label: "Budget Remaining" },
      { variant: "danger" as const, value: 15, label: "Risk Exposure" },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 400 }}>
        {variants.map((v) => (
          <SegmentedBar key={v.variant} {...v} />
        ))}
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 400 }}>
      <SegmentedBar value={65} size="sm" label="Small" />
      <SegmentedBar value={65} size="md" label="Medium" />
      <SegmentedBar value={65} size="lg" label="Large" />
    </div>
  ),
};

export const HiddenValue: Story = {
  args: { value: 70, label: "Confidential Metric", showValue: false },
};

export const CustomSegments: Story = {
  args: { value: 75, segments: 20, label: "Granular Progress" },
};

export const ProgressDashboard: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 420 }}>
      <SegmentedBar value={82} variant="success" label="Q1 Revenue" />
      <SegmentedBar value={64} variant="primary" label="Team Utilization" />
      <SegmentedBar value={45} variant="warning" label="Pipeline Coverage" />
      <SegmentedBar value={91} variant="accent" label="Client Satisfaction" />
      <SegmentedBar value={23} variant="danger" label="Churn Risk" />
    </div>
  ),
};
