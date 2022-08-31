import {
  Box,
  BoxProps,
  Button
} from '@mui/material';

import {
  ButtonRB,
  ButtonRBProps
} from '../button/ButtonRB';

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
    <ButtonRB>
      {submitButtonText}
    </ButtonRB>
  );
}

const ResetButton = ({
  resetButtonText
}: any) => {

  if(!resetButtonText) {
    return null;
  }

  return (
    <ButtonRB
      color={'inherit'}>
      {resetButtonText}
    </ButtonRB>
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
