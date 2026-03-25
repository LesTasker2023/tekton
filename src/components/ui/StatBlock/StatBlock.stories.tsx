import type { Meta, StoryObj } from "@storybook/react";
import { StatBlock } from "./StatBlock";

const meta: Meta<typeof StatBlock> = {
  title: "UI/StatBlock",
  component: StatBlock,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    accent: { control: "boolean" },
    label: { control: "text" },
    value: { control: "text" },
    sub: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof StatBlock>;

export const Default: Story = {
  args: { label: "Active Projects", value: "24" },
};

export const WithTrendUp: Story = {
  args: {
    label: "Monthly Revenue",
    value: "$48.2K",
    trend: { value: "+12%", direction: "up" },
  },
};

export const WithTrendDown: Story = {
  args: {
    label: "Churn Rate",
    value: "3.1%",
    trend: { value: "-5%", direction: "down" },
  },
};

export const WithTrendNeutral: Story = {
  args: {
    label: "Avg Response Time",
    value: "2.4h",
    trend: { value: "0%", direction: "neutral" },
  },
};

export const WithSubtitle: Story = {
  args: {
    label: "Total Clients",
    value: "142",
    sub: "across 8 verticals",
  },
};

export const Accent: Story = {
  args: {
    label: "Net Promoter Score",
    value: "72",
    accent: true,
    trend: { value: "+4", direction: "up" },
  },
};

export const SmallSize: Story = {
  args: { label: "Open Tickets", value: "18", size: "sm" },
};

export const LargeSize: Story = {
  args: {
    label: "Annual Recurring Revenue",
    value: "$1.2M",
    size: "lg",
    trend: { value: "+22%", direction: "up" },
  },
};

export const NumericValue: Story = {
  args: { label: "Total Hours", value: 8472 },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
      <StatBlock label="Leads" value="312" size="sm" />
      <StatBlock label="Leads" value="312" size="md" />
      <StatBlock label="Leads" value="312" size="lg" />
    </div>
  ),
};

export const DashboardRow: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      <StatBlock
        label="Revenue"
        value="$48.2K"
        trend={{ value: "+12%", direction: "up" }}
        sub="vs last month"
      />
      <StatBlock
        label="Active Clients"
        value="142"
        trend={{ value: "+3", direction: "up" }}
      />
      <StatBlock
        label="Churn"
        value="2.8%"
        trend={{ value: "-0.5%", direction: "down" }}
        accent
      />
      <StatBlock
        label="Avg Deal Size"
        value="$12.4K"
        trend={{ value: "0%", direction: "neutral" }}
        sub="holding steady"
      />
    </div>
  ),
};
