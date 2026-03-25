import type { Meta, StoryObj } from "@storybook/react";

import { Zap, Rocket, Shield, Star, Heart, Globe } from "lucide-react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "interactive", "accent", "compact"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    imageHeight: { control: { type: "range", min: 80, max: 300, step: 10 } },
  },
  args: {
    onClick: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h3 style={{ margin: "0 0 8px" }}>Project Overview</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>
          Track your team&apos;s progress across sprints with real-time
          analytics and automated status reports.
        </p>
      </>
    ),
  },
};

export const Interactive: Story = {
  args: {
    variant: "interactive",
    onClick: () => {},
    children: (
      <>
        <h3 style={{ margin: "0 0 8px" }}>Launch Campaign</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>
          Click to configure and deploy your next marketing campaign across
          all channels.
        </p>
      </>
    ),
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    children: (
      <>
        <h3 style={{ margin: "0 0 8px" }}>Premium Plan</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>
          Unlock unlimited projects, advanced analytics, and priority support
          for your entire organization.
        </p>
      </>
    ),
  },
};

export const Compact: Story = {
  args: {
    variant: "compact",
    children: (
      <>
        <strong>Quick Stat</strong>
        <span style={{ marginLeft: 8, opacity: 0.7 }}>42 active users</span>
      </>
    ),
  },
};

export const WithImage: Story = {
  args: {
    image: "https://picsum.photos/seed/tekton-card/600/300",
    imageAlt: "Abstract landscape",
    imageHeight: 180,
    children: (
      <>
        <h3 style={{ margin: "0 0 8px" }}>Mountain Retreat</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>
          An exclusive team offsite nestled in the Swiss Alps. Three days of
          workshops, strategy sessions, and fresh mountain air.
        </p>
      </>
    ),
  },
};

export const WithBackgroundIcon: Story = {
  args: {
    bgIcon: Zap,
    children: (
      <>
        <h3 style={{ margin: "0 0 8px" }}>Performance Boost</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>
          Optimize your build pipeline with parallel execution and intelligent
          caching strategies.
        </p>
      </>
    ),
  },
};

export const WithBackgroundImage: Story = {
  args: {
    bgImage: "https://picsum.photos/seed/tekton-bg/400/400",
    children: (
      <>
        <h3 style={{ margin: "0 0 8px" }}>Featured Event</h3>
        <p style={{ margin: 0, opacity: 0.7 }}>
          Annual developer conference bringing together 2,000+ engineers for
          talks, workshops, and networking.
        </p>
      </>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      {(["default", "interactive", "accent", "compact"] as const).map(
        (variant) => (
          <Card key={variant} variant={variant} onClick={variant === "interactive" ? () => {} : undefined}>
            <h3 style={{ margin: "0 0 4px", textTransform: "capitalize" }}>
              {variant} Variant
            </h3>
            <p style={{ margin: 0, opacity: 0.7 }}>
              This card uses the &ldquo;{variant}&rdquo; variant styling.
            </p>
          </Card>
        ),
      )}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Card key={size} size={size}>
          <h3 style={{ margin: "0 0 4px" }}>Size: {size.toUpperCase()}</h3>
          <p style={{ margin: 0, opacity: 0.7 }}>
            Card content at the {size} size preset.
          </p>
        </Card>
      ))}
    </div>
  ),
};

const gridItems: {
  title: string;
  desc: string;
  variant: "default" | "interactive" | "accent" | "compact";
  icon?: typeof Zap;
  image?: string;
}[] = [
  { title: "Deployments", desc: "12 active services", variant: "default", icon: Rocket },
  { title: "Security", desc: "All checks passing", variant: "accent", icon: Shield },
  { title: "Analytics", desc: "1.2M events today", variant: "interactive", icon: Star },
  { title: "Team Morale", desc: "Trending upward", variant: "default", icon: Heart },
  { title: "Global CDN", desc: "99.97% uptime", variant: "accent", icon: Globe },
  { title: "Build Pipeline", desc: "Avg 2.3 min", variant: "interactive", icon: Zap },
  { title: "Destinations", desc: "Explore popular places", variant: "default", image: "https://picsum.photos/seed/grid1/600/300" },
  { title: "Workshops", desc: "Upcoming sessions", variant: "default", image: "https://picsum.photos/seed/grid2/600/300" },
  { title: "Quick Note", desc: "14 items pending review", variant: "compact" },
];

export const CardGrid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        maxWidth: 900,
      }}
    >
      {gridItems.map((item) => (
        <Card
          key={item.title}
          variant={item.variant}
          bgIcon={item.icon}
          image={item.image}
          imageHeight={120}
          onClick={item.variant === "interactive" ? () => {} : undefined}
        >
          <h3 style={{ margin: "0 0 4px" }}>{item.title}</h3>
          <p style={{ margin: 0, opacity: 0.7, fontSize: 14 }}>{item.desc}</p>
        </Card>
      ))}
    </div>
  ),
};
