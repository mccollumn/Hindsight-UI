import { ComponentStory, ComponentMeta } from "@storybook/react";
import KeyMetrics from "./KeyMetrics";
import { ProfileReportsProps } from "../interfaces/interfaces";
import {keyMetrics} from "../mock-data/keyMetrics.js"
import { reports } from "../mock-data/reports";

const handleSelection = (selectedReport: ProfileReportsProps) => {
  console.log("Selected Report:", selectedReport);
}

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Pages/Key Metrics",
  component: KeyMetrics,
} as ComponentMeta<typeof KeyMetrics>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof KeyMetrics> = (args) => (
  <KeyMetrics {...args} />
);

// 👇 Each story then reuses that template
export const KeyMetricsPage = Template.bind({});
KeyMetricsPage.args = { keyMetricsData: keyMetrics, profileName: "My Profile", reports: reports, handleSelection: handleSelection};
