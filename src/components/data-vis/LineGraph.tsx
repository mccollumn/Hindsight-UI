import { GRAPH_HEIGHT } from "../../constants/constants";
import { ResponsiveLine, Serie } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
const LineGraph = ({ data = [], config = {}, ...props }: LineGraphProps) => {
  return (
    <div style={{ height: GRAPH_HEIGHT, position: "relative", top: "-30px" }}>
      <ResponsiveLine {...config} data={data} {...props} />
    </div>
  );
};

interface LineGraphProps {
  data?: Serie[];
  /**
   * Additional configuration object to be spread into ResponsiveLine props
   * https://nivo.rocks/line/
   */
  config?: any;
  [key: string]: any;
}

export default LineGraph;
