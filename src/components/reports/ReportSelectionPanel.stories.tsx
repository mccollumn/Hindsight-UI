import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ReportSelectionPanel from "./ReportSelectionPanel";
import { reports } from "../../../mock-data/reports";
import { ProfileReportsProps } from "../../interfaces/interfaces";

const handleSelection = (selectedReport: ProfileReportsProps) => {
  console.log("Selected Report:", selectedReport);
}

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Reports/Report Selection Panel",
  component: ReportSelectionPanel,
} as ComponentMeta<typeof ReportSelectionPanel>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ReportSelectionPanel> = (args) => (
  <ReportSelectionPanel {...args} />
);

// 👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = { reports: reports, handleSelection};
