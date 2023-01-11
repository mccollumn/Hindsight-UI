import { ComponentStory, ComponentMeta } from "@storybook/react";
import Profiles from "./Profiles";
import { ProfileProps } from "../interfaces/interfaces";
import { profiles } from "../mocks/data/profiles";

const handleSelection = (selectedProfile: ProfileProps) => {
  console.log("Selected Profile:", selectedProfile);
};

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Pages/Profiles",
  component: Profiles,
} as ComponentMeta<typeof Profiles>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Profiles> = (args) => (
  <Profiles {...args} />
);

// 👇 Each story then reuses that template
export const ProfilesPage = Template.bind({});
ProfilesPage.args = {
  profiles: profiles,
  onClick: handleSelection,
};
