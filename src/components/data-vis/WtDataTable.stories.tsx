import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import WtDataTable from "./WtDataTable";
import {
  pageData,
  referringSiteData,
  browserVersionsData,
} from "../../../mock-data/agg";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Data Visualization/WT Data Table",
  component: WtDataTable,
} as ComponentMeta<typeof WtDataTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WtDataTable> = (args) => (
  <WtDataTable {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = { data: pageData };
