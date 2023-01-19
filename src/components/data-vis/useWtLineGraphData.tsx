import { Serie } from "@nivo/line";
import { isEmpty } from "lodash/fp";
import React from "react";
import { GridDimensionProps } from "../../interfaces/interfaces";
import { getLineGraphData, getSearchString } from "./lineGraph.util";
import { selectedCellProps } from "./WtLineGraph";

export const useWtLineGraphData = (
  dimensions: GridDimensionProps[],
  selectedCell: selectedCellProps | Record<string, never>,
  trendDataQueries: any
) => {
  const [searchString, setSearchString] = React.useState("");
  const [lineGraphData, setLineGraphData] = React.useState<Serie[]>([]);

  // Generate search string
  React.useEffect(() => {
    if (dimensions.length !== 0) {
      const primaryDimension = [dimensions[0]];
      setSearchString(getSearchString(primaryDimension));
    }
    if (!isEmpty(selectedCell)) {
      setSearchString(selectedCell.selectedDimension);
    }
  }, [dimensions, selectedCell]);

  // Clear the graph data if a new line needs to be plotted
  const clearExistingGraphData = React.useCallback(() => {
    if (!isEmpty(selectedCell)) {
      lineGraphData.forEach((element) => {
        if (element.id !== selectedCell.selectedDimension) {
          setLineGraphData([]);
        }
      });
    }
  }, [lineGraphData, selectedCell]);

  // Generate graph as data becomes available
  React.useEffect(() => {
    const addTrendData = (data: any) => {
      if (!data) return;

      const newData = getLineGraphData(
        data,
        searchString,
        selectedCell.selectedColumn
      );

      clearExistingGraphData();

      // Check the existing graph data
      if (isMerged(lineGraphData, newData)) {
        if (isDataCurrent(lineGraphData, newData)) {
          return;
        }
        setLineGraphData([]);
        return;
      }

      setLineGraphData(mergeLineData(lineGraphData, newData));
    };

    trendDataQueries.forEach(({ data }: any) => {
      addTrendData(data);
    });
  }, [
    selectedCell,
    trendDataQueries,
    lineGraphData,
    searchString,
    clearExistingGraphData,
  ]);

  return { lineGraphData };
};

/**
 * Determines if new data for a report period needs to be merged with graph data.
 * @param graphData Current data for graph
 * @param newData New data to be added to graph
 * @returns True if new report period is already included, otherwise false
 */
const isMerged = (graphData: any, newData: any) => {
  if (newData.length === 0) {
    return true;
  }
  if (graphData.length === 0) {
    return false;
  }
  return graphData[0].data.some((p: any) => p.x === newData[0].data[0].x);
};

/**
 * Sorts graph data by date.
 * @param data Array of graph data to be sorted
 * @returns Sorted array of graph data
 */
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

/**
 * Adds new data point to the graph data.
 * @param graphData Current data for graph
 * @param newData New data to be added to graph
 * @returns Graph data with new data added
 */
const mergeLineData = (graphData: Serie[], newData: Serie[]) => {
  if (graphData.length === 0) {
    return newData;
  }
  return graphData.map((item: any) => {
    newData.forEach(async (point: any) => {
      if (point.id === item.id) {
        item.data.push(point.data[0]);
      }
      await sortByDate(item.data);
    });
    return item;
  });
};

/**
 * Determines if the data for an existing report period is current.
 * @param graphData Current data for graph
 * @param newData New data to be added to graph
 * @returns True if the new report period and its value match existing graph data, otherwise false
 */
const isDataCurrent = (graphData: any, newData: any) => {
  const x = graphData[0]?.data.find(
    (element: any) => element.x === newData[0].data[0].x
  );
  return x && x.y === newData[0].data[0].y;
};
