import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextFieldRB } from './TextFieldRB';
import { FormRB } from './FormRB';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Form/TextField",
  component: TextFieldRB,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
} as ComponentMeta<typeof TextFieldRB>;

const Template: ComponentStory<typeof TextFieldRB> = (args) => <TextFieldRB {...args} />;

export const Simple = Template.bind({});

//export const WithForm = Template.bind({});

export const WithForm: ComponentStory<typeof TextFieldRB> = (args) => {
  return (
    <FormRB
      resetButtonText={'Reset'}
      submitButtonText={'Submit'}>

      <TextFieldRB
        label='Text1'
        {...args}
      />

    </FormRB>
  )
}
