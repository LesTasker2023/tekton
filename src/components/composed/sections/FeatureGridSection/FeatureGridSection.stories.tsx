import type { Meta, StoryObj } from "@storybook/react";
import { FeatureGridSection } from "./FeatureGridSection";

const meta: Meta<typeof FeatureGridSection> = {
  title: "Sections/FeatureGridSection",
  component: FeatureGridSection,
};

export default meta;
type Story = StoryObj<typeof FeatureGridSection>;

export const Default: Story = {};
