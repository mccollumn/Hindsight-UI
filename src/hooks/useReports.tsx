import React from "react";
import useGetData from "./useGetData";
import { useProfiles } from "./useProfiles";
import { useQueryParam, StringParam } from "use-query-params";
import { useQuery } from "@tanstack/react-query";

export const useReports = () => {
  const { selectedProfile } = useProfiles();
  const { getDataQuery: getProfileReports } = useGetData();
  const {
    isLoading,
    isError,
    data: reports = [],
    error,
  } = useQuery(
    ["reportDefinition", { profileID: selectedProfile?.ID }],
    getProfileReports
  );

  const [report, setReport] = useQueryParam("report", StringParam);

  const selectedReport = React.useMemo(() => {
    if (!reports) return undefined;
    if (!report) return undefined;

    return reports.find((r: any) => {
      return r.ID === report;
    });
  }, [report, reports]);

  return { reports, reportID: report, selectedReport, setReport };
};
