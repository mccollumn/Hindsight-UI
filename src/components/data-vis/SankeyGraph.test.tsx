import React from "react";
import { render, screen } from "@testing-library/react";
import SankeyGraph from "./SankeyGraph";

// Mock the nivo ResponsiveSankey component
jest.mock("@nivo/sankey", () => ({
  ResponsiveSankey: ({ data, ...props }: any) => (
    <div data-testid="responsive-sankey" data-props={JSON.stringify(props)}>
      Sankey Chart with {data?.nodes?.length || 0} nodes and{" "}
      {data?.links?.length || 0} links
    </div>
  ),
}));

describe("SankeyGraph", () => {
  const mockData = {
    nodes: [
      { id: "node1", nodeColor: "red" },
      { id: "node2", nodeColor: "blue" },
      { id: "node3", nodeColor: "green" },
    ],
    links: [
      { source: "node1", target: "node2", value: 10 },
      { source: "node2", target: "node3", value: 5 },
    ],
  };

  it("renders with title", () => {
    render(<SankeyGraph data={mockData} title="Test Sankey" />);

    expect(screen.getByText("Test Sankey")).toBeInTheDocument();
    expect(screen.getByTestId("responsive-sankey")).toBeInTheDocument();
  });

  it("renders without title", () => {
    render(<SankeyGraph data={mockData} />);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByTestId("responsive-sankey")).toBeInTheDocument();
  });

  it("renders with empty data", () => {
    render(
      <SankeyGraph data={{ nodes: [], links: [] }} title="Empty Sankey" />
    );

    expect(screen.getByText("Empty Sankey")).toBeInTheDocument();
    expect(
      screen.getByText("Sankey Chart with 0 nodes and 0 links")
    ).toBeInTheDocument();
  });

  it("passes data to ResponsiveSankey", () => {
    render(<SankeyGraph data={mockData} title="Test Sankey" />);

    expect(
      screen.getByText("Sankey Chart with 3 nodes and 2 links")
    ).toBeInTheDocument();
  });

  it("applies default margins", () => {
    render(<SankeyGraph data={mockData} />);

    const sankeyComponent = screen.getByTestId("responsive-sankey");
    const props = JSON.parse(
      sankeyComponent.getAttribute("data-props") || "{}"
    );

    expect(props.margin).toEqual({ top: 40, right: 160, bottom: 40, left: 50 });
  });

  it("passes config props to ResponsiveSankey", () => {
    const config = {
      nodeOpacity: 0.8,
      nodeThickness: 18,
      linkOpacity: 0.3,
    };

    render(<SankeyGraph data={mockData} config={config} />);

    const sankeyComponent = screen.getByTestId("responsive-sankey");
    const props = JSON.parse(
      sankeyComponent.getAttribute("data-props") || "{}"
    );

    expect(props.nodeOpacity).toBe(0.8);
    expect(props.nodeThickness).toBe(18);
    expect(props.linkOpacity).toBe(0.3);
  });

  it("has correct container height", () => {
    render(<SankeyGraph data={mockData} />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId("responsive-sankey").parentElement).toHaveStyle({
      height: "400px",
    });
  });

  it("handles default props correctly", () => {
    render(<SankeyGraph data={undefined as any} />);

    expect(
      screen.getByText("Sankey Chart with 0 nodes and 0 links")
    ).toBeInTheDocument();
  });

  it("handles partial data correctly", () => {
    const partialData = { nodes: [{ id: "node1" }], links: [] };
    render(<SankeyGraph data={partialData} />);

    expect(
      screen.getByText("Sankey Chart with 1 nodes and 0 links")
    ).toBeInTheDocument();
  });
});
