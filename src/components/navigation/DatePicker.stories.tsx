import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DatePicker from "./DatePicker";
import { DateRange } from "@mui/x-date-pickers-pro/DateRangePicker";

const handleDateChange = (newDateRange: DateRange<any>[]) => {
  console.log("Date range:", newDateRange);
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Navigation/Date Picker",
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DatePicker> = (args) => (
  <DatePicker {...args} />
);

export const Primary = Template.bind({});
Primary.args = { handleDateChange, minDate: null, maxDate: null };
