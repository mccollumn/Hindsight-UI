import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Box
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { NavigationAction } from './Layout';

export const TopNavBar = ({
  topNavActions,
  navClickHandler,
  selectedNav,
  label,
  expandNav = () => {},
  open,
  topNavHeight,
  maxWidth,
  showMenu,
}: any) => {

  const topBarNavigationActions = TopBarNavigationActions({
    topNavActions,
    navClickHandler,
    selectedNav,
  });

  return (
    <AppBarStyled
      data-max={maxWidth}
      data-open={open}>

      <Toolbar
        sx={{
          height: topNavHeight
        }}>

        <Box className="top-nav-left">
          <IconButton
            onClick={expandNav}
            size="large"
            edge="start"
            color="inherit"
            aria-label="Expand Left Navigation"
            sx={{
              display: (open || !showMenu) ? 'none' : 'block',
              height: 48
            }}
          >
            <Menu />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1
            }}>

            {label}

          </Typography>
        </Box>

        <Box className="top-nav-center"></Box>

        <Box className="top-nav-right">
          {topBarNavigationActions}
        </Box>

      </Toolbar>

    </AppBarStyled>
  );
}

const TopBarNavigationActions = ({
  topNavActions = [],
  navClickHandler = () => {},
  selectedNav
}: TopNavigationListProps) => {
  return topNavActions
    .map((a: NavigationAction) => {
      if (a.Component) {
        return a.Component;
      }
      const clickHandler = () => navClickHandler(a);
      const selected = a.key === selectedNav?.key;
      return (
        <Tooltip
          key={a.key}
          title={a.label || ''}>

          <IconButton
            color={selected ? "secondary" : "inherit"}
            key={a.key}
            onClick={clickHandler}
            aria-label={a.ariaLabel}
          >
            {a.icon}
          </IconButton>

        </Tooltip>
      );
    });
};

const AppBarStyled = styled(AppBar)(({
  theme,
  ...props
}: any) => {

  const open = props['data-open'];
  const max = props['data-max'];

  return {
    width: open ? `calc(100% - ${max}px)` : "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

    ".top-nav-left": {
      display: "flex",
      flexGrow: 1,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    ".top-nav-center": {
      display: "flex",
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    ".top-nav-right": {
      display: "flex",
      flexGrow: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
  };

});

interface TopNavigationListProps {
  topNavActions: Array<NavigationAction>;
  navClickHandler: Function;
  selectedNav?: NavigationAction;
  isAuthorized?: boolean;
}
