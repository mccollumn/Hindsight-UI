import React, { useEffect, useState, useMemo } from "react";
import LineGraph from "./LineGraph";
import {
  ReportProps,
  GridDimensionProps,
  DimensionProps,
  WtLineProps,
} from "../../interfaces/interfaces";
import {
  getSearchString,
  getDateRange,
  getProfileID,
  getReportID,
  getLineGraphData,
  getTrendPeriods,
} from "./lineGraph.util";
import useGetData from "../../hooks/getData";
import { Serie } from "@nivo/line";

const WtLineGraph = ({
  data,
  dimensions = [],
  config = {},
  ...props
}: WtLineGraphProps) => {
  const [gridDimensions, setGridDimensions] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState<DimensionProps["Range"]>(
    getDateRange(data)
  );
  const [searchString, setSearchString] = useState("");
  const [profileID, setProfileID] = useState(getProfileID(data));
  const [reportID, setReportID] = useState(getReportID(data));
  const [measure, setMeasure] = useState("measure1");
  const [periods, setPeriods] = useState(getTrendPeriods(data));
  const [lineGraphData, setLineGraphData] = useState<Serie[]>([]);

  const [graphOptions, setGraphOptions] = useState({
    ...defaultGraphOptions,
    ...config,
  });

  // Generate search string from Dimensions
  useEffect(() => {
    if (dimensions.length !== 0) {
      setSearchString(getSearchString(dimensions));
    }
  }, [dimensions]);

  useEffect(() => {
    if (data === null || data === undefined) return;
    // Get date range
    setDateRange(getDateRange(data));
    // Get profile ID
    setProfileID(getProfileID(data));
    // Get report ID
    setReportID(getReportID(data));
    // Get periods for trend
    setPeriods(getTrendPeriods(data));
  }, [data]);

  const { response, loading, error, status, getWtData } = useGetData();

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

  const mergeLineData = React.useCallback((data: Serie[], newData: Serie[]) => {
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
  }, []);

  const getTrendData = React.useCallback(async () => {
    if (periods === undefined) return;
    let graphData = lineGraphData;
    periods?.forEach(async (period) => {
      const params = { ...period, range: 5 /*search: searchString*/ };
      const res = await getWtData({ params, profileID, reportID });
      const newData = getLineGraphData(res);
      const merged = mergeLineData(graphData, newData);
      graphData = merged;
      setLineGraphData(graphData);
    });
  }, [getWtData, lineGraphData, mergeLineData, periods, profileID, reportID]);

  useEffect(() => {
    // If the report has no data then don't make requests for trend periods.
    if (data === undefined || Object.values(data.data)[0].SubRows === undefined)
      return;
    if (profileID && reportID && periods) {
      getTrendData();
    }
    // }, [profileID, reportID, periods, getTrendData, data]);
  }, [profileID, reportID, periods, data]);

  return (
    <React.Fragment>
      <div style={{ height: 400 }}>
        <LineGraph data={lineGraphData} config={graphOptions} {...props} />
      </div>
    </React.Fragment>
  );
};

const defaultGraphOptions = {
  xScale: {
    type: "time",
    format: "%Y-%m-%d",
    useUTC: false,
    precision: "day",
  },
  xFormat: "time:%Y-%m-%d",
  yScale: {
    type: "linear",
  },
  axisLeft: {
    // legend: "linear scale",
    legendOffset: 12,
  },
  axisBottom: {
    format: "%b %d",
    tickValues: "every 2 days",
    // legend: "time scale",
    legendOffset: -12,
  },
  enablePointLabel: true,
  pointSize: 10,
  pointBorderWidth: 1,
  pointBorderColor: {
    from: "color",
    modifiers: [["darker", 0.3]],
  },
  useMesh: true,
  enableSlices: false,
  legends: [
    {
      anchor: "bottom-right",
      direction: "column",
      justify: false,
      translateX: 100,
      translateY: 0,
      itemsSpacing: 0,
      itemDirection: "left-to-right",
      itemWidth: 80,
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

interface WtLineGraphProps {
  /**
   * JSON output from the WT Analytics OP Dx API v2.
   * https://onpremises.webtrends.help/docs/about-the-data-extraction-api
   */
  data: ReportProps;
  /**
   * Array of dimensions
   */
  dimensions?: GridDimensionProps[];
  /**
   * Nivo line graph options
   * https://nivo.rocks/line/
   */
  config?: WtLineProps;
}

export default WtLineGraph;