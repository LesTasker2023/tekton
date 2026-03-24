import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("renders without crashing", () => {
    render(<Drawer open={false} onClose={() => {}}>Content</Drawer>);
  });
});
