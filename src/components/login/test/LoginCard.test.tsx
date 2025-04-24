import { expect, test, describe } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginCard } from "../LoginCard";

const originalLocation = window.location;

describe("Login Component Tests", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    delete (window as any).location;
    (window as any).location = { href: "" };
  });

  afterEach(() => {
    (window as any).location = originalLocation;
    vi.unstubAllGlobals();
  });

  test("Login Component Renders Correctly", () => {
    render(<LoginCard />);
    expect(screen.getByText("Login")).toBeDefined();
    expect(screen.getByText("Email")).toBeDefined();
    expect(screen.getByText("Password")).toBeDefined();
  });

  test("Login Component Logs in and redirects on success", async () => {
    (fetch as any).mockResolvedValue({
      json: async () => ({ access_token: "mock_token" }),
    });
    render(<LoginCard />);
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await fireEvent.change(emailInput, {
      target: { value: "email@email.com" },
    });
    await fireEvent.change(passwordInput, {
      target: { value: "P@ssw0rd" },
    });
    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.href).toBe("/dashboard");
    });
  });
});
