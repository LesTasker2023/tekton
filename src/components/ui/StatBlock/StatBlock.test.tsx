import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { StatBlock } from "./StatBlock";

describe("StatBlock", () => {
  it("renders without crashing", () => {
    render(<StatBlock label="Test" value="42" />);
  });
});
