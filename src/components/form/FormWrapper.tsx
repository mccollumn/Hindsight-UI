import { FormContainer } from "react-hook-form-mui";
import { Box, Typography } from "@mui/material";
import { FormButtonRow } from "./FormButtonRow";
import { styled } from "@mui/material/styles";

/**
 * Wrapper around react-hook-form-mui from
 * https://github.com/dohomi/react-hook-form-mui
 */
export const FormWrapper = ({
  onSuccess,
  onCancel,
  defaultValues,
  submitButtonText,
  resetButtonText,
  title,
  description,
  children,
}: FormWrapperProps) => {
  return (
    <FormContainer onSuccess={onSuccess} defaultValues={defaultValues}>
      <FormWrapperStyled className="form-wrapper-container">
        <FormTitle title={title} />

        <FormDescription description={description} />

        {children}

        <FormButtonRow
          submitButtonText={submitButtonText}
          resetButtonText={resetButtonText}
          onCancel={onCancel}
        />
      </FormWrapperStyled>
    </FormContainer>
  );
};

const FormWrapperStyled = styled(Box)(({ theme }: any) => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
    ".MuiFormHelperText-root": {
      position: "absolute",
      bottom: theme.spacing(-2.5),
    },
  };
});

const FormTitle = ({ title }: any) => {
  if (!title) {
    return null;
  }

  return (
    <Typography
      sx={{
        fontWeight: 500,
      }}
      variant={"h5"}
      className="form-wrapper-title"
    >
      {title}
    </Typography>
  );
};

const FormDescription = ({ description }: any) => {
  if (!description) {
    return null;
  }

  return (
    <Typography
      sx={{
        marginTop: "-24px",
        fontWeight: 400,
      }}
      variant={"subtitle2"}
      className="form-wrapper-description"
    >
      {description}
    </Typography>
  );
};

/**
 *
 */
export interface FormWrapperProps {
  /**
   * Form submit handler
   */
  onSuccess: any;
  /**
   * Cancel button click override
   */
  onCancel?: Function;
  /**
   * Form default values
   */
  defaultValues: any;
  /**
   * Form title
   */
  title?: string;
  /**
   * Descriptive text for form
   * or React component to display
   */
  description?: string | React.ReactElement | null;
  /**
   * Displays submit button with given text
   * Submits form on click
   */
  submitButtonText?: string;
  /**
   * Displays reset button with given text
   * Resets form with default values on click
   */
  resetButtonText?: string;
  /**
   * All child components and form elements
   */
  children?: any;
}
