import type { Meta, StoryObj } from "@storybook/react";
import { StatsRowSection } from "./StatsRowSection";

const meta: Meta<typeof StatsRowSection> = {
  title: "Sections/StatsRowSection",
  component: StatsRowSection,
};

export default meta;
type Story = StoryObj<typeof StatsRowSection>;

export const Default: Story = {};
