import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { RegisterCard } from "../RegisterCard";

describe("Register Card Tests", () => {
  test("Login Card Renders", () => {
    render(<RegisterCard />);
    expect(screen.getByText("Create Account")).toBeDefined();
  });
});
