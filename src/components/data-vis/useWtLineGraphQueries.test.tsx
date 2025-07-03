import React from "react";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useWtLineGraphQueries } from "./useWtLineGraphQueries";
import { DateContext } from "../../providers/DateProvider";
import useGetData from "../../hooks/useGetData";

// Mock dependencies
jest.mock("../../hooks/useGetData");
jest.mock("./lineGraph.util", () => ({
  getTrendPeriods: jest.fn(),
  generateWtDate: jest.fn(),
}));
jest.mock("../../providers/DateProvider", () => {
  const { createContext } = jest.requireActual("react");
  return {
    DateContext: createContext({
      wtStartDate: "2023-01-01",
      wtEndDate: "2023-01-31",
      trendInterval: "daily",
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-01-31"),
      setStartDate: jest.fn(),
      setEndDate: jest.fn(),
    }),
  };
});

const mockUseGetData = useGetData as jest.MockedFunction<typeof useGetData>;
const mockGetTrendPeriods = require("./lineGraph.util").getTrendPeriods;

describe("useWtLineGraphQueries", () => {
  let queryClient: QueryClient;
  const mockGetWtData = jest.fn();
  const mockCancelAllRequests = jest.fn();
  const mockRequestControllersCallback = jest.fn();

  const mockReportDefinition = {
    profileID: "test-profile-id",
    ID: "test-report-id",
    name: "Test Report",
    measures: [],
    dimensions: [],
    accountID: "test-account",
    language: "en",
    isRealtime: false,
    type: "standard",
    timeZone: "UTC",
    currency: "USD",
  } as any;

  const mockDateContextValue = {
    wtStartDate: "2023-01-01",
    wtEndDate: "2023-01-31",
    trendInterval: "daily",
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-01-31"),
    setStartDate: jest.fn(),
    setEndDate: jest.fn(),
  } as any;

  const mockPeriods = [
    { start_period: "2023-01-01", end_period: "2023-01-07" },
    { start_period: "2023-01-08", end_period: "2023-01-14" },
    { start_period: "2023-01-15", end_period: "2023-01-21" },
  ];

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    mockUseGetData.mockReturnValue({
      getWtData: mockGetWtData.mockResolvedValue({ data: "mock-data" }),
      cancelAllRequests: mockCancelAllRequests,
      response: null,
      loading: false,
      error: "",
      status: 200,
      controllers: [],
      getReportDefinition: jest.fn(),
      getProfiles: jest.fn(),
      getSingleProfile: jest.fn(),
      getAccounts: jest.fn(),
      getReports: jest.fn(),
    } as any);

    mockGetTrendPeriods.mockReturnValue(mockPeriods);
  });

  afterEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <QueryClientProvider client={queryClient}>
      <DateContext.Provider value={mockDateContextValue}>
        {children}
      </DateContext.Provider>
    </QueryClientProvider>
  );

  it("should call requestControllersCallback with cancelAllRequests", () => {
    renderHook(
      () =>
        useWtLineGraphQueries(
          mockReportDefinition,
          mockRequestControllersCallback
        ),
      {
        wrapper: TestWrapper,
      }
    );

    expect(mockRequestControllersCallback).toHaveBeenCalledWith(
      mockCancelAllRequests
    );
  });

  it("should not call requestControllersCallback when null", () => {
    renderHook(() => useWtLineGraphQueries(mockReportDefinition, null), {
      wrapper: TestWrapper,
    });

    expect(mockRequestControllersCallback).not.toHaveBeenCalled();
  });

  it("should generate trend periods based on date context", () => {
    renderHook(() => useWtLineGraphQueries(mockReportDefinition, null), {
      wrapper: TestWrapper,
    });

    expect(mockGetTrendPeriods).toHaveBeenCalledWith({
      wtStartPeriod: "2023-01-01",
      wtEndPeriod: "2023-01-31",
    });
  });

  it("should create queries for each period", async () => {
    const { result } = renderHook(
      () => useWtLineGraphQueries(mockReportDefinition, null),
      {
        wrapper: TestWrapper,
      }
    );

    expect(result.current.trendDataQueries).toHaveLength(mockPeriods.length);

    result.current.trendDataQueries.forEach((query: any) => {
      expect(query.isLoading).toBeDefined();
      expect(query.error).toBeDefined();
      // Note: data might be undefined initially for queries that haven't completed
      expect(query).toHaveProperty("data");
    });
  });

  it("should handle empty periods array", () => {
    mockGetTrendPeriods.mockReturnValue([]);

    const { result } = renderHook(
      () => useWtLineGraphQueries(mockReportDefinition, null),
      {
        wrapper: TestWrapper,
      }
    );

    expect(result.current.trendDataQueries).toEqual([]);
  });

  it("should create new queries when report definition changes", () => {
    const { result, rerender } = renderHook(
      ({ reportDef }) => useWtLineGraphQueries(reportDef, null),
      {
        wrapper: TestWrapper,
        initialProps: { reportDef: mockReportDefinition },
      }
    );

    const newReportDefinition = {
      ...mockReportDefinition,
      profileID: "different-profile-id",
      ID: "different-report-id",
    };

    rerender({ reportDef: newReportDefinition });

    expect(result.current.trendDataQueries).toHaveLength(mockPeriods.length);
  });
});
