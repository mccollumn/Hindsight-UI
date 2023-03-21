import React from "react";
import {
  DataGridPremiumProps,
  GridCallbackDetails,
  GridCellParams,
  GridEventListener,
  GridFilterModel,
  GridPinnedRowsProp,
  GridSortItem,
  GridToolbar,
  GRID_TREE_DATA_GROUPING_FIELD,
  MuiEvent,
} from "@mui/x-data-grid-premium";
import { GridApiPremium } from "@mui/x-data-grid-premium/models/gridApiPremium";
import {
  getDimColumnHeader,
  getTableData,
  getTotals,
  generateColumnDefs,
} from "./dataTable.util";
import { DEFAULT_TABLE_HEIGHT } from "../../constants/constants";
import { ReportProps } from "../../interfaces/interfaces";
import useDataTable from "./useDataTable";

const WtDataTable = ({
  data,
  config = {
    columns: [],
    rows: [],
  },
  renderedNodesCallback = () => {},
  gridRefCallback,
  cellClickedCallback,
  ...props
}: WTDataTableProps) => {
  const [dimHeader, setDimHeader] = React.useState(getDimColumnHeader(data));
  const [columnDefs, setColumnDefs] = React.useState(generateColumnDefs(data));
  const [sortModel, setSortModel] = React.useState<GridSortItem[]>();
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>();
  const [rowData, setRowData] = React.useState(getTableData(data));
  const [totals, setTotals] = React.useState(getTotals(data));
  const { DataTable, apiRef } = useDataTable();

  // Set values when report data becomes available or changes
  React.useEffect(() => {
    setDimHeader(getDimColumnHeader(data));
    setColumnDefs(generateColumnDefs(data));
    // setSortModel([{ field: columnDefs[0].field, sort: "desc" }]);
    setRowData(getTableData(data));
    setTotals(getTotals(data));
  }, [data]);

  React.useEffect(() => {
    if (typeof gridRefCallback === "function") {
      gridRefCallback(apiRef.current);
    }
  });

  const cellClickedListener: GridEventListener<"cellClick"> = React.useCallback(
    (
      params: GridCellParams<any>,
      event: MuiEvent<React.MouseEvent<HTMLElement>>,
      details: GridCallbackDetails
    ) => {
      if (typeof cellClickedCallback !== "function") return;
      cellClickedCallback(params, event, details);
    },
    [cellClickedCallback]
  );

  const [pinnedRows, setPinnedRows] = React.useState<GridPinnedRowsProp>({
    bottom: [{ id: "totals", ...totals }],
  });

  // Pin totals row only if the data if unfiltered
  const updateTotals = React.useCallback(
    (newFilterModel: GridFilterModel, details: GridCallbackDetails) => {
      if (newFilterModel.items.length) {
        setPinnedRows({});
      } else {
        setPinnedRows({
          bottom: [{ id: "totals", ...totals }],
        });
      }
    },
    [totals]
  );

  // Send rows up to the parent
  React.useEffect(() => {
    if (typeof renderedNodesCallback !== "function") return;
    renderedNodesCallback(rowData);
  }, [apiRef, renderedNodesCallback, rowData]);

  // Send the sorted rows up to the parent after a sorting change
  React.useEffect(() => {
    if (typeof renderedNodesCallback !== "function") return;
    const sortedRows = apiRef.current.getSortedRows();
    renderedNodesCallback(sortedRows);
  }, [apiRef, renderedNodesCallback, sortModel]);

  // Send the filtered rows up to the parent after a filter change
  React.useEffect(() => {
    if (typeof renderedNodesCallback !== "function") return;
    const filteredRowsLookup = apiRef.current.state.filter.filteredRowsLookup;
    if (!filteredRowsLookup) return;
    const sortedRows = apiRef.current.getSortedRows();
    const filteredRows: any[] = [];
    sortedRows.forEach((row) => {
      if (filteredRowsLookup[row.id]) {
        filteredRows.push(row);
      }
    });
    renderedNodesCallback(filteredRows);
  }, [apiRef, filterModel, renderedNodesCallback]);

  const initialState: DataGridPremiumProps["initialState"] =
    React.useMemo(() => {
      return {
        pinnedColumns: { left: [GRID_TREE_DATA_GROUPING_FIELD] },
        pagination: {
          paginationModel: { pageSize: 10 },
        },
        // sorting: {
        //   sortModel: [{ field: columnDefs[0].field, sort: "desc" }],
        // },
      };
    }, []);

  const groupingColDef: DataGridPremiumProps["groupingColDef"] =
    React.useMemo(() => {
      return {
        headerName: dimHeader,
        filterable: true,
        // sortable: true,
        disableColumnMenu: false,
        flex: 2,
      };
    }, [dimHeader]);

  const defaultGridOptions: DataGridPremiumProps = React.useMemo(
    () => ({
      // Properties
      rows: rowData,
      columns: columnDefs,
      slots: { toolbar: GridToolbar },
      slotProps: {
        toolbar: {
          showQuickFilter: true,
        },
      },
      treeData: true,
      groupingColDef: groupingColDef,
      initialState: initialState,
      pagination: true,
      pageSizeOptions: [10, 25, 50, 100],
      disableAggregation: true,
      disableRowGrouping: true,
      // sortModel: sortModel,
      pinnedRows: pinnedRows,
      rowSelection: false,
      unstable_cellSelection: true,
      // Events
      onFilterModelChange: (newFilterModel, details) => {
        updateTotals(newFilterModel, details);
        setFilterModel(newFilterModel);
      },
      onCellClick: cellClickedListener,
      onSortModelChange: (newSortModel) => setSortModel(newSortModel),
      // Callbacks
      getTreeDataPath: (row) => row.Dimensions,
    }),
    [
      cellClickedListener,
      columnDefs,
      groupingColDef,
      initialState,
      pinnedRows,
      rowData,
      updateTotals,
    ]
  );

  const [gridOptions, setGridOptions] = React.useState({
    ...defaultGridOptions,
    ...config,
  });

  React.useEffect(() => {
    setGridOptions((prevOptions) => ({
      ...prevOptions,
      ...defaultGridOptions,
    }));
  }, [defaultGridOptions]);

  return (
    <React.Fragment>
      <div style={{ height: DEFAULT_TABLE_HEIGHT }}>
        <DataTable apiRef={apiRef} config={gridOptions} {...props} />
      </div>
    </React.Fragment>
  );
};

interface WTDataTableProps {
  /**
   * JSON output from the WT Analytics OP DX API v2.
   * https://onpremises.webtrends.help/docs/about-the-data-extraction-api
   */
  data: ReportProps;
  /**
   * MUI Data Grid options.
   * https://mui.com/x/api/data-grid/data-grid/
   */
  config?: DataGridPremiumProps;
  /**
   * Callback to make grid rows available to parent.
   */
  renderedNodesCallback?: (nodes: any[]) => void;
  /**
   * Callback to make MUI Data Grid API available to parent.
   */
  gridRefCallback?: (ref: GridApiPremium) => void;
  /**
   * Callback to make selected cell available to parent.
   */
  cellClickedCallback?: (
    params: GridCellParams<any>,
    event: MuiEvent<React.MouseEvent<HTMLElement>>,
    details: GridCallbackDetails
  ) => void;
}

export default WtDataTable;
