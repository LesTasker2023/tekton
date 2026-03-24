import type { Meta, StoryObj } from "@storybook/react";
import { SiteHero } from "./SiteHero";

const meta: Meta<typeof SiteHero> = {
  title: "Composed/SiteHero",
  component: SiteHero,
};

export default meta;
type Story = StoryObj<typeof SiteHero>;

export const Default: Story = {
  args: {
    title: "Hello *World*",
    tagline: "A tagline goes here",
  },
};
