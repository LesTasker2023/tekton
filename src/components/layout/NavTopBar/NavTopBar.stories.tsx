import type { Meta, StoryObj } from "@storybook/react";
import { NavTopBar } from "./NavTopBar";

const meta: Meta<typeof NavTopBar> = {
  title: "Layout/NavTopBar",
  component: NavTopBar,
  parameters: {
    nextjs: { appDirectory: true },
  },
};

export default meta;
type Story = StoryObj<typeof NavTopBar>;

export const Default: Story = {
  args: {
    children: <div style={{ padding: "2rem" }}>Page content</div>,
  },
};

export const WithCustomNav: Story = {
  args: {
    children: <div style={{ padding: "2rem" }}>Page content</div>,
    settings: {
      siteName: "My Site",
      mainNav: [
        { label: "Home", href: "/", icon: "home" },
        { label: "Blog", href: "/blog", icon: "newspaper" },
        { label: "About", href: "/about", icon: "info" },
      ],
    },
  },
};

export const WithCustomLogo: Story = {
  args: {
    children: <div style={{ padding: "2rem" }}>Page content</div>,
    logoUrl: "/images/logo.webp",
    settings: { siteName: "Custom Logo" },
  },
};
