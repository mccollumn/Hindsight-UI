import {
  TextField,
  StandardTextFieldProps
} from "@mui/material";

/**
 * Wrapper for Mui TextField with React Hook Form validation
 */
export const TextFieldRB = ({
  ...props
}: TextFieldRBProps) => {
  return (
    <TextField
      {...props}
    />
  )
}

export interface TextFieldRBProps extends StandardTextFieldProps {

}
