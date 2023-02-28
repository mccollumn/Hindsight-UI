import React from "react";
import {
  getYear,
  getMonth,
  getDate,
  startOfMonth,
  endOfMonth,
  differenceInDays,
  differenceInMonths,
} from "date-fns/fp";
import {
  useQueryParam,
  DateParam,
  withDefault,
  UrlUpdateType,
} from "use-query-params";
import { generateWtDate } from "../components/data-vis/lineGraph.util";

const now = Date.now();
const startOfCurrentMonth = startOfMonth(now);
const endOfCurrentMonth = endOfMonth(now);
const wtDefaultStartDate = generateWtDate(
  getYear(startOfCurrentMonth),
  getMonth(startOfCurrentMonth) + 1,
  getDate(startOfCurrentMonth)
);
const wtDefaultEndDate = generateWtDate(
  getYear(endOfCurrentMonth),
  getMonth(endOfCurrentMonth) + 1,
  getDate(endOfCurrentMonth)
);
const defaultContext = {
  startDate: startOfCurrentMonth,
  setStartDate: () => {},
  endDate: endOfCurrentMonth,
  setEndDate: () => {},
  wtStartDate: wtDefaultStartDate,
  wtEndDate: wtDefaultEndDate,
  trendInterval: null,
};

export const DateContext =
  React.createContext<DateProviderProps>(defaultContext);

export const DateProvider = ({ children }: any) => {
  const [startDate, setStartDate] = useQueryParam(
    "startDate",
    withDefault(DateParam, startOfCurrentMonth)
  );
  const [endDate, setEndDate] = useQueryParam(
    "endDate",
    withDefault(DateParam, endOfCurrentMonth)
  );

  React.useEffect(() => {
    setStartDate(startDate || startOfCurrentMonth);
    setEndDate(endDate || endOfCurrentMonth);
  }, [endDate, setEndDate, setStartDate, startDate]);

  const wtStartDate = generateWtDate(
    getYear(startDate),
    getMonth(startDate) + 1,
    getDate(startDate)
  );
  const wtEndDate = generateWtDate(
    getYear(endDate),
    getMonth(endDate) + 1,
    getDate(endDate)
  );

  const trendInterval = getInterval(startDate, endDate);

  return (
    <DateContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        wtStartDate,
        wtEndDate,
        trendInterval,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

const getInterval = (startDate: Date, endPeriod: Date) => {
  if (!startDate || !endPeriod) return null;

  const differenceDays = differenceInDays(startDate, endPeriod);
  const differenceMonths = differenceInMonths(startDate, endPeriod);

  // Monthly: period > 6 months
  if (differenceMonths >= 6) {
    return "monthly";
  }
  // Weekly: period <= 6 months
  if (differenceMonths < 6 && differenceMonths > 0) {
    return "weekly";
  }
  // Daily: period <= 1 month
  if (differenceMonths === 0 && differenceDays > 0) {
    return "daily";
  }
  // Hourly: period <= 1 day
  if (differenceDays === 0) {
    return "hourly";
  }
  return null;
};

interface DateProviderProps {
  startDate: Date;
  setStartDate: (
    newValue: Date,
    updateType?: UrlUpdateType | undefined
  ) => void;
  endDate: Date;
  setEndDate: (newValue: Date, updateType?: UrlUpdateType | undefined) => void;
  wtStartDate: string;
  wtEndDate: string;
  trendInterval: string | null;
}
