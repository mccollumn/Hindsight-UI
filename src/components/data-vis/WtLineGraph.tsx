import React, { useEffect, useState } from "react";
import LineGraph from "./LineGraph";
import {
  ReportDefinitionProps,
  GridDimensionProps,
  WtLineProps,
} from "../../interfaces/interfaces";
import {
  getSearchString,
  getLineGraphData,
  getTrendPeriods,
  getPrimaryMeasureFromReportDef,
} from "./lineGraph.util";
import { Serie } from "@nivo/line";
import { DateContext } from "../../providers/DateProvider";
import useGetData from "../../hooks/getData";
import { useQueries } from "@tanstack/react-query";

const WtLineGraph = ({
  reportDefinition,
  dimensions = [],
  config = {},
  requestControllersCallback,
  ...props
}: WtLineGraphProps) => {
  const defaultGraphOptions = {
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
      legend: getPrimaryMeasureFromReportDef(reportDefinition).name,
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

  const { wtStartDate, wtEndDate } = React.useContext(DateContext);
  const [gridDimensions, setGridDimensions] = useState<any[]>([]);
  const [searchString, setSearchString] = useState("");
  const [profileID, setProfileID] = useState(reportDefinition?.profileID);
  const [reportID, setReportID] = useState(reportDefinition?.ID);
  const [measure, setMeasure] = useState("measure1");
  const [periods, setPeriods] = useState(
    getTrendPeriods({ wtStartPeriod: wtStartDate, wtEndPeriod: wtEndDate })
  );
  const [lineGraphData, setLineGraphData] = useState<Serie[]>([]);
  const [graphOptions, setGraphOptions] = useState({
    ...defaultGraphOptions,
    ...config,
  });
  const { cancelAllRequests, getWtData } = useGetData();

  if (requestControllersCallback) {
    requestControllersCallback(cancelAllRequests);
  }

  // Generate search string from Dimensions
  useEffect(() => {
    if (dimensions.length !== 0) {
      setSearchString(getSearchString(dimensions));
    }
  }, [dimensions]);

  useEffect(() => {
    if (reportDefinition === null || reportDefinition === undefined) return;
    // Get profile ID
    setProfileID(reportDefinition?.profileID);
    // Get report ID
    setReportID(reportDefinition?.ID);
    // Get periods for trend
    setPeriods(
      getTrendPeriods({ wtStartPeriod: wtStartDate, wtEndPeriod: wtEndDate })
    );
  }, [reportDefinition, wtEndDate, wtStartDate]);

  const trendDataQueries = useQueries({
    queries: periods.map((period) => {
      const params = { ...period, range: 5 /*search: searchString*/ };
      return {
        queryKey: [
          "report",
          { profileID: profileID, reportID: reportID, params: params },
        ],
        queryFn: () =>
          getWtData({
            profileID: profileID,
            reportID: reportID,
            params: params,
          }),
        // onSuccess: (data: any) => {
        //   addTrendData(data);
        // },
        staleTime: 30 * 60 * 1000,
      };
    }),
  });

  const addTrendData = React.useCallback(
    (data: any) => {
      if (!data) return;
      let graphData = lineGraphData;
      const newData = getLineGraphData(data);
      if (isMerged(graphData, newData)) return;
      const merged = mergeLineData(graphData, newData);
      graphData = merged;
      setLineGraphData(graphData);
    },
    [lineGraphData]
  );

  React.useEffect(() => {
    trendDataQueries.forEach(({ data }) => {
      addTrendData(data);
    });
  }, [addTrendData, trendDataQueries]);

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
   * Nivo line graph options
   * https://nivo.rocks/line/
   */
  config?: WtLineProps;
  /**
   * cancelAllRequests function from useGetData
   */
  requestControllersCallback?: (cancelAllRequests: any) => void;
}

export default WtLineGraph;
