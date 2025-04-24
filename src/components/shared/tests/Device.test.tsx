import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Device } from "../Device";

describe("Device Tests", () => {
  const mockDeviceInfo = {
    id: "100",
    createdAt: "2025-03-29 00:21:21.728+00",
    displayname: "test-123",
    connected: true,
  };

  test("Component Renders with correct info", () => {
    render(<Device info={mockDeviceInfo} />);
    expect(screen.findByText(mockDeviceInfo.displayname)).toBeDefined();
    expect(screen.findByText(mockDeviceInfo.createdAt)).toBeDefined();
  });
});
