import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import ProfileList from "./ProfileList";

// Mock ProfileItem component
jest.mock("./ProfileItem", () => {
  return function MockProfileItem({ children, clickHandler }: any) {
    return (
      <div
        data-testid="profile-item"
        onClick={(e) => clickHandler(e, children)}
        style={{ cursor: "pointer" }}
      >
        {children}
      </div>
    );
  };
});

const theme = createTheme();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </BrowserRouter>
  );
};

describe("ProfileList", () => {
  const mockSetSection = jest.fn();
  const mockProfileNames = ["Profile 1", "Profile 2", "Profile 3"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all profile names", () => {
    renderWithProviders(
      <ProfileList
        profileNames={mockProfileNames}
        setSection={mockSetSection}
      />
    );

    expect(screen.getByText("Profile 1")).toBeInTheDocument();
    expect(screen.getByText("Profile 2")).toBeInTheDocument();
    expect(screen.getByText("Profile 3")).toBeInTheDocument();
  });

  it("renders correct number of ProfileItem components", () => {
    renderWithProviders(
      <ProfileList
        profileNames={mockProfileNames}
        setSection={mockSetSection}
      />
    );

    const profileItems = screen.getAllByTestId("profile-item");
    expect(profileItems).toHaveLength(3);
  });

  it('calls setSection with "reports" when profile is clicked', () => {
    renderWithProviders(
      <ProfileList
        profileNames={mockProfileNames}
        setSection={mockSetSection}
      />
    );

    const firstProfile = screen.getByText("Profile 1");
    fireEvent.click(firstProfile);

    expect(mockSetSection).toHaveBeenCalledWith("reports");
  });

  it("handles empty profile names array", () => {
    renderWithProviders(
      <ProfileList profileNames={[]} setSection={mockSetSection} />
    );

    const profileItems = screen.queryAllByTestId("profile-item");
    expect(profileItems).toHaveLength(0);
  });

  it("handles duplicate profile names", () => {
    const duplicateNames = ["Profile 1", "Profile 1", "Profile 2"];
    renderWithProviders(
      <ProfileList profileNames={duplicateNames} setSection={mockSetSection} />
    );

    const profileItems = screen.getAllByTestId("profile-item");
    expect(profileItems).toHaveLength(3);

    // Should render all items, even duplicates
    const profile1Items = screen.getAllByText("Profile 1");
    expect(profile1Items).toHaveLength(2);
  });

  it("renders with proper container styling", () => {
    renderWithProviders(
      <ProfileList
        profileNames={mockProfileNames}
        setSection={mockSetSection}
      />
    );

    const container = screen
      .getByText("Profile 1")
      // eslint-disable-next-line testing-library/no-node-access
      .closest("div")?.parentElement;
    expect(container).toHaveStyle({
      margin: "2rem",
      height: "100vh",
    });
  });

  it("passes correct clickHandler to ProfileItem components", () => {
    renderWithProviders(
      <ProfileList
        profileNames={["Test Profile"]}
        setSection={mockSetSection}
      />
    );

    const profileItem = screen.getByText("Test Profile");
    fireEvent.click(profileItem);

    // Verify navigation and section setting would occur
    expect(mockSetSection).toHaveBeenCalledWith("reports");
  });

  it("uses profile name as key for each ProfileItem", () => {
    const profileNames = ["Unique Profile 1", "Unique Profile 2"];
    renderWithProviders(
      <ProfileList profileNames={profileNames} setSection={mockSetSection} />
    );

    // Test that each profile name is rendered
    expect(screen.getByText("Unique Profile 1")).toBeInTheDocument();
    expect(screen.getByText("Unique Profile 2")).toBeInTheDocument();
  });
});
