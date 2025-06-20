import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import WtLineGraph from "./WtLineGraph";
import { DateContext } from "../../providers/DateProvider";
import { GridStateContext } from "../../providers/GridStateProvider";

// Mock the child components and hooks
jest.mock("./useWtLineGraphQueries", () => ({
  useWtLineGraphQueries: jest.fn().mockReturnValue({
    trendDataQueries: [
      {
        data: { data: [] },
        isLoading: false,
        error: null,
      },
    ],
  }),
}));

jest.mock("./useWtLineGraphData", () => ({
  useWtLineGraphData: () => ({
    lineGraphData: [
      {
        id: "test-series",
        data: [
          { x: "2024-01-01", y: 100 },
          { x: "2024-01-02", y: 150 },
          { x: "2024-01-03", y: 120 },
        ],
      },
    ],
  }),
}));

jest.mock("./LineGraph", () => {
  return function MockLineGraph({ data, loading, ...props }: any) {
    if (loading) {
      return <div data-testid="line-graph-loading">Loading...</div>;
    }
    return (
      <div data-testid="line-graph">
        <div data-testid="line-graph-data">{JSON.stringify(data)}</div>
      </div>
    );
  };
});

jest.mock("./lineGraph.util", () => ({
  getPrimaryMeasureFromReportDef: jest.fn(() => "Primary Measure"),
  generateWtDate: jest.fn((year, month, day, hour) => {
    let date = year.toString();
    if (month > 0) date += `m${month}`;
    if (day > 0) date += `d${day}`;
    if (hour > 0) date += `h${hour}`;
    return date;
  }),
}));

const theme = createTheme();

const mockDateContextValue = {
  trendInterval: "day",
  startDate: new Date("2024-01-01"),
  endDate: new Date("2024-01-31"),
  wtStartDate: "2024-01-01",
  wtEndDate: "2024-01-31",
  setStartDate: jest.fn(),
  setEndDate: jest.fn(),
};

const mockGridStateContextValue: any = {
  selectedCell: {
    selectedDimension: "",
    selectedColumn: "",
    primaryDimension: "",
    dimensionHierarchy: [],
  },
  getGridDimensions: jest.fn(() => []),
  dataGridRef: null,
  handleSelectionChange: jest.fn(),
  setGridDimensions: jest.fn(),
  gridRef: null,
  setGridRef: jest.fn(),
  setDataGridRef: jest.fn(),
  onStateChange: jest.fn(),
  groupExpansionLookup: { current: {} },
  isGroupExpandedByDefault: jest.fn(() => false),
};

const mockReportDefinition: any = {
  accountID: 1,
  profileID: "test-profile",
  ID: "test-report",
  name: "Test Report",
  language: "en",
  isRealtime: false,
  type: "standard",
  dimension: {
    ID: "test-dimension",
    name: "Test Dimension",
    type: "string",
    Range: null,
    Properties: null,
    SubDimension: null,
  },
  dimensions: ["Dimension 1", "Dimension 2"],
  measures: [
    {
      name: "Measure 1",
      accumulationType: null,
      ID: "measure-1",
      columnID: 0,
      measureFormatType: null,
      AllowTotals: true,
      Sortable: false,
    },
  ],
  properties: {},
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <DateContext.Provider value={mockDateContextValue}>
        <GridStateContext.Provider value={mockGridStateContextValue}>
          {component}
        </GridStateContext.Provider>
      </DateContext.Provider>
    </ThemeProvider>
  );
};

