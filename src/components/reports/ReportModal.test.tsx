import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReportModal from "./ReportModal";
import { DateContext } from "../../providers/DateProvider";

// Mock the child components
jest.mock("../data-vis/WtDataTable", () => {
  return function MockWtDataTable(props: any) {
    const { gridRefCallback } = props;
    const React = require("react");

    React.useEffect(() => {
      if (gridRefCallback) {
        gridRefCallback({
          exportDataAsCsv: jest.fn(),
        });
      }
    }, [gridRefCallback]);

    return React.createElement(
      "div",
      { "data-testid": "wt-data-table" },
      "WtDataTable Component"
    );
  };
});

jest.mock("../data-vis/WtLineGraph", () => {
  return function MockWtLineGraph(props: any) {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "wt-line-graph" },
      "WtLineGraph Component"
    );
  };
});

jest.mock("../DateRange", () => {
  return function MockDateRange(props: any) {
    const React = require("react");
    return React.createElement(
      "div",
      { "data-testid": "date-range" },
      "DateRange Component"
    );
  };
});

jest.mock("../../hooks/useGetData", () => ({
  __esModule: true,
  default: () => ({
    getDataQuery: jest.fn().mockResolvedValue({
      definition: {
        accountID: 1,
        profileID: "profile-1",
        ID: "report-1",
        name: "Test Report",
        language: "en",
        isRealtime: false,
        type: "dimensional",
        properties: {
          isHierarchy: false,
          intervalsEnabled: true,
          IsSearchable: true,
          internalID: "test-report",
          IsRealTimeCompatible: false,
          ProfileCategory: null,
        },
        dimension: {
          ID: "test-dimension",
          name: "Test Dimension",
          type: "data",
          Range: null,
          Properties: null,
          SubDimension: null,
        },
        measures: [
          {
            name: "Test Measure",
            accumulationType: null,
            ID: "test-measure",
            columnID: 0,
            measureFormatType: "numeric",
            AllowTotals: true,
            Sortable: false,
          },
        ],
      },
      data: {
        "2024-01-01": {
          measures: { "test-measure": 100 },
          SubRows: {
            "Test Item": {
              Attributes: null,
              measures: { "test-measure": 100 },
              SubRows: null,
            },
          },
        },
      },
    }),
  }),
}));

const theme = createTheme();

const mockDateContextValue = {
  trendInterval: "day",
  wtStartDate: "2024-01-01",
  wtEndDate: "2024-01-31",
  startDate: new Date("2024-01-01"),
  endDate: new Date("2024-01-31"),
  setStartDate: jest.fn(),
  setEndDate: jest.fn(),
};

const mockProfile = {
  ID: "profile-1",
  name: "Test Profile",
  AccountID: 1,
  TimeZoneID: 1,
};

