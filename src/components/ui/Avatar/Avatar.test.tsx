import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar, AvatarGroup } from "./Avatar";

describe("Avatar", () => {
  it("renders initials from name", () => {
    render(<Avatar name="John Smith" />);
    expect(screen.getByText("JS")).toBeInTheDocument();
  });

  it("renders single initial for single name", () => {
    render(<Avatar name="Alice" />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("renders image when src provided", () => {
    render(<Avatar src="/photo.jpg" name="Test" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "/photo.jpg");
  });

  it("falls back to initials on image error", () => {
    render(<Avatar src="/bad.jpg" name="Test User" />);
    const img = screen.getByRole("img");
    fireEvent.error(img);
    expect(screen.getByText("TU")).toBeInTheDocument();
  });

  it("applies size attribute", () => {
    const { container } = render(<Avatar name="A" size="lg" />);
    expect(container.querySelector("[data-size='lg']")).toBeInTheDocument();
  });

  it("renders status dot", () => {
    const { container } = render(<Avatar name="A" status="online" />);
    expect(container.querySelector("[aria-label='online']")).toBeInTheDocument();
  });
});

describe("AvatarGroup", () => {
  it("shows overflow count", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="A" />
        <Avatar name="B" />
        <Avatar name="C" />
        <Avatar name="D" />
      </AvatarGroup>,
    );
    expect(screen.getByText("+2")).toBeInTheDocument();
  });
});
