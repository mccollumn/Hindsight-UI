import React from "react";
import { DefaultLink, DefaultNode, ResponsiveSankey } from "@nivo/sankey";
import Title from "../Title";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const SankeyGraph = ({
  data = { nodes: [], links: [] },
  config = {},
  title = "",
}: SankeyGraphProps) => (
  <React.Fragment>
    <Title>{title}</Title>
    <div style={{ height: 400 }}>
      <ResponsiveSankey
        {...config}
        data={data}
        margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
      />
    </div>
  </React.Fragment>
);

interface SankeyGraphProps {
  // data: SankeyDataProps<DefaultNode, DefaultLink>;
  data: {
    nodes: DefaultNode[];
    links: DefaultLink[];
  };
  /**
   * https://nivo.rocks/sankey/
   */
  config?: any;
  title?: String;
}

export default SankeyGraph;
