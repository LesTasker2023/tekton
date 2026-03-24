import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("renders without crashing", () => {
    render(<SearchInput />);
  });
});
