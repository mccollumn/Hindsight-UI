import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Error from "./Error";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Pages/Error",
  component: Error,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Error>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Error> = (args) => <Error />;

export const ErrorPage = Template.bind({});
ErrorPage.args = {};
