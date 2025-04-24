import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BarGraph } from "../BarGraph";
import "@testing-library/jest-dom";

vi.mock("react-chartjs-2", async () => {
  const actual = await vi.importActual("react-chartjs-2");
  return {
    ...actual,
    Bar: ({ data, options }: any) => (
      <div data-testid="mock-bar-chart">
        <p>Chart Rendered</p>
        <div data-testid="chart-data">{JSON.stringify(data)}</div>
        <div data-testid="chart-options">{JSON.stringify(options)}</div>
      </div>
    ),
  };
});

describe("BarGraph", () => {
  test("renders a bar chart with provided data", () => {
    const mockData = {
      "192.168.0.1": 12,
      "192.168.0.2": 19,
      "192.168.0.3": 3,
    };

    render(<BarGraph srcData={mockData} />);

    const chart = screen.getByTestId("mock-bar-chart");
    expect(chart).toBeInTheDocument();

    const chartData = screen.getByTestId("chart-data");
    const parsedData = JSON.parse(chartData.textContent || "{}");
    expect(parsedData.labels).toEqual([
      "192.168.0.1",
      "192.168.0.2",
      "192.168.0.3",
    ]);
    expect(parsedData.datasets[0].data).toEqual([12, 19, 3]);
    expect(parsedData.datasets[0].label).toBe("Source Address");
  });
});
