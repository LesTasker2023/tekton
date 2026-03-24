import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { Select } from "./Select";

describe("Select", () => {
  it("renders without crashing", () => {
    render(
      <Select
        options={[
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
        ]}
      />,
    );
    expect(screen.getByText("Select...")).toBeInTheDocument();
  });
});
