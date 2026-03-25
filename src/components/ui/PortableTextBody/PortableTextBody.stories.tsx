import type { Meta, StoryObj } from "@storybook/react";
import type { PortableTextBlock } from "@portabletext/react";
import { PortableTextBody } from "./PortableTextBody";

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const block = (
  key: string,
  text: string,
  style = "normal",
  marks: string[] = [],
): PortableTextBlock =>
  ({
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-s`, text, marks }],
  }) as unknown as PortableTextBlock;

/* ------------------------------------------------------------------ */
/*  Meta                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta<typeof PortableTextBody> = {
  title: "UI/PortableTextBody",
  component: PortableTextBody,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof PortableTextBody>;

/* ------------------------------------------------------------------ */
/*  Stories                                                           */
/* ------------------------------------------------------------------ */

/** A few paragraphs of plain text. */
export const Default: Story = {
  args: {
    value: [
      block(
        "p1",
        "Design systems are the backbone of scalable product development. By codifying decisions about typography, color, spacing, and component behavior into a single source of truth, teams eliminate guesswork and move faster without sacrificing consistency.",
      ),
      block(
        "p2",
        "At Tekton we treat the design system as a living product — versioned, tested, and documented — rather than a static style guide that drifts out of date the moment it ships.",
      ),
      block(
        "p3",
        "The payoff compounds over time: fewer visual regressions, shorter onboarding for new engineers, and a coherent experience for every user who touches the product.",
      ),
    ] as unknown as PortableTextBlock[],
  },
};

/** Heading hierarchy mixed with body paragraphs. */
export const WithHeadings: Story = {
  args: {
    value: [
      block("h2-1", "Why Performance Matters", "h2"),
      block(
        "p1",
        "Core Web Vitals have become a ranking signal for search engines. Largest Contentful Paint, Cumulative Layout Shift, and Interaction to Next Paint directly affect how users perceive your site — and whether they stay.",
      ),
      block("h3-1", "Measuring What Counts", "h3"),
      block(
        "p2",
        "Synthetic lab tests give you a controlled baseline, but real-user monitoring (RUM) tells you what actually happens in the wild across devices, networks, and geographies.",
      ),
      block("h4-1", "Lab vs. Field Data", "h4"),
      block(
        "p3",
        "Lab data is reproducible and great for CI gates. Field data is messy but honest. A mature performance strategy uses both.",
      ),
      block("h3-2", "Setting Budgets", "h3"),
      block(
        "p4",
        "Performance budgets translate business goals into technical constraints. A 200 KB JavaScript budget forces architectural discipline that benefits the entire stack.",
      ),
    ] as unknown as PortableTextBlock[],
  },
};

/** Bullet and numbered lists. */
export const WithLists: Story = {
  args: {
    value: [
      block("p1", "Every component in the system should satisfy these criteria:"),
      {
        _type: "block",
        _key: "li1",
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "li1-s",
            text: "Accessible — meets WCAG 2.2 AA at a minimum",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "li2",
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "li2-s",
            text: "Composable — works in isolation and inside larger patterns",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "li3",
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "li3-s",
            text: "Themeable — respects design tokens without hard-coded values",
            marks: [],
          },
        ],
      },
      block("p2", "Our recommended adoption workflow:"),
      {
        _type: "block",
        _key: "ol1",
        style: "normal",
        listItem: "number",
        level: 1,
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "ol1-s",
            text: "Audit existing UI for duplicated patterns",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "ol2",
        style: "normal",
        listItem: "number",
        level: 1,
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "ol2-s",
            text: "Map each pattern to a design-system component",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "ol3",
        style: "normal",
        listItem: "number",
        level: 1,
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "ol3-s",
            text: "Migrate one page at a time, validating visual regression tests",
            marks: [],
          },
        ],
      },
    ] as unknown as PortableTextBlock[],
  },
};

/** A blockquote with surrounding context. */
export const WithBlockquote: Story = {
  args: {
    value: [
      block(
        "p1",
        "The best advice on shipping software at scale came from a conversation at a conference after-party:",
      ),
      block(
        "bq1",
        "Ship small, ship often, and never let a deploy feel like an event. If it feels scary, your feedback loops are too long.",
        "blockquote",
      ),
      block(
        "p2",
        "That principle shaped how we built our CI pipeline — every merged PR triggers a canary deploy that bakes for thirty minutes before promoting to production.",
      ),
    ] as unknown as PortableTextBlock[],
  },
};

/** A code block with filename and language annotation. */
export const WithCodeBlock: Story = {
  args: {
    value: [
      block(
        "p1",
        "Here is a minimal hook for debouncing a value in React:",
      ),
      {
        _type: "codeBlock",
        _key: "cb1",
        language: "typescript",
        filename: "useDebounce.ts",
        code: `import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}`,
      },
      block(
        "p2",
        "Pair it with a search input to avoid firing API calls on every keystroke.",
      ),
    ] as unknown as PortableTextBlock[],
  },
};

/** Callout blocks in info, warning, and danger tones. */
export const WithCallout: Story = {
  args: {
    value: [
      block("p1", "Before deploying, keep these notes in mind:"),
      {
        _type: "callout",
        _key: "c-info",
        tone: "info",
        body: "The staging environment resets every night at 02:00 UTC. Any data created during the day will be lost.",
      },
      {
        _type: "callout",
        _key: "c-warning",
        tone: "warning",
        body: "Running database migrations on a live cluster requires a maintenance window. Coordinate with the SRE team first.",
      },
      {
        _type: "callout",
        _key: "c-danger",
        tone: "danger",
        body: "Never expose your SANITY_WRITE_TOKEN in client-side code. Doing so grants unrestricted write access to your dataset.",
      },
    ] as unknown as PortableTextBlock[],
  },
};

/** An image block with alt text and caption. */
export const WithImage: Story = {
  args: {
    value: [
      block(
        "p1",
        "Below is an example of our component playground running in the browser:",
      ),
      {
        _type: "imageWithAlt",
        _key: "img1",
        asset: { _ref: "stub" },
        alt: "Screenshot of the Tekton component playground showing a Button component with multiple variants",
        caption: "The Tekton component playground — interactive docs powered by Storybook.",
      },
      block(
        "p2",
        "Every component ships with live examples that designers and engineers can manipulate without touching code.",
      ),
    ] as unknown as PortableTextBlock[],
  },
};

/** Paragraphs containing inline links. */
export const WithLinks: Story = {
  args: {
    value: [
      {
        _type: "block",
        _key: "link1",
        style: "normal",
        markDefs: [
          { _type: "link", _key: "lk1", href: "https://nextjs.org" },
        ],
        children: [
          { _type: "span", _key: "s1", text: "We build on ", marks: [] },
          { _type: "span", _key: "s2", text: "Next.js", marks: ["lk1"] },
          {
            _type: "span",
            _key: "s3",
            text: " for its hybrid rendering model, which lets us choose static generation, server-side rendering, or client-side fetching on a per-page basis.",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "link2",
        style: "normal",
        markDefs: [
          {
            _type: "link",
            _key: "lk2",
            href: "https://www.sanity.io/docs",
          },
          {
            _type: "link",
            _key: "lk3",
            href: "https://www.sanity.io/plugins/content-lake",
          },
        ],
        children: [
          {
            _type: "span",
            _key: "s4",
            text: "Content is managed through ",
            marks: [],
          },
          {
            _type: "span",
            _key: "s5",
            text: "Sanity Studio",
            marks: ["lk2"],
          },
          {
            _type: "span",
            _key: "s6",
            text: " and synchronized via the ",
            marks: [],
          },
          {
            _type: "span",
            _key: "s7",
            text: "Content Lake API",
            marks: ["lk3"],
          },
          { _type: "span", _key: "s8", text: ".", marks: [] },
        ],
      },
      {
        _type: "block",
        _key: "link3",
        style: "normal",
        markDefs: [
          {
            _type: "link",
            _key: "lk4",
            href: "https://github.com/tekton/tekton",
          },
        ],
        children: [
          {
            _type: "span",
            _key: "s9",
            text: "The entire project is open source — check out the ",
            marks: [],
          },
          {
            _type: "span",
            _key: "s10",
            text: "GitHub repository",
            marks: ["lk4"],
          },
          {
            _type: "span",
            _key: "s11",
            text: " to get started.",
            marks: [],
          },
        ],
      },
    ] as unknown as PortableTextBlock[],
  },
};

/** A realistic article combining every supported block type. */
export const RichArticle: Story = {
  args: {
    value: [
      // Title
      block("h2-intro", "Building a Performant Design System with Next.js", "h2"),

      // Intro paragraph with bold
      {
        _type: "block",
        _key: "intro",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "intro-s1",
            text: "A design system is more than a component library — it is a ",
            marks: [],
          },
          {
            _type: "span",
            _key: "intro-s2",
            text: "shared language",
            marks: ["strong"],
          },
          {
            _type: "span",
            _key: "intro-s3",
            text: " between design and engineering that reduces ambiguity and accelerates delivery.",
            marks: [],
          },
        ],
      },

      block(
        "p-context",
        "Over the past year our team migrated a 200-page marketing site from a bespoke CSS architecture to a token-driven system built on React, TypeScript, and Sass modules. This post walks through the decisions we made — and the mistakes we recovered from.",
      ),

      // Section: Architecture
      block("h3-arch", "Architecture Decisions", "h3"),

      {
        _type: "block",
        _key: "arch-p1",
        style: "normal",
        markDefs: [
          { _type: "link", _key: "lk-tokens", href: "https://system-ui.com/theme" },
        ],
        children: [
          {
            _type: "span",
            _key: "ap1-s1",
            text: "We adopted the ",
            marks: [],
          },
          {
            _type: "span",
            _key: "ap1-s2",
            text: "System UI theme specification",
            marks: ["lk-tokens"],
          },
          {
            _type: "span",
            _key: "ap1-s3",
            text: " for our token schema. Every color, spacing step, and type ramp maps to a JSON token that generates both Sass variables and TypeScript constants.",
            marks: [],
          },
        ],
      },

      // Info callout
      {
        _type: "callout",
        _key: "c-tokens",
        tone: "info",
        body: "Design tokens are the single source of truth for visual style. Changing a token value propagates automatically to every component that references it.",
      },

      // Bullet list
      block("p-principles", "Our core architectural principles:"),
      {
        _type: "block",
        _key: "pr1",
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "pr1-s",
            text: "Tokens over hard-coded values — no magic numbers in component styles",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "pr2",
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "pr2-s",
            text: "Composition over configuration — small primitives combine into complex patterns",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "pr3",
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "pr3-s",
            text: "Progressive disclosure — simple API by default, escape hatches when needed",
            marks: [],
          },
        ],
      },

      // Section: Performance
      block("h3-perf", "Performance Optimization", "h3"),

      {
        _type: "block",
        _key: "perf-p1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "pp1-s1",
            text: "We lazy-load every component that sits below the fold using ",
            marks: [],
          },
          {
            _type: "span",
            _key: "pp1-s2",
            text: "next/dynamic",
            marks: ["code"],
          },
          {
            _type: "span",
            _key: "pp1-s3",
            text: ". Combined with granular Sass module extraction, this cut our initial JS payload by ",
            marks: [],
          },
          {
            _type: "span",
            _key: "pp1-s4",
            text: "42%",
            marks: ["strong"],
          },
          {
            _type: "span",
            _key: "pp1-s5",
            text: ".",
            marks: [],
          },
        ],
      },

      // Code block
      {
        _type: "codeBlock",
        _key: "cb-dynamic",
        language: "typescript",
        filename: "components/HeroSection.tsx",
        code: `import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("./VideoPlayer"), {
  ssr: false,
  loading: () => <div className="skeleton skeleton--video" />,
});

