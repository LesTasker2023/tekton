import type { Meta, StoryObj } from "@storybook/react";

import { Select, type SelectOption } from "./Select";

/* ------------------------------------------------------------------ */
/*  Shared option sets                                                  */
/* ------------------------------------------------------------------ */

const roleOptions: SelectOption[] = [
  { label: "Administrator", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
  { label: "Contributor", value: "contributor" },
  { label: "Billing Manager", value: "billing" },
];

const countryOptions: SelectOption[] = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "gb" },
  { label: "Canada", value: "ca" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
  { label: "Australia", value: "au" },
  { label: "Brazil", value: "br" },
  { label: "India", value: "in" },
  { label: "South Korea", value: "kr" },
  { label: "Mexico", value: "mx" },
  { label: "Italy", value: "it" },
  { label: "Spain", value: "es" },
  { label: "Netherlands", value: "nl" },
  { label: "Sweden", value: "se" },
  { label: "Norway", value: "no" },
];

const disabledOptions: SelectOption[] = [
  { label: "Free Tier", value: "free" },
  { label: "Starter ($9/mo)", value: "starter" },
  { label: "Professional ($29/mo)", value: "pro" },
  { label: "Enterprise (Contact us)", value: "enterprise", disabled: true },
  { label: "Legacy Plan", value: "legacy", disabled: true },
];

/* ------------------------------------------------------------------ */
/*  Meta                                                                */
/* ------------------------------------------------------------------ */

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    placeholder: { control: "text" },
    label: { control: "text" },
  },
  args: {
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

/* ------------------------------------------------------------------ */
/*  Stories                                                             */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    options: roleOptions,
    placeholder: "Choose a role...",
  },
};

export const WithLabel: Story = {
  args: {
    options: roleOptions,
    label: "User Role",
    placeholder: "Select role...",
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: disabledOptions,
    label: "Subscription Plan",
    placeholder: "Choose a plan...",
  },
};

export const PreSelected: Story = {
  args: {
    options: roleOptions,
    value: "editor",
    label: "Current Role",
  },
};

export const SmallSize: Story = {
  args: {
    options: roleOptions,
    size: "sm",
    placeholder: "Role...",
  },
};

export const LargeSize: Story = {
  args: {
    options: roleOptions,
    size: "lg",
    label: "Assign Role",
    placeholder: "Pick a role...",
  },
};

export const ManyOptions: Story = {
  args: {
    options: countryOptions,
    label: "Country",
    placeholder: "Select country...",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 320 }}>
      <Select
        options={roleOptions}
        size="sm"
        label="Small"
        placeholder="Select..."
        onChange={() => {}}
      />
      <Select
        options={roleOptions}
        size="md"
        label="Medium (default)"
        placeholder="Select..."
        onChange={() => {}}
      />
      <Select
        options={roleOptions}
        size="lg"
        label="Large"
        placeholder="Select..."
        onChange={() => {}}
      />
    </div>
  ),
};
