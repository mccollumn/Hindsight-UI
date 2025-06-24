import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { TopNavBar } from "./TopNavBar";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("TopNavBar", () => {
  const mockNavClickHandler = jest.fn();
  const mockExpandNav = jest.fn();

  const mockTopNavActions = [
    {
      key: "home",
      label: "Home",
      icon: <HomeIcon />,
      ariaLabel: "Home navigation",
      snapPosition: "left",
    },
    {
      key: "center-action",
      label: "Center Action",
      icon: <SettingsIcon />,
      ariaLabel: "Center navigation",
      snapPosition: "center",
    },
    {
      key: "account",
      label: "Account",
      icon: <AccountCircleIcon />,
      ariaLabel: "Account navigation",
      snapPosition: "right",
    },
    {
      key: "default-right",
      label: "Default Right",
      icon: <SettingsIcon />,
      ariaLabel: "Default right navigation",
      // No snapPosition - should default to right
    },
    {
      key: "custom-component",
      Component: <div>Custom Component</div>,
      snapPosition: "right",
    },
  ];

  const defaultProps = {
    topNavActions: mockTopNavActions,
    navClickHandler: mockNavClickHandler,
    selectedNav: null,
    label: "Test App",
    expandNav: mockExpandNav,
    open: false,
    topNavHeight: 64,
    maxWidth: 240,
    showMenu: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders top navigation bar", () => {
    renderWithTheme(<TopNavBar {...defaultProps} />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByAltText("Analtyics Logo")).toBeInTheDocument();
  });

  it("renders menu button when nav is closed and showMenu is true", () => {
    renderWithTheme(
      <TopNavBar {...defaultProps} open={false} showMenu={true} />
    );

    const menuButton = screen.getByLabelText("Expand Left Navigation");
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toBeVisible();
  });

  it("hides menu button when nav is open", () => {
    renderWithTheme(
      <TopNavBar {...defaultProps} open={true} showMenu={true} />
    );

    const menuButton = screen.getByLabelText("Expand Left Navigation");
    expect(menuButton).not.toBeVisible();
  });

  it("hides menu button when showMenu is false", () => {
    renderWithTheme(
      <TopNavBar {...defaultProps} open={false} showMenu={false} />
    );

    const menuButton = screen.getByLabelText("Expand Left Navigation");
    expect(menuButton).not.toBeVisible();
  });

  it("calls expandNav when menu button is clicked", () => {
    renderWithTheme(
      <TopNavBar {...defaultProps} open={false} showMenu={true} />
    );

    const menuButton = screen.getByLabelText("Expand Left Navigation");
    fireEvent.click(menuButton);

    expect(mockExpandNav).toHaveBeenCalled();
  });

  it("renders navigation actions in correct positions", () => {
    renderWithTheme(<TopNavBar {...defaultProps} />);

    // Left position
    const leftSection = screen.getByTestId("top-nav-left");
    expect(leftSection).toBeInTheDocument();

    // Center position
    const centerSection = screen.getByTestId("top-nav-center");
    expect(centerSection).toBeInTheDocument();

    // Right position (including default position and custom component)
    const rightSection = screen.getByTestId("top-nav-right");
    expect(rightSection).toBeInTheDocument();
    expect(screen.getByText("Custom Component")).toBeInTheDocument();
  });

  it("calls navClickHandler when navigation action is clicked", () => {
    renderWithTheme(<TopNavBar {...defaultProps} />);

    const homeButton = screen.getByLabelText("Home navigation");
    fireEvent.click(homeButton);

    expect(mockNavClickHandler).toHaveBeenCalledWith(mockTopNavActions[0]);
  });

  it("highlights selected navigation action", () => {
    const selectedNav = mockTopNavActions[0];
    renderWithTheme(<TopNavBar {...defaultProps} selectedNav={selectedNav} />);

    const homeButton = screen.getByLabelText("Home navigation");
    expect(homeButton).toHaveClass("MuiIconButton-colorSecondary");
  });

  it("shows tooltips on navigation actions", () => {
    renderWithTheme(<TopNavBar {...defaultProps} />);

    const homeButton = screen.getByLabelText("Home navigation");
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      homeButton.closest("[data-mui-internal-clone-element]")
    ).toBeInTheDocument();
  });

  it("renders custom component actions", () => {
    renderWithTheme(<TopNavBar {...defaultProps} />);

    expect(screen.getByText("Custom Component")).toBeInTheDocument();
  });

  it("applies correct width styling when open", () => {
    renderWithTheme(<TopNavBar {...defaultProps} open={true} maxWidth={240} />);

    const appBar = screen.getByRole("banner");
    expect(appBar).toHaveStyle({ width: "calc(100% - 240px)" });
  });

  it("applies full width styling when closed", () => {
    renderWithTheme(<TopNavBar {...defaultProps} open={false} />);

    const appBar = screen.getByRole("banner");
    expect(appBar).toHaveStyle({ width: "100%" });
  });

  it("applies correct toolbar height", () => {
    renderWithTheme(<TopNavBar {...defaultProps} topNavHeight={80} />);

    const toolbar = screen.getByTestId("top-nav-bar");
    expect(toolbar).toHaveStyle({ height: "80px" });
  });

  it("handles empty topNavActions array", () => {
    renderWithTheme(<TopNavBar {...defaultProps} topNavActions={[]} />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByAltText("Analtyics Logo")).toBeInTheDocument();
  });

  it("defaults actions without snapPosition to right", () => {
    const actionsWithoutPosition = [
      {
        key: "no-position",
        label: "No Position",
        icon: <SettingsIcon />,
        ariaLabel: "No position navigation",
      },
    ];

    renderWithTheme(
      <TopNavBar {...defaultProps} topNavActions={actionsWithoutPosition} />
    );

    const rightSection = screen.getByTestId("top-nav-right");
    expect(rightSection).toContainElement(
      screen.getByLabelText("No position navigation")
    );
  });

  it("preserves action keys when rendering custom components", () => {
    const actionWithComponent = {
      key: "custom-key",
      Component: <div data-testid="custom-component">Custom</div>,
    };

    renderWithTheme(
      <TopNavBar {...defaultProps} topNavActions={[actionWithComponent]} />
    );

    const customComponent = screen.getByTestId("custom-component");
    expect(customComponent).toBeInTheDocument();
  });
});
