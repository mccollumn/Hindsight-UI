import {
  Person,
  Notifications,
  Settings,
  Assessment,
  Apps,
  Login,
} from "@mui/icons-material";
import logo from "../../../logo.svg";
import { NavigationAction } from "../Layout";

export const mockNavActions: Array<NavigationAction> = [
  {
    key: "Profiles",
    label: "Profiles",
    icon: <Apps />,
    ariaLabel: "Profiles",
    path: "/profiles",
    authFilter: "authorized",
    position: "left",
  },
  {
    key: "Reports",
    label: "Reports",
    icon: <Assessment />,
    ariaLabel: "Reports",
    path: "/reports",
    authFilter: "authorized",
    position: "left",
  },
  {
    divider: true,
    authFilter: "always",
    position: "left",
  },
  {
    key: "Notifications",
    label: "Notifications",
    icon: <Notifications />,
    ariaLabel: "Notifications",
    authFilter: "authorized",
    position: "top",
  },
  {
    key: "Settings",
    label: "Settings",
    icon: <Settings />,
    ariaLabel: "Settings",
    authFilter: "authorized",
    position: "top",
  },
  {
    key: "Avatar",
    label: "Avatar",
    icon: <Person />,
    ariaLabel: "Avatar",
    authFilter: "authorized",
    position: "top",
  },
  {
    key: "Login",
    label: "Login",
    icon: <Login/>,
    ariaLabel: "Login",
    authFilter: "unauthorized",
    position: "top",
  },
];
