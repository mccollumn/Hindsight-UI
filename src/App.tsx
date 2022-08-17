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
      navigationActions={[
        {
          Component: <Logo />,
        },
        { divider: true },
        {
          key: "Profiles",
          label: "Profiles",
          icon: <Apps />,
          ariaLabel: "Profiles",
          path: "/profiles",
        },
        {
          key: "Reports",
          label: "Reports",
          icon: <Assessment />,
          ariaLabel: "Reports",
          path: "/reports",
        },
        {
          key: "Notifications",
          label: "Notifications",
          icon: <NotificationsIcon />,
          ariaLabel: "Notifications",
          position: "top",
          path: "/notifications",
        },
        {
          key: "Settings",
          label: "Settings",
          icon: <SettingsIcon />,
          ariaLabel: "Settings",
          position: "top",
          path: "/settings",
        },
        {
          key: "Avatar",
          label: "Avatar",
          icon: <Person />,
          ariaLabel: "Avatar",
          position: "top",
          path: "/user",
        },
      ]}
      leftNavigationClick={clickHandler}
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
