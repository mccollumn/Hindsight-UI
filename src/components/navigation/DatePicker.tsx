import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type {} from "@mui/x-date-pickers-pro/themeAugmentation";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import {
  DateRangePicker,
  DateRange,
} from "@mui/x-date-pickers-pro/DateRangePicker";
import Box from "@mui/material/Box";
import { DateContext } from "../../providers/DateProvider";

const DatePicker = ({
  handleDateChange,
  maxDate = null,
  minDate = null,
  ...props
}: DatePickerProps) => {
  const { startDate, setStartDate, endDate, setEndDate } =
    React.useContext(DateContext);
  const [value, setValue] = React.useState<DateRange<any>>([
    startDate,
    endDate,
  ]);

  React.useEffect(() => {
    setStartDate(value[0]);
    setEndDate(value[1]);
  }, []);

  const handleAccept = (newDateRange: DateRange<any>) => {
    setValue(newDateRange);
    setStartDate(newDateRange[0]);
    setEndDate(newDateRange[1]);
    if (handleDateChange) {
      handleDateChange(newDateRange);
    }
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={{ start: "Start Date", end: "End Date" }}
    >
      <DateRangePicker
        value={value}
        onAccept={handleAccept}
        onChange={function (
          date: DateRange<any>,
          keyboardInputValue?: string | undefined
        ): void {}}
        // disableFuture={true}
        minDate={minDate}
        maxDate={maxDate}
        // defaultCalendarMonth={now}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField
              {...startProps}
              variant="filled"
              sx={{ backgroundColor: "white", maxWidth: "150px" }}
            />
            <Box sx={{ mx: 2, alignSelf: "center" }}> to </Box>
            <TextField
              {...endProps}
              variant="filled"
              sx={{ backgroundColor: "white", maxWidth: "150px" }}
            />
          </React.Fragment>
        )}
        {...props}
      />
    </LocalizationProvider>
  );
};

interface DatePickerProps {
  handleDateChange?: (dateRange: DateRange<any>[]) => void;
  /**
   * Maximum date that can be picked.
   * If not provided, today's date is used.
   */
  maxDate?: any;
  /**
   * Minimum date that can be picked.
   * If not provided, no minimum date will be used.
   */
  minDate?: any;
}

export default DatePicker;
