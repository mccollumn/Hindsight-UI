import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  LoginForm,
  matchPasswordValidate,
  specialCharacterRegex,
  numberRegex,
} from "./LoginForm";

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders username and password fields", () => {
    renderWithTheme(<LoginForm />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("renders with default title", () => {
    renderWithTheme(<LoginForm />);

    expect(screen.getByText("Analytics")).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    renderWithTheme(<LoginForm title="Custom Login" />);

    expect(screen.getByText("Custom Login")).toBeInTheDocument();
  });

  it("renders with default submit button text", () => {
    renderWithTheme(<LoginForm />);

    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("renders with custom submit button text", () => {
    renderWithTheme(<LoginForm submitButtonText="Sign In" />);

    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  it("populates default username and password", () => {
    renderWithTheme(
      <LoginForm defaultUsername="testuser" defaultPassword="testpass" />
    );

    const usernameField = screen.getByLabelText("Username") as HTMLInputElement;
    const passwordField = screen.getByLabelText("Password") as HTMLInputElement;

    expect(usernameField.value).toBe("testuser");
    expect(passwordField.value).toBe("testpass");
  });

  it("shows validation error for empty username", async () => {
    renderWithTheme(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
    });
  });

  it("shows validation error for empty password", async () => {
    renderWithTheme(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("validates minimum password length", async () => {
    renderWithTheme(<LoginForm minPasswordLength={5} />);

    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, { target: { value: "123" } });

    const submitButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Minimum password length: 5")
      ).toBeInTheDocument();
    });
  });

  it("calls onLoginSubmit when form is submitted successfully", async () => {
    const onLoginSubmit = jest.fn();
    renderWithTheme(<LoginForm onLoginSubmit={onLoginSubmit} />);

    const usernameField = screen.getByLabelText("Username");
    const passwordField = screen.getByLabelText("Password");

    fireEvent.change(usernameField, { target: { value: "testuser" } });
    fireEvent.change(passwordField, { target: { value: "testpass" } });

    const submitButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onLoginSubmit).toHaveBeenCalledWith({
        username: "testuser",
        password: "testpass",
      });
    });
  });

  it("calls closeModal after successful submission", async () => {
    const closeModal = jest.fn();
    renderWithTheme(<LoginForm closeModal={closeModal} />);

    const usernameField = screen.getByLabelText("Username");
    const passwordField = screen.getByLabelText("Password");

    fireEvent.change(usernameField, { target: { value: "testuser" } });
    fireEvent.change(passwordField, { target: { value: "testpass" } });

    const submitButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalled();
    });
  });
});

describe("matchPasswordValidate", () => {
  it("validates special characters correctly", () => {
    const result = matchPasswordValidate({
      p: "password!",
      message: "Need special chars",
      regex: specialCharacterRegex,
      minNumber: 1,
    });

    expect(result).toBe(true);
  });

  it("returns error message when validation fails", () => {
    const result = matchPasswordValidate({
      p: "password",
      message: "Need special chars",
      regex: specialCharacterRegex,
      minNumber: 1,
    });

    expect(result).toBe("Need special chars");
  });

  it("validates numbers correctly", () => {
    const result = matchPasswordValidate({
      p: "password1",
      message: "Need numbers",
      regex: numberRegex,
      minNumber: 1,
    });

    expect(result).toBe(true);
  });
});
