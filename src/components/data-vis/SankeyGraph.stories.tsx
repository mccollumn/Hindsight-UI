import { ComponentStory, ComponentMeta } from "@storybook/react";
import SankeyGraph from "./SankeyGraph";

const sampleData = {
  nodes: [
    {
      id: "John",
      nodeColor: "hsl(90, 70%, 50%)",
    },
    {
      id: "Raoul",
      nodeColor: "hsl(317, 70%, 50%)",
    },
    {
      id: "Jane",
      nodeColor: "hsl(319, 70%, 50%)",
    },
    {
      id: "Marcel",
      nodeColor: "hsl(220, 70%, 50%)",
    },
    {
      id: "Ibrahim",
      nodeColor: "hsl(299, 70%, 50%)",
    },
    {
      id: "Junko",
      nodeColor: "hsl(146, 70%, 50%)",
    },
  ],
  links: [
    {
      source: "Marcel",
      target: "Ibrahim",
      value: 120,
    },
    {
      source: "Marcel",
      target: "John",
      value: 76,
    },
    {
      source: "Marcel",
      target: "Junko",
      value: 93,
    },
    {
      source: "Marcel",
      target: "Jane",
      value: 161,
    },
    {
      source: "Jane",
      target: "Ibrahim",
      value: 7,
    },
    {
      source: "Jane",
      target: "John",
      value: 131,
    },
    {
      source: "Jane",
      target: "Raoul",
      value: 62,
    },
    {
      source: "Jane",
      target: "Junko",
      value: 116,
    },
    {
      source: "Raoul",
      target: "John",
      value: 156,
    },
    {
      source: "Ibrahim",
      target: "Junko",
      value: 33,
    },
    {
      source: "John",
      target: "Ibrahim",
      value: 44,
    },
  ],
};

const config = {
  align: "justify",
  colors: { scheme: "category10" },
  nodeOpacity: 1,
  nodeHoverOthersOpacity: 0.35,
  nodeThickness: 18,
  nodeSpacing: 24,
  nodeBorderWidth: 0,
  nodeBorderColor: {
    from: "color",
    modifiers: [["darker", 0.8]],
  },
  nodeBorderRadius: 3,
  linkOpacity: 0.5,
  linkHoverOthersOpacity: 0.1,
  linkContract: 3,
  enableLinkGradient: true,
  labelPosition: "outside",
  labelOrientation: "vertical",
  labelPadding: 16,
  labelTextColor: {
    from: "color",
    modifiers: [["darker", 1]],
  },
  legends: [
    {
      anchor: "bottom-right",
      direction: "column",
      translateX: 130,
      itemWidth: 100,
      itemHeight: 14,
      itemDirection: "right-to-left",
      itemsSpacing: 2,
      itemTextColor: "#999",
      symbolSize: 14,
      effects: [
        {
          on: "hover",
          style: {
            itemTextColor: "#000",
          },
        },
      ],
    },
  ],
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Data Visualization/Sankey Graph",
  component: SankeyGraph,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    data: {
      defaultValue: sampleData,
    },
    config: {
      defaultValue: config,
    },
  },
} as ComponentMeta<typeof SankeyGraph>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SankeyGraph> = (args) => (
  <SankeyGraph {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: "Sankey Graph",
};
