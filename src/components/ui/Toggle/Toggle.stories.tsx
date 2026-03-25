import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  args: {
    onChange: () => {},
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: { checked: false },
};

export const Checked: Story = {
  args: { checked: true },
};

export const WithLabel: Story = {
  args: { checked: false, label: "Enable notifications" },
};

export const SmallSize: Story = {
  args: { checked: true, size: "sm", label: "Compact toggle" },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true, label: "Unavailable" },
};

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true, label: "Locked on" },
};

export const Interactive: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <Toggle
        checked={on}
        onChange={setOn}
        label={on ? "Active" : "Inactive"}
      />
    );
  },
};

export const AllStates: Story = {
  render: () => {
    const sizes = ["sm", "md"] as const;
    const states = [
      { checked: false, disabled: false, note: "Off" },
      { checked: true, disabled: false, note: "On" },
      { checked: false, disabled: true, note: "Off + Disabled" },
      { checked: true, disabled: true, note: "On + Disabled" },
    ];
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "1.5rem 3rem",
        }}
      >
        {sizes.map((size) =>
          states.map((s) => (
            <Toggle
              key={`${size}-${s.note}`}
              checked={s.checked}
              onChange={() => {}}
              disabled={s.disabled}
              size={size}
              label={`${size} / ${s.note}`}
            />
          )),
        )}
      </div>
    );
  },
};
