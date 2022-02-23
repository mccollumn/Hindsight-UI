import React from "react";
import "./App.css";
import HomeIcon from "@mui/icons-material/Home";
import {Layout} from "./components/navigation/Layout";

function App() {
  const [action, setAction] = React.useState("HOME");
  const clickHandler = (navAction: any) => {
    setAction(navAction.key);
  };
  let page = <Home />;
  if (action === "HOME2") {
    page = <Home2 />;
  }
  return (
    <div className="App">
      <Layout
      leftNavigationActions={[
        {
          key: "HOME",
          label: "Home",
          icon: <HomeIcon />,
          ariaLabel: "Home",
        },
        { divider: true },
        {
          key: "HOME2",
          label: "Home2",
          icon: <HomeIcon />,
          ariaLabel: "Home2",
        },
      ]}
      leftNavigationClick={clickHandler}
    >
      {page}
    </Layout>
    </div>
  );
}

const Home = () => <div>Home</div>;
const Home2 = () => <div>Home2</div>;

export default App;
