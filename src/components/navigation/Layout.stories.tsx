import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import HomeIcon from "@mui/icons-material/Home";

import { Layout } from "./Layout";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Layout",
  component: Layout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    leftNavigationActions: {
      defaultValue: [
        { key: "HOME", label: "Home", icon: <HomeIcon />, ariaLabel: "Home" },
        { divider: true },
        {
          key: "HOME2",
          label: "Home2",
          icon: <HomeIcon />,
          ariaLabel: "Home2",
        },
      ],
    },
  },
} as ComponentMeta<typeof Layout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: "App Name",
};

export const UsageExample = () => {
  const ACTION_MAP = { HOME: <Home />, HOME2: <Home2 /> };
  const [action, setAction] = React.useState("HOME");
  const clickHandler = (navAction: any) => {
    setAction(navAction.key);
  };
  let page = <Home />;
  if (action === "HOME2") {
    page = <Home2 />;
  }
  return (
    <Layout
      leftNavigationActions={[
        {
          key: "HOME",
          label: "Home",
          icon: () => <HomeIcon />,
          ariaLabel: "Home",
        },
        { divider: true },
        {
          key: "HOME2",
          label: "Home2",
          icon: () => <HomeIcon />,
          ariaLabel: "Home2",
        },
      ]}
      leftNavigationClick={clickHandler}
    >
      {page}
    </Layout>
  );
};

const Home = () => <div>Home</div>;
const Home2 = () => <div>Home2</div>;
