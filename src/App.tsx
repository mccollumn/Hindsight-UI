import React from "react";
import "./App.css";
import { AuthContext } from "./providers/AuthProvider";
import { Layout } from "./components/navigation/Layout";
import ProfileMenu from "./components/profiles/ProfileMenu";
import { Routes, Route, useNavigate } from "react-router-dom";
import KeyMetrics from "./pages/KeyMetrics";
import Profiles from "./pages/Profiles";
import AccountMenu from "./components/navigation/AccountMenu";
import DatePicker from "./components/navigation/DatePicker";
import { ProfileProps } from "./interfaces/interfaces";
import useGetData from "./hooks/useGetData";
import { useQuery } from "@tanstack/react-query";
import { lastDayOfMonth } from "date-fns/fp";
import Login from "./pages/Login";
import ProtectedRoute from "./components/navigation/ProtectedRoute";

function App() {
  const { auth } = React.useContext(AuthContext);
  const [selectedProfile, setSelectedProfile] = React.useState<ProfileProps>(
    {}
  );
  const navigate = useNavigate();
  const { getDataQuery } = useGetData();
  const {
    isLoading,
    isSuccess,
    isError,
    data: profiles,
  } = useQuery(["profiles", {}], getDataQuery, {
    enabled: auth !== null,
  });

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
    navigate("/metrics");
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
          element={
            <ProtectedRoute>
              <Profiles profiles={profiles} onClick={onProfileSelect} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/metrics"
          element={
            <ProtectedRoute>
              <KeyMetrics profile={selectedProfile} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute>
              <Profiles profiles={profiles} onClick={onProfileSelect} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={<Profiles profiles={profiles} onClick={onProfileSelect} />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
