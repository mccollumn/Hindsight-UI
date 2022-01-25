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
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

export const Layout = ({
  label,
  leftNavigationActions,
  leftNavigationClick,
}: LayoutProps) => {
  console.log(leftNavigationActions);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NavDrawer leftNavigationActions={leftNavigationActions}>
            Yo drawer!
          </NavDrawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {label}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const NavDrawer = ({ leftNavigationActions = [], children }: any) => {
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
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <Menu />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={handleClose}>
        <NavigationList navigationActions={leftNavigationActions} />
        {children}
      </Drawer>
    </React.Fragment>
  );
};

const NavigationList = ({
  navigationActions = [],
}: NavigationListProps): any => {
  return navigationActions.map((action, index) => {
    if (action.divider) {
      return <Divider key={index} />;
    }
    return <div>The div</div>; // TODO: Create nav list here
  });
};

interface LayoutProps {
  /* Title of application */
  label?: string;
  leftNavigationActions?: Array<NavigationActions>;
  leftNavigationClick?: Function;
}

interface NavigationActions {
  key?: string;
  label?: string;
  ariaLabel?: string;
  icon?: React.Component;
  divider?: Boolean;
}

interface NavigationListProps {
  navigationActions: Array<NavigationActions>;
}
