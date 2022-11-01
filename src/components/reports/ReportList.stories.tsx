import { ComponentStory, ComponentMeta } from "@storybook/react";
import ReportList from "./ReportList";
import ReportItem from "./ReportItem";

const reportNames = [
  "Report 1",
  "Report 2",
  "Report 3",
  "Report 4",
  "Report 5",
  "Report with a long name that will exceed the maximum width of the element and cause the text to wrap",
  "Report 6",
  "Report 7",
  "Report 8",
];

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Reports/Report List",
  component: ReportList,
} as ComponentMeta<typeof ReportList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ReportList> = (args) => (
  <ReportList {...args}>
    {reportNames.map((report, index) => (
      <ReportItem
        clickHandler={() => {
          console.log("Report click:", report);
        }}
        key={index}
      >
        {report}
      </ReportItem>
    ))}
  </ReportList>
);

export const Primary = Template.bind({});
Primary.args = {open: true}