import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactSection } from "./ContactSection";

vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }: React.PropsWithChildren) => (
      <section {...props}>{children}</section>
    ),
  },
}));

vi.mock("@/components/ui", () => ({
  Panel: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
}));

vi.mock("@/components/ui/ContactForm", () => ({
  ContactForm: ({ heading }: { heading?: string }) => (
    <div data-testid="contact-form">{heading ?? "Get in Touch"}</div>
  ),
}));

describe("ContactSection", () => {
  it("renders ContactForm inside a panel", () => {
    render(<ContactSection />);
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
  });

  it("passes heading to ContactForm", () => {
    render(<ContactSection heading="Start a Project" />);
    expect(screen.getByText("Start a Project")).toBeInTheDocument();
  });
});
