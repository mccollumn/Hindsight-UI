import { ComponentStory, ComponentMeta } from "@storybook/react";
import LineGraph from "./LineGraph";

const sampleData = [
  {
    id: "fake corp. A",
    data: [
      { x: "2018-01-01", y: 7 },
      { x: "2018-01-02", y: 5 },
      { x: "2018-01-03", y: 11 },
      { x: "2018-01-04", y: 9 },
      { x: "2018-01-05", y: 12 },
      { x: "2018-01-06", y: 16 },
      { x: "2018-01-07", y: 13 },
      { x: "2018-01-08", y: 13 },
    ],
  },
  {
    id: "fake corp. B",
    data: [
      { x: "2018-01-04", y: 14 },
      { x: "2018-01-05", y: 14 },
      { x: "2018-01-06", y: 15 },
      { x: "2018-01-07", y: 11 },
      { x: "2018-01-08", y: 10 },
      { x: "2018-01-09", y: 12 },
      { x: "2018-01-10", y: 9 },
      { x: "2018-01-11", y: 7 },
    ],
  },
];

const config = {
  xScale: {
    type: "time",
    format: "%Y-%m-%d",
    useUTC: false,
    precision: "day",
  },
  xFormat: "time:%Y-%m-%d",
  yScale: {
    type: "linear",
  },
  axisLeft: {
    legend: "linear scale",
    legendOffset: 12,
  },
  axisBottom: {
    format: "%b %d",
    tickValues: "every 2 days",
    legend: "time scale",
    legendOffset: -12,
  },
  enablePointLabel: true,
  pointSize: 10,
  pointBorderWidth: 1,
  pointBorderColor: {
    from: "color",
    modifiers: [["darker", 0.3]],
  },
  useMesh: true,
  enableSlices: false,
  legends: [
    {
      anchor: "bottom-right",
      direction: "column",
      justify: false,
      translateX: 100,
      translateY: 0,
      itemsSpacing: 0,
      itemDirection: "left-to-right",
      itemWidth: 80,
      itemHeight: 20,
      itemOpacity: 0.75,
      symbolSize: 12,
      symbolShape: "circle",
      symbolBorderColor: "rgba(0, 0, 0, .5)",
      effects: [
        {
          on: "hover",
          style: {
            itemBackground: "rgba(0, 0, 0, .03)",
            itemOpacity: 1,
          },
        },
      ],
    },
  ],
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Data Visualization/Line Graph",
  component: LineGraph,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    data: {
      defaultValue: sampleData,
    },
    config: {
      defaultValue: config,
    },
  },
} as ComponentMeta<typeof LineGraph>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LineGraph> = (args) => (
  <LineGraph {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
