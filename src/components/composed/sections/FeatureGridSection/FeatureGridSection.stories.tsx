import type { Meta, StoryObj } from "@storybook/react";
import { FeatureGridSection } from "./FeatureGridSection";

const meta: Meta<typeof FeatureGridSection> = {
  title: "Sections/FeatureGridSection",
  component: FeatureGridSection,
  argTypes: {
    columns: {
      control: { type: "number", min: 0, max: 6 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeatureGridSection>;

export const Default: Story = {
  args: {
    heading: "Why Teams Choose Us",
    features: [
      {
        title: "Lightning Fast",
        description:
          "Sub-second load times with edge-deployed infrastructure and optimized asset delivery.",
        icon: "Zap",
      },
      {
        title: "Enterprise Security",
        description:
          "SOC 2 compliant with end-to-end encryption, role-based access, and audit logging.",
        icon: "Shield",
      },
      {
        title: "Global Reach",
        description:
          "Multi-region deployment across 40+ data centers for low-latency worldwide access.",
        icon: "Globe",
      },
    ],
  },
};

export const WithImages: Story = {
  args: {
    heading: "Our Capabilities",
    features: [
      {
        title: "Brand Identity",
        description:
          "Logos, type systems, color palettes, and brand guidelines that leave a lasting impression.",
        image: { asset: { _ref: "stub" } },
      },
      {
        title: "Web Development",
        description:
          "Custom websites and web apps built with React, Next.js, and modern tooling.",
        image: { asset: { _ref: "stub" } },
      },
      {
        title: "Motion Design",
        description:
          "Animated content for social, broadcast, and interactive experiences.",
        image: { asset: { _ref: "stub" } },
      },
    ],
  },
};

export const WithLinks: Story = {
  args: {
    heading: "Explore Our Services",
    features: [
      {
        title: "Strategy & Research",
        description:
          "Market analysis, user research, and competitive audits to inform every decision.",
        icon: "Search",
        href: "/services/strategy",
      },
      {
        title: "UX & UI Design",
        description:
          "Intuitive interfaces grounded in user testing and design best practices.",
        icon: "Palette",
        href: "/services/design",
      },
      {
        title: "Full-Stack Engineering",
        description:
          "Scalable architecture from database to deployment, built for production.",
        icon: "Code",
        href: "/services/engineering",
      },
    ],
  },
};

export const TwoColumns: Story = {
  args: {
    heading: "Key Benefits",
    columns: 2,
    features: [
      {
        title: "24/7 Support",
        description:
          "Round-the-clock monitoring and dedicated account managers for every client.",
        icon: "Headphones",
      },
      {
        title: "Rapid Iteration",
        description:
          "Two-week sprint cycles with weekly demos so you see progress constantly.",
        icon: "RefreshCw",
      },
    ],
  },
};

export const FourColumns: Story = {
  args: {
    heading: "The Tekton Advantage",
    columns: 4,
    features: [
      {
        title: "Design Systems",
        description: "Reusable component libraries that scale with your product.",
        icon: "Layers",
      },
      {
        title: "Performance",
        description: "Core Web Vitals optimized for search ranking and UX.",
        icon: "Gauge",
      },
      {
        title: "Accessibility",
        description: "WCAG 2.1 AA compliant from day one — no retrofitting.",
        icon: "Eye",
      },
      {
        title: "Analytics",
        description: "Real-time dashboards tracking every KPI that matters.",
        icon: "BarChart3",
      },
    ],
  },
};

export const WithSubheading: Story = {
  args: {
    heading: "What We Do Best",
    subheading:
      "A full-service studio combining creative vision with technical execution.",
    features: [
      {
        title: "Branding",
        description: "Strategic brand development from naming to launch.",
        icon: "Sparkles",
      },
      {
        title: "Websites",
        description: "High-performance sites that convert visitors into customers.",
        icon: "Monitor",
      },
      {
        title: "Campaigns",
        description: "Multi-channel marketing that drives measurable ROI.",
        icon: "Megaphone",
      },
    ],
  },
};

export const MixedContent: Story = {
  args: {
    heading: "Platform Features",
    features: [
      {
        title: "Cloud Hosting",
        description: "Auto-scaling infrastructure with 99.99% uptime SLA.",
        icon: "Cloud",
      },
      {
        title: "Team Workspace",
        description: "Real-time collaboration tools built for distributed teams.",
        image: { asset: { _ref: "stub" } },
      },
      {
        title: "API Integrations",
        description: "Connect with 200+ tools through our RESTful API.",
        icon: "Plug",
      },
      {
        title: "Custom Dashboards",
        description: "Drag-and-drop reporting tailored to your business metrics.",
        image: { asset: { _ref: "stub" } },
      },
    ],
  },
};

export const SixFeatures: Story = {
  args: {
    heading: "Everything You Need",
    features: [
      {
        title: "Project Management",
        description: "Kanban boards, timelines, and resource allocation in one place.",
        icon: "ClipboardList",
      },
      {
        title: "Version Control",
        description: "Built-in Git workflows with automated code review.",
        icon: "GitBranch",
      },
      {
        title: "CI/CD Pipelines",
        description: "Zero-config deployments triggered on every merge to main.",
        icon: "Rocket",
      },
      {
        title: "Monitoring",
        description: "Error tracking, uptime alerts, and performance profiling.",
        icon: "Activity",
      },
      {
        title: "Documentation",
        description: "Auto-generated API docs and team knowledge bases.",
        icon: "FileText",
      },
      {
        title: "Billing & Invoicing",
        description: "Automated invoicing, time tracking, and payment processing.",
        icon: "CreditCard",
      },
    ],
  },
};
