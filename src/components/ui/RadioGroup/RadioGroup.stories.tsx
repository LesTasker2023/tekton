import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";

const baseOptions = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "push", label: "Push notification" },
];

const optionsWithDesc = [
  { value: "free", label: "Free", description: "Basic features, up to 3 projects" },
  { value: "pro", label: "Pro", description: "Advanced features, unlimited projects" },
  { value: "enterprise", label: "Enterprise", description: "Custom solutions, dedicated support" },
];

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  args: {
    onChange: () => {},
  },
  argTypes: {
    direction: { control: "select", options: ["vertical", "horizontal"] },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: { name: "contact", options: baseOptions },
};

export const WithDescriptions: Story = {
  args: { name: "plan", options: optionsWithDesc, label: "Select a plan" },
};

export const Horizontal: Story = {
  args: { name: "h-contact", options: baseOptions, direction: "horizontal" },
};

export const WithPreselected: Story = {
  args: { name: "preselected", options: baseOptions, value: "sms" },
};

export const WithDisabledOption: Story = {
  args: {
    name: "partial-disabled",
    options: [
      { value: "a", label: "Available" },
      { value: "b", label: "Unavailable", disabled: true },
      { value: "c", label: "Also available" },
    ],
  },
};

export const AllDisabled: Story = {
  args: {
    name: "all-disabled",
    options: baseOptions,
    value: "email",
    disabled: true,
  },
};

export const WithGroupLabel: Story = {
  args: {
    name: "labeled",
    options: baseOptions,
    label: "Preferred contact method",
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("free");
    return (
      <RadioGroup
        name="interactive-plan"
        options={optionsWithDesc}
        value={value}
        onChange={setValue}
        label="Choose your plan"
      />
    );
  },
};
