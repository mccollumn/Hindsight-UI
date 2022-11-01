import React from "react";
import Title from "../Title";
import { ResponsiveFunnel, FunnelDatum } from "@nivo/funnel";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const FunnelGraph = ({
  data = [],
  config = {},
  title = "",
}: FunnelGraphProps) => (
  <React.Fragment>
    <Title>{title}</Title>
    <div style={{ height: 400 }}>
      <ResponsiveFunnel
        {...config}
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        // valueFormat=">-.4s"
        // colors={{ scheme: "spectral" }}
        // borderWidth={20}
        // labelColor={{
        //   from: "color",
        //   modifiers: [["darker", 3]],
        // }}
        // beforeSeparatorLength={100}
        // beforeSeparatorOffset={20}
        // afterSeparatorLength={100}
        // afterSeparatorOffset={20}
        // currentPartSizeExtension={10}
        // currentBorderWidth={40}
        // motionConfig="wobbly"
      />
    </div>
  </React.Fragment>
);

interface FunnelGraphProps {
  data: FunnelDatum[];
  /**
   * https://nivo.rocks/funnel/
   */
  config?: any;
  title?: String;
}

export default FunnelGraph;
