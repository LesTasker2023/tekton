import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { SegmentedBar } from "./SegmentedBar";

describe("SegmentedBar", () => {
  it("renders without crashing", () => {
    render(<SegmentedBar segments={[]} />);
  });
});
