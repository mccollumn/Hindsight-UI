import React from "react";
import { render, screen } from "@testing-library/react";
import LoginError from "./LoginError";

describe("LoginError", () => {
  it("renders error message when message prop is provided", () => {
    const errorMessage = "Invalid username or password";
    render(<LoginError message={errorMessage} />);

    expect(screen.getByText("Login Failed")).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("does not render when message is empty string", () => {
    render(<LoginError message="" />);

    expect(screen.queryByText("Login Failed")).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("does not render when message is null", () => {
    render(<LoginError message={null as any} />);

    expect(screen.queryByText("Login Failed")).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("has correct alert severity", () => {
    render(<LoginError message="Test error" />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-standardError");
  });
});
