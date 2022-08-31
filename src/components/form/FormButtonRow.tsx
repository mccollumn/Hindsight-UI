import {
  Box,
  BoxProps,
  Button
} from '@mui/material';

export const FormButtonRow = ({
  submitButtonText,
  resetButtonText,
}: FormButtonRow) => {

  const isShowButtons = [
    submitButtonText,
    resetButtonText,
  ].some((b: any) => !!b)

  if(!isShowButtons) {
    return null;
  }

  return (
    <Box className="rb-form-button-row">

      <ResetButton
        resetButtonText={resetButtonText}
      />

      <SubmitButton
        submitButtonText={submitButtonText}
      />
    </Box>
  );
}

const SubmitButton = ({
  submitButtonText
}: any) => {

  if(!submitButtonText) {
    return null;
  }

  return (
    <Button>
      {submitButtonText}
    </Button>
  );
}

const ResetButton = ({
  submitButtonText,
  resetButtonText
}: any) => {

  if(!resetButtonText) {
    return null;
  }

  return (
    <Button>
      {resetButtonText}
    </Button>
  );
}

export interface FormButtonRow {
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
}
