import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const sampleItems = [
  { key: "1", title: "What is Tekton?", content: "Tekton is a configurable agency starter kit built on Next.js and Sanity CMS." },
  { key: "2", title: "How do skins work?", content: "Skins apply decorative CSS and component decorators on top of vanilla structural styles." },
  { key: "3", title: "Can I use my own CMS?", content: "The template is built for Sanity, but the component library is CMS-agnostic." },
  { key: "4", title: "Is it free?", content: "Tekton is available under the MIT license." },
];

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: { items: sampleItems },
};

export const Multiple: Story = {
  args: { items: sampleItems, multiple: true },
};

export const WithDisabled: Story = {
  args: {
    items: [
      sampleItems[0],
      { ...sampleItems[1], disabled: true },
      sampleItems[2],
      sampleItems[3],
    ],
  },
};
