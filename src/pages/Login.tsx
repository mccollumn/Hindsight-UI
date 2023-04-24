import * as React from "react";
import { LoginForm } from "../components/form/LoginForm";
import { AuthContext } from "../providers/AuthProvider";
import LoginError from "../components/form/LoginError";
import pkg from "../../package.json";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogContent,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { startCase } from "lodash/fp";

const DX_USERNAME =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DX_USERNAME
    : "";
const DX_PASSWORD =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DX_PASSWORD
    : "";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Login({ onLoginSubmit }: LoginProps) {
  const { handleLogin, errorMessage, isLoggingIn } =
    React.useContext(AuthContext);
  return (
    <div>
      <BootstrapDialog aria-label="login" open={true}>
        <DialogContent dividers>
          <Backdrop open={isLoggingIn}>
            <CircularProgress />
          </Backdrop>
          <LoginForm
            title={startCase(pkg.name)}
            onLoginSubmit={handleLogin}
            defaultUsername={DX_USERNAME}
            defaultPassword={DX_PASSWORD}
          />
          <LoginError message={errorMessage} />
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
