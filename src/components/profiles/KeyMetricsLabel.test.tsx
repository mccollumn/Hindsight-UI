import React from "react";
import { render, screen } from "@testing-library/react";
import KeyMetricsLabel from "./KeyMetricsLabel";
import PersonIcon from "@mui/icons-material/Person";

describe("KeyMetricsLabel", () => {
  it("renders label and metric correctly", () => {
    render(<KeyMetricsLabel label="Users" metric={1250} />);

    expect(screen.getByText("Users: 1250")).toBeInTheDocument();
  });

  it("renders with string metric", () => {
    render(<KeyMetricsLabel label="Status" metric="Active" />);

    expect(screen.getByText("Status: Active")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    render(
      <KeyMetricsLabel
        label="Users"
        metric={100}
        icon={<PersonIcon data-testid="person-icon" />}
      />
    );

    expect(screen.getByText("Users: 100")).toBeInTheDocument();
    expect(screen.getByTestId("person-icon")).toBeInTheDocument();
  });

  it("renders without icon", () => {
    render(<KeyMetricsLabel label="Revenue" metric={50000} />);

    // eslint-disable-next-line testing-library/no-node-access
    const chip = screen.getByText("Revenue: 50000").closest(".MuiChip-root");
    expect(chip).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(chip?.querySelector(".MuiChip-icon")).not.toBeInTheDocument();
  });

  it("has correct chip properties", () => {
    render(<KeyMetricsLabel label="Test" metric={123} />);

    // eslint-disable-next-line testing-library/no-node-access
    const chip = screen.getByText("Test: 123").closest(".MuiChip-root");
    expect(chip).toHaveClass("MuiChip-colorPrimary");
    expect(chip).toHaveClass("MuiChip-outlined");
  });

  it("handles zero metric", () => {
    render(<KeyMetricsLabel label="Errors" metric={0} />);

    expect(screen.getByText("Errors: 0")).toBeInTheDocument();
  });

  it("handles negative metric", () => {
    render(<KeyMetricsLabel label="Change" metric={-50} />);

    expect(screen.getByText("Change: -50")).toBeInTheDocument();
  });

  it("handles decimal metric", () => {
    render(<KeyMetricsLabel label="Rate" metric={99.5} />);

    expect(screen.getByText("Rate: 99.5")).toBeInTheDocument();
  });

  it("passes through additional props", () => {
    render(
      <KeyMetricsLabel label="Test" metric={123} data-testid="custom-chip" />
    );

    expect(screen.getByTestId("custom-chip")).toBeInTheDocument();
  });
});