const mockReport = {
  accountID: 1,
  profileID: "profile-1",
  name: "Test Report",
  ID: "report-1",
  language: "en",
  type: "summary",
  Category: "Test Category",
  IsHierarchy: false,
  IntervalsEnabled: true,
  IsRealtimeCompatible: false,
  properties: null,
};

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <DateContext.Provider value={mockDateContextValue}>
          {component}
        </DateContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe("ReportModal", () => {
  const mockOnClose = jest.fn();
  const mockCancelRequestsCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal when isOpen is true", async () => {
    renderWithProviders(
      <ReportModal
        isOpen={true}
        onClose={mockOnClose}
        profile={mockProfile}
        report={mockReport}
        cancelRequestsCallback={mockCancelRequestsCallback}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render modal when isOpen is false", () => {
    renderWithProviders(
      <ReportModal
        isOpen={false}
        onClose={mockOnClose}
        profile={mockProfile}
        report={mockReport}
        cancelRequestsCallback={mockCancelRequestsCallback}
      />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("displays loading skeletons while data is loading", () => {
    renderWithProviders(
      <ReportModal
        isOpen={true}
        onClose={mockOnClose}
        profile={mockProfile}
        report={mockReport}
        cancelRequestsCallback={mockCancelRequestsCallback}
      />
    );

    // Should show skeleton elements while loading - check that the actual components are NOT yet loaded
    expect(screen.queryByTestId("wt-data-table")).not.toBeInTheDocument();
    expect(screen.queryByTestId("wt-line-graph")).not.toBeInTheDocument();

    // And that the dialog is present (proving skeletons are showing instead of content)
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    renderWithProviders(
      <ReportModal
        isOpen={true}
        onClose={mockOnClose}
        profile={mockProfile}
        report={mockReport}
        cancelRequestsCallback={mockCancelRequestsCallback}
      />
    );

    const closeButton = screen.getByLabelText("close");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when dialog is closed via backdrop", () => {
    renderWithProviders(
      <ReportModal
        isOpen={true}
        onClose={mockOnClose}
        profile={mockProfile}
        report={mockReport}
        cancelRequestsCallback={mockCancelRequestsCallback}
      />
    );

    const dialog = screen.getByRole("dialog");
    fireEvent.keyDown(dialog, { key: "Escape", code: "Escape" });

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("toggles graph expansion when expand button is clicked", async () => {
    renderWithProviders(
      <ReportModal
        isOpen={true}
        onClose={mockOnClose}
        profile={mockProfile}
        report={mockReport}
        cancelRequestsCallback={mockCancelRequestsCallback}
      />
    );

    // Wait for loading to complete by checking for the components to be rendered
    expect(await screen.findByTestId("wt-data-table")).toBeInTheDocument();
    expect(await screen.findByTestId("wt-line-graph")).toBeInTheDocument();

    // Now look for the expand button - it should be available after data loads
    const expandButton = await screen.findByLabelText("Show or hide graph");

    // Initially expanded
    expect(expandButton).toHaveAttribute("aria-expanded", "true");

    // Click to collapse
    fireEvent.click(expandButton);
    expect(expandButton).toHaveAttribute("aria-expanded", "false");

    // Click to expand again
    fireEvent.click(expandButton);
    expect(expandButton).toHaveAttribute("aria-expanded", "true");
  });

  it("renders WtDataTable and WtLineGraph components when data is loaded", async () => {
    renderWithProviders(
      <ReportModal
        isOpen={true}
        onClose={mockOnClose}
        profile={mockProfile}
        report={mockReport}
        cancelRequestsCallback={mockCancelRequestsCallback}
      />
    );

    expect(await screen.findByTestId("wt-data-table")).toBeInTheDocument();
    expect(await screen.findByTestId("wt-line-graph")).toBeInTheDocument();
  });

  it("renders DateRange component", async () => {
    renderWithProviders(
      <ReportModal
        isOpen={true}
        onClose={mockOnClose}
        profile={mockProfile}
        report={mockReport}
        cancelRequestsCallback={mockCancelRequestsCallback}
      />
    );

    expect(await screen.findByTestId("date-range")).toBeInTheDocument();
  });

  it("handles custom table and graph configs", () => {
    const customTableConfig = {
      rows: [{ id: 1, name: "Test" }],
      columns: [{ field: "name", headerName: "Name" }],
    };

    const customGraphConfig = {
      margin: { top: 20, right: 20, bottom: 20, left: 20 },
    };

    renderWithProviders(
      <ReportModal
        isOpen={true}
        onClose={mockOnClose}
        profile={mockProfile}
        report={mockReport}
        tableConfig={customTableConfig}
        graphConfig={customGraphConfig}
        cancelRequestsCallback={mockCancelRequestsCallback}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    renderWithProviders(
      <ReportModal
        isOpen={true}
        onClose={mockOnClose}
        profile={mockProfile}
        report={mockReport}
        cancelRequestsCallback={mockCancelRequestsCallback}
      />
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby", "report-title");
  });
});
