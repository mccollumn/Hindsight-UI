import * as React from "react";
import { LoginForm } from "../components/form/LoginForm";
import { styled } from "@mui/material/styles";
import { Dialog, DialogContent } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Login({ onLoginSubmit }: LoginProps) {
  return (
    <div>
      <BootstrapDialog aria-label="login" open={true}>
        <DialogContent dividers>
          <LoginForm onLoginSubmit={onLoginSubmit} />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

interface LoginProps {
  /**
   * Handler when Login form is submitted
   */
  onLoginSubmit?: (formValues: any) => void;
}
