import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import DataTable from "./DataTable";
import {
  DataGridPremiumProps,
  GridCallbackDetails,
  GridCellParams,
  GridEventListener,
  GridFilterModel,
  GridPinnedRowsProp,
  GridRowOrderChangeParams,
  GridToolbar,
  GridValidRowModel,
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
  const [dimHeader, setDimHeader] = useState(getDimColumnHeader(data));
  const [columnDefs, setColumnDefs] = useState(generateColumnDefs(data));
  const [rowData, setRowData] = useState(getTableData(data));
  const [totals, setTotals] = useState(getTotals(data));
  const [gridRef, setGridRef] = useState<GridApiPremium>();

  useEffect(() => {
    setDimHeader(getDimColumnHeader(data));
    setColumnDefs(generateColumnDefs(data));
    setRowData(getTableData(data));
    setTotals(getTotals(data));
    console.log("Root dimension:", gridRef?.getRootDimensions());
    console.log("Row models:", gridRef?.getRowModels());
  }, [data]);

  const gridCallback = useCallback((ref: GridApiPremium) => {
    setGridRef(ref);
    if (typeof gridRefCallback === "function") {
      gridRefCallback(ref);
    }
  }, []);

  const cellClickedListener: GridEventListener<"cellClick"> = useCallback(
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

  // const onBtnExport = useCallback(() => {
  //   gridRef?.current?.api.exportDataAsCsv();
  // }, [gridRef]);

  const [pinnedRows, setPinnedRows] = useState<GridPinnedRowsProp>({
    bottom: [{ id: "totals", ...totals }],
  });

  const updateTotals = useCallback(
    (newFilterModel: GridFilterModel, details: GridCallbackDetails) => {
      console.log("newFilterModel:", newFilterModel);
      console.log("details:", details);
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

  React.useEffect(() => {
    const firstRowId = gridRef?.getRowIdFromRowIndex(0);
    const firstRow = gridRef?.getRow(firstRowId || "");
    console.log("WTDataTable rendered nodes (effect):", firstRow);
    renderedNodesCallback([firstRow]);
  }, [gridRef, renderedNodesCallback]);

  const getRenderedNodes = useCallback(
    (
      params: GridRowOrderChangeParams,
      event: MuiEvent<{}>,
      details: GridCallbackDetails
    ) => {
      if (typeof renderedNodesCallback !== "function") return;
      // Only passing the first row for now
      const firstRowId = gridRef?.getRowIdFromRowIndex(0);
      const firstRow = gridRef?.getRow(firstRowId || "");
      console.log("WTDataTable rendered nodes:", firstRow);
      renderedNodesCallback([firstRow]);
    },
    [gridRef, renderedNodesCallback]
  );

  const getAggregationModel = (totals: any) => {
    let aggregationModel: any = {};
    Object.entries(totals).forEach(([measure, total]) => {
      //   if (total) {
      aggregationModel[measure] = "sum";
      //   }
    });
    return aggregationModel;
  };

  const initialState: DataGridPremiumProps["initialState"] = useMemo(() => {
    return {
      pinnedColumns: { left: [GRID_TREE_DATA_GROUPING_FIELD] },
      pagination: {
        paginationModel: { pageSize: 10 },
      },
      //   aggregation: {
      //     model: getAggregationModel(totals),
      //   },
    };
  }, []);

  const groupingColDef: DataGridPremiumProps["groupingColDef"] = useMemo(() => {
    return {
      headerName: dimHeader,
      filterable: true,
      sortable: true,
      disableColumnMenu: false,
      flex: 2,
    };
  }, [dimHeader]);

  const defaultGridOptions: DataGridPremiumProps = useMemo(
    () => ({
      // Properties
      rows: rowData,
      columns: columnDefs,
      slots: { toolbar: GridToolbar },
      treeData: true,
      groupingColDef: groupingColDef,
      initialState: initialState,
      pagination: true,
      pageSizeOptions: [10, 25, 50, 100],
      pinnedRows: pinnedRows,
      //   rowSelection: false,
      unstable_cellSelection: true,
      // Events
      onFilterModelChange: (newFilterModel, details) =>
        updateTotals(newFilterModel, details),
      onCellClick: cellClickedListener,
      onRowOrderChange: getRenderedNodes,
      // onSortModelChange: getRenderedNodes,
      // onStateChange: getRenderedNodes,
      // Callbacks
      getTreeDataPath: (row) => row.Dimensions,
    }),
    [
      cellClickedListener,
      columnDefs,
      getRenderedNodes,
      groupingColDef,
      initialState,
      pinnedRows,
      rowData,
      updateTotals,
    ]
  );

  const [gridOptions, setGridOptions] = useState({
    ...defaultGridOptions,
    ...config,
  });

  useEffect(() => {
    setGridOptions((prevOptions) => ({
      ...prevOptions,
      ...defaultGridOptions,
    }));
  }, [defaultGridOptions]);

  return (
    <React.Fragment>
      <div style={{ height: DEFAULT_TABLE_HEIGHT }}>
        {/* {gridOptions.autoGroupColumnDef?.headerName && ( */}
        <DataTable
          config={gridOptions}
          gridRefCallback={gridCallback}
          {...props}
        />
        {/* )} */}
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
  gridRefCallback?: (ref: GridApiPremium) => void;
  cellClickedCallback?: (
    params: GridCellParams<any>,
    event: MuiEvent<React.MouseEvent<HTMLElement>>,
    details: GridCallbackDetails
  ) => void;
}

export default WtDataTable;
