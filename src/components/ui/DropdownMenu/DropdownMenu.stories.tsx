import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Edit, Copy, Trash2, Download } from "lucide-react";
import { DropdownMenu, type DropdownMenuItem } from "./DropdownMenu";

const basicItems: DropdownMenuItem[] = [
  { label: "Edit", value: "edit" },
  { label: "Duplicate", value: "duplicate" },
  { label: "Archive", value: "archive" },
  { label: "Export", value: "export" },
];

const iconItems: DropdownMenuItem[] = [
  { label: "Edit", value: "edit", icon: <Edit size={14} /> },
  { label: "Copy", value: "copy", icon: <Copy size={14} /> },
  { label: "Download", value: "download", icon: <Download size={14} /> },
  { label: "Delete", value: "delete", icon: <Trash2 size={14} />, danger: true },
];

const meta: Meta<typeof DropdownMenu> = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
  args: {
    onSelect: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  args: {
    trigger: "Actions",
    items: basicItems,
  },
};

export const WithIcons: Story = {
  args: {
    trigger: "File Actions",
    items: iconItems,
  },
};

export const RightAligned: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <DropdownMenu
        trigger="Right Aligned"
        items={basicItems}
        align="right"
        onSelect={() => {}}
      />
    </div>
  ),
};

export const WithDisabledItem: Story = {
  args: {
    trigger: "Options",
    items: [
      { label: "View", value: "view" },
      { label: "Edit", value: "edit" },
      { label: "Admin Only", value: "admin", disabled: true },
      { label: "Settings", value: "settings" },
    ],
  },
};

export const WithDangerItem: Story = {
  args: {
    trigger: "Manage",
    items: [
      { label: "Edit", value: "edit" },
      { label: "Move", value: "move" },
      { label: "Delete", value: "delete", danger: true },
    ],
  },
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <DropdownMenu
          trigger="Pick Action"
          items={basicItems}
          onSelect={setSelected}
        />
        {selected && (
          <span style={{ fontFamily: "monospace" }}>
            Selected: {selected}
          </span>
        )}
      </div>
    );
  },
};
