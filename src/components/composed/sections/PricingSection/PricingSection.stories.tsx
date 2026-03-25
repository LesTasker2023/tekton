import type { Meta, StoryObj } from "@storybook/react";
import { PricingSection } from "./PricingSection";

const meta: Meta<typeof PricingSection> = {
  title: "Sections/PricingSection",
  component: PricingSection,
};

export default meta;
type Story = StoryObj<typeof PricingSection>;

const defaultTiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for side projects and experimentation.",
    features: [
      { text: "Up to 3 projects", included: true },
      { text: "1 GB storage", included: true },
      { text: "Community support", included: true },
      { text: "Custom domains", included: false },
      { text: "Analytics dashboard", included: false },
      { text: "Priority support", included: false },
    ],
    cta: { label: "Get Started", href: "/signup" },
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams that need more power and flexibility.",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "50 GB storage", included: true },
      { text: "Community support", included: true },
      { text: "Custom domains", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Priority support", included: false },
    ],
    cta: { label: "Start Free Trial", href: "/signup?plan=pro" },
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "Advanced features for large-scale operations.",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "500 GB storage", included: true },
      { text: "Community support", included: true },
      { text: "Custom domains", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Priority support", included: true },
    ],
    cta: { label: "Contact Sales", href: "/contact" },
  },
];

export const Default: Story = {
  args: {
    tiers: defaultTiers,
  },
};

export const TwoTiers: Story = {
  args: {
    tiers: [
      {
        name: "Basic",
        price: "$9",
        period: "/month",
        features: [
          { text: "5 users", included: true },
          { text: "10 GB storage", included: true },
          { text: "API access", included: false },
        ],
        cta: { label: "Choose Basic", href: "/signup?plan=basic" },
      },
      {
        name: "Premium",
        price: "$49",
        period: "/month",
        features: [
          { text: "Unlimited users", included: true },
          { text: "100 GB storage", included: true },
          { text: "API access", included: true },
        ],
        cta: { label: "Choose Premium", href: "/signup?plan=premium" },
        featured: true,
      },
    ],
  },
};

export const WithHeading: Story = {
  args: {
    heading: "Simple, Transparent Pricing",
    tiers: defaultTiers,
  },
};

export const WithSubheading: Story = {
  args: {
    heading: "Choose Your Plan",
    subheading:
      "Start free and scale as you grow. All plans include a 14-day free trial.",
    tiers: defaultTiers,
  },
};

export const AllFeatured: Story = {
  args: {
    heading: "Our Plans",
    tiers: defaultTiers.map((t) => ({ ...t, featured: false })),
  },
};

export const CustomPricing: Story = {
  args: {
    heading: "Enterprise Solutions",
    subheading: "Tailored packages for organizations with unique requirements.",
    tiers: [
      {
        name: "Growth",
        price: "Custom",
        description: "For mid-market companies scaling fast.",
        features: [
          { text: "Dedicated account manager", included: true },
          { text: "Custom integrations", included: true },
          { text: "SLA guarantee", included: true },
          { text: "On-premise deployment", included: false },
        ],
        cta: { label: "Contact Us", href: "/contact?plan=growth" },
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Full-featured platform for large organizations.",
        features: [
          { text: "Dedicated account manager", included: true },
          { text: "Custom integrations", included: true },
          { text: "SLA guarantee", included: true },
          { text: "On-premise deployment", included: true },
        ],
        cta: { label: "Contact Us", href: "/contact?plan=enterprise" },
        featured: true,
      },
    ],
  },
};
