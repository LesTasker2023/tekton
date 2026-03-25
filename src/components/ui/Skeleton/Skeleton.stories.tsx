import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "block", "circle", "stat", "card"],
    },
    width: { control: "text" },
    height: { control: "text" },
    lines: { control: { type: "number", min: 1, max: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: { variant: "text" },
};

export const Block: Story = {
  args: { variant: "block" },
};

export const Circle: Story = {
  args: { variant: "circle" },
};

export const Stat: Story = {
  args: { variant: "stat" },
};

export const Card: Story = {
  args: { variant: "card" },
};

export const MultiLine: Story = {
  args: { variant: "text", lines: 3 },
};

export const CustomDimensions: Story = {
  args: { variant: "block", width: "200px", height: "120px" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {(["text", "block", "circle", "stat", "card"] as const).map((v) => (
        <div key={v}>
          <p style={{ marginBottom: "0.5rem", fontWeight: 600, color: "#aaa" }}>
            {v}
          </p>
          <Skeleton variant={v} />
        </div>
      ))}
    </div>
  ),
};

export const LoadingCardGrid: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Skeleton variant="card" />
      <Skeleton variant="card" />
      <Skeleton variant="card" />
    </div>
  ),
};
