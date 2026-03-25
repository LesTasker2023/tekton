import type { Meta, StoryObj } from "@storybook/react";
import { CtaSection } from "./CtaSection";

const meta: Meta<typeof CtaSection> = {
  title: "Sections/CtaSection",
  component: CtaSection,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "accent", "danger"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CtaSection>;

export const Default: Story = {
  args: {
    heading: "Ready to Start Your Project?",
    body: "Book a free 30-minute strategy session and discover how we can accelerate your growth.",
    primaryAction: { label: "Schedule a Call", href: "/contact" },
  },
};

export const WithSecondaryAction: Story = {
  args: {
    heading: "Let's Build Something Great",
    body: "Whether you need a brand refresh, a new website, or a full marketing overhaul — we've got you covered.",
    primaryAction: { label: "Get a Quote", href: "/quote" },
    secondaryAction: { label: "View Pricing", href: "/pricing" },
  },
};

export const AccentVariant: Story = {
  args: {
    heading: "Limited Availability This Quarter",
    body: "We take on a limited number of projects each quarter to ensure every client gets our full attention.",
    primaryAction: { label: "Reserve Your Spot", href: "/contact" },
    secondaryAction: { label: "See Timeline", href: "/process" },
    variant: "accent",
  },
};

export const DangerVariant: Story = {
  args: {
    heading: "Cancel Your Subscription",
    body: "Once cancelled, your data will be retained for 30 days before permanent deletion.",
    primaryAction: { label: "Confirm Cancellation", href: "/cancel" },
    secondaryAction: { label: "Keep My Plan", href: "/account" },
    variant: "danger",
  },
};

export const MinimalHeading: Story = {
  args: {
    heading: "Questions? We Have Answers.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <CtaSection
        heading="Default Variant"
        body="Standard call-to-action for general use across the site."
        primaryAction={{ label: "Get Started", href: "/start" }}
        variant="default"
      />
      <CtaSection
        heading="Accent Variant"
        body="High-emphasis CTA for featured promotions and key conversion points."
        primaryAction={{ label: "Claim Offer", href: "/offer" }}
        variant="accent"
      />
      <CtaSection
        heading="Danger Variant"
        body="Destructive or irreversible actions that require careful consideration."
        primaryAction={{ label: "Delete Account", href: "/delete" }}
        variant="danger"
      />
    </div>
  ),
};
