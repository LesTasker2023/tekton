import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { EventCalendar } from "./EventCalendar";

describe("EventCalendar", () => {
  it("renders without crashing", () => {
    render(<EventCalendar events={[]} />);
    expect(screen.getByText("MON")).toBeInTheDocument();
  });
});
