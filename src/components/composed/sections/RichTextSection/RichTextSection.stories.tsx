import type { Meta, StoryObj } from "@storybook/react";
import { RichTextSection } from "./RichTextSection";

const meta: Meta<typeof RichTextSection> = {
  title: "Sections/RichTextSection",
  component: RichTextSection,
};

export default meta;
type Story = StoryObj<typeof RichTextSection>;

export const Default: Story = {};
