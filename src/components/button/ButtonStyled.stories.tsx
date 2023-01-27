import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ButtonStyled } from "./ButtonStyled";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Navigation/Button",
  component: ButtonStyled,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ButtonStyled>;

const Template: ComponentStory<typeof ButtonStyled> = (args) => (
  <ButtonStyled {...args} />
);

export const Default = Template.bind({});
