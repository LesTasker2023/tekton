import type { Meta, StoryObj } from "@storybook/react";
import { Panel } from "./Panel";

const meta: Meta<typeof Panel> = {
  title: "UI/Panel",
  component: Panel,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "interactive", "accent", "danger", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "flush"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  args: { children: "Default panel content" },
};

export const Interactive: Story = {
  args: { children: "Hover me", variant: "interactive" },
};

export const Accent: Story = {
  args: { children: "Accent panel", variant: "accent" },
};

export const Danger: Story = {
  args: { children: "Danger panel", variant: "danger" },
};

export const Ghost: Story = {
  args: { children: "Ghost panel", variant: "ghost" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Panel variant="default">Default</Panel>
      <Panel variant="interactive">Interactive</Panel>
      <Panel variant="accent">Accent</Panel>
      <Panel variant="danger">Danger</Panel>
      <Panel variant="ghost">Ghost</Panel>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Panel size="sm">Small padding</Panel>
      <Panel size="md">Medium padding</Panel>
      <Panel size="lg">Large padding</Panel>
      <Panel size="flush">Flush (no padding)</Panel>
    </div>
  ),
};
