import type { Meta, StoryObj } from "@storybook/react";
import { PageHero } from "./PageHero";

const meta: Meta<typeof PageHero> = {
  title: "Sections/PageHero",
  component: PageHero,
};

export default meta;
type Story = StoryObj<typeof PageHero>;

export const Default: Story = {
  args: {
    title: "Page Title",
  },
};
