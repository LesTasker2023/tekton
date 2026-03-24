import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const sampleItems = [
  { key: "overview", label: "Overview", content: "Overview content goes here." },
  { key: "features", label: "Features", content: "Features content goes here." },
  { key: "pricing", label: "Pricing", content: "Pricing content goes here." },
  { key: "faq", label: "FAQ", content: "Frequently asked questions." },
];

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  argTypes: {
    variant: { control: "select", options: ["underline", "pills"] },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Underline: Story = {
  args: { items: sampleItems, variant: "underline" },
};

export const Pills: Story = {
  args: { items: sampleItems, variant: "pills" },
};

export const WithDisabled: Story = {
  args: {
    items: [
      ...sampleItems.slice(0, 2),
      { key: "disabled", label: "Disabled", content: "", disabled: true },
      sampleItems[3],
    ],
    variant: "underline",
  },
};

export const DefaultActive: Story = {
  args: { items: sampleItems, defaultActiveKey: "pricing" },
};
