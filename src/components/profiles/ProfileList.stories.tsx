import { ComponentStory, ComponentMeta } from "@storybook/react";

import ProfileList from "./ProfileList";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Profiles/Profile List",
  component: ProfileList,
} as ComponentMeta<typeof ProfileList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProfileList> = (args) => (
  <ProfileList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {profileNames:  [
  "Profile 1",
  "My Profile",
  "Your Profile",
  "Some other profile with a much longer name because it includes stuff like a URL",
]}