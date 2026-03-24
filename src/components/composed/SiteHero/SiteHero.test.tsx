import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { SiteHero } from "./SiteHero";

describe("SiteHero", () => {
  it("renders without crashing", () => {
    render(<SiteHero title="Test" />);
  });
});
