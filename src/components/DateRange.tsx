import React from "react";
import Typography from "@mui/material/Typography";
import { DateContext } from "../providers/DateProvider";
import useGetData from "../hooks/useGetData";
import { intlFormat, isValid, max, min } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { ProfileProps } from "../interfaces/interfaces";

export default function DateRange({ profile }: DateRangeProps) {
  const { startDate, endDate } = React.useContext(DateContext);
  const { getReportPeriodsQuery } = useGetData();
  const [startDateActual, setStartDateActual] = React.useState(startDate);
  const [endDateActual, setEndDateActual] = React.useState(endDate);

  const { isLoading } = useQuery(
    [
      "reportPeriods",
      {
        profileID: profile?.ID,
      },
    ],
    getReportPeriodsQuery,
    {
      staleTime: 30 * 60 * 1000,
      onSuccess: (data) => {
        const dateArray = createDateArray(data.Report);
        setStartDateActual(max([min(dateArray), startDate]));
        setEndDateActual(min([max(dateArray), endDate]));
      },
    }
  );

  const dateFormat: Object = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const range = `${intlFormat(startDateActual, dateFormat)} - ${intlFormat(
    endDateActual,
    dateFormat
  )}`;

  if (isLoading) {
    return null;
  }
  return (
    <Typography variant="body2" color="InfoText" gutterBottom>
      {range}
    </Typography>
  );
}

const convertReportPeriodToDate = (reportPeriod: string) => {
  const year = Number(reportPeriod.substring(0, 4));
  const month = Number(reportPeriod.match(/m([\d]+)/i)?.pop());
  const day = Number(reportPeriod.match(/d([\d]+)/i)?.pop());
  return new Date(Date.UTC(year, month - 1, day ? day : 1));
};

const createDateArray = (reportPeriods: string[]) => {
  let dateArray = reportPeriods.map((period) =>
    convertReportPeriodToDate(period)
  );
  return dateArray.filter((date) => isValid(date));
};

interface DateRangeProps {
  /**
   * Profile object from DX API v2.0
   */
  profile: ProfileProps;
}
