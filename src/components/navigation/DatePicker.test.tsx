import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DatePicker from "./DatePicker";
import { DateContext } from "../../providers/DateProvider";

// Mock the MUI date picker components
jest.mock("@mui/x-date-pickers-pro", () => ({
  LocalizationProvider: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("@mui/x-date-pickers-pro/DateRangePicker", () => ({
  DateRangePicker: ({ value, onAccept, onChange, ...props }: any) => (
    <div data-testid="date-range-picker" data-props={JSON.stringify(props)}>
      <button
        onClick={() => {
          const newRange = [new Date("2023-01-01"), new Date("2023-01-31")];
          onAccept(newRange);
        }}
      >
        Accept Date Range
      </button>
      <span>
        Current range: {value?.[0]?.toISOString()} to{" "}
        {value?.[1]?.toISOString()}
      </span>
    </div>
  ),
}));

jest.mock("@mui/x-date-pickers/AdapterDateFns", () => ({
  AdapterDateFns: jest.fn(),
}));

const MockDateProvider = ({
  startDate,
  endDate,
  children,
}: {
  startDate: Date;
  endDate: Date;
  children: React.ReactNode;
}) => {
  const [currentStartDate, setStartDate] = React.useState(startDate);
  const [currentEndDate, setEndDate] = React.useState(endDate);

  const contextValue = {
    startDate: currentStartDate,
    endDate: currentEndDate,
    setStartDate,
    setEndDate,
    wtStartDate: currentStartDate.toISOString(), // mock value as string
    wtEndDate: currentEndDate.toISOString(), // mock value as string
    trendInterval: "day", // mock value, adjust as needed
  };

  return (
    <DateContext.Provider value={contextValue}>{children}</DateContext.Provider>
  );
};

describe("DatePicker", () => {
  const defaultStartDate = new Date("2023-01-01");
  const defaultEndDate = new Date("2023-12-31");

  it("renders date range picker", () => {
    render(
      <MockDateProvider startDate={defaultStartDate} endDate={defaultEndDate}>
        <DatePicker />
      </MockDateProvider>
    );

    expect(screen.getByTestId("date-range-picker")).toBeInTheDocument();
  });

  it("displays current date range from context", () => {
    render(
      <MockDateProvider startDate={defaultStartDate} endDate={defaultEndDate}>
        <DatePicker />
      </MockDateProvider>
    );

    expect(screen.getByText(/2023-01-01/)).toBeInTheDocument();
    expect(screen.getByText(/2023-12-31/)).toBeInTheDocument();
  });

  it("calls handleDateChange when date is accepted", () => {
    const handleDateChange = jest.fn();

    render(
      <MockDateProvider startDate={defaultStartDate} endDate={defaultEndDate}>
        <DatePicker handleDateChange={handleDateChange} />
      </MockDateProvider>
    );

    const acceptButton = screen.getByText("Accept Date Range");
    fireEvent.click(acceptButton);

    expect(handleDateChange).toHaveBeenCalledWith([
      new Date("2023-01-01"),
      new Date("2023-01-31"),
    ]);
  });

  it("updates context when date range is accepted", () => {
    render(
      <MockDateProvider startDate={defaultStartDate} endDate={defaultEndDate}>
        <DatePicker />
      </MockDateProvider>
    );

    const acceptButton = screen.getByText("Accept Date Range");
    fireEvent.click(acceptButton);

    // After clicking, the display should update with new dates
    expect(screen.getByText(/2023-01-01/)).toBeInTheDocument();
    expect(screen.getByText(/2023-01-31/)).toBeInTheDocument();
  });

  it("handles null handleDateChange gracefully", () => {
    render(
      <MockDateProvider startDate={defaultStartDate} endDate={defaultEndDate}>
        <DatePicker />
      </MockDateProvider>
    );

    const acceptButton = screen.getByText("Accept Date Range");
    expect(() => fireEvent.click(acceptButton)).not.toThrow();
  });

  it("passes maxDate and minDate props", () => {
    const maxDate = new Date("2023-12-31");
    const minDate = new Date("2023-01-01");

    render(
      <MockDateProvider startDate={defaultStartDate} endDate={defaultEndDate}>
        <DatePicker maxDate={maxDate} minDate={minDate} />
      </MockDateProvider>
    );

    const dateRangePicker = screen.getByTestId("date-range-picker");
    const props = JSON.parse(
      dateRangePicker.getAttribute("data-props") || "{}"
    );

    expect(props.maxDate).toBe(maxDate.toISOString());
    expect(props.minDate).toBe(minDate.toISOString());
  });

  it("passes through additional props", () => {
    render(
      <MockDateProvider startDate={defaultStartDate} endDate={defaultEndDate}>
        <DatePicker data-testid="custom-date-picker" disabled />
      </MockDateProvider>
    );

    const dateRangePicker = screen.getByTestId("date-range-picker");
    const props = JSON.parse(
      dateRangePicker.getAttribute("data-props") || "{}"
    );

    expect(props["data-testid"]).toBe("custom-date-picker");
    expect(props.disabled).toBe(true);
  });
});
