import React from "react";
import { render, screen } from "@testing-library/react";
import LineGraph from "./LineGraph";

// Mock the nivo ResponsiveLine component
jest.mock("@nivo/line", () => ({
  ResponsiveLine: ({ data, ...props }: any) => (
    <div
      data-testid="responsive-line"
      data-props={JSON.stringify({ data, ...props })}
    >
      Line Graph with {data?.length || 0} series
    </div>
  ),
}));

// Mock the constants
jest.mock("../../constants/constants", () => ({
  GRAPH_HEIGHT: 400,
}));

describe("LineGraph", () => {
  const mockData = [
    {
      id: "series1",
      data: [
        { x: "2023-01-01", y: 100 },
        { x: "2023-01-02", y: 150 },
        { x: "2023-01-03", y: 120 },
      ],
    },
    {
      id: "series2",
      data: [
        { x: "2023-01-01", y: 80 },
        { x: "2023-01-02", y: 90 },
        { x: "2023-01-03", y: 110 },
      ],
    },
  ];

  it("renders with data", () => {
    render(<LineGraph data={mockData} />);

    expect(screen.getByTestId("responsive-line")).toBeInTheDocument();
    expect(screen.getByText("Line Graph with 2 series")).toBeInTheDocument();
  });

  it("renders with empty data", () => {
    render(<LineGraph data={[]} />);

    expect(screen.getByTestId("responsive-line")).toBeInTheDocument();
    expect(screen.getByText("Line Graph with 0 series")).toBeInTheDocument();
  });

  it("renders with default empty data", () => {
    render(<LineGraph data={undefined as any} />);

    expect(screen.getByText("Line Graph with 0 series")).toBeInTheDocument();
  });

  it("passes data to ResponsiveLine", () => {
    render(<LineGraph data={mockData} />);

    const lineComponent = screen.getByTestId("responsive-line");
    const props = JSON.parse(lineComponent.getAttribute("data-props") || "{}");

    expect(props.data).toEqual(mockData);
  });

  it("passes config props to ResponsiveLine", () => {
    const config = {
      margin: { top: 50, right: 110, bottom: 50, left: 60 },
      xScale: { type: "point" },
      yScale: { type: "linear", min: "auto", max: "auto" },
    };

    render(<LineGraph data={mockData} config={config} />);

    const lineComponent = screen.getByTestId("responsive-line");
    const props = JSON.parse(lineComponent.getAttribute("data-props") || "{}");

    expect(props.margin).toEqual(config.margin);
    expect(props.xScale).toEqual(config.xScale);
    expect(props.yScale).toEqual(config.yScale);
  });

  it("passes through additional props", () => {
    render(
      <LineGraph
        data={mockData}
        enablePoints={true}
        enableGridX={false}
        curve="cardinal"
      />
    );

    const lineComponent = screen.getByTestId("responsive-line");
    const props = JSON.parse(lineComponent.getAttribute("data-props") || "{}");

    expect(props.enablePoints).toBe(true);
    expect(props.enableGridX).toBe(false);
    expect(props.curve).toBe("cardinal");
  });

  it("has correct container styling", () => {
    render(<LineGraph data={mockData} />);

    // eslint-disable-next-line testing-library/no-node-access
    const container = screen.getByTestId("responsive-line").parentElement;
    expect(container).toHaveStyle({
      height: "400px",
      position: "relative",
      top: "-30px",
    });
  });

  it("handles config with default empty object", () => {
    render(<LineGraph data={mockData} />);

    const lineComponent = screen.getByTestId("responsive-line");
    expect(lineComponent).toBeInTheDocument();
  });

  it("merges config and additional props correctly", () => {
    const config = { margin: { top: 20 } };

    render(<LineGraph data={mockData} config={config} enablePoints={true} />);

    const lineComponent = screen.getByTestId("responsive-line");
    const props = JSON.parse(lineComponent.getAttribute("data-props") || "{}");

    expect(props.margin).toEqual({ top: 20 });
    expect(props.enablePoints).toBe(true);
  });
});
