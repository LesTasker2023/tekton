import type { Meta, StoryObj } from "@storybook/react";
import { ContactForm } from "./ContactForm";

const meta: Meta<typeof ContactForm> = {
  title: "UI/ContactForm",
  component: ContactForm,
};

export default meta;
type Story = StoryObj<typeof ContactForm>;

export const Default: Story = {};

export const CustomHeading: Story = {
  args: {
    heading: "Start a Project",
    confirmationMessage: "We'll be in touch within 24 hours.",
  },
};
