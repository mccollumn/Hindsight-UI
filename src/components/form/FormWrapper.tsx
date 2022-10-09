import { FormContainer } from 'react-hook-form-mui'
import {
  Box,
  BoxProps,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';
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
  errorMessage,
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
            bottom: '-22px',
            right: 0
          }
        }}>

        <FormTitle
          title={title}
        />

        <FormDescription
          description={description}
        />

        <Error
          errorMessage={errorMessage}
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
    <DescriptionStyled
      variant={'subtitle2'}
      className='form-wrapper-description'>
      {description}
    </DescriptionStyled>
  )
}

const Error = ({
  errorMessage
}: any) => {
  if(!errorMessage) {
    return null;
  }

  return (
    <ErrorStyled
      variant={'subtitle2'}
      color={'error'}
      className='form-wrapper-error'>
      {errorMessage}
    </ErrorStyled>
  )
}

const DescriptionStyled = styled(Typography)(({
  theme
}) => ({
  marginTop: theme.spacing(-3),
  fontWeight: 400,
}));

const ErrorStyled = styled(Typography)(({
  theme
}) => ({
  marginTop: theme.spacing(-3),
  fontWeight: 400,
  textAlign: 'right',
  
}));

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
   * Display an error message
   */
  errorMessage?: string
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
