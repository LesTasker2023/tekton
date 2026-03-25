import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

/* ── Mocks ── */

// next/link — render a plain anchor
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// next/image — render a plain img
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

// next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/news",
}));

// @vercel/analytics — noop
vi.mock("@vercel/analytics/next", () => ({
  Analytics: () => null,
}));

// dynamicIcon helper — return a simple span stub
vi.mock("@/lib/dynamicIcon", () => ({
  dynamicIcon: (name: string) => {
    const Stub = () => <span data-testid={`icon-${name}`} />;
    Stub.displayName = `Icon(${name})`;
    return Stub;
  },
}));

// Footer — lightweight stub
vi.mock("@/components/layout/Footer", () => ({
  Footer: () => <footer data-testid="footer" />,
}));

// SCSS module — identity proxy with default export
vi.mock("./NavTopBar.module.scss", () => {
  const proxy = new Proxy({}, { get: (_t, prop) => String(prop) });
  return { default: proxy, __esModule: true };
});

import { NavTopBar } from "./NavTopBar";

describe("NavTopBar", () => {
  it("renders children", () => {
    render(
      <NavTopBar>
        <p>Hello world</p>
      </NavTopBar>,
    );
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders default nav links", () => {
    render(
      <NavTopBar>
        <div />
      </NavTopBar>,
    );
    expect(screen.getAllByText("News").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Guides").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Events").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Join").length).toBeGreaterThan(0);
  });

  it("renders custom site name from settings", () => {
    render(
      <NavTopBar settings={{ siteName: "My Site" }}>
        <div />
      </NavTopBar>,
    );
    expect(screen.getByText("My Site")).toBeInTheDocument();
  });

  it("defaults site name to Tekton", () => {
    render(
      <NavTopBar>
        <div />
      </NavTopBar>,
    );
    expect(screen.getByText("Tekton")).toBeInTheDocument();
  });

  it("has an accessible toggle-navigation button", () => {
    render(
      <NavTopBar>
        <div />
      </NavTopBar>,
    );
    const btn = screen.getByRole("button", { name: /toggle navigation/i });
    expect(btn).toBeInTheDocument();
  });

  it("renders nav links as anchor elements", () => {
    render(
      <NavTopBar>
        <div />
      </NavTopBar>,
    );
    const newsLink = screen.getAllByText("News")[0].closest("a");
    expect(newsLink).toHaveAttribute("href", "/news");
  });

  it("marks the active link with data-active", () => {
    render(
      <NavTopBar>
        <div />
      </NavTopBar>,
    );
    // pathname is "/news" so the News desktop link should be active
    const newsLinks = screen.getAllByText("News");
    const activeLink = newsLinks.find(
      (el) => el.closest("a")?.getAttribute("data-active") === "true",
    );
    expect(activeLink).toBeTruthy();
  });

  it("toggles mobile menu open attribute on hamburger click", async () => {
    const user = userEvent.setup();
    render(
      <NavTopBar>
        <div />
      </NavTopBar>,
    );
    const btn = screen.getByRole("button", { name: /toggle navigation/i });
    // Mobile nav should start closed
    const mobileNav = document.querySelector("[data-open]") as HTMLElement;
    expect(mobileNav?.getAttribute("data-open")).toBe("false");

    await user.click(btn);
    expect(mobileNav?.getAttribute("data-open")).toBe("true");
  });
});
