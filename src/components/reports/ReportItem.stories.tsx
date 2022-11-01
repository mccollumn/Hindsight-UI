import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ReportItem from "./ReportItem";

const clickHandler = (event: React.MouseEvent<Element, MouseEvent>, children: any) => {
  console.log("Event:", event);
  console.log("Children:", children);
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Reports/Report Item",
  component: ReportItem,
} as ComponentMeta<typeof ReportItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ReportItem> = (args) => (
  <ReportItem {...args}>Report Name</ReportItem>
);

export const Primary = Template.bind({});
Primary.args = {clickHandler}
