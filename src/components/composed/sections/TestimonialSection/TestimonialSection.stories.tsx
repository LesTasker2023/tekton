import type { Meta, StoryObj } from "@storybook/react";
import { TestimonialSection } from "./TestimonialSection";

const meta: Meta<typeof TestimonialSection> = {
  title: "Sections/TestimonialSection",
  component: TestimonialSection,
  argTypes: {
    layout: {
      control: "select",
      options: ["grid", "carousel", "stacked"],
    },
    columns: { control: { type: "number", min: 1, max: 4 } },
  },
};

export default meta;
type Story = StoryObj<typeof TestimonialSection>;

const threeTestimonials = [
  {
    quote:
      "Working with this team completely transformed our online presence. Our conversion rate doubled within the first quarter.",
    name: "Sarah Chen",
    role: "VP of Marketing",
    company: "Lumina Health",
  },
  {
    quote:
      "The attention to detail and strategic thinking they brought to the table was unmatched. Highly recommended.",
    name: "Marcus Rivera",
    role: "Founder",
    company: "RiverTech",
  },
  {
    quote:
      "From concept to launch, every milestone was hit on time. The best agency partnership we have ever had.",
    name: "Aisha Patel",
    role: "CTO",
    company: "Greenline Logistics",
  },
];

export const Default: Story = {
  args: {
    testimonials: threeTestimonials,
  },
};

export const TwoColumns: Story = {
  args: {
    testimonials: threeTestimonials,
    columns: 2,
  },
};

export const Stacked: Story = {
  args: {
    testimonials: threeTestimonials,
    layout: "stacked",
  },
};

export const WithAvatars: Story = {
  args: {
    testimonials: threeTestimonials.map((t) => ({
      ...t,
      avatar: { asset: { _ref: "stub" } },
    })),
  },
};

export const WithHeading: Story = {
  args: {
    heading: "What Our Clients Say",
    testimonials: threeTestimonials,
  },
};

export const SingleTestimonial: Story = {
  args: {
    testimonials: [threeTestimonials[0]],
    layout: "carousel",
  },
};

export const SixTestimonials: Story = {
  args: {
    testimonials: [
      ...threeTestimonials,
      {
        quote:
          "Their design system saved us months of development time. Incredible craftsmanship.",
        name: "David Kim",
        role: "Engineering Lead",
        company: "Apex Digital",
      },
      {
        quote:
          "We saw a 40% increase in user engagement after the redesign. The ROI speaks for itself.",
        name: "Elena Voss",
        role: "Product Manager",
        company: "NovaBridge",
      },
      {
        quote:
          "Professional, responsive, and genuinely invested in our success. A true partner.",
        name: "James Okonkwo",
        role: "CEO",
        company: "Helix Ventures",
      },
    ],
  },
};

export const MinimalQuotes: Story = {
  args: {
    testimonials: [
      {
        quote: "Absolutely stellar work. We could not be happier.",
        name: "Laura Martinez",
      },
      {
        quote: "Clean, fast, and exactly what we needed.",
        name: "Tom Brennan",
      },
      {
        quote: "They delivered beyond our expectations on every front.",
        name: "Nina Johansson",
      },
    ],
  },
};
