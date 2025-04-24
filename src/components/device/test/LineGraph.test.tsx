import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Linechart } from "../lineGraph";
import "@testing-library/jest-dom";

vi.mock("react-chartjs-2", async () => {
  const actual = await vi.importActual("react-chartjs-2");
  return {
    ...actual,
    Line: ({ data }: any) => (
      <div data-testid="mock-line-chart">
        Line Chart Rendered
        <pre>{JSON.stringify(data)}</pre>
      </div>
    ),
  };
});

describe("Linechart", () => {
  it("renders without crashing", () => {
    const mockChartData = {
      tcp: [1, 2, 3],
      udp: [3, 2, 1],
      labels: ["Jan", "Feb", "Mar"],
      init: true,
    };

    render(<Linechart chartData={mockChartData} />);
    expect(screen.getByTestId("mock-line-chart")).toBeInTheDocument();
  });
});
