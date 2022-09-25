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
      title="Login"
      description="Example login page">

      <TextFieldElement
        label='Username/Email'
        name='username'
        validation={{
          required: 'Username is required'
        }}
      />

      <TextFieldElement
        label='Password'
        name='password'
        type={'password'}
        validation={{
          required: 'Password is required',
          validate: {
            hello: (hey: any) => {
              console.log('pooty', hey);
            }
          }
        }}
      />

    </FormWrapper>
  )
}
