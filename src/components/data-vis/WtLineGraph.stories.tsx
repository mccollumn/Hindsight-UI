import { ComponentStory, ComponentMeta } from "@storybook/react";
import WtLineGraph from "./WtLineGraph";
import { reportDefinition } from "../../mocks/data/reportDefinition";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { handlers } from "../../mocks/handlers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

// const config = {
//   xScale: {
//     type: "time",
//     format: "%Y-%m-%d",
//     useUTC: false,
//     precision: "day",
//   },
//   xFormat: "time:%Y-%m-%d",
//   yScale: {
//     type: "linear",
//   },
//   axisLeft: {
//     // legend: "linear scale",
//     legendOffset: 12,
//   },
//   axisBottom: {
//     format: "%b %d",
//     tickValues: "every 2 days",
//     // legend: "time scale",
//     legendOffset: -12,
//   },
//   enablePointLabel: true,
//   pointSize: 10,
//   pointBorderWidth: 1,
//   pointBorderColor: {
//     from: "color",
//     modifiers: [["darker", 0.3]],
//   },
//   useMesh: true,
//   enableSlices: false,
//   legends: [
//     {
//       anchor: "bottom-right",
//       direction: "column",
//       justify: false,
//       translateX: 100,
//       translateY: 0,
//       itemsSpacing: 0,
//       itemDirection: "left-to-right",
//       itemWidth: 80,
//       itemHeight: 20,
//       itemOpacity: 0.75,
//       symbolSize: 12,
//       symbolShape: "circle",
//       symbolBorderColor: "rgba(0, 0, 0, .5)",
//       effects: [
//         {
//           on: "hover",
//           style: {
//             itemBackground: "rgba(0, 0, 0, .03)",
//             itemOpacity: 1,
//           },
//         },
//       ],
//     },
//   ],
// };

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Data Visualization/WT Line Graph",
  component: WtLineGraph,
} as ComponentMeta<typeof WtLineGraph>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WtLineGraph> = (args) => (
  <QueryClientProvider client={queryClient}>
    <WtLineGraph {...args} />
  </QueryClientProvider>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  reportDefinition: reportDefinition,
};

Primary.parameters = {
  msw: {
    handlers: handlers,
  },
};
