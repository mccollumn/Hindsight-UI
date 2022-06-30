import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

export const Layout = ({
  label,
  navigationActions = [],
  leftNavigationClick = () => {},
  children,
}: LayoutProps) => {
  const [selectedNav, setSelectedNav]: any = React.useState();
  const navClickHandler = (action: NavigationAction) => {
    setSelectedNav(action);
    leftNavigationClick(action);
  };
  const topNavActions = navigationActions.filter((a) => a.position === "top");
  const leftNavActions = navigationActions.filter((a) => a.position !== "top");
  const appBarNavigationActions = AppBarNavigationActions({
    topNavActions,
    navClickHandler,
    selectedNav,
  });

  return (
    <Box sx={{ flexGrow: 1 }} aria-label="Base application">
      <AppBar position="static">
        <Toolbar>
          <NavDrawer
            leftNavigationActions={leftNavActions}
            leftNavigationClick={navClickHandler}
            selectedNav={selectedNav}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {label}
          </Typography>
          {appBarNavigationActions}
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};

const AppBarNavigationActions = ({
  topNavActions = [],
  navClickHandler = () => {},
  selectedNav = {},
}: AppBarNavigationActionsProps) => {
  return topNavActions.map((a) => {
    const clickHandler = () => navClickHandler(a);
    const selected = a.key === selectedNav.key;
    return (
      <IconButton
        color={selected ? "secondary" : "inherit"}
        key={a.key}
        onClick={clickHandler}
      >
        {a.icon}
      </IconButton>
    );
  });
};

const NavDrawer = ({
  leftNavigationActions = [],
  leftNavigationClick,
  selectedNav,
  children,
}: any) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleOpen}
        size="large"
        edge="start"
        color="inherit"
        aria-label="Navigation menu"
        sx={{ mr: 2 }}
      >
        <Menu />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleClose}
        aria-label="Navigation drawer"
      >
        <List sx={{ width: 200 }} aria-label="Navigation list">
          <NavigationList
            navigationActions={leftNavigationActions}
            navigationClick={leftNavigationClick}
            selectedNav={selectedNav}
            handleClose={handleClose}
          />
        </List>
        {children}
      </Drawer>
    </React.Fragment>
  );
};

const NavigationList = ({
  navigationActions = [],
  navigationClick = () => {},
  selectedNav,
  handleClose,
}: NavigationListProps): any => {
  return navigationActions.map((action, index) => {
    const handleClick = () => {
      navigationClick(action);
      handleClose();
    };
    if (action.divider) {
      return <Divider key={index} />;
    }
    return (
      <ListItemButton
        selected={action.key === selectedNav?.key}
        key={index}
        onClick={handleClick}
      >
        <ListItemIcon>{action.icon}</ListItemIcon>
        <ListItemText>{action.label}</ListItemText>
      </ListItemButton>
    );
  });
};

interface LayoutProps {
  /* Title of application */
  label?: string;
  /**
   * List of all navigation actions in left navigation and app bar
   */
  navigationActions?: Array<NavigationAction>;
  leftNavigationClick?: Function;
  children?: any;
}

interface NavigationAction {
  key?: string;
  label?: string;
  ariaLabel?: string;
  icon?: React.ReactElement | null;
  divider?: Boolean;
  path?: string;
  /* Define which navigation area to disaply the action */
  position?: "left" | "top";
}

interface NavigationListProps {
  navigationActions: Array<NavigationAction>;
  navigationClick: Function;
  selectedNav: NavigationAction;
  handleClose: Function;
}

interface AppBarNavigationActionsProps {
  topNavActions?: Array<NavigationAction>;
  navClickHandler?: Function;
  selectedNav?: NavigationAction;
}
