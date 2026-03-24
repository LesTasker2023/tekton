import type { Meta, StoryObj } from "@storybook/react";
import { CtaSection } from "./CtaSection";

const meta: Meta<typeof CtaSection> = {
  title: "Sections/CtaSection",
  component: CtaSection,
};

export default meta;
type Story = StoryObj<typeof CtaSection>;

export const Default: Story = {};
