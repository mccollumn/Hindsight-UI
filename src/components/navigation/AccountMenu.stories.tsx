import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AccountMenu from "./AccountMenu";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Navigation/Account Menu",
  component: AccountMenu,
} as ComponentMeta<typeof AccountMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AccountMenu> = (args) => <AccountMenu />;

export const Primary = Template.bind({});
Primary.args = {};
