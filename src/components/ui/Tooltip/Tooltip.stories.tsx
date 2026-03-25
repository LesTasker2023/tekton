import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    delay: { control: { type: "number", min: 0, max: 2000, step: 50 } },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "6rem", display: "flex", justifyContent: "center" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "This action saves your draft",
    placement: "top",
    children: <button style={{ padding: "0.5rem 1rem" }}>Hover me</button>,
  },
};

export const Bottom: Story = {
  args: {
    content: "Opens client details",
    placement: "bottom",
    children: <button style={{ padding: "0.5rem 1rem" }}>Bottom tooltip</button>,
  },
};

export const Left: Story = {
  args: {
    content: "Previous page",
    placement: "left",
    children: <button style={{ padding: "0.5rem 1rem" }}>Left tooltip</button>,
  },
};

export const Right: Story = {
  args: {
    content: "Next page",
    placement: "right",
    children: <button style={{ padding: "0.5rem 1rem" }}>Right tooltip</button>,
  },
};

export const LongContent: Story = {
  args: {
    content:
      "This tooltip contains a longer description to explain the feature in detail. Hover states persist while the cursor remains over the trigger element.",
    placement: "top",
    children: <button style={{ padding: "0.5rem 1rem" }}>Long content</button>,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <div>
        <strong>Keyboard Shortcut</strong>
        <br />
        Press <kbd style={{ padding: "0 4px", background: "#333", borderRadius: 3 }}>Ctrl+S</kbd> to save
      </div>
    ),
    placement: "bottom",
    children: <button style={{ padding: "0.5rem 1rem" }}>Rich content</button>,
  },
};

export const NoDelay: Story = {
  args: {
    content: "Appears instantly",
    delay: 0,
    placement: "top",
    children: <button style={{ padding: "0.5rem 1rem" }}>No delay</button>,
  },
};

export const AllPlacements: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        maxWidth: 400,
      }}
    >
      {(["top", "bottom", "left", "right"] as const).map((placement) => (
        <Tooltip key={placement} content={`Placed on ${placement}`} placement={placement}>
          <button style={{ padding: "0.5rem 1rem", width: "100%" }}>
            {placement}
          </button>
        </Tooltip>
      ))}
    </div>
  ),
};
