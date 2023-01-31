import * as React from "react";
import { LoginForm } from "../components/form/LoginForm";
import { AuthContext } from "../providers/AuthProvider";
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
  const { handleLogin, errorMessage } = React.useContext(AuthContext);
  return (
    <div>
      <BootstrapDialog aria-label="login" open={true}>
        <DialogContent dividers>
          <LoginForm onLoginSubmit={handleLogin} />
          {errorMessage}
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
