import * as React from "react";
import { Box, Alert, AlertTitle } from "@mui/material";

const LoginError = ({ message }: LoginErrorProps) => {
  if (message) {
    return (
      <Box sx={{ width: "100%", mt: "1em" }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>Login Failed</AlertTitle>
          {message}
        </Alert>
      </Box>
    );
  }
  return null;
};

interface LoginErrorProps {
  message: string;
}

export default LoginError;
