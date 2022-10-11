import { ChevronLeft } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Collapse,
  Tooltip,
} from "@mui/material";
import { NavigationAction } from './Layout';
import { filterNavigationActions } from './navigation.util';

export const LeftNavDrawer = ({
  leftNavigationActions = [],
  leftNavigationClick,
  collapseNav = () => {},
  selectedNav,
  open,
  minWidth,
  maxWidth,
  topNavHeight,
  isAuthorized,
  showDrawer,
  children,
}: any) => {
  return (

    <Drawer
      anchor="left"
      aria-label="Navigation drawer"
      variant={"permanent"}
      sx={{
        zIndex: 0,
        display: !showDrawer ? 'none' : 'flex',
        overflowY: 'hidden',
      }}
    >

      <Collapse
        sx={{
          width: minWidth
        }}
        orientation="horizontal"
        in={open}
        collapsedSize={minWidth}>

        <Box
          sx={{
            height: topNavHeight,
            width: maxWidth,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>

          <IconButton
            onClick={collapseNav}
            size="large"
            edge="start"
            color="inherit"
            aria-label="Collapse Left Navigation"
            sx={{
              height: 48
            }}
          >
            <ChevronLeft />
          </IconButton>

        </Box>

        <Divider />

        <List
          className="ListContainer"
          sx={{
            overflowX: "hidden",
          }}
          aria-label="Navigation list"
        >
          <NavigationList
            navigationActions={leftNavigationActions}
            navigationClick={leftNavigationClick}
            selectedNav={selectedNav}
            isAuthorized={isAuthorized}
          />
        </List>
        {children}

      </Collapse>

    </Drawer >
  );
}

const NavigationList = ({
  navigationActions = [],
  navigationClick = () => {},
  selectedNav,
  isAuthorized
}: NavigationListProps): any => {
  return navigationActions
    .filter((a: NavigationAction) => {
      return filterNavigationActions({
        action: a,
        isAuthorized
      })
    })
    .map((action, index) => {
      const handleClick = () => {
        navigationClick(action);
      };
      if (action.divider) {
        return <Divider key={index} />;
      }
      if (action.Component) {
        return <ComponentOverride component={action.Component} key={index} />;
      }
      return (
        <ListItemButton
          selected={action.key === selectedNav?.key}
          key={index}
          onClick={handleClick}
        >
          <Tooltip title={action.label || ''}>
            <ListItemIcon>{action.icon}</ListItemIcon>
          </Tooltip >
          <ListItemText>{action.label}</ListItemText>
        </ListItemButton>
      );
    });
};

const ComponentOverride = ({ component }: any) => {
  return <div>{component}</div>;
};

interface NavigationListProps {
  navigationActions: Array<NavigationAction>;
  navigationClick: Function;
  selectedNav: NavigationAction;
  isAuthorized: boolean;
}
