import type { Meta, StoryObj } from "@storybook/react";
import { PortableTextBody } from "./PortableTextBody";

const meta: Meta<typeof PortableTextBody> = {
  title: "UI/PortableTextBody",
  component: PortableTextBody,
};

export default meta;
type Story = StoryObj<typeof PortableTextBody>;

export const Default: Story = {};
