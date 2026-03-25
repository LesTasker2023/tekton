import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "UI/Breadcrumb",
  component: Breadcrumb,
  argTypes: {
    separator: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Wireless Keyboard" },
    ],
  },
};

export const DeepNesting: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Organization", href: "/org" },
      { label: "Engineering", href: "/org/engineering" },
      { label: "Frontend", href: "/org/engineering/frontend" },
      { label: "Components", href: "/org/engineering/frontend/components" },
      { label: "Breadcrumb" },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Settings", href: "/settings" },
      { label: "Notifications" },
    ],
    separator: "/",
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: "Dashboard" }],
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      { label: "Account", href: "/account" },
      { label: "Billing" },
    ],
  },
};

export const WithLongLabels: Story = {
  args: {
    items: [
      { label: "Enterprise Resource Planning", href: "/erp" },
      { label: "Human Resources Management", href: "/erp/hr" },
      { label: "Employee Performance Reviews & Evaluations" },
    ],
  },
};
