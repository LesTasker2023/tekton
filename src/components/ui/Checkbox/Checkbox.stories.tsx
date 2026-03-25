import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  args: {
    onChange: () => {},
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
    label: { control: "text" },
    description: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { checked: false },
};

export const Checked: Story = {
  args: { checked: true },
};

export const WithLabel: Story = {
  args: { checked: false, label: "Accept terms and conditions" },
};

export const WithDescription: Story = {
  args: {
    checked: false,
    label: "Marketing emails",
    description: "Receive occasional updates about new features and offers.",
  },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true, label: "Unavailable option" },
};

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true, label: "Locked selection" },
};

export const Indeterminate: Story = {
  args: { checked: false, indeterminate: true, label: "Select all" },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        checked={checked}
        onChange={setChecked}
        label={checked ? "Checked" : "Unchecked"}
      />
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Checkbox checked={false} onChange={() => {}} label="Unchecked" />
      <Checkbox checked={true} onChange={() => {}} label="Checked" />
      <Checkbox checked={false} onChange={() => {}} disabled label="Disabled" />
      <Checkbox checked={true} onChange={() => {}} disabled label="Disabled + Checked" />
      <Checkbox checked={false} onChange={() => {}} indeterminate label="Indeterminate" />
      <Checkbox
        checked={false}
        onChange={() => {}}
        label="With description"
        description="Additional helper text for context."
      />
    </div>
  ),
};
