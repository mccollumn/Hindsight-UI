import React from "react";
import {
  Box,
} from "@mui/material";
import { TopNavBar } from './TopNavBar'
import { LeftNavDrawer } from './LeftNavDrawer'
import { filterNavigationActions } from './navigation.util';

export const Layout = ({
  label,
  navigationActions = [],
  navigationClick = () => {},
  topNavHeight = 64,
  leftNavMinWidth = 64,
  leftNavMaxWidth = 240,
  isAuthorized,
  children,
}: LayoutProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedNav, setSelectedNav]: any = React.useState();

  const expandNav = () => setOpen(true);
  const collapseNav = () => setOpen(false);

  const navClickHandler = (action: NavigationAction) => {
    setSelectedNav(action);
    navigationClick(action);
  };

  const {
    topNavActions,
    leftNavActions,
    leftNavCount
  } = getNavigationActions(
    navigationActions,
    isAuthorized
  );

  let baseClassNames = ['base-application'];
  baseClassNames.push(open ? 'expanded' : 'contracted');

  return (
    <Box
      className={baseClassNames.join(' ')}
      sx={{
        display: "flex",
        flexGrow: 1
      }}
      aria-label="Base application">

      <TopNavBar
        isAuthorized={isAuthorized}
        topNavActions={topNavActions}
        navClickHandler={navClickHandler}
        selectedNav={selectedNav}
        label={label}
        expandNav={expandNav}
        open={open}
        showMenu={!!leftNavCount}
        topNavHeight={topNavHeight}
        maxWidth={leftNavMaxWidth}
      />

      <LeftNavDrawer
        isAuthorized={isAuthorized}
        leftNavigationActions={leftNavActions}
        leftNavigationClick={navClickHandler}
        selectedNav={selectedNav}
        open={open}
        showDrawer={!!leftNavCount}
        collapseNav={collapseNav}
        minWidth={leftNavMinWidth}
        maxWidth={leftNavMaxWidth}
        topNavHeight={topNavHeight}
      />

      <Box
        className={'base-page-container'}
        sx={{
          marginTop: `${topNavHeight}px`,
          marginLeft: open ? `${leftNavMaxWidth}px` : `${leftNavMinWidth}px`,
          width: '100%',
          height: '100%',
          padding: '24px'
        }}
      >

        {children}

      </Box>
    </Box>
  );
};

const getNavigationActions = (
  navigationActions: Array<NavigationAction>,
  isAuthorized: boolean
) => {
  const topNavActions = navigationActions
    .filter((a: NavigationAction) => a.position === "top")
    .filter((a: NavigationAction) => {
      return filterNavigationActions({
        action: a,
        isAuthorized
      })
    });

  const leftNavActions = navigationActions
    .filter((a: NavigationAction) => a.position !== "top")
    .filter((a: NavigationAction) => {
      return filterNavigationActions({
        action: a,
        isAuthorized
      })
    });

  return {
    topNavActions,
    leftNavActions,
    // Filter any dividers
    leftNavCount: leftNavActions.filter((a: NavigationAction) => !a.divider).length
  }

}

interface LayoutProps {
  /**
     Title of application
   */
  label?: string;
  /**
   * List of all navigation actions in left navigation and app bar
   */
  navigationActions?: Array<NavigationAction>;
  /**
   * Current user authorized status
   */
  isAuthorized: boolean,
  /**
   * Event when navigation is clicked, returns navigation item
   */
  navigationClick?: Function;
  /**
   * Top navigation bar height
   */
  topNavHeight?: number,
  /**
   * Left navigation drawer collapsed width
   */
  leftNavMinWidth?: number,
  /**
   * Left navigation drawer expanded width
   */
  leftNavMaxWidth?: number,
  /**
   * All child elements
   */
  children?: any;
}

export interface NavigationAction {
  key?: string;
  /**
   * Display actions on authorization state
   * always: Always show regardless of auth status
   * authorized: Only show when user is authorized
   * unauthorized: Only show when user is not authorized
   */
  authFilter: "always" | "authorized" | "unauthorized";
  /**
   * Display text to the user
   */
  label?: string;
  /**
   * Aria text
   */
  ariaLabel?: string;
  /**
   * MUI Icon to display
   */
  icon?: React.ReactElement | null;
  /**
   * Display a divider in navigation
   */
  divider?: Boolean;
  /**
   * Path to redirect to on nav click
   */
  path?: string;
  /**
   * Define which navigation area to display the action
   * left: Left navigation drawer
   * top: Top app navigation
   */
  position: "left" | "top";
  /**
   * Render component instead of drawer menu item
   */
  Component?: React.ReactElement | null;
}
