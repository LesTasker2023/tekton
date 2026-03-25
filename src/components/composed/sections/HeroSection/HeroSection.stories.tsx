import type { Meta, StoryObj } from "@storybook/react";
import { HeroSection } from "./HeroSection";

const meta: Meta<typeof HeroSection> = {
  title: "Sections/HeroSection",
  component: HeroSection,
  argTypes: {
    align: {
      control: "select",
      options: ["left", "center"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    heading: "Launch Your Brand Into the Future",
    subheading:
      "We build digital experiences that drive growth, engage audiences, and deliver measurable results.",
    align: "center",
  },
};

export const WithCTA: Story = {
  args: {
    heading: "Transform Your Digital Presence",
    subheading:
      "Full-service creative agency specializing in branding, web development, and strategic marketing.",
    cta: { label: "Get Started", href: "/contact" },
    align: "center",
  },
};

export const WithBackgroundImage: Story = {
  args: {
    heading: "Crafted for Impact",
    subheading: "Design-led strategy that connects brands with their audience.",
    backgroundImage: { asset: { _ref: "stub" } },
    cta: { label: "See Our Work", href: "/portfolio" },
    align: "center",
  },
};

export const WithBackgroundVideo: Story = {
  args: {
    heading: "Motion Tells the Story",
    subheading:
      "Cinematic visuals and immersive storytelling for forward-thinking brands.",
    backgroundVideoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    cta: { label: "Watch Reel", href: "/reel" },
    align: "center",
  },
};

export const LeftAligned: Story = {
  args: {
    heading: "Built for Scale",
    subheading:
      "Enterprise-grade infrastructure paired with startup-speed execution. We help companies grow from zero to market leader.",
    backgroundImage: { asset: { _ref: "stub" } },
    cta: { label: "Learn More", href: "/services" },
    align: "left",
  },
};

export const MinimalHeadingOnly: Story = {
  args: {
    heading: "We Create. You Grow.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <HeroSection
        heading="Centered with CTA"
        subheading="This variant is center-aligned with a call to action."
        cta={{ label: "Get Started", href: "/start" }}
        align="center"
      />
      <HeroSection
        heading="Left Aligned with Background"
        subheading="This variant is left-aligned with a background image."
        backgroundImage={{ asset: { _ref: "stub" } }}
        align="left"
      />
      <HeroSection heading="Minimal Heading Only" />
    </div>
  ),
};
