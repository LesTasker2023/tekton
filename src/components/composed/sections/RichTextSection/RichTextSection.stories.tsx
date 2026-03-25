import type { Meta, StoryObj } from "@storybook/react";
import type { PortableTextBlock } from "@portabletext/react";
import { RichTextSection } from "./RichTextSection";

const meta: Meta<typeof RichTextSection> = {
  title: "Sections/RichTextSection",
  component: RichTextSection,
  argTypes: {
    maxWidth: {
      control: "select",
      options: ["narrow", "medium", "full"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RichTextSection>;

const simpleParagraph: PortableTextBlock[] = [
  {
    _type: "block",
    _key: "1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s1",
        text: "We partner with forward-thinking companies to design and build digital products that drive real business outcomes. Our approach combines deep strategic thinking with hands-on craft, ensuring every pixel and every line of code serves your goals.",
        marks: [],
      },
    ],
  },
];

const richContent: PortableTextBlock[] = [
  {
    _type: "block",
    _key: "1",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s1",
        text: "Our Approach to Digital Product Design",
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
        text: "Every project begins with ",
        marks: [],
      },
      {
        _type: "span",
        _key: "s2",
        text: "discovery",
        marks: ["strong"],
      },
      {
        _type: "span",
        _key: "s3",
        text: ". We immerse ourselves in your business, your users, and your competitive landscape. This isn't a checkbox exercise — it's the foundation that informs every decision downstream.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "3",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s1",
        text: "From there, we move into ",
        marks: [],
      },
      {
        _type: "span",
        _key: "s2",
        text: "rapid prototyping",
        marks: ["em"],
      },
      {
        _type: "span",
        _key: "s3",
        text: " — testing ideas quickly with real users before investing in full production. This reduces risk and ensures we're building the right thing, not just building things right.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "4",
    style: "h3",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s1",
        text: "What Sets Us Apart",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "5",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s1",
        text: "Unlike agencies that hand off a static design file and call it done, we own the entire lifecycle. Strategy, design, engineering, launch, and ongoing optimization — all under one roof. Our clients don't need to manage multiple vendors or translate between disciplines. We speak ",
        marks: [],
      },
      {
        _type: "span",
        _key: "s2",
        text: "both",
        marks: ["strong", "em"],
      },
      {
        _type: "span",
        _key: "s3",
        text: " design and code fluently.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "6",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s1",
        text: "The result? Products that launch faster, perform better, and evolve with your business. We've helped over 150 companies across fintech, healthcare, SaaS, and e-commerce ship products their users love.",
        marks: [],
      },
    ],
  },
];

const multiParagraph: PortableTextBlock[] = [
  {
    _type: "block",
    _key: "1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s1",
        text: "Founded in 2014, Tekton started as a two-person design studio operating out of a converted garage. What began as freelance branding work quickly evolved into a full-service digital agency as our reputation for quality craftsmanship grew.",
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
        text: "Today, we are a team of 42 strategists, designers, and engineers serving clients across North America, Europe, and Asia-Pacific. Our work has been recognized by Awwwards, Communication Arts, and the Webby Awards.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "3",
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

export const Default: Story = {
  args: {
    richBody: simpleParagraph,
  },
};

export const WithHeading: Story = {
  args: {
    heading: "About Our Studio",
    richBody: multiParagraph,
  },
};

export const NarrowWidth: Story = {
  args: {
    heading: "Our Philosophy",
    richBody: simpleParagraph,
    maxWidth: "narrow",
  },
};

export const MediumWidth: Story = {
  args: {
    heading: "How We Work",
    richBody: multiParagraph,
    maxWidth: "medium",
  },
};

export const FullWidth: Story = {
  args: {
    heading: "Company Overview",
    richBody: multiParagraph,
    maxWidth: "full",
  },
};

export const RichContent: Story = {
  args: {
    richBody: richContent,
  },
};

export const AllWidths: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <div>
        <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
          maxWidth=&quot;narrow&quot;
        </p>
        <RichTextSection
          heading="Narrow Container"
          richBody={simpleParagraph}
          maxWidth="narrow"
        />
      </div>
      <div>
        <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
          maxWidth=&quot;medium&quot;
        </p>
        <RichTextSection
          heading="Medium Container"
          richBody={simpleParagraph}
          maxWidth="medium"
        />
      </div>
      <div>
        <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
          maxWidth=&quot;full&quot;
        </p>
        <RichTextSection
          heading="Full Container"
          richBody={simpleParagraph}
          maxWidth="full"
        />
      </div>
    </div>
  ),
};
