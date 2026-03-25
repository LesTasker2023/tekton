import type { Meta, StoryObj } from "@storybook/react";
import { ImageGallerySection } from "./ImageGallerySection";

const meta: Meta<typeof ImageGallerySection> = {
  title: "Sections/ImageGallerySection",
  component: ImageGallerySection,
  argTypes: {
    layout: {
      control: "select",
      options: ["grid", "masonry", "single"],
    },
    columns: {
      control: { type: "number", min: 1, max: 6 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageGallerySection>;

const makeImage = (alt: string, caption?: string) => ({
  image: { asset: { _ref: "stub" } },
  alt,
  ...(caption ? { caption } : {}),
});

export const Default: Story = {
  args: {
    images: [
      makeImage("Brand identity shoot"),
      makeImage("Office workspace"),
      makeImage("Team brainstorming session"),
      makeImage("Product photography setup"),
      makeImage("Client presentation"),
      makeImage("Design review meeting"),
    ],
  },
};

export const WithCaptions: Story = {
  args: {
    images: [
      makeImage("Brand identity shoot", "Brand Identity — Acme Corp rebrand"),
      makeImage("Mobile app design", "Mobile App — FinTrack dashboard redesign"),
      makeImage("Website launch", "Web — Meridian Group corporate site"),
      makeImage("Packaging design", "Packaging — Botanica product line"),
      makeImage("Trade show booth", "Event — CES 2025 booth design"),
      makeImage("Video production", "Film — Quarterly brand campaign"),
    ],
  },
};

export const WithHeading: Story = {
  args: {
    heading: "Selected Work",
    images: [
      makeImage("Project Alpha"),
      makeImage("Project Beta"),
      makeImage("Project Gamma"),
      makeImage("Project Delta"),
      makeImage("Project Epsilon"),
      makeImage("Project Zeta"),
    ],
  },
};

export const TwoColumns: Story = {
  args: {
    heading: "Before & After",
    columns: 2,
    images: [
      makeImage("Before redesign", "Before — Legacy website"),
      makeImage("After redesign", "After — Modern responsive rebuild"),
    ],
  },
};

export const FourColumns: Story = {
  args: {
    heading: "Team Gallery",
    columns: 4,
    images: [
      makeImage("Sarah, Lead Designer"),
      makeImage("Marcus, Engineering Director"),
      makeImage("Priya, Strategy Lead"),
      makeImage("James, Creative Director"),
    ],
  },
};

export const MasonryLayout: Story = {
  args: {
    heading: "Studio Life",
    layout: "masonry",
    images: [
      makeImage("Whiteboard session", "Monday morning planning"),
      makeImage("Coffee corner", "Fuel for creativity"),
      makeImage("Desk setup", "Where the magic happens"),
      makeImage("Team lunch", "Friday team lunch tradition"),
      makeImage("Workshop", "Design thinking workshop"),
      makeImage("Celebration", "Project launch celebration"),
    ],
  },
};

export const SingleLayout: Story = {
  args: {
    heading: "Featured Project",
    layout: "single",
    images: [
      makeImage(
        "Hero project showcase",
        "Meridian Group — Complete brand transformation from strategy through digital launch"
      ),
    ],
  },
};

export const LargeGallery: Story = {
  args: {
    heading: "Full Portfolio",
    images: [
      makeImage("E-commerce platform", "Retail — ShopVault"),
      makeImage("SaaS dashboard", "SaaS — CloudMetrics"),
      makeImage("Healthcare portal", "Health — MedConnect"),
      makeImage("Real estate site", "Property — UrbanNest"),
      makeImage("Fintech app", "Finance — PayBridge"),
      makeImage("Education platform", "EdTech — LearnPath"),
      makeImage("Travel booking", "Travel — Wanderlust"),
      makeImage("Fitness tracker", "Wellness — PulsePoint"),
      makeImage("Restaurant branding", "Food — Harvest Table"),
      makeImage("Music streaming", "Media — SoundWave"),
      makeImage("Logistics dashboard", "Ops — FreightLine"),
      makeImage("Non-profit site", "Social — GreenFuture"),
    ],
  },
};
