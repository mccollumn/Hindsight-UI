import React from "react";
import "./App.css";
import {
  Person,
  Notifications,
  Settings,
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
          icon: <Notifications />,
          ariaLabel: "Notifications",
          position: "top",
        },
        {
          key: "Settings",
          label: "Settings",
          icon: <Settings />,
          ariaLabel: "Settings",
          position: "top",
        },
        {
          key: "Avatar",
          label: "Avatar",
          icon: <Person />,
          ariaLabel: "Avatar",
          position: "top",
        },
      ]}
      leftNavigationClick={clickHandler}
    >
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Layout>
  );
}

const Homepage = () => <div>Home</div>;
const Profiles = () => <div>Reports</div>;
const Reports = () => <div>Reports</div>;
const Logo = () => (
  <div>
    <img src={logo} alt="Logo" />
  </div>
);

export default App;
