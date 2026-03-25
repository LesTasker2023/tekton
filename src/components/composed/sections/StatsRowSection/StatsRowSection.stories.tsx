import type { Meta, StoryObj } from "@storybook/react";
import { StatsRowSection } from "./StatsRowSection";

const meta: Meta<typeof StatsRowSection> = {
  title: "Sections/StatsRowSection",
  component: StatsRowSection,
  argTypes: {
    accent: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatsRowSection>;

export const Default: Story = {
  args: {
    stats: [
      { label: "Revenue Generated", value: "$2.4M" },
      { label: "Projects Delivered", value: "150+" },
      { label: "Client Retention", value: "97%" },
      { label: "Team Members", value: "42" },
    ],
  },
};

export const WithTrends: Story = {
  args: {
    stats: [
      {
        label: "Monthly Recurring Revenue",
        value: "$184K",
        trendDirection: "up",
        trendValue: "+12.3%",
      },
      {
        label: "Active Users",
        value: "28,400",
        trendDirection: "up",
        trendValue: "+8.1%",
      },
      {
        label: "Churn Rate",
        value: "1.2%",
        trendDirection: "down",
        trendValue: "-0.4%",
      },
      {
        label: "Avg Response Time",
        value: "142ms",
        trendDirection: "neutral",
        trendValue: "0%",
      },
    ],
  },
};

export const WithSubtitles: Story = {
  args: {
    stats: [
      {
        label: "Uptime",
        value: "99.9%",
        subtitle: "Last 90 days",
      },
      {
        label: "Deployments",
        value: "1,204",
        subtitle: "This quarter",
      },
      {
        label: "Avg Build Time",
        value: "38s",
        subtitle: "Down from 52s",
      },
      {
        label: "Test Coverage",
        value: "94%",
        subtitle: "Across all services",
      },
    ],
  },
};

export const AccentVariant: Story = {
  args: {
    accent: true,
    stats: [
      { label: "Countries Served", value: "30+" },
      { label: "Enterprise Clients", value: "85" },
      { label: "Awards Won", value: "24" },
      { label: "Years in Business", value: "12" },
    ],
  },
};

export const TwoStats: Story = {
  args: {
    stats: [
      { label: "Conversion Rate", value: "4.8%" },
      { label: "Return on Ad Spend", value: "6.2x" },
    ],
  },
};

export const ThreeStats: Story = {
  args: {
    stats: [
      { label: "Pages Indexed", value: "12,000+" },
      { label: "Organic Traffic", value: "340K/mo" },
      { label: "Domain Authority", value: "72" },
    ],
  },
};

export const WithHeading: Story = {
  args: {
    heading: "Results That Speak for Themselves",
    stats: [
      { label: "Revenue Increase", value: "312%" },
      { label: "Lead Generation", value: "5,400/mo" },
      { label: "Cost Per Acquisition", value: "$18" },
      { label: "NPS Score", value: "78" },
    ],
  },
};

export const AllFeatures: Story = {
  args: {
    heading: "Q4 Performance Dashboard",
    accent: true,
    stats: [
      {
        label: "Gross Revenue",
        value: "$1.8M",
        trendDirection: "up",
        trendValue: "+22%",
        subtitle: "vs. Q3 2025",
      },
      {
        label: "New Contracts",
        value: "34",
        trendDirection: "up",
        trendValue: "+15%",
        subtitle: "Enterprise tier",
      },
      {
        label: "Support Tickets",
        value: "89",
        trendDirection: "down",
        trendValue: "-31%",
        subtitle: "Month over month",
      },
      {
        label: "Customer Satisfaction",
        value: "4.9/5",
        trendDirection: "neutral",
        trendValue: "Stable",
        subtitle: "Based on 2,100 reviews",
      },
    ],
  },
};
