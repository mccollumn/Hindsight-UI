import React from "react";
import { useQueries } from "@tanstack/react-query";
import { DateContext } from "../../providers/DateProvider";
import { getTrendPeriods } from "./lineGraph.util";
import useGetData from "../../hooks/getData";

export const useWtLineGraphData = (
  reportDefinition: any,
  requestControllersCallback: any
) => {
  const { wtStartDate, wtEndDate } = React.useContext(DateContext);
  const [periods, setPeriods]: any = React.useState([]);
  const { cancelAllRequests, getWtData } = useGetData();

  if (requestControllersCallback) {
    requestControllersCallback(cancelAllRequests);
  }

  React.useEffect(() => {
    setPeriods(
      getTrendPeriods({ wtStartPeriod: wtStartDate, wtEndPeriod: wtEndDate })
    );
  }, [wtStartDate, wtEndDate]);

  const { profileID, ID: reportID } = reportDefinition;

  const trendDataQueries = useQueries({
    queries: periods?.map((period: any) => {
      const params = { ...period /*range: 5*/ /*search: searchString*/ };
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
  return { trendDataQueries };
};
