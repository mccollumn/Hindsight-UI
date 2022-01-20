import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
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
          <NavDrawer>Yo drawer!</NavDrawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {label}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const NavDrawer = ({ children }: any) => {
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
        {children}
      </Drawer>
    </React.Fragment>
  );
};

interface LayoutProps {
  /* Title of application */
  label?: string;
  leftNavigationActions?: Array<NavigationActions>;
  leftNavigationClick?: Function;
}

interface NavigationActions {
  label?: string;
  ariaLabel?: string;
  icon?: React.Component;
  divider?: Boolean;
}
