import React from "react";
import { ProfileProps } from "../interfaces/interfaces";
import { DateContext } from "../providers/DateProvider";
import useGetData from "../hooks/useGetData";
import { useQuery } from "@tanstack/react-query";

export const useKeyMetrics = (profile: ProfileProps) => {
  const { getKeyMetricsQuery } = useGetData();
  const { wtStartDate, wtEndDate } = React.useContext(DateContext);

  const {
    isLoading,
    isError,
    error,
    data: keyMetrics,
  } = useQuery(
    [
      "keyMetrics",
      {
        profileID: profile?.ID,
        params: { start_period: wtStartDate, end_period: wtEndDate },
      },
    ],
    getKeyMetricsQuery
  );

  return { keyMetrics, isLoading, isError, error };
};
