import {
  GridCallbackDetails,
  GridCellParams,
  GridGroupNode,
  GridRowId,
  MuiEvent,
} from "@mui/x-data-grid-premium";
import { GridApiPremium } from "@mui/x-data-grid-premium/models/gridApiPremium";
import React, { MutableRefObject } from "react";
import { SelectedCellProps } from "../interfaces/interfaces";

const defaultSelectedCell = {
  selectedCell: {
    primaryColumn: "",
    selectedColumn: "",
    primaryDimension: "",
    selectedDimension: "",
    dimensionHierarchy: [""],
  },
  handleSelectionChange: () => {},
  getGridDimensions: () => [],
  setGridDimensions: () => {},
  gridRef: null,
  setGridRef: () => {},
  groupExpansionLookup: { current: {} },
  isGroupExpandedByDefault: () => false,
};

export const GridStateContext =
  React.createContext<GridStateContextProps>(defaultSelectedCell);

export const GridStateProvider = ({
  dataGridRef,
  children,
}: GridStateProviderProps) => {
  const [selectedCell, setSelectedCell] = React.useState<SelectedCellProps>({});
  const [renderedDimensions, setRenderedDimensions] = React.useState<any[]>([]);
  const [gridRef, setGridRef] = React.useState<GridApiPremium | null>(
    dataGridRef || null
  );
  const groupExpansionLookup = React.useRef<Record<GridRowId, boolean>>({});

  React.useEffect(() => {
    if (!dataGridRef) return;
    setGridRef(dataGridRef);
  }, [dataGridRef]);

  const handleSelectionChange = (
    params: GridCellParams<any>,
    event: MuiEvent<React.MouseEvent<HTMLElement>>,
    details: GridCallbackDetails
  ) => {
    const primaryColumn =
      getPrimaryColumn(gridRef?.getAllColumns()).field || "";
    const selectedColumn =
      params.colDef.type === "treeDataGroup"
        ? primaryColumn
        : params.field || primaryColumn;
    const dimensions = params.row.Dimensions;
    const selectedDimension = dimensions[dimensions.length - 1];
    const primaryDimension = dimensions[0];
    setSelectedCell({
      primaryColumn: primaryColumn,
      selectedColumn: selectedColumn,
      primaryDimension: primaryDimension,
      selectedDimension: selectedDimension,
      dimensionHierarchy: dimensions,
    });
  };

  const setGridDimensions = React.useCallback((nodes: any[]) => {
    if (!nodes[0]) return;
    setRenderedDimensions(
      nodes.map(({ Dimensions }, index) => {
        return { rowIndex: index, key: Dimensions[0] };
      })
    );
  }, []);

  const getGridDimensions = () => {
    return renderedDimensions;
  };

  const isGroupExpandedByDefault = React.useCallback(
    (node: GridGroupNode) => {
      return !!groupExpansionLookup.current[node.id];
    },
    [groupExpansionLookup]
  );

  return (
    <GridStateContext.Provider
      value={{
        selectedCell,
        handleSelectionChange,
        getGridDimensions,
        setGridDimensions,
        gridRef,
        setGridRef,
        groupExpansionLookup,
        isGroupExpandedByDefault,
      }}
    >
      {children}
    </GridStateContext.Provider>
  );
};

const getPrimaryColumn = (columns: any) => {
  return columns.find((column: any) => column.field !== "__tree_data_group__");
};

interface GridStateContextProps {
  selectedCell: SelectedCellProps;
  handleSelectionChange: (
    params: GridCellParams<any>,
    event: MuiEvent<React.MouseEvent<HTMLElement>>,
    details: GridCallbackDetails
  ) => void;
  getGridDimensions: () => any[];
  setGridDimensions: (node: any[]) => void;
  gridRef: GridApiPremium | null;
  setGridRef: React.Dispatch<React.SetStateAction<GridApiPremium | null>>;
  groupExpansionLookup: MutableRefObject<Record<GridRowId, boolean>>;
  isGroupExpandedByDefault: (node: GridGroupNode) => boolean;
}

interface GridStateProviderProps {
  dataGridRef?: GridApiPremium | null;
  children: any;
}
