import React from "react";
import {
  DataGridPremiumProps,
  GridCallbackDetails,
  GridCellParams,
  GridEventListener,
  GridFilterInputMultipleValue,
  GridFilterInputValue,
  GridFilterItem,
  GridFilterModel,
  GridFilterOperator,
  GridPinnedRowsProp,
  GridSortItem,
  GridToolbar,
  GRID_TREE_DATA_GROUPING_FIELD,
  MuiEvent,
  GridTreeNode,
  GridRenderCellParams,
} from "@mui/x-data-grid-premium";
import { GridApiPremium } from "@mui/x-data-grid-premium/models/gridApiPremium";
import { format } from "date-fns/fp";
import { DateContext } from "../../providers/DateProvider";
import { GridStateContext } from "../../providers/GridStateProvider";
import {
  getDimColumnHeader,
  getTableData,
  getTotals,
  generateColumnDefs,
} from "./dataTable.util";
import { DEFAULT_TABLE_HEIGHT } from "../../constants/constants";
import { ReportProps } from "../../interfaces/interfaces";
import useDataTable from "./useDataTable";

const CellRender = ({ row, rowNode }: GridRenderCellParams) => {
  let cellValue = "";
  let cellAttribute;

  if (rowNode.type !== "pinnedRow") {
    cellValue = row.Dimensions[rowNode.depth];
    cellAttribute = row.dimAttributes[rowNode.depth];
  }

  if (!cellAttribute) {
    return <div>{cellValue}</div>;
  }

  return (
    <div>
      {cellAttribute}
      <br />
      <a href={cellValue} target="_blank" rel="noreferrer">
        {cellValue}
      </a>
    </div>
  );
};

