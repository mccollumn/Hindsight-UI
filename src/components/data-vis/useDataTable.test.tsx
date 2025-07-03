import { renderHook } from "@testing-library/react";
import useDataTable from "./useDataTable";
import DataTable from "./DataTable";

// Mock MUI Data Grid
jest.mock("@mui/x-data-grid-premium", () => ({
  useGridApiRef: () => ({
    current: {
      exportDataAsCsv: jest.fn(),
      getSelectedRows: jest.fn(),
      setRowSelectionModel: jest.fn(),
    },
  }),
}));

// Mock DataTable component
jest.mock("./DataTable", () => {
  return jest.fn(() => <div data-testid="data-table">Mocked DataTable</div>);
});

describe("useDataTable", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return DataTable component and apiRef", () => {
    const { result } = renderHook(() => useDataTable());

    expect(result.current).toHaveProperty("DataTable");
    expect(result.current).toHaveProperty("apiRef");
    expect(result.current.DataTable).toBe(DataTable);
    expect(result.current.apiRef).toBeDefined();
    expect(result.current.apiRef.current).toBeDefined();
  });

  it("should provide a functional apiRef with grid methods", () => {
    const { result } = renderHook(() => useDataTable());

    expect(result.current.apiRef.current.exportDataAsCsv).toBeDefined();
    expect(result.current.apiRef.current.getSelectedRows).toBeDefined();
    expect(result.current.apiRef.current.setRowSelectionModel).toBeDefined();
    expect(typeof result.current.apiRef.current.exportDataAsCsv).toBe(
      "function"
    );
    expect(typeof result.current.apiRef.current.getSelectedRows).toBe(
      "function"
    );
    expect(typeof result.current.apiRef.current.setRowSelectionModel).toBe(
      "function"
    );
  });

  it("should maintain apiRef stability across re-renders", () => {
    const { result, rerender } = renderHook(() => useDataTable());

    rerender();

    // The apiRef should be stable between renders
    expect(result.current.apiRef).toBeDefined();
    expect(result.current.apiRef.current).toBeDefined();
    expect(typeof result.current.apiRef.current.exportDataAsCsv).toBe(
      "function"
    );
  });

  it("should return same DataTable component reference", () => {
    const { result, rerender } = renderHook(() => useDataTable());
    const firstDataTable = result.current.DataTable;

    rerender();

    expect(result.current.DataTable).toBe(firstDataTable);
    expect(result.current.DataTable).toBe(DataTable);
  });
});
