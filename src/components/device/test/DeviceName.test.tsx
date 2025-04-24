import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DeviceName } from "../DeviceName";

describe("DeviceName", () => {
  test("Renders Component", () => {
    render(<DeviceName name="test Device" id={100} />);
    expect(screen.getByText("Update")).toBeDefined();
  });
});
