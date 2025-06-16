import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import DateRange from "./DateRange";
import { DateContext } from "../providers/DateProvider";
import * as useGetDataModule from "../hooks/useGetData";

// Mock date-fns first
jest.mock("date-fns", () => ({
  intlFormat: (date: Date) => {
    if (!date || isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  },
  max: (dates: Date[]) => {
    if (!dates || dates.length === 0) return new Date();
    return new Date(Math.max(...dates.map((d) => d.getTime())));
  },
  min: (dates: Date[]) => {
    if (!dates || dates.length === 0) return new Date();
    return new Date(Math.min(...dates.map((d) => d.getTime())));
  },
  isValid: (date: Date) => date instanceof Date && !isNaN(date.getTime()),
}));

// Mock the useGetData hook
jest.mock("../hooks/useGetData");
const mockUseGetData = useGetDataModule.default as jest.MockedFunction<
  typeof useGetDataModule.default
>;

// Mock React Query
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;

const createWrapper = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <DateContext.Provider
        value={{
          startDate,
          endDate,
          setStartDate: jest.fn(),
          setEndDate: jest.fn(),
          wtStartDate: "2023-01-01",
          wtEndDate: "2023-01-01",
          trendInterval: "daily",
        }}
      >
        {children}
      </DateContext.Provider>
    </QueryClientProvider>
  );
};

describe("DateRange", () => {
  const mockProfile = { ID: "test-profile-id" };
  const startDate = new Date("2023-01-01");
  const endDate = new Date("2023-12-31");

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseGetData.mockReturnValue({
      getReportPeriodsQuery: jest.fn().mockResolvedValue({
        Report: ["2023y01m01d", "2023y12m31d"],
      }),
    } as any);

    // Mock useQuery to simulate successful data loading
    mockUseQuery.mockReturnValue({
      data: {
        Report: ["2023y01m01d", "2023y12m31d"],
      },
      isLoading: false,
      isError: false,
      error: null,
    } as any);
  });

  it("renders loading state initially", () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any);

    const Wrapper = createWrapper({ startDate, endDate });
    render(
      <Wrapper>
        <DateRange profile={mockProfile} />
      </Wrapper>
    );

    // Should render nothing while loading
    expect(
      screen.queryByText(/\w+, \w+ \d+, \d+ - \w+, \w+ \d+, \d+/)
    ).not.toBeInTheDocument();
  });

  it("renders date range after loading", async () => {
    const Wrapper = createWrapper({ startDate, endDate });
    render(
      <Wrapper>
        <DateRange profile={mockProfile} />
      </Wrapper>
    );

    // Check that the component renders formatted dates
    await waitFor(() => {
      expect(
        screen.getByText(/\w+, \w+ \d+, \d+ - \w+, \w+ \d+, \d+/)
      ).toBeInTheDocument();
    });

    const dateRangeElement = screen.getByText(
      /\w+, \w+ \d+, \d+ - \w+, \w+ \d+, \d+/
    );
    expect(dateRangeElement).toHaveClass("MuiTypography-body2");
  });

  it("handles profile with different ID", async () => {
    const differentProfile = { ID: "different-profile-id" };
    const Wrapper = createWrapper({ startDate, endDate });

    render(
      <Wrapper>
        <DateRange profile={differentProfile} />
      </Wrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/\w+, \w+ \d+, \d+ - \w+, \w+ \d+, \d+/)
      ).toBeInTheDocument();
    });
  });

  it("handles null profile", async () => {
    const Wrapper = createWrapper({ startDate, endDate });

    render(
      <Wrapper>
        <DateRange profile={null as any} />
      </Wrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/\w+, \w+ \d+, \d+ - \w+, \w+ \d+, \d+/)
      ).toBeInTheDocument();
    });
  });

  it("passes through additional props", async () => {
    const Wrapper = createWrapper({ startDate, endDate });

    render(
      <Wrapper>
        <DateRange profile={mockProfile} data-testid="date-range-component" />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId("date-range-component")).toBeInTheDocument();
    });
  });
});
