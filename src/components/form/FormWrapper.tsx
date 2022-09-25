import { FormContainer } from 'react-hook-form-mui'
import {
  Box,
  BoxProps,
  Typography
} from '@mui/material';
import { FormButtonRow } from './FormButtonRow';

/**
 * Wrapper around react-hook-form-mui from
 * https://github.com/dohomi/react-hook-form-mui
 */
export const FormWrapper = ({
  onSuccess,
  defaultValues,
  submitButtonText,
  resetButtonText,
  title,
  description,
  children
}: FormWrapperProps) => {
  return (
    <FormContainer
      onSuccess={onSuccess}
      defaultValues={defaultValues}>

      <Box
        className='form-wrapper-container'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          '.MuiFormHelperText-root.Mui-error': {
            position: 'absolute',
            bottom: '-22px'
          }
        }}>

        <FormTitle
          title={title}
        />

        <FormDescription
          description={description}
        />

        {children}

        <FormButtonRow
          submitButtonText={submitButtonText}
          resetButtonText={resetButtonText}
        />

      </Box>

    </FormContainer>
  )
}

const FormTitle = ({
  title
}: any) => {
  if(!title) {
    return null;
  }

  return (
    <Typography
      sx={{
        fontWeight: 500
      }}
      variant={'h5'}
      className='form-wrapper-title'>
      {title}
    </Typography>
  )
}

const FormDescription = ({
  description
}: any) => {
  if(!description) {
    return null;
  }

  return (
    <Typography
      sx={{
        marginTop: '-24px',
        fontWeight: 400
      }}
      variant={'subtitle2'}
      className='form-wrapper-description'>
      {description}
    </Typography>
  )
}

/**
 *
 */
export interface FormWrapperProps {
  /**
   * Form submit handler
   */
  onSuccess: any
  /**
   * Form default values
   */
  defaultValues: any
  /**
   * Form title
   */
  title?: string
  /**
   * Descriptive text for form
   */
  description?: string
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
   * All child components and form elements
   */
  children?: any
}
