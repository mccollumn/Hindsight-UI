import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import KeyMetricsDashboard from "./KeyMetricsDashboard";
import * as useKeyMetricsModule from "../../hooks/useKeyMetrics";

// Mock the nivo ResponsiveLine component
jest.mock("@nivo/line", () => ({
  ResponsiveLine: ({ data, ...props }: any) => (
    <div data-testid="responsive-line" data-props={JSON.stringify(props)}>
      Line Chart with {data?.length || 0} series
    </div>
  ),
}));

// Mock the useKeyMetrics hook
jest.mock("../../hooks/useKeyMetrics");
const mockUseKeyMetrics =
  useKeyMetricsModule.useKeyMetrics as jest.MockedFunction<
    typeof useKeyMetricsModule.useKeyMetrics
  >;

const theme = createTheme();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

describe("KeyMetricsDashboard", () => {
  const mockProfile = {
    ID: "test-profile-123",
    Name: "Test Profile",
  };

  const mockKeyMetricsData = {
    data: {
      "2023-01-01-2023-01-02": {
        Attributes: null,
        measures: {
          "Page Views": 2200, // 1000 + 1200
          Visits: 1100, // 500 + 600
          Visitors: 650, // 300 + 350
          "Bounce Rate": 42.5, // Average of 45 and 40
          "Avg. Time on Site": 190, // Average of 180 and 200
          "Avg. Visitors per Day": 27.5, // Average of 25 and 30
          "Page Views per Visit": 2.1, // Average of 2.0 and 2.2
          "New Visitors": 220, // 100 + 120
        },
        SubRows: {
          "2023-01-01": {
            Attributes: null,
            measures: {
              "Page Views": 1000,
              Visits: 500,
              Visitors: 300,
              "Bounce Rate": 45,
              "Avg. Time on Site": 180,
              "Avg. Visitors per Day": 25,
              "Page Views per Visit": 2.0,
              "New Visitors": 100,
            },
            SubRows: null,
          },
          "2023-01-02": {
            Attributes: null,
            measures: {
              "Page Views": 1200,
              Visits: 600,
              Visitors: 350,
              "Bounce Rate": 40,
              "Avg. Time on Site": 200,
              "Avg. Visitors per Day": 30,
              "Page Views per Visit": 2.2,
              "New Visitors": 120,
            },
            SubRows: null,
          },
        },
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseKeyMetrics.mockReturnValue({
      keyMetrics: mockKeyMetricsData,
      isLoading: false,
      isError: false,
    } as any);
  });

  it("renders loading state", () => {
    mockUseKeyMetrics.mockReturnValue({
      keyMetrics: null,
      isLoading: true,
      isError: false,
    } as any);

    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <KeyMetricsDashboard profile={mockProfile} />
      </Wrapper>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockUseKeyMetrics.mockReturnValue({
      keyMetrics: null,
      isLoading: false,
      isError: true,
    } as any);

    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <KeyMetricsDashboard profile={mockProfile} />
      </Wrapper>
    );

    expect(screen.getByText("Error loading key metrics")).toBeInTheDocument();
  });

  it("renders key metrics tiles when data is loaded", async () => {
    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <KeyMetricsDashboard profile={mockProfile} />
      </Wrapper>
    );

    await waitFor(() => {
      // Check for some of the key metrics
      expect(screen.getByText("Page Views")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Visits")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Visitors")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Bounce Rate")).toBeInTheDocument();
    });
  });

  it("renders responsive line charts for each metric", async () => {
    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <KeyMetricsDashboard profile={mockProfile} />
      </Wrapper>
    );

    await waitFor(() => {
      const lineCharts = screen.getAllByTestId("responsive-line");
      expect(lineCharts.length).toBeGreaterThan(0);
    });
  });

  it("displays calculated totals for metrics", async () => {
    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <KeyMetricsDashboard profile={mockProfile} />
      </Wrapper>
    );

    await waitFor(() => {
      // Total Page Views should be 2200
      expect(screen.getByText("2,200")).toBeInTheDocument();
    });

    await waitFor(() => {
      // Total Visits should be 1100
      expect(screen.getByText("1,100")).toBeInTheDocument();
    });
  });

  it("handles empty data gracefully", async () => {
    mockUseKeyMetrics.mockReturnValue({
      keyMetrics: { data: {} },
      isLoading: false,
      isError: false,
    } as any);

    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <KeyMetricsDashboard profile={mockProfile} />
      </Wrapper>
    );

    await waitFor(() => {
      expect(
        screen.queryByText("Error loading key metrics")
      ).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("passes profile to useKeyMetrics hook", () => {
    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <KeyMetricsDashboard profile={mockProfile} />
      </Wrapper>
    );

    expect(mockUseKeyMetrics).toHaveBeenCalledWith(mockProfile);
  });
});
