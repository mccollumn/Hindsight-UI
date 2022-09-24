import React from "react";
import { Box, BoxProps } from '@mui/material';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { FormButtonRow } from './FormButtonRow';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Form/FormExample",
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
} as ComponentMeta<typeof FormContainer>;

export const Example: ComponentStory<typeof FormContainer> = (args) => {
  const defaultValues = {
    name: 'doood'
  };

  const onSuccess = (values: any) => {
    console.log('Success values', values);
  }

  return (
    <FormContainer
      onSuccess={onSuccess}
      defaultValues={defaultValues}
      {...args} >

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>

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

        <FormButtonRow
        
        />

      </Box>

    </FormContainer>
  )
}
