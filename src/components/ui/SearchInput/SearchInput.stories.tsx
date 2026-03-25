import type { Meta, StoryObj } from "@storybook/react";

import { SearchInput } from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "UI/SearchInput",
  component: SearchInput,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    debounce: { control: { type: "number", min: 0, step: 50 } },
    autoFocus: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: "quarterly revenue report",
  },
};

export const SmallSize: Story = {
  args: {
    size: "sm",
    placeholder: "Quick search...",
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
    placeholder: "Search across all projects and documents...",
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Find teammates by name or role...",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
      <div>
        <p style={{ margin: "0 0 4px", fontSize: 12, opacity: 0.6 }}>Small</p>
        <SearchInput size="sm" placeholder="Small search..." onChange={() => {}} />
      </div>
      <div>
        <p style={{ margin: "0 0 4px", fontSize: 12, opacity: 0.6 }}>Medium (default)</p>
        <SearchInput size="md" placeholder="Medium search..." onChange={() => {}} />
      </div>
      <div>
        <p style={{ margin: "0 0 4px", fontSize: 12, opacity: 0.6 }}>Large</p>
        <SearchInput size="lg" placeholder="Large search..." onChange={() => {}} />
      </div>
    </div>
  ),
};
