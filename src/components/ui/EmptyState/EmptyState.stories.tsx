import type { Meta, StoryObj } from "@storybook/react";
import { Inbox, SearchX } from "lucide-react";
import { EmptyState } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "UI/EmptyState",
  component: EmptyState,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: "No items yet",
  },
};

export const WithDescription: Story = {
  args: {
    title: "No items yet",
    description: "Get started by creating your first item.",
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Inbox />,
    title: "Inbox is empty",
    description: "You have no new messages.",
  },
};

export const WithAction: Story = {
  args: {
    icon: <Inbox />,
    title: "No projects",
    description: "Create your first project to get started.",
    action: { label: "Create Project", onClick: () => {} },
  },
};

export const WithBothActions: Story = {
  args: {
    icon: <Inbox />,
    title: "No projects",
    description: "Create a new project or import an existing one.",
    action: { label: "Create Project", onClick: () => {} },
    secondaryAction: { label: "Import", onClick: () => {} },
  },
};

export const SmallSize: Story = {
  args: {
    icon: <Inbox />,
    title: "No items",
    description: "Nothing here yet.",
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    icon: <Inbox />,
    title: "Welcome to your dashboard",
    description: "This is where your data will appear once you start tracking.",
    action: { label: "Get Started", onClick: () => {} },
    size: "lg",
  },
};

export const NoResults: Story = {
  args: {
    icon: <SearchX />,
    title: "No results found",
    description: "Try adjusting your search or filter criteria.",
    action: { label: "Clear Filters", onClick: () => {} },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <EmptyState
        icon={<Inbox />}
        title="Small"
        description="Compact empty state."
        size="sm"
      />
      <EmptyState
        icon={<Inbox />}
        title="Medium (default)"
        description="Standard empty state."
        size="md"
      />
      <EmptyState
        icon={<Inbox />}
        title="Large"
        description="Spacious empty state for full pages."
        size="lg"
      />
    </div>
  ),
};
