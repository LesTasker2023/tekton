import type { Meta, StoryObj } from "@storybook/react";
import { SectionHeader } from "./SectionHeader";

const meta: Meta<typeof SectionHeader> = {
  title: "UI/SectionHeader",
  component: SectionHeader,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {
  args: { title: "Section Title" },
};

export const Small: Story = {
  args: { title: "Small Header", size: "sm" },
};

export const Large: Story = {
  args: { title: "Large Header", size: "lg" },
};

export const Accent: Story = {
  args: { title: "Accent Header", accent: true },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <SectionHeader title="Small" size="sm" />
      <SectionHeader title="Medium" size="md" />
      <SectionHeader title="Large" size="lg" />
      <SectionHeader title="Accent" accent />
    </div>
  ),
};
