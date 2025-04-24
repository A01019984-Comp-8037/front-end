import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { RegisterSuccess } from "../RegisterSuccess";

describe("Register Success Tests", () => {
  test("Component Renders Correctly", () => {
    render(<RegisterSuccess />);
    expect(screen.getByText("Account Created")).toBeDefined();
  });
});
