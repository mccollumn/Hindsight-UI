import React, { useEffect, useState, useMemo } from "react";
import { useWtLineGraphData } from "./useWtLineGraphData";
import LineGraph from "./LineGraph";
import {
  ReportDefinitionProps,
  GridDimensionProps,
  WtLineProps,
  ReportProps,
} from "../../interfaces/interfaces";
import {
  getSearchString,
  getLineGraphData,
  getPrimaryMeasureFromReportDef,
} from "./lineGraph.util";
import { Serie } from "@nivo/line";
import { isEmpty } from "lodash/fp";

const WtLineGraph = ({
  reportDefinition,
  reportData,
  dimensions = [],
  selectedCell = {},
  config = {},
  requestControllersCallback,
  ...props
}: WtLineGraphProps) => {
  const [searchString, setSearchString] = useState("");
  const { trendDataQueries } = useWtLineGraphData(
    reportDefinition,
    requestControllersCallback
  );

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

  const [lineGraphData, setLineGraphData] = useState<Serie[]>([]);
  const [graphOptions, setGraphOptions] = useState({
    ...defaultGraphOptions,
    ...config,
  });

  // Generate search string
  useEffect(() => {
    if (dimensions.length !== 0) {
      const primaryDimension = [dimensions[0]];
      setSearchString(getSearchString(primaryDimension));
    }
    if (!isEmpty(selectedCell)) {
      setSearchString(selectedCell.selectedDimension);
    }
  }, [dimensions, selectedCell]);

  React.useEffect(() => {
    const addTrendData = (data: any) => {
      if (!data) return;
      if (!isEmpty(selectedCell)) {
        lineGraphData.forEach((element) => {
          if (element.id !== selectedCell.selectedDimension) {
            setLineGraphData([]);
          }
        });
      }
      const newData = getLineGraphData(
        data,
        searchString,
        selectedCell.selectedColumn
      );
      if (isMerged(lineGraphData, newData)) {
        if (isDataAlreadyIncluded(lineGraphData, newData)) {
          return;
        }
        setLineGraphData([]);
        return;
      }
      setLineGraphData(mergeLineData(lineGraphData, newData));
    };
    trendDataQueries.forEach(({ data }) => {
      addTrendData(data);
    });
  }, [selectedCell, trendDataQueries, lineGraphData, searchString]);

  useEffect(() => {
    setGraphOptions({
      ...defaultGraphOptions,
      ...config,
    });
  }, [config, defaultGraphOptions]);

  console.log("Selection:", selectedCell);

  return (
    <React.Fragment>
      <LineGraph data={lineGraphData} config={graphOptions} {...props} />
    </React.Fragment>
  );
};

const isMerged = (graphData: any, newData: any) => {
  if (newData.length === 0) {
    return true;
  }
  if (graphData.length === 0) {
    return false;
  }
  return graphData[0].data.some((p: any) => p.x === newData[0].data[0].x);
};

const sortByDate = async (data: any[]) => {
  return data.sort((a: any, b: any) => {
    const aDate = new Date(a.x);
    const bDate = new Date(b.x);
    if (aDate > bDate) {
      return 1;
    }
    if (aDate < bDate) {
      return -1;
    }
    return 0;
  });
};

const mergeLineData = (data: Serie[], newData: Serie[]) => {
  if (data.length === 0) {
    return newData;
  }
  return data.map((item: any) => {
    newData.forEach(async (point: any) => {
      if (point.id === item.id) {
        item.data.push(point.data[0]);
      }
      await sortByDate(item.data);
    });
    return item;
  });
};

const formatPointLabels = (obj: any) => {
  return obj.point.data.yFormatted;
};

const isDataAlreadyIncluded = (graphData: any, newData: any) => {
  const x = graphData[0]?.data.find(
    (element: any) => element.x === newData[0].data[0].x
  );
  return x && x.y === newData[0].data[0].y;
};

interface WtLineGraphProps {
  /**
   * Report definition JSON from the WT Analytics OP Dx API v2
   * https://onpremises.webtrends.help/docs/get-report-definition
   */
  reportDefinition: ReportDefinitionProps;
  /**
   * Aggregate data for the report period (i.e. what's displayed in the table).
   * JSON output from the WT Analytics OP DX API v2.
   * https://onpremises.webtrends.help/docs/about-the-data-extraction-api
   */
  reportData: ReportProps;
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

interface selectedCellProps {
  primaryColumn: string;
  selectedColumn: string;
  primaryDimension: string;
  selectedDimension: string;
}

export default WtLineGraph;
