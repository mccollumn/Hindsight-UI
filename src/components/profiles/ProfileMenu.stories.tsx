import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProfileMenu from "./ProfileMenu";
import { profiles } from "../../../mock-data/profiles";
import { ProfileProps } from "../../interfaces/interfaces";

// const profiles: any[] = [];

const handleSelection = (event: React.SyntheticEvent<Element, Event>, value: ProfileProps | null) => {
    console.log("Event:", event);
    console.log("Value:", value);
}

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Profiles/Profile Menu",
  component: ProfileMenu,
} as ComponentMeta<typeof ProfileMenu>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ProfileMenu> = (args) => (
  <ProfileMenu {...args} />
);

// 👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = { profiles: profiles, handleSelection };
