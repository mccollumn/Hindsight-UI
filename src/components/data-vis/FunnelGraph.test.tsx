import React from "react";
import { render, screen } from "@testing-library/react";
import FunnelGraph from "./FunnelGraph";

// Mock the nivo ResponsiveFunnel component
jest.mock("@nivo/funnel", () => ({
  ResponsiveFunnel: ({ data, ...props }: any) => (
    <div data-testid="responsive-funnel" data-props={JSON.stringify(props)}>
      Funnel Chart with {data?.length || 0} data points
    </div>
  ),
}));

describe("FunnelGraph", () => {
  const mockData = [
    { id: "step1", value: 100, label: "Step 1" },
    { id: "step2", value: 80, label: "Step 2" },
    { id: "step3", value: 60, label: "Step 3" },
  ];

  it("renders with title", () => {
    render(<FunnelGraph data={mockData} title="Test Funnel" />);

    expect(screen.getByText("Test Funnel")).toBeInTheDocument();
    expect(screen.getByTestId("responsive-funnel")).toBeInTheDocument();
  });

  it("renders without title", () => {
    render(<FunnelGraph data={mockData} />);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByTestId("responsive-funnel")).toBeInTheDocument();
  });

  it("renders with empty data", () => {
    render(<FunnelGraph data={[]} title="Empty Funnel" />);

    expect(screen.getByText("Empty Funnel")).toBeInTheDocument();
    expect(
      screen.getByText("Funnel Chart with 0 data points")
    ).toBeInTheDocument();
  });

  it("passes data to ResponsiveFunnel", () => {
    render(<FunnelGraph data={mockData} title="Test Funnel" />);

    expect(
      screen.getByText("Funnel Chart with 3 data points")
    ).toBeInTheDocument();
  });

  it("applies default margins", () => {
    render(<FunnelGraph data={mockData} />);

    const funnelComponent = screen.getByTestId("responsive-funnel");
    const props = JSON.parse(
      funnelComponent.getAttribute("data-props") || "{}"
    );

    expect(props.margin).toEqual({ top: 20, right: 20, bottom: 20, left: 20 });
  });

  it("passes config props to ResponsiveFunnel", () => {
    const config = {
      valueFormat: ">-.4s",
      colors: { scheme: "spectral" },
    };

    render(<FunnelGraph data={mockData} config={config} />);

    const funnelComponent = screen.getByTestId("responsive-funnel");
    const props = JSON.parse(
      funnelComponent.getAttribute("data-props") || "{}"
    );

    expect(props.valueFormat).toBe(">-.4s");
    expect(props.colors).toEqual({ scheme: "spectral" });
  });

  it("has correct container height", () => {
    render(<FunnelGraph data={mockData} />);

    // eslint-disable-next-line testing-library/no-node-access
    const container = screen.getByTestId("responsive-funnel").parentElement;
    expect(container).toHaveStyle({ height: "400px" });
  });

  it("handles default props correctly", () => {
    render(<FunnelGraph data={undefined as any} />);

    expect(
      screen.getByText("Funnel Chart with 0 data points")
    ).toBeInTheDocument();
  });
});
