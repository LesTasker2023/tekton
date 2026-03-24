import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders without crashing", () => {
    render(<Footer />);
  });
});
