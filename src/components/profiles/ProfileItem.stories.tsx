import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProfileItem from "./ProfileItem";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Profiles/Profile Item",
  component: ProfileItem,
} as ComponentMeta<typeof ProfileItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProfileItem> = (args) => (
  <ProfileItem {...args}>Profile Name</ProfileItem>
);

export const Primary = Template.bind({});
Primary.args = {clickHandler: () => console.log("Profile item click")}
