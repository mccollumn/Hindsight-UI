import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import ProfileMenu from "./ProfileMenu";

// Mock the useProfiles hook
jest.mock("../../hooks/useProfiles", () => ({
  useProfiles: () => ({
    selectedProfile: {
      ID: "profile-1",
      name: "Selected Profile",
      description: "Currently selected profile",
    },
  }),
}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("ProfileMenu", () => {
  const mockProfiles = [
    {
      ID: "profile-1",
      name: "Profile 1",
      description: "First profile",
    },
    {
      ID: "profile-2",
      name: "Profile 2",
      description: "Second profile",
    },
    {
      ID: "profile-3",
      name: "Profile 3",
      description: "Third profile",
    },
  ];

  const mockHandleSelection = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders autocomplete with profiles", () => {
    renderWithTheme(
      <ProfileMenu
        profiles={mockProfiles}
        handleSelection={mockHandleSelection}
      />
    );

    expect(screen.getByLabelText("Select a Profile")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows loading state when profiles array is empty", () => {
    renderWithTheme(
      <ProfileMenu profiles={[]} handleSelection={mockHandleSelection} />
    );

    const combobox = screen.getByRole("combobox");
    expect(combobox).toHaveAttribute("aria-expanded", "false");
  });

  it("displays selected profile from useProfiles hook", () => {
    renderWithTheme(
      <ProfileMenu
        profiles={mockProfiles}
        handleSelection={mockHandleSelection}
      />
    );

    const input = screen.getByDisplayValue("Selected Profile");
    expect(input).toBeInTheDocument();
  });

  it("opens dropdown when clicked", async () => {
    renderWithTheme(
      <ProfileMenu
        profiles={mockProfiles}
        handleSelection={mockHandleSelection}
      />
    );

    const popupButton = screen.getByTitle("Open");
    fireEvent.click(popupButton);

    expect(await screen.findByText("Profile 1")).toBeInTheDocument();
    expect(await screen.findByText("Profile 2")).toBeInTheDocument();
    expect(await screen.findByText("Profile 3")).toBeInTheDocument();
  });

  it("calls handleSelection when option is selected", async () => {
    renderWithTheme(
      <ProfileMenu
        profiles={mockProfiles}
        handleSelection={mockHandleSelection}
      />
    );

    const popupButton = screen.getByTitle("Open");
    fireEvent.click(popupButton);

    const option = screen.getByText("Profile 2");
    fireEvent.click(option);

    expect(mockHandleSelection).toHaveBeenCalledWith(
      mockProfiles[1],
      expect.any(Object)
    );
  });

  it("does not call handleSelection when null value is selected", async () => {
    renderWithTheme(
      <ProfileMenu
        profiles={mockProfiles}
        handleSelection={mockHandleSelection}
      />
    );

    const combobox = screen.getByRole("combobox");

    // Simulate clearing the selection
    fireEvent.change(combobox, { target: { value: "" } });
    fireEvent.keyDown(combobox, { key: "Backspace" });

    expect(mockHandleSelection).not.toHaveBeenCalled();
  });

  it("renders with filled variant and white background", () => {
    renderWithTheme(
      <ProfileMenu
        profiles={mockProfiles}
        handleSelection={mockHandleSelection}
      />
    );

    const textField = screen.getByLabelText("Select a Profile");
    // eslint-disable-next-line testing-library/no-node-access
    expect(textField.closest(".MuiFilledInput-root")).toBeInTheDocument();
  });

  it("has correct autocomplete properties", () => {
    renderWithTheme(
      <ProfileMenu
        profiles={mockProfiles}
        handleSelection={mockHandleSelection}
      />
    );

    const combobox = screen.getByRole("combobox");
    expect(combobox).toHaveAttribute("id", "profile-menu");
  });

  it("supports freeSolo mode", () => {
    renderWithTheme(
      <ProfileMenu
        profiles={mockProfiles}
        handleSelection={mockHandleSelection}
      />
    );

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "Custom Profile Name" } });

    expect(input).toHaveValue("Custom Profile Name");
  });

  it("displays profile names correctly via getOptionLabel", async () => {
    renderWithTheme(
      <ProfileMenu
        profiles={mockProfiles}
        handleSelection={mockHandleSelection}
      />
    );

    const popupButton = screen.getByTitle("Open");
    fireEvent.click(popupButton);

    // Should display names, not IDs or other properties
    expect(await screen.findByText("Profile 1")).toBeInTheDocument();
    expect(await screen.findByText("Profile 2")).toBeInTheDocument();
    expect(await screen.findByText("Profile 3")).toBeInTheDocument();
  });

  it("handles profiles with missing name property", async () => {
    const profilesWithMissingName = [
      { ID: "profile-1", name: "", description: "No name" },
      { ID: "profile-2", description: "No name property" },
    ];

    renderWithTheme(
      <ProfileMenu
        profiles={profilesWithMissingName as any}
        handleSelection={mockHandleSelection}
      />
    );

    const popupButton = screen.getByTitle("Open");
    fireEvent.click(popupButton);

    // Should handle empty or missing names gracefully
    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });
  });

  it("passes additional props to Autocomplete", () => {
    renderWithTheme(
      <ProfileMenu
        profiles={mockProfiles}
        handleSelection={mockHandleSelection}
        data-testid="custom-autocomplete"
        disabled={true}
      />
    );

    const autocomplete = screen.getByTestId("custom-autocomplete");
    expect(autocomplete).toBeInTheDocument();

    // Check if the input is disabled instead of the container
    const input = screen.getByRole("combobox");
    expect(input).toBeDisabled();
  });

  it("shows popup icon", () => {
    renderWithTheme(
      <ProfileMenu
        profiles={mockProfiles}
        handleSelection={mockHandleSelection}
      />
    );

    // The forcePopupIcon prop should ensure the dropdown arrow is always visible
    const popupButton = screen.getByTitle("Open");
    expect(popupButton).toBeInTheDocument();
  });
});
