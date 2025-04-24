import { expect, test, describe } from "vitest";
import { render, screen, act, cleanup } from "@testing-library/react";
import { Alert } from "../Alert";
import { sendAlert } from "../../../store/AlertStore";

describe("Alert Tests", () => {
  afterEach(() => {
    cleanup();
  });

  test("Component renders", () => {
    render(<Alert />);
    expect(screen.getByRole("alert")).toBeDefined();
  });

  test("Component can't be seen by default", () => {
    const { container } = render(<Alert />);
    expect(container.querySelector(".opacity-0")?.className).toBeDefined();
  });

  test("Alerts can be seen after sending alert", async () => {
    const { container } = render(<Alert />);
    await act(async () =>
      sendAlert({ msg: "This is an alert", type: "alert-success" })
    );
    expect(container.querySelector(".opacity-100")?.className).toBeDefined();
    expect(screen.getAllByText("This is an alert")).toBeDefined();
  });

  test("Success alert with correct message", async () => {
    const { container } = render(<Alert />);
    await act(() =>
      sendAlert({ msg: "This is an alert", type: "alert-success" })
    );
    expect(container.querySelector(".alert-success")?.className).toBeDefined();
    expect(screen.getAllByText("This is an alert")).toBeDefined();
  });
});
