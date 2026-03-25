import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Layout/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    text: {
      control: "text",
      description:
        'Footer text. Use {year} as a placeholder for the current year. Defaults to "© {year} Tekton. All rights reserved."',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

/** Renders with the default copyright text when no `text` prop is provided. */
export const Default: Story = {};

/** Custom copyright text referencing an external brand. */
export const CustomText: Story = {
  args: {
    text: "© {year} Acme Corp. Built with Tekton.",
  },
};

/** Branded footer emphasizing the platform name. */
export const BrandedFooter: Story = {
  args: {
    text: "Powered by Tekton Agency Platform — © {year}",
  },
};

/** Minimal footer showing only the year and copyright symbol. */
export const MinimalFooter: Story = {
  args: {
    text: "© {year}",
  },
};
