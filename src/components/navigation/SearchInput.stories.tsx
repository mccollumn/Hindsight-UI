import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchInput from "./SearchInput";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Navigation/Search Input",
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof SearchInput> = (args) => (
  <SearchInput {...args} />
);

const searchHandler = (value: string) => console.log(value);

// 👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = { label: "Search", variant: "standard", searchHandler };
