import { ResponsiveLine, Serie } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
const LineGraph = ({ data = [], config = {}, ...props }: LineGraphProps) => {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        {...config}
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        {...props}
      />
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
