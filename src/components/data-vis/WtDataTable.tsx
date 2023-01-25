import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import DataTable from "./DataTable";
import { AgGridReact } from "ag-grid-react";
import {
  CellClickedEvent,
  FilterChangedEvent,
  GridOptions,
  ModelUpdatedEvent,
  RowNode,
} from "ag-grid-community";
import {
  getDimColumnHeader,
  getTableData,
  getTotals,
  generateColumnDefs,
} from "./dataTable.util";
import { DEFAULT_TABLE_HEIGHT } from "../../constants/constants";
import { ReportProps } from "../../interfaces/interfaces";

const WtDataTable = ({
  data,
  config = {},
  renderedNodesCallback = () => {},
  gridRefCallback,
  cellClickedCallback,
  ...props
}: WTDataTableProps) => {
  const [dimHeader, setDimHeader] = useState(getDimColumnHeader(data));
  const [columnDefs, setColumnDefs] = useState(generateColumnDefs(data));
  const [rowData, setRowData] = useState(getTableData(data));
  const [totals, setTotals] = useState(getTotals(data));
  const [gridRef, setGridRef] = useState<React.RefObject<AgGridReact<any>>>();
  const pageSize = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    setDimHeader(getDimColumnHeader(data));
    setColumnDefs(generateColumnDefs(data));
    setRowData(getTableData(data));
    setTotals(getTotals(data));
  }, [data]);

  const gridCallback = useCallback((ref: React.RefObject<AgGridReact<any>>) => {
    setGridRef(ref);
    if (typeof gridRefCallback === "function") {
      gridRefCallback(ref);
    }
  }, []);

  const cellClickedListener = useCallback((event: CellClickedEvent) => {
    if (typeof cellClickedCallback === "function") {
      cellClickedCallback(event);
    }
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef?.current?.api.exportDataAsCsv();
  }, [gridRef]);

  const onPageSizeChanged = useCallback(() => {
    const value = pageSize.current!.value;
    gridRef?.current!.api.paginationSetPageSize(Number(value));
  }, [gridRef]);

  const updateTotals = useCallback(
    (event: FilterChangedEvent) => {
      const columns = event.columnApi.getColumns();
      if (columns === null || columns === undefined) return;
      let isFiltered = false;
      isFiltered = columns.some((column) => column.isFilterActive() === true);
      event.api.setPinnedBottomRowData(isFiltered ? undefined : totals);
    },
    [totals]
  );

  const getRenderedNodes = useCallback(
    (event: ModelUpdatedEvent) => {
      const renderedNodes = event.api.getRenderedNodes();
      renderedNodesCallback(renderedNodes);
    },
    [renderedNodesCallback]
  );

  const defaultGridOptions: GridOptions = useMemo(
    () => ({
      // Properties
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true,
        cellStyle: { whiteSpace: "pre" },
      },
      pagination: true,
      paginationAutoPageSize: false,
      paginationPageSize: 10,
      enableCellTextSelection: true,
      ensureDomOrder: true,
      enableRangeSelection: true,
      animateRows: true,
      rowSelection: "multiple",
      treeData: true,
      groupDefaultExpanded: 0,
      autoGroupColumnDef: {
        headerName: dimHeader,
        minWidth: 250,
        cellRendererParams: { suppressCount: true },
        sortable: true,
        pinned: "left",
        autoHeight: true,
      },
      pinnedBottomRowData: totals,

      // Events
      onCellClicked: cellClickedListener,
      onFilterChanged: function (event) {
        updateTotals(event);
      },
      onModelUpdated: function (event) {
        getRenderedNodes(event);
      },

      // Callbacks
      getDataPath: (data: any) => data.Dimensions,
    }),
    [dimHeader, totals, cellClickedListener, updateTotals, getRenderedNodes]
  );

  const [gridOptions, setGridOptions] = useState({
    ...defaultGridOptions,
    ...config,
  });

  useEffect(() => {
    setGridOptions({
      ...defaultGridOptions,
      ...config,
    });
  }, [config, defaultGridOptions, dimHeader]);

  return (
    <React.Fragment>
      <div className="ag-theme-alpine" style={{ height: DEFAULT_TABLE_HEIGHT }}>
        <div className="rows-per-page-dropdown">
          Show:
          <select
            onChange={onPageSizeChanged}
            id="page-size"
            ref={pageSize}
            style={{ marginLeft: ".25em", marginBottom: ".5em" }}
          >
            <option value="10" selected={true}>
              10
            </option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        {gridOptions.autoGroupColumnDef?.headerName && (
          <DataTable
            data={rowData}
            columns={columnDefs}
            config={gridOptions}
            gridRefCallback={gridCallback}
            {...props}
          />
        )}
      </div>
    </React.Fragment>
  );
};

interface WTDataTableProps extends GridOptions {
  /**
   * JSON output from the WT Analytics OP DX API v2.
   * https://onpremises.webtrends.help/docs/about-the-data-extraction-api
   */
  data: ReportProps;
  /**
   * AG Grid options.
   * https://www.ag-grid.com/react-data-grid/grid-options/
   */
  config?: GridOptions;
  /**
   * Callback to make grid rows available to parent.
   */
  renderedNodesCallback?: (nodes: RowNode<any>[]) => void;
  gridRefCallback?: (ref: React.RefObject<AgGridReact<any>>) => void;
  cellClickedCallback?: (event: CellClickedEvent) => void;
}

export default WtDataTable;
