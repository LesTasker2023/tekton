import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Drawer } from "./Drawer";

const meta: Meta<typeof Drawer> = {
  title: "UI/Drawer",
  component: Drawer,
  args: {
    onClose: () => {},
  },
  argTypes: {
    width: { control: "select", options: ["sm", "md", "lg"] },
    side: { control: "select", options: ["left", "right"] },
    open: { control: "boolean" },
    title: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const sampleContent = (
  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    <p>This is the drawer body content. It can hold any elements you need.</p>
    <p>Scroll or interact with the content here.</p>
  </div>
);

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Drawer</button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Project Details" side="right" width="md">
          {sampleContent}
        </Drawer>
      </>
    );
  },
};

export const LeftSide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Left Drawer</button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Navigation" side="left" width="md">
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <a href="#">Dashboard</a>
            <a href="#">Projects</a>
            <a href="#">Clients</a>
            <a href="#">Reports</a>
            <a href="#">Settings</a>
          </nav>
        </Drawer>
      </>
    );
  },
};

export const SmallWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Small Drawer</button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Quick Actions" width="sm">
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li>Create Task</li>
            <li>Send Invoice</li>
            <li>Schedule Meeting</li>
          </ul>
        </Drawer>
      </>
    );
  },
};

export const LargeWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Large Drawer</button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Client Overview" width="lg">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ margin: 0 }}>Acme Corporation</h3>
            <p>Annual contract value: $240,000</p>
            <p>Primary contact: Jane Smith, VP of Operations</p>
            <p>Active projects: 3</p>
            <p>Last engagement: March 2026</p>
          </div>
        </Drawer>
      </>
    );
  },
};

export const WithTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Titled Drawer</button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Account Settings">
          <p>Manage notification preferences, billing information, and team access.</p>
        </Drawer>
      </>
    );
  },
};

export const WithFormContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Form Drawer</button>
        <Drawer open={open} onClose={() => setOpen(false)} title="New Client">
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              Company Name
              <input type="text" placeholder="Acme Corp" style={{ padding: "0.5rem" }} />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              Contact Email
              <input type="email" placeholder="jane@acme.com" style={{ padding: "0.5rem" }} />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              Industry
              <select style={{ padding: "0.5rem" }}>
                <option>Technology</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Manufacturing</option>
              </select>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              Notes
              <textarea rows={3} placeholder="Additional details..." style={{ padding: "0.5rem" }} />
            </label>
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
              <button type="button" onClick={() => setOpen(false)}>Cancel</button>
              <button type="submit">Save Client</button>
            </div>
          </form>
        </Drawer>
      </>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Toggle Drawer</button>
        <p style={{ marginTop: "0.5rem", color: "#888" }}>
          Drawer is {open ? "open" : "closed"}. Press Escape or click the backdrop to close.
        </p>
        <Drawer open={open} onClose={() => setOpen(false)} title="Interactive Panel" width="md">
          <p>Click the backdrop, press Escape, or use the close button to dismiss.</p>
        </Drawer>
      </>
    );
  },
};
