import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextFieldElement } from 'react-hook-form-mui'
import { FormWrapper } from './FormWrapper'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Form/FormExample",
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
} as ComponentMeta<typeof FormWrapper>;

export const Example: ComponentStory<typeof FormWrapper> = (args) => {
  const defaultValues = {
    name: 'doood'
  };

  const onSuccess = (values: any) => {
    console.log('Success values', values);
  }

  return (
    <FormWrapper
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
        <TextFieldElement
          label='Text1'
          name='name'
          validation={{
            maxLength: {
              value: 2,
              message: 'Oh no you dih nt'
            },
            required: 'Hey fool'
          }}
        />

        <TextFieldElement
          label='Text2'
          name='name2'
          validation={{
            maxLength: {
              value: 2,
              message: 'Oh no you dih nt'
            },
            required: 'Hey fool'
          }}
        />

    </FormWrapper>
  )
}
