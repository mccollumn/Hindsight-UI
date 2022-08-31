import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  ButtonRB,
  ButtonRBProps
} from './ButtonRB';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Button",
  component: ButtonRB,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
} as ComponentMeta<typeof ButtonRB>;

const Template: ComponentStory<typeof ButtonRB> = (args) => <ButtonRB {...args} />;

export const Default = Template.bind({});
