import {
  eachMonthOfInterval,
  eachWeekOfInterval,
  eachDayOfInterval,
  eachHourOfInterval,
  getYear,
  getMonth,
  getDate,
  getHours,
  endOfWeek,
  endOfMonth,
  differenceInMonths,
  differenceInDays,
} from "date-fns/fp";
import { Serie } from "@nivo/line";
import {
  ReportProps,
  GridDimensionProps,
  ReportDateRangeProps,
  ReportDefinitionProps,
} from "../../interfaces/interfaces";

export const getSearchString = (dimensions: GridDimensionProps[]) => {
  if (dimensions.length === 0) return "";
  return dimensions
    .reduce((result: string[], dimension) => {
      if (dimension.rowIndex <= 5) {
        result.push(dimension.key);
      }
      return result;
    }, [])
    .join("+");
};

export const getDateRange = (reportData: ReportProps) => {
  const dateRange = reportData?.definition?.dimension?.Range;
  return dateRange;
};

const getPeriodStr = (wtDate: string) => {
  if (!wtDate) return "";
  if (wtDate.includes("h")) {
    return wtDate.slice(11, 13);
  }
  if (wtDate.includes("d")) {
    return wtDate.split(/d|m/).join("-");
  }
  if (wtDate.includes("m")) {
    return wtDate.split("m").join("-");
  }
  return "";
};

export const generateWtDate = (
  year: Date | number,
  month: Date | number = 0,
  day: Date | number = 0,
  hour: Date | number = 0
) => {
  let date: string = year.toString();
  if (month > 0) {
    date += `m${month}`;
  }
  if (day > 0) {
    date += `d${day}`;
  }
  return date;
};

export const getProfileID = (reportData: ReportProps) => {
  if (!reportData || Object.keys(reportData).length === 0) return "";
  return reportData?.definition?.profileID;
};

export const getReportID = (reportData: ReportProps) => {
  if (!reportData || Object.keys(reportData).length === 0) return "";
  return reportData.definition.ID;
};

const getDimensions = (reportData: ReportProps) => {
  return Object.values(reportData.data)[0].SubRows;
};

const getPrimaryMeasure = (reportData: ReportProps) => {
  const measures = reportData.definition.measures;
  const measure =
    measures.find((element) => element.columnID === 0) || measures[0];
  return measure;
};

export const getPrimaryMeasureFromReportDef = (
  reportDefinition: ReportDefinitionProps
) => {
  return reportDefinition.measures[0];
};

const shorten = (str: string, len = 20) => {
  if (str.length > len) {
    return `...${str.slice(-len - 3)}`;
  }
  return str;
};

export const getLineGraphData = (reportData: ReportProps, measure: string) => {
  if (reportData.data === undefined || reportData.definition === undefined)
    return [];
  const dateRange = getDateRange(reportData);
  if (dateRange === null) return [];
  const period = getPeriodStr(dateRange.startperiod);
  const measureName = measure ? measure : getPrimaryMeasure(reportData).name;
  const dimensions = getDimensions(reportData) || {};
  let lineGraphData: Serie[] = [];

  Object.entries(dimensions).forEach(([key, value]) => {
    lineGraphData.push({
      // Not shortening the values anymore since only one value will be displayed in the graph.
      // If needed in the future, addTrendData() in WtLineGraph will have to be updated.
      // id: shorten(key),
      id: key,
      data: [{ x: period, y: Number(value.measures[measureName]) }],
    });
  });
  return lineGraphData;
};

const getMonthlyPeriods = (interval: Interval) => {
  let periods: ReportDateRangeProps[] = [];
  const months = eachMonthOfInterval(interval);
  months.forEach((month) => {
    periods.push({
      start_period: generateWtDate(
        getYear(month),
        getMonth(month) + 1,
        getDate(month)
      ),
      end_period: generateWtDate(
        getYear(month),
        getMonth(month) + 1,
        getDate(endOfMonth(month))
      ),
    });
  });
  return periods;
};

const getWeeklyPeriods = (interval: Interval) => {
  let periods: ReportDateRangeProps[] = [];
  const weeks = eachWeekOfInterval(interval);
  weeks.forEach((week) => {
    periods.push({
      start_period: generateWtDate(
        getYear(week),
        getMonth(week) + 1,
        getDate(week)
      ),
      end_period: generateWtDate(
        getYear(endOfWeek(week)),
        getMonth(endOfWeek(week)) + 1,
        getDate(endOfWeek(week))
      ),
    });
  });
  return periods;
};

const getDailyPeriods = (interval: Interval) => {
  let periods: ReportDateRangeProps[] = [];
  const days = eachDayOfInterval(interval);
  days.forEach((day) => {
    const period = generateWtDate(
      getYear(day),
      getMonth(day) + 1,
      getDate(day)
    );
    periods.push({
      start_period: period,
      end_period: period,
    });
  });
  return periods;
};

const getHourlyPeriods = (interval: Interval) => {
  let periods: ReportDateRangeProps[] = [];
  const hours = eachHourOfInterval(interval);
  hours.forEach((hour) => {
    periods.push({
      start_period: generateWtDate(
        getYear(hour),
        getMonth(hour),
        getDate(hour),
        getHours(hour)
      ),
      end_period: "",
    });
  });
  return periods;
};

export const getTrendPeriods = ({
  reportData,
  wtStartPeriod,
  wtEndPeriod,
}: any) => {
  let startPeriod;
  let endPeriod;

  if (reportData) {
    if (Object.keys(reportData).length === 0) return [];
    const dateRange = getDateRange(reportData);
    if (dateRange === null) return [];
    startPeriod = getPeriodStr(dateRange.startperiod);
    endPeriod = getPeriodStr(dateRange.endperiod);
  } else if (wtStartPeriod && wtEndPeriod) {
    startPeriod = getPeriodStr(wtStartPeriod);
    endPeriod = getPeriodStr(wtEndPeriod);
  }

  if (!startPeriod || !endPeriod) return [];
  const interval: Interval = {
    start: new Date(startPeriod),
    end: new Date(endPeriod),
  };
  const differenceDays = differenceInDays(interval.start, interval.end);
  const differenceMonths = differenceInMonths(interval.start, interval.end);

  // Monthly: period > 6 months
  if (differenceMonths >= 6) {
    return getMonthlyPeriods(interval);
  }
  // Weekly: period <= 6 months
  if (differenceMonths < 6 && differenceMonths > 0) {
    return getWeeklyPeriods(interval);
  }
  // Daily: period <= 1 month
  if (differenceMonths === 0 && differenceDays > 0) {
    return getDailyPeriods(interval);
  }
  // Hourly: period <= 1 day
  // TODO: Add support for hourly. Returning daily for now.
  if (differenceDays === 0) {
    return getDailyPeriods(interval);
  }
  return [];
};
