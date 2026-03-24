import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { DataTable } from "./DataTable";

describe("DataTable", () => {
  it("renders without crashing", () => {
    render(<DataTable columns={[]} data={[]} />);
  });
});
