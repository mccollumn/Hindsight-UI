import { FormContainer } from 'react-hook-form-mui'
import { Box, BoxProps } from '@mui/material';
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
            background: 'green',
            position: 'absolute',
            bottom: '-22px'
          }
        }}>

        {children}

        <FormButtonRow
          submitButtonText={submitButtonText}
          resetButtonText={resetButtonText}
        />

      </Box>

    </FormContainer>
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
