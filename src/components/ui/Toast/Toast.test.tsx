import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ToastProvider, useToast } from "./Toast";

function TestTrigger({ variant = "info" as const, duration }: { variant?: "info" | "success" | "warning" | "danger"; duration?: number }) {
  const { toast } = useToast();
  return (
    <button onClick={() => toast({ message: "Test toast", variant, duration })}>
      Trigger
    </button>
  );
}

describe("Toast", () => {
  it("renders toast when triggered", async () => {
    render(
      <ToastProvider>
        <TestTrigger />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByText("Trigger"));
    expect(screen.getByText("Test toast")).toBeInTheDocument();
  });

  it("renders correct variant", async () => {
    render(
      <ToastProvider>
        <TestTrigger variant="success" />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByText("Trigger"));
    const alert = screen.getByRole("alert");
    expect(alert.className).toMatch(/toast--success/);
  });

  it("dismisses on close click", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(
      <ToastProvider>
        <TestTrigger duration={10000} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByText("Trigger"));
    expect(screen.getByText("Test toast")).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText("Dismiss"));
    act(() => { vi.advanceTimersByTime(400); });
    expect(screen.queryByText("Test toast")).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("auto-dismisses after duration", () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <TestTrigger duration={2000} />
      </ToastProvider>,
    );
    act(() => { screen.getByText("Trigger").click(); });
    expect(screen.getByText("Test toast")).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(2300); });
    act(() => { vi.advanceTimersByTime(400); });
    expect(screen.queryByText("Test toast")).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});
