import React from "react";
import {
  DataGridPremium,
  DataGridPremiumProps,
  useGridApiRef,
} from "@mui/x-data-grid-premium";
import { styled } from "@mui/material/styles";
import { GridApiPremium } from "@mui/x-data-grid-premium/models/gridApiPremium";
import { DEFAULT_TABLE_HEIGHT } from "../../constants/constants";

const StyledDataGrid = styled(DataGridPremium)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === "light"
      ? "rgba(0,0,0,.85)"
      : "rgba(255,255,255,0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-cell": {
    color:
      theme.palette.mode === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.65)",
  },
  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
  "@media print": {
    ".MuiDataGrid-main": {
      color: "rgba(0, 0, 0, 0.87)",
      background: "none",
      height: "100%",
      width: "100%",
      margin: "0",
      padding: "0",
    },
  },
}));

const DataTable = ({ config, apiRef, ...props }: DataTableProps) => {
  const dataGridConfig: DataGridPremiumProps = {
    ...config,
  };
  let apiRefInst = useGridApiRef();
  if (apiRef) {
    apiRefInst = apiRef;
  }

  return (
    <div
      className="data-grid-wrapper"
      style={{ height: DEFAULT_TABLE_HEIGHT, width: "100%" }}
    >
      <StyledDataGrid apiRef={apiRefInst} {...dataGridConfig} />
    </div>
  );
};

interface DataTableProps {
  /**
   * MUI Data Grid options.
   * https://mui.com/x/api/data-grid/data-grid/
   */
  config: DataGridPremiumProps;
  /**
   * MUI Data Grid API
   */
  apiRef: React.MutableRefObject<GridApiPremium>;
}

export default DataTable;
