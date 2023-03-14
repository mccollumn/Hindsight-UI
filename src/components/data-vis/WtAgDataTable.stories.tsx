import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import WtAgDataTable from "./WtAgDataTable";
import {
  pageData,
  referringSiteData,
  browserVersionsData,
} from "../../mocks/data/agg";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Data Visualization/WT AG Data Table",
  component: WtAgDataTable,
} as ComponentMeta<typeof WtAgDataTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WtAgDataTable> = (args) => (
  <WtAgDataTable {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = { data: pageData };
