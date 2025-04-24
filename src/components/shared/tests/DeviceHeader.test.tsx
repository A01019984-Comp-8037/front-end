import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { DeviceHeader } from "../DeviceHeader";

describe("Component Tests for the Header Component", () => {
  test("Component Renders with correct info", () => {
    render(<DeviceHeader id="100" />);
    expect(screen.getAllByText("Remote Firewall Web App")).toBeDefined();
    expect(screen.getAllByText("Installer")).toBeDefined();
    expect(screen.getAllByText("Delete")).toBeDefined();
  });
});