export function HeroSection({ videoUrl }: { videoUrl: string }) {
  return (
    <section className="hero">
      <h1>Welcome to Tekton</h1>
      <VideoPlayer src={videoUrl} />
    </section>
  );
}`,
      },

      // Warning callout
      {
        _type: "callout",
        _key: "c-ssr",
        tone: "warning",
        body: "Disabling SSR for a component means it will not appear in the initial HTML. Make sure the surrounding layout reserves space to avoid layout shift.",
      },

      // Section: Testing
      block("h3-test", "Testing Strategy", "h3"),

      block(
        "test-p1",
        "We test at three levels — unit tests for logic, integration tests for component behavior, and visual regression tests for pixel accuracy.",
      ),

      // Numbered list
      {
        _type: "block",
        _key: "t1",
        style: "normal",
        listItem: "number",
        level: 1,
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "t1-s",
            text: "Unit tests with Vitest cover utility functions and hooks",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "t2",
        style: "normal",
        listItem: "number",
        level: 1,
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "t2-s",
            text: "Integration tests with Testing Library validate DOM output and user interactions",
            marks: [],
          },
        ],
      },
      {
        _type: "block",
        _key: "t3",
        style: "normal",
        listItem: "number",
        level: 1,
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "t3-s",
            text: "Chromatic snapshots catch unintended visual changes on every pull request",
            marks: [],
          },
        ],
      },

      // Blockquote
      block(
        "bq-test",
        "If a component can break silently, it will — usually the week before a major launch. Automated visual tests are the safety net you did not know you needed.",
        "blockquote",
      ),

      // Image
      {
        _type: "imageWithAlt",
        _key: "img-dashboard",
        asset: { _ref: "stub" },
        alt: "Chromatic visual diff dashboard showing a detected regression in the Button component",
        caption: "Chromatic flags visual regressions before they reach production.",
      },

      // Section: Lessons
      block("h3-lessons", "Lessons Learned", "h3"),

      {
        _type: "block",
        _key: "lessons-p1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "lp1-s1",
            text: "The biggest surprise was how much ",
            marks: [],
          },
          {
            _type: "span",
            _key: "lp1-s2",
            text: "documentation",
            marks: ["em"],
          },
          {
            _type: "span",
            _key: "lp1-s3",
            text: " improved adoption. Engineers who could see live examples and copy working code adopted the system twice as fast as those who only had Figma specs.",
            marks: [],
          },
        ],
      },

      // Danger callout
      {
        _type: "callout",
        _key: "c-breaking",
        tone: "danger",
        body: "Avoid breaking changes to component APIs after v1.0. If a prop needs to change, deprecate the old one and support both for at least two minor releases.",
      },

      // Closing
      block("h4-next", "What Comes Next", "h4"),

      block(
        "closing",
        "We are investing in automated accessibility audits, dark-mode token sets, and a Figma plugin that syncs component props bidirectionally. The design system is never finished — and that is the point.",
      ),
    ] as unknown as PortableTextBlock[],
  },
};
