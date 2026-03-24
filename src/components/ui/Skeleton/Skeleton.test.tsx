import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders without crashing", () => {
    render(<Skeleton />);
  });
});