const WtDataTable = ({
  data,
  config = {
    columns: [],
    rows: [],
  },
  gridRefCallback,
  ...props
}: WTDataTableProps) => {
  const [dimHeader, setDimHeader] = React.useState(getDimColumnHeader(data));
  const [columnDefs, setColumnDefs] = React.useState(generateColumnDefs(data));
  const [sortModel, setSortModel] = React.useState<GridSortItem[]>();
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>();
  const [rowData, setRowData] = React.useState(getTableData(data));
  const [totals, setTotals] = React.useState(getTotals(data));
  const { DataTable, apiRef } = useDataTable();

  const { startDate, endDate } = React.useContext(DateContext);
  const {
    handleSelectionChange,
    setGridDimensions,
    groupExpansionLookup,
    isGroupExpandedByDefault,
  } = React.useContext(GridStateContext);

  // Set values when report data becomes available or changes
  React.useEffect(() => {
    setDimHeader(getDimColumnHeader(data));
    setColumnDefs(generateColumnDefs(data));
    // setSortModel([{ field: columnDefs[0].field, sort: "desc" }]);
    setRowData(getTableData(data));
    setTotals(getTotals(data));
  }, [data]);

  // Send grid API ref up to the parent
  React.useEffect(() => {
    if (typeof gridRefCallback === "function") {
      gridRefCallback(apiRef.current);
    }
  });

  // Store the current rows
  React.useEffect(() => {
    if (typeof setGridDimensions !== "function") return;
    setGridDimensions(rowData);
  }, [apiRef, setGridDimensions, rowData]);

  // Store the sorted rows after a sorting change
  React.useEffect(() => {
    if (typeof setGridDimensions !== "function") return;
    const sortedRows = apiRef.current.getSortedRows();
    setGridDimensions(sortedRows);
  }, [apiRef, setGridDimensions, sortModel]);

  // Store the filtered rows after a filter change
  React.useEffect(() => {
    if (typeof setGridDimensions !== "function") return;
    const filteredRowsLookup = apiRef.current.state.filter.filteredRowsLookup;
    if (!filteredRowsLookup) return;
    const sortedRows = apiRef.current.getSortedRows();
    const filteredRows: any[] = [];
    sortedRows.forEach((row) => {
      if (filteredRowsLookup[row.id]) {
        filteredRows.push(row);
      }
    });
    setGridDimensions(filteredRows);
  }, [apiRef, filterModel, setGridDimensions]);

  // Store the currently expanded rows after an expansion change
  React.useEffect(() => {
    apiRef.current.subscribeEvent("rowExpansionChange", (node) => {
      groupExpansionLookup.current[node.id] = node.childrenExpanded || false;
    });
  }, [apiRef, groupExpansionLookup]);

  const cellClickedListener: GridEventListener<"cellClick"> = React.useCallback(
    (
      params: GridCellParams<any>,
      event: MuiEvent<React.MouseEvent<HTMLElement>>,
      details: GridCallbackDetails
    ) => {
      if (typeof handleSelectionChange !== "function") return;
      handleSelectionChange(params, event, details);
    },
    [handleSelectionChange]
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

  const getExportFileName = React.useCallback(() => {
    const dateFormat = "yyyy-MM-dd";
    const reportName =
      data.definition.name.replaceAll(" ", "_") || "webtrends_export";
    const dateRange = `${format(dateFormat, startDate)}_${format(
      dateFormat,
      endDate
    )}`;
    return `${reportName}_${dateRange}`;
  }, [data.definition.name, endDate, startDate]);

  const getCSVExportOptions = React.useCallback(() => {
    const fileName = getExportFileName();
    return { allColumns: true, fileName: fileName };
  }, [getExportFileName]);

  const getPrintOptions = React.useCallback(() => {
    const fileName = getExportFileName();
    return {
      hideToolbar: true,
      hideFooter: true,
      /**
       * fileName option does not currently work for print.
       * https://github.com/mui/mui-x/issues/8039
       */
      fileName: fileName,
    };
  }, [getExportFileName]);

  const initialState: DataGridPremiumProps["initialState"] =
    React.useMemo(() => {
      return {
        pinnedColumns: { left: [GRID_TREE_DATA_GROUPING_FIELD] },
        pagination: {
          paginationModel: { pageSize: 10 },
        },
        columns: {
          columnVisibilityModel: getColumnVisibilityModel(columnDefs),
        },
        // sorting: {
        //   sortModel: [{ field: columnDefs[0].field, sort: "desc" }],
        // },
      };
    }, [columnDefs]);

  const groupingColDef: DataGridPremiumProps["groupingColDef"] =
    React.useMemo(() => {
      return {
        headerName: dimHeader,
        filterable: true,
        sortable: true,
        disableColumnMenu: false,
        filterOperators: treeDataOperators,
        getApplyQuickFilterFn: getApplyFilterFnTreeData,
        disableExport: true,
        flex: 2,
        valueGetter: (params) => {
          if (
            params.row.dimAttributes &&
            params.row.dimAttributes[params.rowNode.depth]
          ) {
            return <CellRender {...params} />;
          }
        },
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
          csvOptions: getCSVExportOptions(),
          printOptions: getPrintOptions(),
          excelOptions: {
            disableToolbarButton: true,
          },
        },
        columnsPanel: {
          disableHideAllButton: true,
          disableShowAllButton: true,
          sx: getHiddenToolbarColumnButtons(columnDefs),
        },
      },
      treeData: true,
      groupingColDef: groupingColDef,
      isGroupExpandedByDefault: isGroupExpandedByDefault,
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
      getCSVExportOptions,
      getPrintOptions,
      groupingColDef,
      initialState,
      isGroupExpandedByDefault,
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

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const isTotalsRow = (params: GridCellParams<any, any, any, GridTreeNode>) => {
  return params.row.id === "totals" ? true : false;
};

// Custom filter operators that work with tree data
const treeDataOperators: GridFilterOperator[] = [
  {
    value: "contains",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      if (!filterItem.value) {
        return null;
      }
      const filterItemValue = escapeRegExp(
        filterItem.value.toLowerCase().trim()
      );
      return (params): boolean => {
        if (isTotalsRow(params)) return false;
        return params.row.Dimensions.some((element: string) =>
          element.toLowerCase().includes(filterItemValue.toString())
        );
      };
    },
    InputComponent: GridFilterInputValue,
  },
  {
    value: "equals",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      if (!filterItem.value) {
        return null;
      }
      const filterItemValue = filterItem.value.trim();
      const collator = new Intl.Collator(undefined, {
        sensitivity: "base",
        usage: "search",
      });
      return (params): boolean => {
        if (isTotalsRow(params)) return false;
        return params.row.Dimensions.some(
          (element: string) =>
            collator.compare(filterItemValue, element.toString()) === 0
        );
      };
    },
    InputComponent: GridFilterInputValue,
  },
  {
    value: "startsWith",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      if (!filterItem.value) {
        return null;
      }
      const filterItemValue = filterItem.value.trim();
      const filterRegex = new RegExp(
        `^${escapeRegExp(filterItemValue)}.*$`,
        "i"
      );
      return (params): boolean => {
        if (isTotalsRow(params)) return false;
        return params.row.Dimensions.some((element: string) =>
          element != null ? filterRegex.test(element.toString()) : false
        );
      };
    },
    InputComponent: GridFilterInputValue,
  },
  {
    value: "endsWith",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      if (!filterItem.value) {
        return null;
      }
      const filterItemValue = filterItem.value.trim();
      const filterRegex = new RegExp(
        `.*${escapeRegExp(filterItemValue)}$`,
        "i"
      );
      return (params): boolean => {
        if (isTotalsRow(params)) return false;
        return params.row.Dimensions.some((element: string) =>
          element != null ? filterRegex.test(element.toString()) : false
        );
      };
    },
    InputComponent: GridFilterInputValue,
  },
  {
    value: "isAnyOf",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
        return null;
      }
      const filterItemValue = filterItem.value.map((val) => val.trim());
      const collator = new Intl.Collator(undefined, {
        sensitivity: "base",
        usage: "search",
      });
      return (params): boolean => {
        if (isTotalsRow(params)) return false;
        return params.row.Dimensions != null
          ? filterItemValue.some((filterValue) => {
              return params.row.Dimensions.some(
                (element: string) =>
                  collator.compare(filterValue, element.toString()) === 0
              );
            })
          : false;
      };
    },
    InputComponent: GridFilterInputMultipleValue,
  },
];

