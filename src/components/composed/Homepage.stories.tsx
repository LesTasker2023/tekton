import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { PortableTextBlock } from "@portabletext/react";
import { SiteHero } from "./SiteHero";
import { HeroSection } from "./sections/HeroSection";
import { LogoCloudSection } from "./sections/LogoCloudSection";
import { FeatureGridSection } from "./sections/FeatureGridSection";
import { StatsRowSection } from "./sections/StatsRowSection";
import { TestimonialSection } from "./sections/TestimonialSection";
import { RichTextSection } from "./sections/RichTextSection";
import { CtaSection } from "./sections/CtaSection";
import { PricingSection } from "./sections/PricingSection";
import { ImageGallerySection } from "./sections/ImageGallerySection";

/* ═══════════════════════════════════════════════════════════════════════════
   Homepage — Full-page compositions using section components
   Demonstrates the page-builder pattern: each "page" is a vertical stack of
   self-contained section components, exactly as SectionRenderer would render
   them from Sanity data.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Shared stub data ── */

const img = { asset: { _ref: "stub" } };

const logos = [
  { name: "Stripe", image: img, href: "https://stripe.com" },
  { name: "Vercel", image: img, href: "https://vercel.com" },
  { name: "Linear", image: img, href: "https://linear.app" },
  { name: "Figma", image: img, href: "https://figma.com" },
  { name: "Notion", image: img, href: "https://notion.so" },
];

const features = [
  {
    title: "Strategy & Discovery",
    description:
      "We immerse ourselves in your business to uncover the insights that drive meaningful product decisions.",
    icon: "Compass",
  },
  {
    title: "Product Design",
    description:
      "Beautiful, functional interfaces backed by user research and tested with real people before a single line of code is written.",
    icon: "PenTool",
  },
  {
    title: "Web Development",
    description:
      "Performant, accessible, SEO-friendly sites built with Next.js, headless CMS, and modern deployment pipelines.",
    icon: "Code",
  },
  {
    title: "Branding & Identity",
    description:
      "From logo to full brand system — we create identities that resonate with your audience and scale with your business.",
    icon: "Palette",
  },
  {
    title: "Growth & Analytics",
    description:
      "Data-driven optimization: A/B testing, conversion tracking, and actionable dashboards so you know what's working.",
    icon: "BarChart3",
  },
  {
    title: "Ongoing Support",
    description:
      "Launch is just the beginning. We offer retainer partnerships for continuous improvement, updates, and new feature rollouts.",
    icon: "HeartHandshake",
  },
];

const stats = [
  { label: "Projects delivered", value: "150+" },
  { label: "Client retention rate", value: "94%" },
  { label: "Average performance score", value: "97" },
  { label: "Countries served", value: "12" },
];

const testimonials = [
  {
    quote:
      "Tekton didn't just build our website — they re-imagined our entire digital presence. Conversions jumped 40% in the first quarter.",
    name: "Sarah Chen",
    role: "VP of Marketing",
    company: "Meridian Health",
    avatar: img,
  },
  {
    quote:
      "The speed and quality were unreal. We went from kickoff to launch in six weeks and the site outperformed every benchmark we set.",
    name: "Marcus Williams",
    role: "Founder & CEO",
    company: "Trellis Analytics",
    avatar: img,
  },
  {
    quote:
      "Their team feels like an extension of ours. They challenge our assumptions in a way that makes the final product dramatically better.",
    name: "Priya Patel",
    role: "Head of Product",
    company: "NovaPay",
    avatar: img,
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "$4,900",
    period: "/ project",
    description: "Perfect for small businesses launching their first professional site.",
    features: [
      { text: "5-page responsive website", included: true },
      { text: "CMS integration (Sanity)", included: true },
      { text: "Basic SEO setup", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Custom design system", included: false },
      { text: "E-commerce integration", included: false },
      { text: "Priority support", included: false },
    ],
    cta: { label: "Get started", href: "/contact" },
  },
  {
    name: "Growth",
    price: "$12,500",
    period: "/ project",
    description: "For scaling companies that need a high-performance digital platform.",
    featured: true,
    features: [
      { text: "Up to 20 pages", included: true },
      { text: "CMS integration (Sanity)", included: true },
      { text: "Advanced SEO & analytics", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Custom design system", included: true },
      { text: "E-commerce integration", included: true },
      { text: "Priority support", included: false },
    ],
    cta: { label: "Start a project", href: "/contact" },
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations with complex requirements.",
    features: [
      { text: "Unlimited pages", included: true },
      { text: "CMS integration (Sanity)", included: true },
      { text: "Advanced SEO & analytics", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Custom design system", included: true },
      { text: "E-commerce integration", included: true },
      { text: "Priority support", included: true },
    ],
    cta: { label: "Talk to us", href: "/contact" },
  },
];

const aboutBody: PortableTextBlock[] = [
  {
    _type: "block",
    _key: "1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s1",
        text: "Founded in 2018, we started as a two-person design studio with a simple belief: ",
        marks: [],
      },
      {
        _type: "span",
        _key: "s2",
        text: "great digital products come from teams that care deeply about craft",
        marks: ["strong"],
      },
      {
        _type: "span",
        _key: "s3",
        text: ". Today we're a team of 42 strategists, designers, and engineers serving clients across North America, Europe, and APAC.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s1",
        text: "We remain intentionally small. By capping our active projects, we guarantee that every client receives senior-level attention throughout the engagement — not just during the pitch.",
        marks: [],
      },
    ],
  },
];

const galleryImages = [
  { image: img, alt: "Team collaborating at the whiteboard" },
  { image: img, alt: "Design review session" },
  { image: img, alt: "Office workspace" },
  { image: img, alt: "Client workshop" },
];

/* ── Page wrapper — removes padding from the withSkin decorator ── */

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ margin: "-2rem" }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Meta
   ═══════════════════════════════════════════════════════════════════════════ */

