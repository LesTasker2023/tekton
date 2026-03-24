import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("renders without crashing", () => {
    render(<Toggle />);
  });
});
