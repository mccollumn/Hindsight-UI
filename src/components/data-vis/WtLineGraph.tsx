import React, { useEffect, useState, useMemo } from "react";
import { useWtLineGraphQueries } from "./useWtLineGraphQueries";
import { useWtLineGraphData } from "./useWtLineGraphData";
import LineGraph from "./LineGraph";
import {
  ReportDefinitionProps,
  GridDimensionProps,
  WtLineProps,
} from "../../interfaces/interfaces";
import { getPrimaryMeasureFromReportDef } from "./lineGraph.util";

const WtLineGraph = ({
  reportDefinition,
  dimensions = [],
  selectedCell = {},
  config = {},
  requestControllersCallback,
  ...props
}: WtLineGraphProps) => {
  const defaultGraphOptions = useMemo(() => {
    return {
      margin: { top: 20, right: 50, bottom: 100, left: 50 },
      xScale: {
        type: "time",
        format: "%Y-%m-%d",
        useUTC: false,
        precision: "day",
      },
      xFormat: "time:%Y-%m-%d",
      yScale: {
        type: "linear",
        min: 0,
        max: "auto",
        stacked: false,
        reverse: false,
      },
      // yFormat: " >-.2f",
      axisLeft: {
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend:
          selectedCell.selectedColumn ||
          getPrimaryMeasureFromReportDef(reportDefinition).name,
        legendOffset: -40,
        legendPosition: "middle",
      },
      axisBottom: {
        format: "%b %d",
        tickValues: "every 2 days",
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 90,
      },
      enablePointLabel: false,
      pointSize: 10,
      pointBorderWidth: 1,
      pointBorderColor: {
        from: "color",
        modifiers: [["darker", 0.3]],
      },
      useMesh: true,
      enableSlices: false,
      tooltip: formatPointLabels,
      legends: [
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 70,
          itemsSpacing: 5,
          itemDirection: "left-to-right",
          itemWidth: 150,
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
  }, [reportDefinition, selectedCell.selectedColumn]);

  const { trendDataQueries } = useWtLineGraphQueries(
    reportDefinition,
    requestControllersCallback
  );
  const { lineGraphData } = useWtLineGraphData(
    dimensions,
    selectedCell,
    trendDataQueries
  );
  const [graphOptions, setGraphOptions] = useState({
    ...defaultGraphOptions,
    ...config,
  });

  useEffect(() => {
    setGraphOptions({
      ...defaultGraphOptions,
      ...config,
    });
  }, [config, defaultGraphOptions]);

  return (
    <React.Fragment>
      <LineGraph data={lineGraphData} config={graphOptions} {...props} />
    </React.Fragment>
  );
};

const formatPointLabels = (obj: any) => {
  return obj.point.data.yFormatted;
};

interface WtLineGraphProps {
  /**
   * Report definition JSON from the WT Analytics OP Dx API v2
   * https://onpremises.webtrends.help/docs/get-report-definition
   */
  reportDefinition: ReportDefinitionProps;
  /**
   * Array of dimensions
   */
  dimensions?: GridDimensionProps[];
  /**
   * Cell currently selected in the data table
   */
  selectedCell?: selectedCellProps | Record<string, never>;
  /**
   * Nivo line graph options
   * https://nivo.rocks/line/
   */
  config?: WtLineProps;
  /**
   * cancelAllRequests function from useGetData
   */
  requestControllersCallback?: (cancelAllRequests: any) => void;
}

export interface selectedCellProps {
  primaryColumn: string;
  selectedColumn: string;
  primaryDimension: string;
  selectedDimension: string;
}

export default WtLineGraph;