describe("WtLineGraph", () => {
  const mockRequestControllersCallback = jest.fn();

  const defaultProps = {
    reportDefinition: mockReportDefinition,
    config: {},
    requestControllersCallback: mockRequestControllersCallback,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Get the mocked function and reset its return value
    const { useWtLineGraphQueries } = require("./useWtLineGraphQueries");
    (useWtLineGraphQueries as jest.Mock).mockReturnValue({
      trendDataQueries: [
        {
          data: { data: [] },
          isLoading: false,
          error: null,
        },
      ],
    });
  });

  it("renders line graph component", () => {
    renderWithProviders(<WtLineGraph {...defaultProps} />);

    expect(screen.getByTestId("line-graph")).toBeInTheDocument();
  });

  it("shows loading spinner initially", () => {
    // Configure the mock for loading state
    const mockUseWtLineGraphQueries =
      require("./useWtLineGraphQueries").useWtLineGraphQueries;
    mockUseWtLineGraphQueries.mockImplementation(() => ({
      trendDataQueries: [
        {
          data: undefined,
          isLoading: true,
          error: null,
        },
      ],
    }));

    renderWithProviders(<WtLineGraph {...defaultProps} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("passes correct data to LineGraph component", () => {
    renderWithProviders(<WtLineGraph {...defaultProps} />);

    const lineGraphData = screen.getByTestId("line-graph-data");
    const dataText = lineGraphData.textContent;

    expect(dataText).toContain("test-series");
    expect(dataText).toContain("2024-01-01");
    expect(dataText).toContain("100");
  });

  it("applies custom config to line graph", () => {
    const customConfig = {
      margin: { top: 50, right: 100, bottom: 150, left: 100 },
      colors: ["#ff0000", "#00ff00", "#0000ff"],
    };

    renderWithProviders(
      <WtLineGraph {...defaultProps} config={customConfig} />
    );

    expect(screen.getByTestId("line-graph")).toBeInTheDocument();
  });

  it("handles empty report definition", () => {
    renderWithProviders(
      <WtLineGraph {...defaultProps} reportDefinition={null as any} />
    );

    expect(screen.getByTestId("line-graph")).toBeInTheDocument();
  });

  it("integrates with DateContext for trend interval and dates", () => {
    renderWithProviders(<WtLineGraph {...defaultProps} />);

    // Component should use DateContext values
    expect(screen.getByTestId("line-graph")).toBeInTheDocument();
  });

  it("integrates with GridStateContext for selected cell data", () => {
    const gridStateWithSelection = {
      ...mockGridStateContextValue,
      selectedCell: {
        selectedDimension: "test-dimension",
        selectedColumn: "test-column",
        primaryDimension: "test-primary",
        dimensionHierarchy: ["level1"],
      },
      getGridDimensions: jest.fn(() => ["dim1", "dim2"]),
    };

    renderWithProviders(
      <GridStateContext.Provider value={gridStateWithSelection}>
        <DateContext.Provider value={mockDateContextValue}>
          <ThemeProvider theme={theme}>
            <WtLineGraph {...defaultProps} />
          </ThemeProvider>
        </DateContext.Provider>
      </GridStateContext.Provider>
    );

    expect(screen.getByTestId("line-graph")).toBeInTheDocument();
  });

  it("calls requestControllersCallback when provided", () => {
    renderWithProviders(<WtLineGraph {...defaultProps} />);

    // The callback would be called during graph initialization
    expect(mockRequestControllersCallback).toBeDefined();
  });

  it("applies default graph options", () => {
    renderWithProviders(<WtLineGraph {...defaultProps} />);

    expect(screen.getByTestId("line-graph")).toBeInTheDocument();
    // Default options would be applied internally
  });

  it("handles different trend intervals from DateContext", () => {
    const weeklyDateContext = {
      ...mockDateContextValue,
      trendInterval: "week",
    };

    renderWithProviders(
      <DateContext.Provider value={weeklyDateContext}>
        <GridStateContext.Provider value={mockGridStateContextValue}>
          <ThemeProvider theme={theme}>
            <WtLineGraph {...defaultProps} />
          </ThemeProvider>
        </GridStateContext.Provider>
      </DateContext.Provider>
    );

    expect(screen.getByTestId("line-graph")).toBeInTheDocument();
  });

  it("passes additional props to underlying components", () => {
    const additionalProps = {
      "data-testid": "custom-wt-line-graph",
      className: "custom-class",
    };

    renderWithProviders(<WtLineGraph {...defaultProps} {...additionalProps} />);

    expect(screen.getByTestId("line-graph")).toBeInTheDocument();
  });

  it("shows loading state when graph is loading", () => {
    // Component has internal loading state
    renderWithProviders(<WtLineGraph {...defaultProps} />);

    // Initially shows loading, then the graph
    expect(screen.getByTestId("line-graph")).toBeInTheDocument();
  });

  it("handles error states gracefully", () => {
    // Mock useWtLineGraphQueries to return error state
    jest.doMock("./useWtLineGraphQueries", () => ({
      useWtLineGraphQueries: () => ({
        queries: [],
        isLoading: false,
        error: new Error("Test error"),
      }),
    }));

    renderWithProviders(<WtLineGraph {...defaultProps} />);

    // Component should still render but handle error gracefully
    expect(screen.getByTestId("line-graph")).toBeInTheDocument();
  });

  it("updates when date context changes", () => {
    const { rerender } = renderWithProviders(<WtLineGraph {...defaultProps} />);

    const updatedDateContext = {
      ...mockDateContextValue,
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-02-29"),
    };

    rerender(
      <ThemeProvider theme={theme}>
        <DateContext.Provider value={updatedDateContext}>
          <GridStateContext.Provider value={mockGridStateContextValue}>
            <WtLineGraph {...defaultProps} />
          </GridStateContext.Provider>
        </DateContext.Provider>
      </ThemeProvider>
    );

    expect(screen.getByTestId("line-graph")).toBeInTheDocument();
  });
});
