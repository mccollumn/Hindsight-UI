import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReportSelectionPanel from "./ReportSelectionPanel";

// Mock the child components
jest.mock("./ReportCategoryTabs", () => {
  return function MockReportCategoryTabs({ categories, clickHandler }: any) {
    return (
      <div data-testid="report-category-tabs">
        {categories.map((category: string, index: number) => (
          <button
            key={index}
            onClick={() => clickHandler(index)}
            data-testid={`tab-${index}`}
          >
            {category}
          </button>
        ))}
      </div>
    );
  };
});

jest.mock("./ReportItem", () => {
  return function MockReportItem({ children, clickHandler }: any) {
    return (
      <div
        data-testid="report-item"
        onClick={(e) => clickHandler(e, children)}
        style={{ cursor: "pointer" }}
      >
        {children}
      </div>
    );
  };
});

jest.mock("../form/SearchInput", () => {
  return function MockSearchInput({ placeholder, searchHandler }: any) {
    return (
      <input
        data-testid="search-input"
        placeholder={placeholder}
        onChange={(e) => searchHandler(e.target.value)}
      />
    );
  };
});

jest.mock("../../hooks/useReports", () => ({
  useReports: () => ({
    reports: [
      {
        ID: "report-1",
        name: "Revenue Report",
        Category: "Finance",
        description: "Revenue tracking report",
      },
      {
        ID: "report-2",
        name: "User Analytics",
        Category: "Analytics",
        description: "User behavior analytics",
      },
      {
        ID: "report-3",
        name: "Standard Report",
        Category: null,
        description: "Standard category report",
      },
    ],
  }),
}));

const theme = createTheme();

const mockProfile = {
  ID: "profile-1",
  name: "Test Profile",
  description: "Test Profile Description",
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
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </QueryClientProvider>
  );
};

describe("ReportSelectionPanel", () => {
  const mockSetSelectedReport = jest.fn();
  const mockHandleSelection = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the report selection panel", () => {
    renderWithProviders(
      <ReportSelectionPanel
        profile={mockProfile}
        selectedReport={null}
        setSelectedReport={mockSetSelectedReport}
        handleSelection={mockHandleSelection}
      />
    );

    expect(screen.getByTestId("report-category-tabs")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Find a Report...")).toBeInTheDocument();
  });

  it('displays all report categories including "All"', () => {
    renderWithProviders(
      <ReportSelectionPanel
        profile={mockProfile}
        selectedReport={null}
        setSelectedReport={mockSetSelectedReport}
        handleSelection={mockHandleSelection}
      />
    );

    // Should show All, Analytics, Finance, Standard tabs
    expect(screen.getByTestId("tab-0")).toHaveTextContent("All");
    expect(screen.getByTestId("tab-1")).toHaveTextContent("Analytics");
    expect(screen.getByTestId("tab-2")).toHaveTextContent("Finance");
    expect(screen.getByTestId("tab-3")).toHaveTextContent("Standard");
  });

  it('shows all reports in the "All" tab by default', () => {
    renderWithProviders(
      <ReportSelectionPanel
        profile={mockProfile}
        selectedReport={null}
        setSelectedReport={mockSetSelectedReport}
        handleSelection={mockHandleSelection}
      />
    );

    const reportItems = screen.getAllByTestId("report-item");
    expect(reportItems).toHaveLength(3);
    expect(screen.getByText("Revenue Report")).toBeInTheDocument();
    expect(screen.getByText("User Analytics")).toBeInTheDocument();
    expect(screen.getByText("Standard Report")).toBeInTheDocument();
  });

  it("switches tabs when category tab is clicked", async () => {
    renderWithProviders(
      <ReportSelectionPanel
        profile={mockProfile}
        selectedReport={null}
        setSelectedReport={mockSetSelectedReport}
        handleSelection={mockHandleSelection}
      />
    );

    // Click on Finance tab (index 2)
    const financeTab = screen.getByTestId("tab-2");
    fireEvent.click(financeTab);

    // Should only show Finance category reports
    await waitFor(() => {
      expect(screen.getByText("Revenue Report")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText("User Analytics")).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText("Standard Report")).not.toBeInTheDocument();
    });
  });

  it("filters reports based on search input", async () => {
    renderWithProviders(
      <ReportSelectionPanel
        profile={mockProfile}
        selectedReport={null}
        setSelectedReport={mockSetSelectedReport}
        handleSelection={mockHandleSelection}
      />
    );

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "Revenue" } });

    await waitFor(() => {
      expect(screen.getByText("Revenue Report")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText("User Analytics")).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText("Standard Report")).not.toBeInTheDocument();
    });
  });

  it("resets filter when search is cleared", async () => {
    renderWithProviders(
      <ReportSelectionPanel
        profile={mockProfile}
        selectedReport={null}
        setSelectedReport={mockSetSelectedReport}
        handleSelection={mockHandleSelection}
      />
    );

    const searchInput = screen.getByTestId("search-input");

    // Search for something
    fireEvent.change(searchInput, { target: { value: "Revenue" } });

    // Clear search
    fireEvent.change(searchInput, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.getByText("Revenue Report")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("User Analytics")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Standard Report")).toBeInTheDocument();
    });
  });

  it("calls setSelectedReport when a report is clicked", () => {
    renderWithProviders(
      <ReportSelectionPanel
        profile={mockProfile}
        selectedReport={null}
        setSelectedReport={mockSetSelectedReport}
        handleSelection={mockHandleSelection}
      />
    );

    const revenueReport = screen.getByText("Revenue Report");
    fireEvent.click(revenueReport);

    expect(mockSetSelectedReport).toHaveBeenCalledWith({
      ID: "report-1",
      name: "Revenue Report",
      Category: "Finance",
      description: "Revenue tracking report",
    });
  });

  it("calls handleSelection when selectedReport changes", () => {
    const mockSelectedReport = {
      ID: "report-1",
      name: "Revenue Report",
      Category: "Finance",
      description: "Revenue tracking report",
      accountID: 1,
      profileID: "profile-1",
      language: "en",
      type: "standard",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z",
      IsHierarchy: false,
      IntervalsEnabled: false,
      IsRealtimeCompatible: false,
      properties: "",
    };

    renderWithProviders(
      <ReportSelectionPanel
        profile={mockProfile}
        selectedReport={mockSelectedReport}
        setSelectedReport={mockSetSelectedReport}
        handleSelection={mockHandleSelection}
      />
    );

    expect(mockHandleSelection).toHaveBeenCalledWith(mockSelectedReport);
  });

  it("handles case-insensitive search", async () => {
    renderWithProviders(
      <ReportSelectionPanel
        profile={mockProfile}
        selectedReport={null}
        setSelectedReport={mockSetSelectedReport}
        handleSelection={mockHandleSelection}
      />
    );

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "REVENUE" } });

    await waitFor(() => {
      expect(screen.getByText("Revenue Report")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText("User Analytics")).not.toBeInTheDocument();
    });
  });

  it("shows correct tab panels based on selection", () => {
    renderWithProviders(
      <ReportSelectionPanel
        profile={mockProfile}
        selectedReport={null}
        setSelectedReport={mockSetSelectedReport}
        handleSelection={mockHandleSelection}
      />
    );

    // Check that tabpanel exists with correct attributes
    const tabPanel = screen.getByRole("tabpanel");
    expect(tabPanel).toHaveAttribute("id", "tabpanel-0");
    expect(tabPanel).toHaveAttribute("aria-labelledby", "tab-0");
  });
});
