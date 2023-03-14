import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  GridOptions,
  ColumnApi,
  GridApi,
  GridReadyEvent,
  FirstDataRenderedEvent,
} from "ag-grid-community";

const AgDataTable = ({
  data = [],
  columns = [],
  config = {},
  gridRefCallback = () => {},
  ...props
}: AgDataTableProps) => {
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

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  };

  const onFirstDataRendered = (params: FirstDataRenderedEvent) => {
    params.api.sizeColumnsToFit();
  };

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

interface AgDataTableProps extends GridOptions {
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

export default AgDataTable;
