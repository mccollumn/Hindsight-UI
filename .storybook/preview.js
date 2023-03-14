import { addDecorator } from "@storybook/react";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { withRouter } from "storybook-addon-react-router-v6";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../src/theme";
import "../src/index.css";
import { AuthProvider } from "../src/providers/AuthProvider";

// Initialize MSW
initialize();

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Story />
      </AuthProvider>
    </ThemeProvider>
  ),
  // Provide the MSW addon decorator globally
  mswDecorator,
  withRouter,
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
