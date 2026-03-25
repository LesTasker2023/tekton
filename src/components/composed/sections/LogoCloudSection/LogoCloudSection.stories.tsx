import type { Meta, StoryObj } from "@storybook/react";
import { LogoCloudSection } from "./LogoCloudSection";

const meta: Meta<typeof LogoCloudSection> = {
  title: "Sections/LogoCloudSection",
  component: LogoCloudSection,
  argTypes: {
    columns: { control: { type: "number", min: 2, max: 8 } },
    grayscale: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof LogoCloudSection>;

const stub = { asset: { _ref: "stub" } };

const sixLogos = [
  { name: "Acme Corp", image: stub },
  { name: "Globex Industries", image: stub },
  { name: "Initech", image: stub },
  { name: "Hooli", image: stub },
  { name: "Pied Piper", image: stub },
  { name: "Umbrella Corp", image: stub },
];

export const Default: Story = {
  args: {
    logos: sixLogos,
  },
};

export const WithHeading: Story = {
  args: {
    heading: "Trusted By Industry Leaders",
    logos: sixLogos,
  },
};

export const WithSubheading: Story = {
  args: {
    heading: "Our Partners",
    subheading:
      "We collaborate with forward-thinking companies across every industry.",
    logos: sixLogos,
  },
};

export const WithLinks: Story = {
  args: {
    logos: sixLogos.map((l) => ({
      ...l,
      href: `https://example.com/${l.name.toLowerCase().replace(/\s+/g, "-")}`,
    })),
  },
};

export const NoGrayscale: Story = {
  args: {
    logos: sixLogos,
    grayscale: false,
  },
};

export const FourColumns: Story = {
  args: {
    logos: sixLogos,
    columns: 4,
  },
};

export const SixColumns: Story = {
  args: {
    logos: sixLogos,
    columns: 6,
  },
};

export const ManyLogos: Story = {
  args: {
    heading: "A Growing Network",
    logos: [
      ...sixLogos,
      { name: "Stark Industries", image: stub },
      { name: "Wayne Enterprises", image: stub },
      { name: "Oscorp", image: stub },
      { name: "Cyberdyne", image: stub },
      { name: "Tyrell Corp", image: stub },
      { name: "Massive Dynamic", image: stub },
    ],
    columns: 4,
  },
};

export const AllFeatures: Story = {
  args: {
    heading: "Trusted Worldwide",
    subheading:
      "From startups to Fortune 500, our clients span every sector and scale.",
    logos: sixLogos.map((l) => ({
      ...l,
      href: `https://example.com/${l.name.toLowerCase().replace(/\s+/g, "-")}`,
    })),
    grayscale: true,
    columns: 3,
  },
};
