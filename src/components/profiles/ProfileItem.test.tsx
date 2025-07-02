import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProfileItem from "./ProfileItem";

// Mock the KeyMetricsLabels component
jest.mock("./KeyMetricsLabels", () => {
  return function MockKeyMetricsLabels({ profile }: any) {
    return (
      <div data-testid="key-metrics-labels">Key Metrics for {profile?.ID}</div>
    );
  };
});

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("ProfileItem", () => {
  const mockClickHandler = jest.fn();
  const mockProfile = {
    ID: "test-profile-123",
    Name: "Test Profile",
    // Add other profile properties as needed
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children content", () => {
    renderWithTheme(
      <ProfileItem clickHandler={mockClickHandler}>
        Test Profile Item
      </ProfileItem>
    );

    expect(screen.getByText("Test Profile Item")).toBeInTheDocument();
  });

  it("renders with profile and key metrics", () => {
    renderWithTheme(
      <ProfileItem clickHandler={mockClickHandler} profile={mockProfile}>
        Profile with Metrics
      </ProfileItem>
    );

    expect(screen.getByText("Profile with Metrics")).toBeInTheDocument();
    expect(screen.getByTestId("key-metrics-labels")).toBeInTheDocument();
    expect(
      screen.getByText("Key Metrics for test-profile-123")
    ).toBeInTheDocument();
  });

  it("renders without profile (no key metrics)", () => {
    renderWithTheme(
      <ProfileItem clickHandler={mockClickHandler}>
        Simple Profile Item
      </ProfileItem>
    );

    expect(screen.getByText("Simple Profile Item")).toBeInTheDocument();
    expect(screen.queryByTestId("key-metrics-labels")).not.toBeInTheDocument();
  });

  it("calls clickHandler when clicked", () => {
    renderWithTheme(
      <ProfileItem clickHandler={mockClickHandler}>
        Clickable Profile
      </ProfileItem>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    expect(mockClickHandler).toHaveBeenCalledWith(
      expect.any(Object), // MouseEvent
      "Clickable Profile"
    );
  });

  it("calls clickHandler with profile when clicked", () => {
    renderWithTheme(
      <ProfileItem clickHandler={mockClickHandler} profile={mockProfile}>
        Profile with Handler
      </ProfileItem>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    expect(mockClickHandler).toHaveBeenCalledWith(
      expect.any(Object),
      "Profile with Handler"
    );
  });

  it("renders as outlined button", () => {
    renderWithTheme(
      <ProfileItem clickHandler={mockClickHandler}>Test Item</ProfileItem>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("MuiButton-outlined");
  });

  it("has correct button styling", () => {
    renderWithTheme(
      <ProfileItem clickHandler={mockClickHandler}>Styled Item</ProfileItem>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      width: "100%",
      justifyContent: "left",
      textTransform: "none",
      textAlign: "left",
    });
  });

  it("handles complex children content", () => {
    const complexChildren = (
      <div>
        <span>Profile Name</span>
        <br />
        <small>Profile Description</small>
      </div>
    );

    renderWithTheme(
      <ProfileItem clickHandler={mockClickHandler} profile={mockProfile}>
        {complexChildren}
      </ProfileItem>
    );

    expect(screen.getByText("Profile Name")).toBeInTheDocument();
    expect(screen.getByText("Profile Description")).toBeInTheDocument();
    expect(screen.getByTestId("key-metrics-labels")).toBeInTheDocument();
  });

  it("handles null profile gracefully", () => {
    renderWithTheme(
      <ProfileItem clickHandler={mockClickHandler} profile={null as any}>
        Null Profile Item
      </ProfileItem>
    );

    expect(screen.getByText("Null Profile Item")).toBeInTheDocument();
    expect(screen.queryByTestId("key-metrics-labels")).not.toBeInTheDocument();
  });

  it("passes children to clickHandler correctly", () => {
    const complexChildren = <span>Complex Content</span>;
    renderWithTheme(
      <ProfileItem clickHandler={mockClickHandler}>
        {complexChildren}
      </ProfileItem>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockClickHandler).toHaveBeenCalledWith(
      expect.any(Object),
      complexChildren
    );
  });
});
