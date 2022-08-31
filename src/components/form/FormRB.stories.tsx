import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FormRB } from './FormRB';
import { TextFieldRB } from './TextFieldRB';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Form/FormWrapper",
  component: FormRB,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
} as ComponentMeta<typeof FormRB>;

//const Template: ComponentStory<typeof FormRB> = (args) => <FormRB {...args} />;
// export const Primary = Template.bind({});

export const Example: ComponentStory<typeof FormRB> = (args) => {
  return (
    <FormRB
      {...args} >

      <TextFieldRB
        label='Text1'
      />

    </FormRB>
  )
}
