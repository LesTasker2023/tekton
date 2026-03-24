import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedBar } from "./SegmentedBar";

const meta: Meta<typeof SegmentedBar> = {
  title: "UI/SegmentedBar",
  component: SegmentedBar,
};

export default meta;
type Story = StoryObj<typeof SegmentedBar>;

export const Default: Story = {};
