import { ComponentStory, ComponentMeta } from "@storybook/react";
import FunnelGraph from "./FunnelGraph";

const sampleData = [
  {
    id: "step_sent",
    value: 83233,
    label: "Sent",
  },
  {
    id: "step_viewed",
    value: 72170,
    label: "Viewed",
  },
  {
    id: "step_clicked",
    value: 49758,
    label: "Clicked",
  },
  {
    id: "step_add_to_card",
    value: 44420,
    label: "Add To Card",
  },
  {
    id: "step_purchased",
    value: 35453,
    label: "Purchased",
  },
];

const config = {
  valueFormat: ">-.4s",
  colors: { scheme: "spectral" },
  borderWidth: 20,
  labelColor: {
    from: "color",
    modifiers: [["darker", 3]],
  },
  beforeSeparatorLength: 100,
  beforeSeparatorOffset: 20,
  afterSeparatorLength: 100,
  afterSeparatorOffset: 20,
  currentPartSizeExtension: 10,
  currentBorderWidth: 40,
  motionConfig: "wobbly",
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Data Visualization/Funnel Graph",
  component: FunnelGraph,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    data: {
      defaultValue: sampleData,
    },
    config: {
      defaultValue: config,
    },
  },
} as ComponentMeta<typeof FunnelGraph>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FunnelGraph> = (args) => (
  <FunnelGraph {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: "Funnel Graph",
};
