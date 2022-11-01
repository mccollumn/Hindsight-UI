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
} from "@mui/material";
import { GridOptions, RowNode } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import WtDataTable from "../data-vis/WtDataTable";
import WtLineGraph from "../data-vis/WtLineGraph";
import { ReportProps, WtLineProps } from "../../interfaces/interfaces";

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
  data,
  tableConfig = {},
  graphConfig = {},
  ...props
}: ReportModalProps) => {
  const [open, setOpen] = React.useState(isOpen);
  const [gridDimensions, setGridDimensions] = React.useState<any[]>([]);
  const [gridRef, setGridRef] =
    React.useState<React.RefObject<AgGridReact<any>>>();

  const getGridDimensions = React.useCallback((nodes: RowNode<any>[]) => {
    setGridDimensions(
      nodes.map(({ rowIndex, key }) => {
        return { rowIndex, key };
      })
    );
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const gridCallback = React.useCallback(
    (ref: React.RefObject<AgGridReact<any>>) => {
      setGridRef(ref);
    },
    []
  );

  const exportCSV = () => {
    const reportName = data.definition.name || "export";
    gridRef?.current?.api.exportDataAsCsv({ fileName: reportName });
  };

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="report-title"
      open={open}
      maxWidth={"xl"}
      fullWidth={true}
      {...props}
    >
      <BootstrapDialogTitle id="report-title" onClose={handleClose}>
        {data.definition.name || ""}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Graph */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 500,
              }}
            >
              <WtLineGraph
                data={data}
                dimensions={gridDimensions}
                config={graphConfig}
              />
            </Paper>
          </Grid>
          {/* Table */}
          <Grid item xs={12} md={12} lg={12}>
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
              />
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={exportCSV}>Export</Button>
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
  isOpen: boolean;
  data: ReportProps;
  tableConfig: GridOptions;
  graphConfig: WtLineProps;
}

export default ReportModal;