const meta: Meta = {
  title: "Pages/Homepage",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

/* ═══════════════════════════════════════════════════════════════════════════
   Agency Homepage — the flagship page layout
   Hero → Logo Cloud → Features → Stats → Testimonials → CTA
   ═══════════════════════════════════════════════════════════════════════════ */

export const AgencyHomepage: Story = {
  render: () => (
    <Page>
      <SiteHero
        title="We build *digital products* that move the needle"
        tagline="Strategy, design, and engineering — all under one roof. We partner with ambitious companies to ship products their users love."
        primaryCta={{ label: "Start a project", href: "/contact" }}
        secondaryCta={{ label: "See our work", href: "/work" }}
      />

      <LogoCloudSection
        heading="Trusted by forward-thinking teams"
        logos={logos}
        columns={5}
        grayscale
      />

      <FeatureGridSection
        heading="What we do"
        subheading="End-to-end digital product services, from first sketch to ongoing optimization."
        features={features}
        columns={3}
      />

      <StatsRowSection
        heading="By the numbers"
        stats={stats}
      />

      <TestimonialSection
        heading="What our clients say"
        testimonials={testimonials}
        layout="grid"
        columns={3}
      />

      <CtaSection
        heading="Ready to build something great?"
        body="Tell us about your project and we'll get back to you within 24 hours with a tailored proposal."
        primaryAction={{ label: "Get in touch", href: "/contact" }}
        secondaryAction={{ label: "View pricing", href: "/pricing" }}
      />
    </Page>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   SaaS Landing Page — product-focused layout
   Hero Section → Stats → Features → Pricing → CTA
   ═══════════════════════════════════════════════════════════════════════════ */

export const SaaSLandingPage: Story = {
  render: () => (
    <Page>
      <HeroSection
        heading="Ship faster with the platform teams love"
        subheading="One workspace for design, development, and deployment. Replace your patchwork of tools with a single, delightful platform."
        backgroundImage={img}
        cta={{ label: "Start free trial", href: "/signup" }}
        align="center"
      />

      <LogoCloudSection
        heading="Powering 10,000+ teams worldwide"
        logos={logos}
        columns={5}
        grayscale
      />

      <StatsRowSection
        stats={[
          { label: "Faster time to market", value: "3x" },
          { label: "Developer hours saved weekly", value: "12" },
          { label: "Uptime SLA", value: "99.99%" },
          { label: "Active users", value: "80k+" },
        ]}
      />

      <FeatureGridSection
        heading="Everything you need, nothing you don't"
        subheading="A thoughtfully designed toolkit that grows with your team."
        features={[
          {
            title: "Visual Editor",
            description: "Drag-and-drop page building with real components. No code required, no compromises on quality.",
            icon: "LayoutDashboard",
          },
          {
            title: "Real-time Collaboration",
            description: "Work together with your team in real time. See cursors, leave comments, resolve issues inline.",
            icon: "Users",
          },
          {
            title: "Git-backed Content",
            description: "Every change is version-controlled. Branch, preview, merge — the same workflow your developers already know.",
            icon: "GitBranch",
          },
          {
            title: "Edge Deployment",
            description: "Auto-deploy to 300+ edge locations. Your users get sub-100ms load times, everywhere.",
            icon: "Globe",
          },
          {
            title: "Built-in Analytics",
            description: "Privacy-first analytics with no cookie banners. Track what matters without compromising user trust.",
            icon: "BarChart3",
          },
          {
            title: "API-first Architecture",
            description: "Full REST and GraphQL APIs. Integrate with your existing stack or build custom workflows.",
            icon: "Plug",
          },
        ]}
        columns={3}
      />

      <PricingSection
        heading="Simple, transparent pricing"
        subheading="No hidden fees. No per-seat charges. Upgrade or downgrade anytime."
        tiers={[
          {
            name: "Free",
            price: "$0",
            period: "/ month",
            description: "For individuals and small side projects.",
            features: [
              { text: "3 projects", included: true },
              { text: "Unlimited pages", included: true },
              { text: "Community support", included: true },
              { text: "Custom domains", included: false },
              { text: "Team collaboration", included: false },
              { text: "Priority support", included: false },
            ],
            cta: { label: "Get started free", href: "/signup" },
          },
          {
            name: "Pro",
            price: "$29",
            period: "/ month",
            description: "For growing teams shipping production apps.",
            featured: true,
            features: [
              { text: "Unlimited projects", included: true },
              { text: "Unlimited pages", included: true },
              { text: "Email support", included: true },
              { text: "Custom domains", included: true },
              { text: "Team collaboration", included: true },
              { text: "Priority support", included: false },
            ],
            cta: { label: "Start free trial", href: "/signup" },
          },
          {
            name: "Enterprise",
            price: "Custom",
            description: "For organizations with advanced needs.",
            features: [
              { text: "Unlimited projects", included: true },
              { text: "Unlimited pages", included: true },
              { text: "Dedicated account manager", included: true },
              { text: "Custom domains", included: true },
              { text: "Team collaboration", included: true },
              { text: "Priority support", included: true },
            ],
            cta: { label: "Contact sales", href: "/contact" },
          },
        ]}
      />

      <TestimonialSection
        heading="Loved by developers and designers alike"
        testimonials={[
          {
            quote: "We migrated our entire marketing site in a weekend. The developer experience is leagues ahead of anything else we've tried.",
            name: "Jake Morrison",
            role: "Staff Engineer",
            company: "Lattice",
          },
          {
            quote: "Finally, a platform where our designers and engineers can work in the same space without stepping on each other's toes.",
            name: "Aisha Rahman",
            role: "Design Lead",
            company: "Plaid",
          },
          {
            quote: "The edge deployment alone cut our load times in half. Our conversion rate jumped 22% in the first month.",
            name: "Tom Barrett",
            role: "Growth Lead",
            company: "Ramp",
          },
        ]}
        layout="grid"
        columns={3}
      />

      <CtaSection
        heading="Start building today"
        body="Free for individuals. No credit card required. Deploy your first project in under five minutes."
        primaryAction={{ label: "Create free account", href: "/signup" }}
        secondaryAction={{ label: "Book a demo", href: "/demo" }}
      />
    </Page>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   Agency Portfolio — about-focused layout
   Hero → About (Rich Text) → Gallery → Stats → Testimonials → Pricing → CTA
   ═══════════════════════════════════════════════════════════════════════════ */

export const AgencyPortfolio: Story = {
  render: () => (
    <Page>
      <HeroSection
        heading="Crafting digital experiences since 2018"
        subheading="We're a boutique agency obsessed with quality. Every project gets our full attention, every detail gets sweated."
        cta={{ label: "View case studies", href: "/work" }}
        align="center"
      />

      <RichTextSection
        heading="Our Story"
        richBody={aboutBody}
        maxWidth="medium"
      />

      <ImageGallerySection
        heading="Inside the studio"
        images={galleryImages}
        layout="grid"
        columns={2}
      />

      <StatsRowSection
        stats={stats}
        accent
      />

      <FeatureGridSection
        heading="Our services"
        features={features.slice(0, 4)}
        columns={4}
      />

      <TestimonialSection
        heading="Client voices"
        testimonials={testimonials}
        layout="stacked"
      />

      <PricingSection
        heading="Engagement models"
        subheading="Flexible pricing that scales with your needs."
        tiers={pricingTiers}
      />

      <CtaSection
        heading="Let's make something great together"
        body="We take on a limited number of projects each quarter to ensure quality. Reach out early to secure your spot."
        primaryAction={{ label: "Start a conversation", href: "/contact" }}
        variant="accent"
      />
    </Page>
  ),
};
