import * as React from "react";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  Grid,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
} from "@mui/material";
import { CellClickedEvent, GridOptions, RowNode } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useQuery } from "@tanstack/react-query";
import WtDataTable from "../data-vis/WtDataTable";
import WtLineGraph from "../data-vis/WtLineGraph";
import { GRAPH_HEIGHT } from "../../constants/lineGraph";
import { DEFAULT_TABLE_HEIGHT } from "../../constants/dataTable";
import {
  WtLineProps,
  ProfileProps,
  ProfileReportsProps,
} from "../../interfaces/interfaces";
import { DateContext } from "../../providers/DateProvider";
import useGetData from "../../hooks/getData";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const ReportModal = ({
  isOpen,
  onClose,
  profile,
  report,
  tableConfig = {},
  graphConfig = {},
  cancelRequestsCallback: requestControllersCallback,
  ...props
}: ReportModalProps) => {
  const { wtStartDate, wtEndDate } = React.useContext(DateContext);
  const [gridDimensions, setGridDimensions] = React.useState<any[]>([]);
  const [gridRef, setGridRef] =
    React.useState<React.RefObject<AgGridReact<any>>>();
  const [selectedCell, setSelectedCell] = React.useState({});

  const { /*getReportDefinitionQuery,*/ getDataQuery: getReport } =
    useGetData();
  // const {
  //   isLoading: loadingDefinition,
  //   isError: reportDefinitionisError,
  //   data: reportDefinition,
  //   error: reportDefinitionError,
  // } = useQuery(
  //   ["reportDefinition", { profileID: profile?.ID, reportID: report?.ID }],
  //   getReportDefinitionQuery
  // );

  const {
    isLoading: loading,
    isError,
    data,
    error,
  } = useQuery(
    [
      "report",
      {
        profileID: profile?.ID,
        reportID: report?.ID,
        params: { start_period: wtStartDate, end_period: wtEndDate },
      },
    ],
    getReport,
    { staleTime: 30 * 60 * 1000 }
  );

  console.log("Report:", report);
  // console.log("Report info:", reportDefinition);

  const getGridDimensions = React.useCallback((nodes: RowNode<any>[]) => {
    setGridDimensions(
      nodes.map(({ rowIndex, key }) => {
        return { rowIndex, key };
      })
    );
  }, []);

  const handleSelectionChange = (event: CellClickedEvent) => {
    const primaryColumn =
      event.columnApi.getColumns()![0].getColDef().field || "";
    const selectedColumn = event.column.getColDef().field || primaryColumn;
    const selectedDimension = event.node.key;
    const primaryDimension = event.data.Dimensions[0];
    setSelectedCell({
      primaryColumn: primaryColumn,
      selectedColumn: selectedColumn,
      primaryDimension: primaryDimension,
      selectedDimension: selectedDimension,
    });
  };

  const handleClose = () => {
    onClose();
  };

  const gridCallback = React.useCallback(
    (ref: React.RefObject<AgGridReact<any>>) => {
      setGridRef(ref);
      console.log("Grid ref:", ref);
    },
    []
  );

  const exportCSV = () => {
    const reportName = data.definition.name || "export";
    gridRef?.current?.api.exportDataAsCsv({ fileName: reportName });
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="report-title"
      open={isOpen}
      maxWidth={"xl"}
      fullWidth={true}
      {...props}
    >
      <BootstrapDialogTitle id="report-title" onClose={handleClose}>
        {loading ? (
          <Skeleton height={32} width="30%" />
        ) : (
          data?.definition?.name || ""
        )}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Graph */}
          <Grid item xs={12} md={12} lg={12}>
            {
              /*loadingDefinition*/ loading ? (
                <Skeleton height={GRAPH_HEIGHT} />
              ) : (
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: GRAPH_HEIGHT,
                  }}
                >
                  <WtLineGraph
                    reportDefinition={data.definition}
                    reportData={data}
                    dimensions={gridDimensions}
                    selectedCell={selectedCell}
                    config={graphConfig}
                    requestControllersCallback={requestControllersCallback}
                  />
                </Paper>
              )
            }
          </Grid>
          {/* Table */}
          <Grid item xs={12} md={12} lg={12}>
            {loading ? (
              <Skeleton height={DEFAULT_TABLE_HEIGHT} />
            ) : (
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <WtDataTable
                  data={data}
                  config={tableConfig}
                  renderedNodesCallback={getGridDimensions}
                  gridRefCallback={gridCallback}
                  cellClickedCallback={handleSelectionChange}
                />
              </Paper>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {loading ? (
          <Skeleton height={36} width="10%" />
        ) : (
          <Button onClick={exportCSV}>Export</Button>
        )}
      </DialogActions>
    </BootstrapDialog>
  );
};

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface ReportModalProps {
  /**
   * Is the modal currently displayed
   */
  isOpen: boolean;
  onClose: () => void;
  /**
   * Profile object from DX API v2.0
   */
  profile: ProfileProps;
  /**
   * Report object from DX API v2.0
   */
  report: ProfileReportsProps | null;
  /**
   * AG Grid options.
   * https://www.ag-grid.com/react-data-grid/grid-options/
   */
  tableConfig?: GridOptions;
  /**
   * Nivo line graph options.
   * https://nivo.rocks/line/
   */
  graphConfig?: WtLineProps;
  /**
   * cancelAllRequests function from useGetData
   */
  cancelRequestsCallback?: (cancelAllRequests: any) => void;
}

export default ReportModal;
