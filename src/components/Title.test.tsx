import React from "react";
import { render, screen } from "@testing-library/react";
import Title from "./Title";

describe("Title", () => {
  it("renders title text correctly", () => {
    render(<Title>Test Title</Title>);

    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H2");
    expect(titleElement).toHaveClass("MuiTypography-root");
  });

  it("renders without children", () => {
    render(<Title />);

    const titleElement = screen.getByRole("heading");
    expect(titleElement).toBeInTheDocument();
  });

  it("has correct typography variant and component", () => {
    render(<Title>Test Title</Title>);

    const titleElement = screen.getByRole("heading");
    expect(titleElement.tagName).toBe("H2");
  });
});
