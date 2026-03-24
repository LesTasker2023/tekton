import type { Meta, StoryObj } from "@storybook/react";
import { StatBlock } from "./StatBlock";

const meta: Meta<typeof StatBlock> = {
  title: "UI/StatBlock",
  component: StatBlock,
};

export default meta;
type Story = StoryObj<typeof StatBlock>;

export const Default: Story = {
  args: {
    label: "Stat",
    value: "100",
  },
};
