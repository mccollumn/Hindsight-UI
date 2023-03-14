import React, { useEffect, useState, useMemo } from "react";
import {
  getDate,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { useWtLineGraphQueries } from "./useWtLineGraphQueries";
import { useWtLineGraphData } from "./useWtLineGraphData";
import LineGraph from "./LineGraph";
import {
  ReportDefinitionProps,
  GridDimensionProps,
  WtLineProps,
} from "../../interfaces/interfaces";
import { getPrimaryMeasureFromReportDef } from "./lineGraph.util";
import { DateContext } from "../../providers/DateProvider";
import { CartesianMarkerProps } from "@nivo/core";

const WtLineGraph = ({
  reportDefinition,
  dimensions = [],
  selectedCell = {},
  config = {},
  requestControllersCallback,
  ...props
}: WtLineGraphProps) => {
  const { trendInterval, startDate, endDate } = React.useContext(DateContext);
  const defaultGraphOptions = useMemo(() => {
    console.log("WtLineGraph dimensions:", dimensions);
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
        legendOffset: -45,
        legendPosition: "middle",
      },
      axisBottom: {
        format: formatTimeAxis(trendInterval),
        tickValues: formatTickValues(trendInterval),
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 90,
      },
      enableArea: false,
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
          translateY: 75,
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
  }, [
    dimensions,
    selectedCell.selectedColumn,
    reportDefinition,
    trendInterval,
  ]);

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
    ...addDateRangeMarkers(startDate, endDate, trendInterval),
  });

  useEffect(() => {
    setGraphOptions({
      ...defaultGraphOptions,
      ...config,
      ...addDateRangeMarkers(startDate, endDate, trendInterval),
    });
  }, [config, defaultGraphOptions, endDate, startDate, trendInterval]);

  return (
    <React.Fragment>
      <LineGraph data={lineGraphData} config={graphOptions} {...props} />
    </React.Fragment>
  );
};

const formatPointLabels = (obj: any) => {
  return obj.point.data.yFormatted;
};

const formatTimeAxis = (interval: string | null) => {
  const formats: any = {
    monthly: "%b %Y",
    weekly: "%b %d",
    daily: "%a %d",
    hourly: "%I %p",
  };
  if (interval === null) {
    return formats.daily;
  }
  return formats[interval];
};

const formatTickValues = (interval: string | null) => {
  const formats: any = {
    monthly: "every month",
    weekly: "every week",
    daily: "every 2 days",
    hourly: "every hour",
  };
  if (interval === null) {
    return formats.daily;
  }
  return formats[interval];
};

const addWeeklyMarkers = (
  startDate: Date,
  endDate: Date,
  markersObj: any,
  startMarker: CartesianMarkerProps,
  endMarker: CartesianMarkerProps
) => {
  if (getDate(startDate) !== getDate(startOfWeek(startDate))) {
    markersObj.markers.push(startMarker);
  }
  if (getDate(endDate) !== getDate(endOfWeek(endDate))) {
    markersObj.markers.push(endMarker);
  }
};

const addMonthlyMarkers = (
  startDate: Date,
  endDate: Date,
  markersObj: any,
  startMarker: CartesianMarkerProps,
  endMarker: CartesianMarkerProps
) => {
  if (getDate(startDate) !== getDate(startOfMonth(startDate))) {
    markersObj.markers.push(startMarker);
  }
  if (getDate(endDate) !== getDate(endOfMonth(endDate))) {
    markersObj.markers.push(endMarker);
  }
};

const addDateRangeMarkers = (
  startDate: Date,
  endDate: Date,
  interval: string | null
) => {
  if (interval === "daily" || interval === "hourly") return;
  const markersObj: markersObjProps = { markers: [] };
  const markerCommon: Omit<CartesianMarkerProps, "value"> = {
    axis: "x",
    legendPosition: "top",
    lineStyle: { stroke: "gray", strokeWidth: 2 },
    textStyle: { fill: "gray", fontSize: "10" },
  };
  const startMarker: CartesianMarkerProps = {
    value: startDate,
    legend: startDate.toLocaleDateString(),
    ...markerCommon,
  };
  const endMarker: CartesianMarkerProps = {
    value: endDate,
    legend: endDate.toLocaleDateString(),
    ...markerCommon,
  };
  if (interval === "weekly") {
    addWeeklyMarkers(startDate, endDate, markersObj, startMarker, endMarker);
  }
  if (interval === "monthly") {
    addMonthlyMarkers(startDate, endDate, markersObj, startMarker, endMarker);
  }
  return markersObj;
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

interface markersObjProps {
  markers: CartesianMarkerProps[];
}

export interface selectedCellProps {
  primaryColumn: string;
  selectedColumn: string;
  primaryDimension: string;
  selectedDimension: string;
}

export default WtLineGraph;
