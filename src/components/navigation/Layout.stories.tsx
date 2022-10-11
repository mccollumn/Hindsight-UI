import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  Person,
  Notifications,
  Settings,
  Assessment,
  Apps,
} from "@mui/icons-material";
import { Layout } from "./Layout";
import { mockNavActions } from "./mocks/navActions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Layout",
  component: Layout,
  decorators: [
    (Story) => (
      <div
        style={{
          margin: '-1rem',  // Offset parent storybook padding
        }}>
        <Story />
      </div>
    ),
  ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    navigationActions: {
      defaultValue: mockNavActions,
    },
    isAuthorized: {
      value: true
    }
  },
} as ComponentMeta<typeof Layout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const LoggedOut = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LoggedOut.args = {
  label: "Logged Out",
  isAuthorized: false,
};

export const LoggedIn = () => {
  const [action, setAction] = React.useState();
  const clickHandler = (navAction: any) => {
    setAction(navAction);
  };

  return (
    <Layout
      label={"Logged In"}
      navigationActions={mockNavActions}
      navigationClick={clickHandler}
      isAuthorized={true}
    >
      <DisplaySelectedAction action={action} />
    </Layout>
  );
};

const DisplaySelectedAction = ({ action }: any) => {
  return <div>{action?.label}</div>;
};
