import type { Meta, StoryObj } from "@storybook/react";
import { SiteHero } from "./SiteHero";

const meta: Meta<typeof SiteHero> = {
  title: "Composed/SiteHero",
  component: SiteHero,
};

export default meta;
type Story = StoryObj<typeof SiteHero>;

export const Default: Story = {
  args: {
    title: "We build *digital* experiences",
    tagline:
      "Strategy, design, and engineering under one roof — from concept to launch.",
  },
};

export const WithCTAs: Story = {
  args: {
    title: "Your brand deserves *better*",
    tagline:
      "End-to-end creative services for companies that refuse to blend in.",
    primaryCta: { label: "Start a Project", href: "/contact" },
    secondaryCta: { label: "View Portfolio", href: "/work" },
  },
};

export const WithVideo: Story = {
  args: {
    title: "Stories told through *motion*",
    tagline: "Cinematic video production for brands that move audiences.",
    videos: ["https://www.w3schools.com/html/mov_bbb.mp4"],
  },
};

export const WithMultipleVideos: Story = {
  args: {
    title: "Creative without *limits*",
    tagline:
      "Multi-discipline studio delivering branding, web, and film production.",
    videos: [
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://www.w3schools.com/html/movie.mp4",
    ],
  },
};

export const MinimalTitle: Story = {
  args: {
    title: "Tekton Studio",
  },
};

export const FullHomepage: Story = {
  args: {
    title: "Elevate your *brand* today",
    tagline:
      "We partner with ambitious companies to create award-winning digital products and campaigns.",
    primaryCta: { label: "Book a Call", href: "/schedule" },
    secondaryCta: { label: "Our Process", href: "/process" },
    videos: [
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://www.w3schools.com/html/movie.mp4",
    ],
  },
};
