import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useErrorBoundary } from "react-error-boundary";
import exclamation from "../images/exclamation.svg";

// export default function Error() {
const Error = () => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">Oops...</Typography>
            <Typography variant="h6">Something went wrong.</Typography>
            <Button variant="contained" onClick={resetBoundary}>
              Try Again
            </Button>
          </Grid>
          <Grid xs={6}>
            <img src={exclamation} alt="" width={500} height={250} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export const logError = (error: Error, info: { componentStack: string }) => {
  console.error(error, info);
};

export default Error;
