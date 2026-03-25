import type { Meta, StoryObj } from "@storybook/react";
import { PageHero } from "./PageHero";

const meta: Meta<typeof PageHero> = {
  title: "Sections/PageHero",
  component: PageHero,
  argTypes: {
    align: {
      control: "select",
      options: ["left", "center"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageHero>;

export const Default: Story = {
  args: {
    heading: "Our Services",
    subheading:
      "Full-spectrum creative and engineering capabilities to bring your vision to life.",
    align: "center",
  },
};

export const WithBreadcrumb: Story = {
  args: {
    heading: "Brand Strategy",
    subheading:
      "Research-driven positioning that sets you apart in crowded markets.",
    breadcrumb: "Services / Brand Strategy",
    align: "center",
  },
};

export const WithBackgroundImage: Story = {
  args: {
    heading: "About Us",
    subheading:
      "A team of strategists, designers, and engineers obsessed with craft.",
    backgroundImage: { asset: { _ref: "stub" }, alt: "Team working together" },
    align: "center",
  },
};

export const LeftAligned: Story = {
  args: {
    heading: "Case Studies",
    subheading:
      "Real results for real clients — explore the work that defines our studio.",
    backgroundImage: {
      asset: { _ref: "stub" },
      alt: "Project showcase background",
    },
    breadcrumb: "Work / Case Studies",
    align: "left",
  },
};

export const MinimalHeading: Story = {
  args: {
    heading: "Contact",
  },
};

export const FullPage: Story = {
  args: {
    heading: "Web Development",
    subheading:
      "Performant, accessible, and beautifully crafted websites built on modern frameworks.",
    backgroundImage: {
      asset: { _ref: "stub" },
      alt: "Development workspace",
    },
    breadcrumb: "Services / Web Development",
    align: "left",
  },
};
