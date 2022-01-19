import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../src/theme";
import "../src/index.css";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
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
