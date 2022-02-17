import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
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
  leftNavigationActions,
  leftNavigationClick = () => {},
  children,
}: LayoutProps) => {
  const [selectedNav, setSelectedNav]: any = React.useState();
  const leftNavClickHandler = (action: NavigationAction) => {
    setSelectedNav(action);
    leftNavigationClick(action);
  };
  return (
    <Box sx={{ flexGrow: 1 }} aria-label="Base application">
      <AppBar position="static">
        <Toolbar>
          <NavDrawer
            leftNavigationActions={leftNavigationActions}
            leftNavigationClick={leftNavClickHandler}
            selectedNav={selectedNav}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {label}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
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
  handleClose
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
        selected={action === selectedNav}
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
  leftNavigationActions?: Array<NavigationAction>;
  leftNavigationClick?: Function;
  children?: any;
}

interface NavigationAction {
  key?: string;
  label?: string;
  ariaLabel?: string;
  icon?: React.FC | null;
  divider?: Boolean;
}

interface NavigationListProps {
  navigationActions: Array<NavigationAction>;
  navigationClick: Function;
  selectedNav: NavigationAction;
  handleClose: Function;
}
