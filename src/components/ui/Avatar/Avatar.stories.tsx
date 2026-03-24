import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    status: { control: "select", options: [undefined, "online", "offline", "away"] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: { src: "https://i.pravatar.cc/80?u=1", name: "Jane Doe", size: "lg" },
};

export const Initials: Story = {
  args: { name: "John Smith", size: "lg" },
};

export const SingleInitial: Story = {
  args: { name: "Alice", size: "lg" },
};

export const WithStatus: Story = {
  args: { name: "Jane Doe", status: "online", size: "lg" },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar name="A" size="xs" />
      <Avatar name="AB" size="sm" />
      <Avatar name="CD" size="md" />
      <Avatar name="EF" size="lg" />
      <Avatar name="GH" size="xl" />
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar name="Online" status="online" size="lg" />
      <Avatar name="Away" status="away" size="lg" />
      <Avatar name="Offline" status="offline" size="lg" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar name="Alice B" />
      <Avatar name="Bob C" />
      <Avatar name="Carol D" />
      <Avatar name="Dave E" />
      <Avatar name="Eve F" />
    </AvatarGroup>
  ),
};
