import { ComponentStory, ComponentMeta } from "@storybook/react";
import DataTable from "./DataTable";
import {
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid-premium";

const columns: GridColDef[] = [
  {
    field: "Views",
    sortingOrder: ["desc"],
  },
  {
    field: "Visits",
    sortingOrder: [],
  },
];

const rows: GridRowsProp = [
  {
    Dimensions: ["Google Chrome"],
    id: "Google Chrome",
    Views: 1064,
    Visits: 620,
  },
  {
    Dimensions: ["Google Chrome", "108.0.0.0"],
    id: "Google Chrome,108.0.0.0",
    Views: 708,
    Visits: 377,
  },
  {
    Dimensions: ["Google Chrome", "99.0.4844.82"],
    id: "Google Chrome,99.0.4844.82",
    Views: 34,
    Visits: 33,
  },
  {
    Dimensions: ["Google Chrome", "87.0.4280.88"],
    id: "Google Chrome,87.0.4280.88",
    Views: 16,
    Visits: 16,
  },
  {
    Dimensions: ["Safari"],
    id: "Safari",
    Views: 245,
    Visits: 176,
  },
  {
    Dimensions: ["Safari", "16.1"],
    id: "Safari,16.1",
    Views: 76,
    Visits: 52,
  },
  {
    Dimensions: ["Safari", "16.2"],
    id: "Safari,16.2",
    Views: 41,
    Visits: 27,
  },
  {
    Dimensions: ["Safari", "604.1"],
    id: "Safari,604.1",
    Views: 35,
    Visits: 27,
  },
  {
    Dimensions: ["Spiders"],
    id: "Spiders",
    Views: 216,
    Visits: 78,
  },
  {
    Dimensions: ["Spiders", "5.0"],
    id: "Spiders,5.0",
    Views: 216,
    Visits: 78,
  },
  {
    Dimensions: ["Microsoft Edge Chromium"],
    id: "Microsoft Edge Chromium",
    Views: 165,
    Visits: 69,
  },
  {
    Dimensions: ["Microsoft Edge Chromium", "108.0.1462.54"],
    id: "Microsoft Edge Chromium,108.0.1462.54",
    Views: 152,
    Visits: 61,
  },
  {
    Dimensions: ["Microsoft Edge Chromium", "108.0.1462.42"],
    id: "Microsoft Edge Chromium,108.0.1462.42",
    Views: 4,
    Visits: 3,
  },
  {
    Dimensions: ["Microsoft Edge Chromium", "108.0.1462.46"],
    id: "Microsoft Edge Chromium,108.0.1462.46",
    Views: 5,
    Visits: 3,
  },
  {
    Dimensions: ["Firefox"],
    id: "Firefox",
    Views: 63,
    Visits: 31,
  },
  {
    Dimensions: ["Firefox", "108.0"],
    id: "Firefox,108.0",
    Views: 54,
    Visits: 27,
  },
  {
    Dimensions: ["Firefox", "109.0"],
    id: "Firefox,109.0",
    Views: 2,
    Visits: 1,
  },
  {
    Dimensions: ["Microsoft Internet Explorer"],
    id: "Microsoft Internet Explorer",
    Views: 4,
    Visits: 3,
  },
  {
    Dimensions: ["Microsoft Internet Explorer", "11.0"],
    id: "Microsoft Internet Explorer,11.0",
    Views: 4,
    Visits: 3,
  },
  {
    Dimensions: ["Other Netscape Compatible"],
    id: "Other Netscape Compatible",
    Views: 2,
    Visits: 2,
  },
  {
    Dimensions: ["Other Netscape Compatible", "5.0"],
    id: "Other Netscape Compatible,5.0",
    Views: 2,
    Visits: 2,
  },
  {
    Dimensions: ["Microsoft Edge"],
    id: "Microsoft Edge",
    Views: 1,
    Visits: 1,
  },
  {
    Dimensions: ["Microsoft Edge", "18.17763"],
    id: "Microsoft Edge,18.17763",
    Views: 1,
    Visits: 1,
  },
  {
    Dimensions: ["Microsoft Edge (Android)"],
    id: "Microsoft Edge (Android)",
    Views: 7,
    Visits: 1,
  },
  {
    Dimensions: ["Microsoft Edge (Android)", "108.0.1462.54"],
    id: "Microsoft Edge (Android),108.0.1462.54",
    Views: 7,
    Visits: 1,
  },
];

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Data Visualization/MUI Data Table",
  component: DataTable,
} as ComponentMeta<typeof DataTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DataTable> = (args) => (
  <DataTable {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  config: {
    rows: rows,
    columns: columns,
    slots: { toolbar: GridToolbar },
    treeData: true,
    getTreeDataPath: (row) => row.Dimensions,
  },
};
