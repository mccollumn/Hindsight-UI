import { GRAPH_HEIGHT } from "../../constants/constants";
import { ResponsiveLine, Serie } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
const LineGraph = ({ data = [], config = {}, ...props }: LineGraphProps) => {
  console.log("LineGraph data:", data);
  return (
    <div style={{ height: GRAPH_HEIGHT }}>
      <ResponsiveLine {...config} data={data} {...props} />
    </div>
  );
};

interface LineGraphProps {
  data: Serie[];
  /**
   * https://nivo.rocks/line/
   */
  config?: any;
}

export default LineGraph;
