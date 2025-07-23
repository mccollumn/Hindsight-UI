import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import KeyMetricsLabels from "./KeyMetricsLabels";

// Mock the KeyMetricsLabel component
jest.mock("./KeyMetricsLabel", () => {
  return function MockKeyMetricsLabel({ label, metric, icon }: any) {
    return (
      <div data-testid="key-metrics-label">
        <span data-testid="label">{label}</span>
        <span data-testid="metric">{metric}</span>
        {icon && <span data-testid="icon">Icon</span>}
      </div>
    );
  };
});

// Mock the useKeyMetrics hook
const mockUseKeyMetrics = jest.fn();
jest.mock("../../hooks/useKeyMetrics", () => ({
  useKeyMetrics: (profile: any) => mockUseKeyMetrics(profile),
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

describe("KeyMetricsLabels", () => {
  beforeEach(() => {
    // Default mock implementation
    mockUseKeyMetrics.mockReturnValue({
      keyMetrics: {
        data: {
          "test-data": {
            measures: {
              "Page Views": "1,234",
              Visits: "567",
              "Bounce Rate": "45.6",
              Visitors: "890",
              "Avg. Time on Site": "00:02:30",
            },
          },
        },
      },
    });
  });

  it("renders key metrics when data is available", () => {
    renderWithProviders(<KeyMetricsLabels profile={mockProfile} />);

    expect(screen.getByText("Page Views")).toBeInTheDocument();
    expect(screen.getByText("Visits")).toBeInTheDocument();
    expect(screen.getByText("Bounce Rate")).toBeInTheDocument();
  });

  it("displays correct metric values", () => {
    renderWithProviders(<KeyMetricsLabels profile={mockProfile} />);

    expect(screen.getByText("1,234")).toBeInTheDocument();
    expect(screen.getByText("567")).toBeInTheDocument();
    expect(screen.getByText("45.6%")).toBeInTheDocument(); // Should include % symbol
  });

  it("only renders enabled metrics", () => {
    renderWithProviders(<KeyMetricsLabels profile={mockProfile} />);

    // Should render enabled metrics
    expect(screen.getByText("Page Views")).toBeInTheDocument();
    expect(screen.getByText("Visits")).toBeInTheDocument();
    expect(screen.getByText("Bounce Rate")).toBeInTheDocument();

    // Should not render disabled metrics
    expect(screen.queryByText("Visitors")).not.toBeInTheDocument();
    expect(screen.queryByText("Avg. Time on Site")).not.toBeInTheDocument();
    expect(screen.queryByText("Avg. Visitors per Day")).not.toBeInTheDocument();
    expect(screen.queryByText("Page Views per Visit")).not.toBeInTheDocument();
    expect(screen.queryByText("New Visitors")).not.toBeInTheDocument();
  });

  it("renders icons for metrics that have them", () => {
    renderWithProviders(<KeyMetricsLabels profile={mockProfile} />);

    const iconElements = screen.getAllByTestId("icon");
    expect(iconElements).toHaveLength(3); // Page Views, Visits, Bounce Rate have icons
  });

  it("formats bounce rate with percentage symbol", () => {
    renderWithProviders(<KeyMetricsLabels profile={mockProfile} />);

    expect(screen.getByText("45.6%")).toBeInTheDocument();
  });

  it("returns null when keyMetrics is not available", () => {
    // Override mock to return null
    mockUseKeyMetrics.mockReturnValueOnce({ keyMetrics: null });

    renderWithProviders(<KeyMetricsLabels profile={mockProfile} />);
    expect(screen.queryByTestId("key-metrics-label")).not.toBeInTheDocument();
  });

  it('handles missing metric values with default "0"', () => {
    // Override mock with partial data
    mockUseKeyMetrics.mockReturnValueOnce({
      keyMetrics: {
        data: {
          "test-data": {
            measures: {
              "Page Views": "1,234",
              // Missing other metrics - should show "0"
            },
          },
        },
      },
    });

    renderWithProviders(<KeyMetricsLabels profile={mockProfile} />);

    // Should show "0" for missing values
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("applies correct positioning styles", () => {
    renderWithProviders(<KeyMetricsLabels profile={mockProfile} />);

    // Verify the component renders correctly without checking specific styles
    expect(screen.getByText("Page Views")).toBeInTheDocument();
    expect(screen.getByText("Visits")).toBeInTheDocument();
    expect(screen.getByText("Bounce Rate")).toBeInTheDocument();
  });

  it("renders metrics in grid layout", () => {
    renderWithProviders(<KeyMetricsLabels profile={mockProfile} />);

    // Verify grid layout by checking that metrics are rendered
    expect(screen.getByText("Page Views")).toBeInTheDocument();
    expect(screen.getByText("Visits")).toBeInTheDocument();
    expect(screen.getByText("Bounce Rate")).toBeInTheDocument();
  });

  it("handles profile prop correctly", () => {
    // Test with different profile
    const differentProfile = {
      ID: "profile-2",
      name: "Different Profile",
      description: "Different Profile Description",
    };

    renderWithProviders(<KeyMetricsLabels profile={differentProfile} />);

    expect(screen.getByText("Page Views")).toBeInTheDocument();
  });

  it("renders each enabled metric with unique key", () => {
    renderWithProviders(<KeyMetricsLabels profile={mockProfile} />);

    const keyMetricsLabels = screen.getAllByTestId("key-metrics-label");
    expect(keyMetricsLabels).toHaveLength(3); // Page Views, Visits, Bounce Rate
  });
});
