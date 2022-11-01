import React, { Dispatch, SetStateAction } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const ReportList = ({ open, setOpen, children }: ReportListProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        maxWidth="lg"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogActions>
          <CloseIcon onClick={handleClose} />
        </DialogActions>
        <DialogTitle id="scroll-dialog-title">Reports</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Grid container spacing={2}>
              {children.map((child: any, index: number) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  {child}
                </Grid>
              ))}
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

interface ReportListProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: any;
}

export default ReportList;
