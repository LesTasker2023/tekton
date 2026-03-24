import type { Meta, StoryObj } from "@storybook/react";
import { Search, Mail, Eye } from "lucide-react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: "Email", placeholder: "you@example.com" },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    error: "Please enter a valid email address.",
  },
};

export const WithHelper: Story = {
  args: {
    label: "Username",
    placeholder: "johndoe",
    helperText: "Must be at least 3 characters.",
  },
};

export const WithIcons: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    leadingIcon: <Search size={16} />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    trailingIcon: <Eye size={16} />,
  },
};

export const Small: Story = {
  args: { label: "Small", placeholder: "Small input", size: "sm" },
};

export const Large: Story = {
  args: { label: "Large", placeholder: "Large input", size: "lg" },
};

export const Disabled: Story = {
  args: { label: "Disabled", placeholder: "Cannot edit", disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 360 }}>
      <Input label="Default" placeholder="Normal state" />
      <Input label="With helper" placeholder="Has helper text" helperText="Some helpful guidance" />
      <Input label="Error" placeholder="Invalid" error="This field is required" />
      <Input label="With icon" placeholder="Search..." leadingIcon={<Search size={16} />} />
      <Input label="Disabled" placeholder="Disabled" disabled />
    </div>
  ),
};
