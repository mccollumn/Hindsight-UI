import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ReportModal from "./ReportModal";
import { profiles } from "../../mock-data/profiles";
import { reports } from "../../mock-data/reports";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Reports/Report Modal",
  component: ReportModal,
} as ComponentMeta<typeof ReportModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ReportModal> = (args) => (
  <ReportModal {...args} />
);

export const Primary = Template.bind({});
Primary.args = { isOpen: true, profile: profiles[0], report: reports[0] };
