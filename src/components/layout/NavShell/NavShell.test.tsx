import { render } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { NavShell } from "./NavShell";

vi.mock("next/link", () => ({
  default: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <a {...props}>{children}</a>
  ),
}));

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("@vercel/analytics/next", () => ({
  Analytics: () => null,
}));

vi.mock("@/lib/dynamicIcon", () => ({
  dynamicIcon: () => (props: Record<string, unknown>) => <span {...props} />,
}));

vi.mock("@/components/layout/Footer", () => ({
  Footer: () => <footer>footer</footer>,
}));

vi.mock("@/context/TopBarContext", () => ({
  useTopBar: () => ({
    tabs: [],
    activeTab: "",
    setActiveTab: vi.fn(),
    subTabs: [],
    activeSubTab: "",
    setActiveSubTab: vi.fn(),
    activeSubTabs: new Set<string>(),
    subTabMultiSelect: false,
    toggleSubTab: vi.fn(),
  }),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("NavShell", () => {
  it("renders without crashing", () => {
    render(
      <NavShell>
        <div>Content</div>
      </NavShell>,
    );
  });
});
