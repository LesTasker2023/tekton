import type { Meta, StoryObj } from "@storybook/react";
import { EventCalendar } from "./EventCalendar";

const meta: Meta<typeof EventCalendar> = {
  title: "UI/EventCalendar",
  component: EventCalendar,
};

export default meta;
type Story = StoryObj<typeof EventCalendar>;

export const Default: Story = {};
