import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactForm } from "./ContactForm";

vi.mock("@/app/actions/contact", () => ({
  submitContact: vi.fn(),
}));

describe("ContactForm", () => {
  it("renders heading and all fields", () => {
    render(<ContactForm />);
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<ContactForm heading="Start a Project" />);
    expect(screen.getByText("Start a Project")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactForm />);
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  });
});
