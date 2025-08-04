import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DataTable from "./DataTable";
import { useGridApiRef } from "@mui/x-data-grid-premium";

// Mock the MUI DataGridPremium component
jest.mock("@mui/x-data-grid-premium", () => ({
  DataGridPremium: ({ apiRef, ...props }: any) => (
    <div data-testid="data-grid-premium" data-props={JSON.stringify(props)}>
      DataGrid with {props.rows?.length || 0} rows and{" "}
      {props.columns?.length || 0} columns
    </div>
  ),
  useGridApiRef: jest.fn(() => ({
    current: {
      exportDataAsExcel: jest.fn(),
      setFilterModel: jest.fn(),
      setSortModel: jest.fn(),
    },
  })),
}));

// Mock constants
jest.mock("../../constants/constants", () => ({
  DEFAULT_TABLE_HEIGHT: 400,
}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("DataTable", () => {
  const mockConfig = {
    rows: [
      { id: 1, name: "John Doe", age: 30 },
      { id: 2, name: "Jane Smith", age: 25 },
      { id: 3, name: "Bob Johnson", age: 35 },
    ],
    columns: [
      { field: "id", headerName: "ID", width: 90 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "age", headerName: "Age", width: 110 },
    ],
  };

  const mockApiRef = {
    current: {
      exportDataAsExcel: jest.fn(),
      setFilterModel: jest.fn(),
      setSortModel: jest.fn(),
    },
  } as any;

  it("renders DataGridPremium with config", () => {
    renderWithTheme(<DataTable config={mockConfig} apiRef={mockApiRef} />);

    expect(screen.getByTestId("data-grid-premium")).toBeInTheDocument();
    expect(
      screen.getByText("DataGrid with 3 rows and 3 columns")
    ).toBeInTheDocument();
  });

  it("passes config props to DataGridPremium", () => {
    renderWithTheme(<DataTable config={mockConfig} apiRef={mockApiRef} />);

    const dataGrid = screen.getByTestId("data-grid-premium");
    const props = JSON.parse(dataGrid.getAttribute("data-props") || "{}");

    expect(props.rows).toEqual(mockConfig.rows);
    expect(props.columns).toEqual(mockConfig.columns);
  });

  it("uses provided apiRef when given", () => {
    renderWithTheme(<DataTable config={mockConfig} apiRef={mockApiRef} />);

    expect(screen.getByTestId("data-grid-premium")).toBeInTheDocument();
  });

  it("creates new apiRef when not provided", () => {
    const mockUseGridApiRef = useGridApiRef as jest.MockedFunction<
      typeof useGridApiRef
    >;
    const newApiRef = { current: { test: "value" } } as any;
    mockUseGridApiRef.mockReturnValue(newApiRef);

    renderWithTheme(<DataTable config={mockConfig} apiRef={null as any} />);

    expect(mockUseGridApiRef).toHaveBeenCalled();
    expect(screen.getByTestId("data-grid-premium")).toBeInTheDocument();
  });

  it("has correct wrapper styling", () => {
    renderWithTheme(<DataTable config={mockConfig} apiRef={mockApiRef} />);

    // eslint-disable-next-line testing-library/no-node-access
    const wrapper = screen.getByTestId("data-grid-premium").parentElement;
    expect(wrapper).toHaveClass("data-grid-wrapper");
    expect(wrapper).toHaveStyle({
      height: "400px",
      width: "100%",
    });
  });

  it("handles empty rows gracefully", () => {
    const emptyConfig = {
      rows: [],
      columns: mockConfig.columns,
    };

    renderWithTheme(<DataTable config={emptyConfig} apiRef={mockApiRef} />);

    expect(
      screen.getByText("DataGrid with 0 rows and 3 columns")
    ).toBeInTheDocument();
  });

  it("handles empty columns gracefully", () => {
    const emptyColumnsConfig = {
      rows: mockConfig.rows,
      columns: [],
    };

    renderWithTheme(
      <DataTable config={emptyColumnsConfig} apiRef={mockApiRef} />
    );

    expect(
      screen.getByText("DataGrid with 3 rows and 0 columns")
    ).toBeInTheDocument();
  });

  it("passes additional config properties", () => {
    const extendedConfig = {
      ...mockConfig,
      pagination: true,
      pageSize: 10,
      checkboxSelection: true,
    };

    renderWithTheme(<DataTable config={extendedConfig} apiRef={mockApiRef} />);

    const dataGrid = screen.getByTestId("data-grid-premium");
    const props = JSON.parse(dataGrid.getAttribute("data-props") || "{}");

    expect(props.pagination).toBe(true);
    expect(props.pageSize).toBe(10);
    expect(props.checkboxSelection).toBe(true);
  });

  it("handles undefined config gracefully", () => {
    renderWithTheme(
      <DataTable config={undefined as any} apiRef={mockApiRef} />
    );

    expect(screen.getByTestId("data-grid-premium")).toBeInTheDocument();
  });
});
