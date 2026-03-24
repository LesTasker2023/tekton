import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders without crashing", () => {
    render(<Pagination />);
  });
});
