import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { GridOptions, ColumnApi, GridApi } from "ag-grid-community";

const DataTable = ({
  data = [],
  columns = [],
  config = {},
  gridRefCallback = () => {},
  ...props
}: DataTableProps) => {
  const [gridApi, setGridApi] = useState<GridApi<any>>();
  const [columnApi, setColumnApi] = useState<ColumnApi>();
  const [gridOptions, setGridOptions] = useState<GridOptions>(config);
  const [rowData, setRowData] = useState(data);
  const [columnDefs, setColumnDefs] = useState(columns);
  const theme = useTheme();
  const gridRef = useRef<AgGridReact<any>>(null);

  useEffect(() => {
    setGridOptions(config);
    setRowData(data);
    setColumnDefs(columns);
  }, [config, data, columns]);

  useEffect(() => {
    gridRefCallback(gridRef);
  });

  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  };

  const onFirstDataRendered = (params: any) => {};

  return (
    <AgGridReact<any>
      onGridReady={onGridReady}
      onFirstDataRendered={onFirstDataRendered}
      ref={gridRef}
      rowData={rowData}
      columnDefs={columnDefs}
      gridOptions={gridOptions}
      {...props}
    />
  );
};

interface DataTableProps extends GridOptions {
  /**
   * Set rowData to Array of Objects, one Object per Row.
   */
  data: Array<Object>;
  /**
   * Each Column Definition results in one Column.
   */
  columns: Array<Object>;
  /**
   * AG Grid options.
   * https://www.ag-grid.com/react-data-grid/grid-options/
   */
  config?: GridOptions;
  /**
   * Callback to make gridRef available to parent
   */
  gridRefCallback?: (ref: React.RefObject<AgGridReact<any>>) => void;
}

export default DataTable;