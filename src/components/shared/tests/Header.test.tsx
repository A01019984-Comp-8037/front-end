import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

describe("Component Tests for the Header Component", () => {
  test("Component Renders", () => {
    render(<Header />);
    expect(screen.getAllByText("Remote Firewall Web App")).toBeDefined();
  });
});
