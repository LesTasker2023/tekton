import type { Meta, StoryObj } from "@storybook/react";
import { NavShell } from "./NavShell";

const meta: Meta<typeof NavShell> = {
  title: "Layout/NavShell",
  component: NavShell,
};

export default meta;
type Story = StoryObj<typeof NavShell>;

export const Default: Story = {
  args: {
    children: <div>Page content</div>,
  },
};
