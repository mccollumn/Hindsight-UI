import {
  Box,
  BoxProps,
  Button
} from '@mui/material';
import { styled } from '@mui/system';
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
    <ButtonRowStyled className="rb-form-button-row">

      <ResetButton
        resetButtonText={resetButtonText}
      />

      <SubmitButton
        submitButtonText={submitButtonText}
      />
    </ButtonRowStyled>
  );
}

const SubmitButton = ({
  submitButtonText
}: any) => {

  if(!submitButtonText) {
    return null;
  }

  return (
    <ButtonRB type="submit">
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

const ButtonRowStyled = styled(Box)(({

}) => ({
  background: 'grey',
  display: 'flex',
  //flexDirection: 'column',
  //height: '100%',
  //width: '100%',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '24px'
}));

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
