import React from 'react';
import {
  FormProvider,
  useForm,
  UseFormReturn,
  UseFormReset
} from 'react-hook-form';
import { Box, BoxProps } from '@mui/material';
import { FormButtonRow } from './FormButtonRow';

export const FormRB = ({
  methods,
  defaultValues,
  children,
  className,
  onSubmit = () => { },
  submitButtonText,
  resetButtonText,
  ...props
}: FormRBProps) => {
  let formMethods = useForm({
        defaultValues
    });

    // Use form methods from parent
    if (methods) {
      formMethods = methods;
    }

  const submitHandler = (values: any) => {
    onSubmit(values, formMethods.reset);
  }

  const classNames = ['rb-form', className];

  return (
    <FormProvider {...formMethods}>
      <form
        noValidate
        onSubmit={formMethods.handleSubmit(submitHandler)}>

        <Box
          className={classNames.filter(f => f).join(' ')}
          {...props}>

          {children}

          <FormButtonRow
            submitButtonText={submitButtonText}
            resetButtonText={resetButtonText}
          />

        </Box>

      </form>
    </FormProvider >
  );

}

export interface FormRBProps extends BoxProps {
  /**
   * Form submit handler
   * Returns reset form function to reset to default values
   */
  onSubmit?: (data: any, reset?: UseFormReset<any>) => void,
  /** 
   * Default object in the structure of the form
   */
  defaultValues?: Object,
  /** 
   * CSS display (EX. grid, flex, block)
   */
  display?: string,
  /** 
   * Add unique className
   */
  className?: string,
  /**
   * Styling on <form/> element
   */
  style?: Object,
  /**
   * Extend Material styles sent to useStyles() hook
   */
  customStyles?: Object
  /**
   * All methods from React-Hook-Forms for this form instance
   */
  methods?: UseFormReturn,
  /**
   * Displays submit button with given text
   * Submits form on click
   */
  submitButtonText?: string
  /**
   * Displays reset button with given text
   * Resets form with default values on click
   */
  resetButtonText?: string
  /** 
   * All children
   */
  children: any,
}
