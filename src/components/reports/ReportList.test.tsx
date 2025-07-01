import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import ReportList from "./ReportList";

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("ReportList", () => {
  const mockSetOpen = jest.fn();
  const mockChildren = [
    <div key="1">Report 1</div>,
    <div key="2">Report 2</div>,
    <div key="3">Report 3</div>,
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders dialog when open is true", () => {
    renderWithTheme(
      <ReportList open={true} setOpen={mockSetOpen} children={mockChildren} />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Reports")).toBeInTheDocument();
  });

  it("does not render dialog when open is false", () => {
    renderWithTheme(
      <ReportList open={false} setOpen={mockSetOpen} children={mockChildren} />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders all children in grid layout", () => {
    renderWithTheme(
      <ReportList open={true} setOpen={mockSetOpen} children={mockChildren} />
    );

    expect(screen.getByText("Report 1")).toBeInTheDocument();
    expect(screen.getByText("Report 2")).toBeInTheDocument();
    expect(screen.getByText("Report 3")).toBeInTheDocument();
  });

  it("calls setOpen with false when close icon is clicked", () => {
    renderWithTheme(
      <ReportList open={true} setOpen={mockSetOpen} children={mockChildren} />
    );

    const closeIcon = screen.getByTestId("CloseIcon");
    fireEvent.click(closeIcon);

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("calls setOpen with false when dialog backdrop is clicked", () => {
    renderWithTheme(
      <ReportList open={true} setOpen={mockSetOpen} children={mockChildren} />
    );

    const dialog = screen.getByRole("dialog");
    fireEvent.keyDown(dialog, { key: "Escape", code: "Escape" });

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("has proper accessibility attributes", () => {
    renderWithTheme(
      <ReportList open={true} setOpen={mockSetOpen} children={mockChildren} />
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby", "scroll-dialog-title");
    expect(dialog).toHaveAttribute(
      "aria-describedby",
      "scroll-dialog-description"
    );
  });

  it("handles empty children array", () => {
    renderWithTheme(
      <ReportList open={true} setOpen={mockSetOpen} children={[]} />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Reports")).toBeInTheDocument();
  });
});
