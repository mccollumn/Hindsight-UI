import React from "react";
import "./App.css";
import {
  Person,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Assessment,
  Apps,
} from "@mui/icons-material";
import { Layout } from "./components/navigation/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import logo from "./logo.svg";

function App() {
  const navigate = useNavigate();
  const clickHandler = (navAction: any) => {
    navigate(navAction.path);
  };

  return (
    <Layout
      isAuthorized={true}
      navigationActions={[
        {
          Component: <Logo />,
          authFilter: "always",
          position: "left",
        },
        {
          divider: true,
          authFilter: "always",
          position: "left",
        },
        {
          key: "Profiles",
          label: "Profiles",
          icon: <Apps />,
          ariaLabel: "Profiles",
          path: "/profiles",
          authFilter: "always",
          position: "left",
        },
        {
          key: "Reports",
          label: "Reports",
          icon: <Assessment />,
          ariaLabel: "Reports",
          path: "/reports",
          authFilter: "always",
          position: "left",
        },
        {
          key: "Notifications",
          label: "Notifications",
          icon: <NotificationsIcon />,
          ariaLabel: "Notifications",
          position: "top",
          path: "/notifications",
          authFilter: "always",
        },
        {
          key: "Settings",
          label: "Settings",
          icon: <SettingsIcon />,
          ariaLabel: "Settings",
          position: "top",
          path: "/settings",
          authFilter: "always",
        },
        {
          key: "Avatar",
          label: "Avatar",
          icon: <Person />,
          ariaLabel: "Avatar",
          position: "top",
          path: "/user",
          authFilter: "always",
        },
      ]}
      navigationClick={clickHandler}
    >
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Layout>
  );
}

const Homepage = () => <div>Home</div>;
const Profiles = () => <div>Profiles</div>;
const Reports = () => <div>Reports</div>;
const Notifications = () => <div>Notifications</div>;
const Settings = () => <div>Settings</div>;
const User = () => <div>User</div>;
const Logo = () => (
  <div>
    <img src={logo} alt="Logo" />
  </div>
);

export default App;
