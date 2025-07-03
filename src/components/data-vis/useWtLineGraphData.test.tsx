import { renderHook } from "@testing-library/react";
import { Serie } from "@nivo/line";
import { useWtLineGraphData } from "./useWtLineGraphData";

// Mock lodash/fp
jest.mock("lodash/fp", () => ({
  isEmpty: jest.fn(),
}));

// Mock utility functions
jest.mock("./lineGraph.util", () => ({
  getLineGraphData: jest.fn(),
  getSearchString: jest.fn(),
}));

const mockIsEmpty = require("lodash/fp").isEmpty;
const mockGetLineGraphData = require("./lineGraph.util").getLineGraphData;
const mockGetSearchString = require("./lineGraph.util").getSearchString;

describe("useWtLineGraphData", () => {
  const mockDimensions = [
    { key: "dimension1", rowIndex: 0 },
    { key: "dimension2", rowIndex: 1 },
  ];

  const mockSelectedCell = {
    selectedDimension: "test-dimension",
    selectedColumn: "test-column",
    dimensionHierarchy: ["level1", "level2"],
  } as any;

  const mockEmptySelectedCell = {} as any;

  const mockTrendDataQueries = [
    { data: { reportData: "test1" }, isLoading: false },
    { data: { reportData: "test2" }, isLoading: false },
    { data: null, isLoading: true },
  ];

  const mockNewLineGraphData: Serie[] = [
    {
      id: "series1",
      data: [{ x: "2023-01-03", y: 110 }],
    },
  ];

  beforeEach(() => {
    mockIsEmpty.mockImplementation((obj: any) => {
      if (obj === null || obj === undefined) return true;
      if (typeof obj === "object") {
        return Object.keys(obj).length === 0;
      }
      return false;
    });

    mockGetSearchString.mockReturnValue("test-search-string");
    mockGetLineGraphData.mockReturnValue(mockNewLineGraphData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with empty line graph data", () => {
    const { result } = renderHook(() =>
      useWtLineGraphData([], mockEmptySelectedCell, [])
    );

    expect(result.current.lineGraphData).toEqual([]);
  });

  it("should generate search string from dimensions", () => {
    renderHook(() =>
      useWtLineGraphData(mockDimensions, mockEmptySelectedCell, [])
    );

    expect(mockGetSearchString).toHaveBeenCalledWith([mockDimensions[0]]);
  });

  it("should generate search string from selected cell when not empty", () => {
    mockIsEmpty.mockReturnValue(false);

    renderHook(() => useWtLineGraphData(mockDimensions, mockSelectedCell, []));

    expect(mockGetSearchString).toHaveBeenCalledWith([
      { key: "test-dimension", rowIndex: 0 },
    ]);
  });

  it("should process trend data queries and update line graph data", () => {
    mockGetLineGraphData.mockClear();

    renderHook(() =>
      useWtLineGraphData(
        mockDimensions,
        mockEmptySelectedCell,
        mockTrendDataQueries
      )
    );

    // Verify that getLineGraphData was called with the expected data
    expect(mockGetLineGraphData).toHaveBeenCalledWith(
      { reportData: "test1" },
      "test-search-string",
      mockEmptySelectedCell
    );
    expect(mockGetLineGraphData).toHaveBeenCalledWith(
      { reportData: "test2" },
      "test-search-string",
      mockEmptySelectedCell
    );
    // Check that it was called at least twice (React effects may cause more calls)
    expect(mockGetLineGraphData.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  it("should not process null data from queries", () => {
    const queriesWithNullData = [
      { data: null, isLoading: true },
      { data: undefined, isLoading: false },
    ];

    renderHook(() =>
      useWtLineGraphData(
        mockDimensions,
        mockEmptySelectedCell,
        queriesWithNullData
      )
    );

    expect(mockGetLineGraphData).not.toHaveBeenCalled();
  });

  it("should handle empty dimensions array", () => {
    mockGetSearchString.mockClear();
    mockIsEmpty.mockReturnValue(true); // Make selectedCell empty

    renderHook(() => useWtLineGraphData([], mockEmptySelectedCell, []));

    // When dimensions is empty and selectedCell is empty, getSearchString should not be called
    expect(mockGetSearchString).not.toHaveBeenCalled();
  });

  it("should update search string when dimensions change", () => {
    const { rerender } = renderHook(
      ({ dimensions }) =>
        useWtLineGraphData(dimensions, mockEmptySelectedCell, []),
      {
        initialProps: { dimensions: mockDimensions },
      }
    );

    const newDimensions = [{ key: "new-dimension", rowIndex: 0 }];

    rerender({ dimensions: newDimensions });

    expect(mockGetSearchString).toHaveBeenCalledWith([newDimensions[0]]);
  });

  it("should update search string when selected cell changes", () => {
    mockIsEmpty.mockReturnValue(false);

    const { rerender } = renderHook(
      ({ selectedCell }) =>
        useWtLineGraphData(mockDimensions, selectedCell, []),
      {
        initialProps: { selectedCell: mockSelectedCell },
      }
    );

    const newSelectedCell = {
      selectedDimension: "another-dimension",
      selectedColumn: "another-column",
    } as any;

    rerender({ selectedCell: newSelectedCell });

    expect(mockGetSearchString).toHaveBeenCalledWith([
      { key: "another-dimension", rowIndex: 0 },
    ]);
  });

  it("should handle trend data queries changes", () => {
    mockGetLineGraphData.mockClear();

    type TrendDataQuery = {
      data: { reportData: string } | null;
      isLoading: boolean;
    };

    const { rerender } = renderHook(
      ({ queries }: { queries: TrendDataQuery[] }) =>
        useWtLineGraphData(mockDimensions, mockEmptySelectedCell, queries),
      {
        initialProps: { queries: [] as TrendDataQuery[] },
      }
    );

    rerender({ queries: mockTrendDataQueries });

    // Should be called for non-null query data
    expect(mockGetLineGraphData.mock.calls.length).toBeGreaterThanOrEqual(1);
  });

  it("should prioritize selected cell over dimensions for search string", () => {
    mockIsEmpty.mockReturnValue(false);

    renderHook(() => useWtLineGraphData(mockDimensions, mockSelectedCell, []));

    // Should use selected cell, not dimensions
    expect(mockGetSearchString).toHaveBeenCalledWith([
      { key: "test-dimension", rowIndex: 0 },
    ]);
  });

  it("should handle selected cell with null/undefined selectedDimension", () => {
    mockIsEmpty.mockReturnValue(false);
    const selectedCellWithoutDimension = {
      selectedDimension: "",
      selectedColumn: "test-column",
    } as any;

    renderHook(() =>
      useWtLineGraphData(mockDimensions, selectedCellWithoutDimension, [])
    );

    expect(mockGetSearchString).toHaveBeenCalledWith([
      { key: "", rowIndex: 0 },
    ]);
  });

  it("should return lineGraphData from hook", () => {
    const { result } = renderHook(() =>
      useWtLineGraphData(mockDimensions, mockEmptySelectedCell, [])
    );

    expect(result.current).toHaveProperty("lineGraphData");
    expect(Array.isArray(result.current.lineGraphData)).toBe(true);
  });
});
