import * as React from "react";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Grid,
  Paper,
  // Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  // DialogActions,
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
  // FOOTER_HEIGHT,
  REPORT_TITLE_HEIGHT,
  DATE_RANGE_HEIGHT,
} from "../../constants/constants";
import {
  WtLineProps,
  ProfileProps,
  ProfileReportsProps,
} from "../../interfaces/interfaces";
import { DateContext } from "../../providers/DateProvider";
import { GridStateProvider } from "../../providers/GridStateProvider";
import useGetData from "../../hooks/useGetData";
import { GridApiPremium } from "@mui/x-data-grid-premium/models/gridApiPremium";
import { DataGridPremiumProps } from "@mui/x-data-grid-premium";
import { format } from "date-fns/fp";

const ExpandGraph = styled((props: ExpandGraphProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  top: "-20px",
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogTitle-root": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.grey[50],
  },
  "& .MuiDialogTitle-root p": {
    color: theme.palette.grey[50],
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
  const { wtStartDate, wtEndDate, startDate, endDate } =
    React.useContext(DateContext);
  const [gridRef, setGridRef] = React.useState<GridApiPremium | null>(null);
  const [graphExpanded, setGraphExpanded] = React.useState(true);
  const { getDataQuery: getReport } = useGetData();

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

  const handleClose = () => {
    onClose();
  };

  const gridCallback = React.useCallback((ref: GridApiPremium) => {
    setGridRef(ref);
  }, []);

  // Currently using the export feature built into MUI Data Grid instead of an export button in the modal
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const exportCSV = React.useCallback(() => {
    const dateFormat = "yyyy-MM-dd";
    const reportName = report?.name || "export";
    const dateRange = `${format(dateFormat, startDate)}_${format(
      dateFormat,
      endDate
    )}`;
    gridRef?.exportDataAsCsv({
      allColumns: true,
      fileName: `${reportName}_${dateRange}`,
    });
  }, [endDate, gridRef, report?.name, startDate]);

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
          <GridStateProvider dataGridRef={gridRef}>
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
                    gridRefCallback={gridCallback}
                  />
                </Paper>
              )}
            </Grid>
          </GridStateProvider>
        </Grid>
      </DialogContent>
      {/* Hiding the actions bar for now. */}
      {/* <DialogActions>
        {loadingReportData ? (
          <Skeleton height={FOOTER_HEIGHT} width="10%" />
        ) : (
          <Button onClick={exportCSV}>Export</Button>
        )}
      </DialogActions> */}
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
