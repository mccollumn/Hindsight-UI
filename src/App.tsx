import React from "react";
import "./App.css";
import { Layout } from "./components/navigation/Layout";
import ProfileMenu from "./components/profiles/ProfileMenu";
import { Routes, Route, useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import KeyMetrics from "./pages/KeyMetrics";
import AccountMenu from "./components/navigation/AccountMenu";
import DatePicker from "./components/navigation/DatePicker";
import { DateRange } from "@mui/x-date-pickers-pro/DateRangePicker";
import { ProfileProps } from "./interfaces/interfaces";
import useGetData from "./hooks/getData";

function App() {
  const navigate = useNavigate();
  const clickHandler = (navAction: any) => {
    navigate(navAction.path);
  };

  const {
    response: profiles,
    loading,
    error,
    status,
    getWtData,
  } = useGetData();

  React.useEffect(() => {
    getWtData({});
  }, [getWtData]);
  console.log("Profiles:", profiles);

  const [selectedProfile, setSelectedProfile] = React.useState<ProfileProps>(
    {}
  );
  const onProfileSelect = (
    event: React.SyntheticEvent<Element, Event>,
    value: ProfileProps
  ) => {
    console.log("Selected profile:", value);
    setSelectedProfile(value);
    navigate("/profile");
  };

  // const [selectedDate, setSelectedDate] = React.useState<DateRange<any>[]>([]);
  // const onDateSelect = (date: DateRange<any>[]) => {
  //   setSelectedDate(date);
  //   console.log("Period:", date);
  // };

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
          Component: <DatePicker /*handleDateChange={onDateSelect}*/ />,
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
        <Route path="/" element={<Homepage />} />
        <Route
          path="/profile"
          element={<KeyMetrics profile={selectedProfile} />}
        />
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
