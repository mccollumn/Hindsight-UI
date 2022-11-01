import { ComponentStory, ComponentMeta } from "@storybook/react";
import DataTable from "./DataTable";

const sampleData = [
  { make: "Porsche", model: "Boxter", price: 72000 },
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Toyota", model: "Celica", price: 35000 },
  { make: "Toyota", model: "Celica", price: 35000 },
];

const columnDefs = [
  { field: "make", filter: true },
  { field: "model", filter: true },
  { field: "price" },
];

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Data Visualization/Data Table",
  component: DataTable,
} as ComponentMeta<typeof DataTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DataTable> = (args) => (
  <div className="ag-theme-alpine" style={{ height: 300 }}>
    <DataTable {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {data: sampleData, columns: columnDefs};
