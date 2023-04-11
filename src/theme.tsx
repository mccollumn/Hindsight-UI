import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid-premium/themeAugmentation";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    mode: "light",
    primary: {
      main: "#264768",
      light: "#417bb4",
      dark: "#0a121b",
    },
  },
});
