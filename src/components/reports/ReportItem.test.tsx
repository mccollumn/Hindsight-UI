import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ReportItem from "./ReportItem";

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("ReportItem", () => {
  const mockClickHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children content", () => {
    renderWithTheme(
      <ReportItem clickHandler={mockClickHandler}>Test Report Item</ReportItem>
    );

    expect(screen.getByText("Test Report Item")).toBeInTheDocument();
  });

  it("calls clickHandler when clicked", () => {
    renderWithTheme(
      <ReportItem clickHandler={mockClickHandler}>Clickable Report</ReportItem>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    expect(mockClickHandler).toHaveBeenCalledWith(
      expect.any(Object), // MouseEvent
      "Clickable Report"
    );
  });

  it("passes children to clickHandler", () => {
    const complexChildren = <span>Complex Content</span>;
    renderWithTheme(
      <ReportItem clickHandler={mockClickHandler}>{complexChildren}</ReportItem>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockClickHandler).toHaveBeenCalledWith(
      expect.any(Object),
      complexChildren
    );
  });

  it("renders as outlined button", () => {
    renderWithTheme(
      <ReportItem clickHandler={mockClickHandler}>Test Item</ReportItem>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("MuiButton-outlined");
  });

  it("has correct button styling", () => {
    renderWithTheme(
      <ReportItem clickHandler={mockClickHandler}>Styled Item</ReportItem>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      width: "100%",
      justifyContent: "left",
      textTransform: "none",
      textAlign: "left",
    });
  });

  it("passes through additional props", () => {
    renderWithTheme(
      <ReportItem
        clickHandler={mockClickHandler}
        data-testid="custom-report-item"
        disabled
      >
        Custom Item
      </ReportItem>
    );

    const button = screen.getByTestId("custom-report-item");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("handles different children types", () => {
    renderWithTheme(
      <ReportItem clickHandler={mockClickHandler}>
        <div>
          <span>Multi-element</span>
          <span>Children</span>
        </div>
      </ReportItem>
    );

    expect(screen.getByText("Multi-element")).toBeInTheDocument();
    expect(screen.getByText("Children")).toBeInTheDocument();
  });

  it("handles empty children", () => {
    renderWithTheme(
      <ReportItem clickHandler={mockClickHandler}>{null}</ReportItem>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockClickHandler).toHaveBeenCalledWith(expect.any(Object), null);
  });
});
