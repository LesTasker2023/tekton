import type { Meta, StoryObj } from "@storybook/react";
import { ContactSection } from "./ContactSection";

const meta: Meta<typeof ContactSection> = {
  title: "Sections/ContactSection",
  component: ContactSection,
};

export default meta;
type Story = StoryObj<typeof ContactSection>;

export const Default: Story = {};

export const CustomHeading: Story = {
  args: {
    heading: "Start a Project",
    confirmationMessage: "We'll be in touch within 24 hours.",
  },
};
