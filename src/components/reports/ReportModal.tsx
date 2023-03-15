import * as React from "react";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  IconButtonProps,
  Collapse,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import WtDataTable from "../data-vis/WtDataTable";
import WtLineGraph from "../data-vis/WtLineGraph";
import DateRange from "../DateRange";
import {
  DEFAULT_TABLE_HEIGHT,
  TABLE_CONTAINER_HEIGHT,
  GRAPH_HEIGHT,
  FOOTER_HEIGHT,
  REPORT_TITLE_HEIGHT,
  DATE_RANGE_HEIGHT,
} from "../../constants/constants";
import {
  WtLineProps,
  ProfileProps,
  ProfileReportsProps,
} from "../../interfaces/interfaces";
import { DateContext } from "../../providers/DateProvider";
import useGetData from "../../hooks/useGetData";
import { GridApiPremium } from "@mui/x-data-grid-premium/models/gridApiPremium";
import {
  DataGridPremiumProps,
  GridCallbackDetails,
  GridCellParams,
  MuiEvent,
} from "@mui/x-data-grid-premium";

const ExpandGraph = styled((props: ExpandGraphProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
  tableConfig = {
    rows: [],
    columns: [],
  },
  graphConfig = {},
  cancelRequestsCallback: requestControllersCallback,
  ...props
}: ReportModalProps) => {
  const { wtStartDate, wtEndDate } = React.useContext(DateContext);
  const [gridDimensions, setGridDimensions] = React.useState<any[]>([]);
  const [gridRef, setGridRef] = React.useState<GridApiPremium>();
  const [selectedCell, setSelectedCell] = React.useState({});
  const [graphExpanded, setGraphExpanded] = React.useState(true);

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

  const { isLoading: loadingReportData, data } = useQuery(
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

  const getGridDimensions = React.useCallback((nodes: any[]) => {
    console.log("ReportModal grid dimensions:", nodes);
    if (!nodes[0]) return;
    setGridDimensions(
      nodes.map(({ Dimensions }, index) => {
        return { rowIndex: index, key: Dimensions[0] };
      })
    );
  }, []);

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
    });
  };

  const handleClose = () => {
    onClose();
  };

  const gridCallback = React.useCallback((ref: GridApiPremium) => {
    setGridRef(ref);
    console.log("Grid ref:", ref);
  }, []);

  const exportCSV = React.useCallback(() => {
    gridRef?.exportDataAsCsv();
  }, [gridRef]);

  const handleExpandGraph = () => {
    setGraphExpanded(!graphExpanded);
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
        {loadingReportData ? (
          <Skeleton height={REPORT_TITLE_HEIGHT} width="30%" />
        ) : (
          data?.definition?.name || ""
        )}
        {loadingReportData && (
          <Skeleton height={DATE_RANGE_HEIGHT} width="20%" />
        )}
        <div
          className="date-range"
          style={{ display: loadingReportData ? "none" : "block" }}
        >
          <DateRange profile={profile} />
        </div>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Graph */}
          <Grid item xs={12} md={12} lg={12}>
            {
              /*loadingDefinition*/ loadingReportData ? (
                <Skeleton height={GRAPH_HEIGHT} />
              ) : (
                // <Collapse in={graphExpanded} timeout="auto" collapsedSize="25">
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: graphExpanded ? GRAPH_HEIGHT : "25px",
                  }}
                >
                  <ExpandGraph
                    expand={graphExpanded}
                    onClick={handleExpandGraph}
                    aria-expanded={graphExpanded}
                    aria-label="Show or hide graph"
                  >
                    <ExpandMoreIcon fontSize="small" />
                  </ExpandGraph>
                  <Collapse in={graphExpanded} timeout="auto">
                    <WtLineGraph
                      reportDefinition={data.definition}
                      dimensions={gridDimensions}
                      selectedCell={selectedCell}
                      config={graphConfig}
                      requestControllersCallback={requestControllersCallback}
                    />
                  </Collapse>
                </Paper>
                // </Collapse>
              )
            }
          </Grid>
          {/* Table */}
          <Grid item xs={12} md={12} lg={12}>
            {loadingReportData ? (
              <Skeleton height={DEFAULT_TABLE_HEIGHT} />
            ) : (
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: TABLE_CONTAINER_HEIGHT,
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
        {loadingReportData ? (
          <Skeleton height={FOOTER_HEIGHT} width="10%" />
        ) : (
          <Button onClick={exportCSV}>Export</Button>
        )}
      </DialogActions>
    </BootstrapDialog>
  );
};

const getPrimaryColumn = (columns: any) => {
  return columns.find((column: any) => column.field !== "__tree_data_group__");
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
   * MUI Data Grid options.
   * https://mui.com/x/api/data-grid/data-grid/
   */
  tableConfig?: DataGridPremiumProps;
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

interface ExpandGraphProps extends IconButtonProps {
  expand: boolean;
}

export default ReportModal;
