import React from "react";
import "./App.css";
import { Layout } from "./components/navigation/Layout";
import ProfileMenu from "./components/profiles/ProfileMenu";
import { Routes, Route, useNavigate } from "react-router-dom";
import KeyMetrics from "./pages/KeyMetrics";
import Profiles from "./pages/Profiles";
import AccountMenu from "./components/navigation/AccountMenu";
import DatePicker from "./components/navigation/DatePicker";
import { ProfileProps } from "./interfaces/interfaces";
import useGetData from "./hooks/getData";
import { useQuery } from "@tanstack/react-query";
import { lastDayOfMonth } from "date-fns/fp";

function App() {
  const [selectedProfile, setSelectedProfile] = React.useState<ProfileProps>(
    {}
  );
  const navigate = useNavigate();
  const { getDataQuery } = useGetData();
  const {
    isLoading,
    isError,
    data: profiles,
    error,
  } = useQuery(["profiles", {}], getDataQuery);

  console.log("Profiles:", profiles);

  const clickHandler = (navAction: any) => {
    navigate(navAction.path);
  };

  const onProfileSelect = (
    value: ProfileProps,
    event?: React.SyntheticEvent<Element, Event>
  ) => {
    console.log("Selected profile:", value);
    setSelectedProfile(value);
    navigate("/profile");
  };

  return (
    <Layout
      label="Webtrends"
      isAuthorized={true}
      navigationActions={[
        {
          key: "DatePicker",
          label: "DatePicker",
          ariaLabel: "DatePicker",
          authFilter: "authorized",
          position: "top",
          Component: <DatePicker maxDate={lastDayOfMonth(new Date())} />,
          snapPosition: "right",
        },
        {
          key: "AccountMenu",
          label: "AccountMenu",
          ariaLabel: "AccountMenu",
          authFilter: "always",
          position: "top",
          Component: <AccountMenu />,
          snapPosition: "right",
        },
        {
          key: "ProfileMenu",
          label: "ProfileMenu",
          ariaLabel: "ProfileMenu",
          authFilter: "authorized",
          position: "top",
          Component: (
            <ProfileMenu
              profiles={profiles}
              handleSelection={onProfileSelect}
            />
          ),
          snapPosition: "left",
        },
      ]}
      navigationClick={clickHandler}
    >
      <Routes>
        <Route
          path="/"
          element={<Profiles profiles={profiles} onClick={onProfileSelect} />}
        />
        <Route
          path="/profile"
          element={<KeyMetrics profile={selectedProfile} />}
        />
        <Route
          path="/profiles"
          element={<Profiles profiles={profiles} onClick={onProfileSelect} />}
        />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Layout>
  );
}

const Reports = () => <div>Reports</div>;
const Notifications = () => <div>Notifications</div>;
const Settings = () => <div>Settings</div>;
const User = () => <div>User</div>;

export default App;
