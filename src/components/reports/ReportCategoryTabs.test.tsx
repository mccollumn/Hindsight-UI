import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import ReportCategoryTabs from "./ReportCategoryTabs";

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("ReportCategoryTabs", () => {
  const mockClickHandler = jest.fn();
  const mockCategories = ["All", "Analytics", "Finance", "Marketing"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all category tabs", () => {
    renderWithTheme(
      <ReportCategoryTabs
        categories={mockCategories}
        clickHandler={mockClickHandler}
      />
    );

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Finance")).toBeInTheDocument();
    expect(screen.getByText("Marketing")).toBeInTheDocument();
  });

  it("calls clickHandler when a tab is clicked", () => {
    renderWithTheme(
      <ReportCategoryTabs
        categories={mockCategories}
        clickHandler={mockClickHandler}
      />
    );

    const analyticsTab = screen.getByText("Analytics");
    fireEvent.click(analyticsTab);

    expect(mockClickHandler).toHaveBeenCalledWith(1);
  });

  it("shows first tab as selected by default", () => {
    renderWithTheme(
      <ReportCategoryTabs
        categories={mockCategories}
        clickHandler={mockClickHandler}
      />
    );

    const allTab = screen.getByText("All");
    expect(allTab).toHaveAttribute("aria-selected", "true");
  });

  it("updates selected tab when clicked", () => {
    renderWithTheme(
      <ReportCategoryTabs
        categories={mockCategories}
        clickHandler={mockClickHandler}
      />
    );

    const financeTab = screen.getByText("Finance");
    fireEvent.click(financeTab);

    expect(financeTab).toHaveAttribute("aria-selected", "true");
  });

  it("has proper accessibility attributes", () => {
    renderWithTheme(
      <ReportCategoryTabs
        categories={mockCategories}
        clickHandler={mockClickHandler}
      />
    );

    const tabsContainer = screen.getByRole("tablist");
    expect(tabsContainer).toHaveAttribute("aria-label", "report category tabs");

    mockCategories.forEach((category, index) => {
      const tab = screen.getByText(category);
      expect(tab).toHaveAttribute("id", `tab-${index}`);
      expect(tab).toHaveAttribute("aria-controls", `tabpanel-${index}`);
    });
  });

  it("handles empty categories array", () => {
    renderWithTheme(
      <ReportCategoryTabs categories={[]} clickHandler={mockClickHandler} />
    );

    const tabsContainer = screen.getByRole("tablist");
    expect(tabsContainer).toBeInTheDocument();
    expect(screen.queryByRole("tab")).not.toBeInTheDocument();
  });

  it("handles single category", () => {
    renderWithTheme(
      <ReportCategoryTabs
        categories={["All"]}
        clickHandler={mockClickHandler}
      />
    );

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(1);
  });

  it("supports scrollable tabs variant", () => {
    const manyCategories = Array.from(
      { length: 10 },
      (_, i) => `Category ${i + 1}`
    );

    renderWithTheme(
      <ReportCategoryTabs
        categories={manyCategories}
        clickHandler={mockClickHandler}
      />
    );

    const tabsContainer = screen.getByRole("tablist");
    expect(tabsContainer).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(10);
  });
});
