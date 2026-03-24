import type { Meta, StoryObj } from "@storybook/react";
import { ImageGallerySection } from "./ImageGallerySection";

const meta: Meta<typeof ImageGallerySection> = {
  title: "Sections/ImageGallerySection",
  component: ImageGallerySection,
};

export default meta;
type Story = StoryObj<typeof ImageGallerySection>;

export const Default: Story = {};