// Custom quick filter logic that works with tree data
const getApplyFilterFnTreeData = (value: string) => {
  if (!value) {
    return null;
  }
  const filterRegex = new RegExp(escapeRegExp(value), "i");
  return (params: GridCellParams): boolean => {
    if (isTotalsRow(params)) return false;
    return params.row.Dimensions.some((element: string) =>
      element != null ? filterRegex.test(element.toString()) : false
    );
  };
};

const getColumnVisibilityModel = (columnDefs: any[]) => {
  let columnVisibilityModel = {};
  columnDefs.forEach((columnDef) => {
    if (columnDef.type === "string") {
      columnVisibilityModel = {
        ...columnVisibilityModel,
        [columnDef.field]: false,
      };
    }
  });
  return columnVisibilityModel;
};

const getHiddenToolbarColumnButtons = (columnDefs: any[]) => {
  const HIDDEN_BUTTON_START_POSITION = 2;
  const dimensionDefs = columnDefs.filter((def) => def.type === "string");
  const range = dimensionDefs.length - 1;
  const selector = `& .MuiDataGrid-columnsPanelRow:nth-of-type(n+${HIDDEN_BUTTON_START_POSITION}):nth-of-type(-n+${
    HIDDEN_BUTTON_START_POSITION + range
  })`;
  return { [selector]: { display: "none" } };
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
   * Callback to make MUI Data Grid API available to parent.
   */
  gridRefCallback?: (ref: GridApiPremium) => void;
}

export default WtDataTable;
