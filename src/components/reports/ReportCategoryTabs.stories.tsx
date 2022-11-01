import { ComponentStory, ComponentMeta } from "@storybook/react";
import ReportCategoryTabs from "./ReportCategoryTabs";

const categories = [
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
  "Category 5",
  "Category with a long name that will exceed the maximum width of the element and cause the text to wrap",
  "Category 6",
  "Category 7",
  "Category 8",
];

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Reports/Report Category Tabs",
  component: ReportCategoryTabs,
} as ComponentMeta<typeof ReportCategoryTabs>;

const clickHandler = (value: any) => console.log("Tab index:", value);

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ReportCategoryTabs> = (args) => (
  <ReportCategoryTabs {...args} />
);

export const Primary = Template.bind({});
Primary.args = { categories: categories, clickHandler: clickHandler };
