import React from "react";
import {
  GridRowsProp,
  GridColDef,
  DataGridPremium,
  GridToolbar,
  DataGridPremiumProps,
  GRID_TREE_DATA_GROUPING_FIELD,
  useGridApiRef,
  MuiEvent,
  GridCellParams,
  GridCallbackDetails,
  GridEventListener,
} from "@mui/x-data-grid-premium";
import { styled } from "@mui/material/styles";
import { configure } from "@storybook/react";
import { GridApiPremium } from "@mui/x-data-grid-premium/models/gridApiPremium";
import { DEFAULT_TABLE_HEIGHT } from "../../constants/constants";

const StyledDataGrid = styled(DataGridPremium)(({ theme }) => ({
  //   border: 0,
  //   color:
  //     theme.palette.mode === "light"
  //       ? "rgba(0,0,0,.85)"
  //       : "rgba(255,255,255,0.85)",
  //   fontFamily: [
  //     "-apple-system",
  //     "BlinkMacSystemFont",
  //     '"Segoe UI"',
  //     "Roboto",
  //     '"Helvetica Neue"',
  //     "Arial",
  //     "sans-serif",
  //     '"Apple Color Emoji"',
  //     '"Segoe UI Emoji"',
  //     '"Segoe UI Symbol"',
  //   ].join(","),
  //   WebkitFontSmoothing: "auto",
  //   letterSpacing: "normal",
  //   "& .MuiDataGrid-columnsContainer": {
  //     backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  //   },
  //   "& .MuiDataGrid-iconSeparator": {
  //     display: "none",
  //   },
  //   "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
  //     borderRight: `1px solid ${
  //       theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
  //     }`,
  //   },
  //   "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
  //     borderBottom: `1px solid ${
  //       theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
  //     }`,
  //   },
  //   "& .MuiDataGrid-cell": {
  //     color:
  //       theme.palette.mode === "light"
  //         ? "rgba(0,0,0,.85)"
  //         : "rgba(255,255,255,0.65)",
  //   },
  //   "& .MuiPaginationItem-root": {
  //     borderRadius: 0,
  //   },
}));

const DataTable = ({
  //   rows,
  //   columns,
  config,
  gridRefCallback,
  ...props
}: DataTableProps) => {
  const dataGridConfig: DataGridPremiumProps = {
    ...config,
  };
  const apiRef = useGridApiRef();
  React.useEffect(() => {
    if (typeof gridRefCallback === "function") {
      gridRefCallback(apiRef.current);
    }
  }, [apiRef, gridRefCallback]);

  console.log("DataTable config:", config);

  return (
    <div style={{ height: DEFAULT_TABLE_HEIGHT, width: "100%" }}>
      <StyledDataGrid apiRef={apiRef} {...dataGridConfig} />
    </div>
  );
};

interface DataTableProps {
  //   rows: GridRowsProp;
  //   columns: GridColDef[];
  config: DataGridPremiumProps;
  // gridRefCallback?: (ref: React.RefObject<GridApiPremium>) => void;
  gridRefCallback?: (ref: GridApiPremium) => void;
}

export default DataTable;
