import React from "react";
import "./App.css";
import HomeIcon from "@mui/icons-material/Home";
import { Layout } from "./components/navigation/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const clickHandler = (navAction: any) => {
    navigate(navAction.path);
  };

  return (
    <Layout
      navigationActions={[
        {
          key: "HOME",
          label: "Home",
          icon: <HomeIcon />,
          ariaLabel: "Home",
          path: "/",
        },
        { divider: true },
        {
          key: "HOME2",
          label: "Home2",
          icon: <HomeIcon />,
          ariaLabel: "Home2",
          path: "/home2",
        },
        {
          key: "Avatar",
          label: "Avatar",
          icon: <HomeIcon />,
          ariaLabel: "Avatar",
          position: "top",
        },
      ]}
      leftNavigationClick={clickHandler}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
      </Routes>
    </Layout>
  );
}

const Home = () => <div>Home</div>;
const Home2 = () => <div>Home2</div>;

export default App;
