import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KeyMetricsDashboard from "./KeyMetricsDashboard";
import { keyMetrics } from "../../mock-data/keyMetrics";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Reports/Key Metrics Dashboard",
  component: KeyMetricsDashboard,
} as ComponentMeta<typeof KeyMetricsDashboard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof KeyMetricsDashboard> = (args) => (
  <KeyMetricsDashboard {...args} />
);

export const Primary = Template.bind({});
Primary.args = { keyMetricsData: keyMetrics };
