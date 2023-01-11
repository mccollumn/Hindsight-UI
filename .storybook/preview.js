import { addDecorator } from "@storybook/react";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../src/theme";
import "../src/index.css";

// Initialize MSW
initialize();

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
  // Provide the MSW addon decorator globally
  mswDecorator,
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
