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
  interval: null,
};

export const DateContext =
  React.createContext<DateProviderProps>(defaultContext);

export const DateProvider = ({ children }: any) => {
  const [startDate, setStartDate] = React.useState(startOfCurrentMonth);
  const [endDate, setEndDate] = React.useState(endOfCurrentMonth);

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

  const interval = getInterval(startDate, endDate);

  return (
    <DateContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        wtStartDate,
        wtEndDate,
        interval,
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
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  wtStartDate: string;
  wtEndDate: string;
  interval: string | null;
}
