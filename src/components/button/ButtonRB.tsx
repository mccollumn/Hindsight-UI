import {
  Button,
  ButtonProps
} from '@mui/material';

/**
 * Wrapper for MUI Button
 * https://mui.com/components/buttons/
 * API: https://mui.com/material-ui/api/button/
 */
export const ButtonRB = ({
  children = 'Button Text',
  ...props
}: ButtonRBProps) => {
  return (
    <Button
      variant={'contained'}
      color={'primary'}
      {...props}>
      {children}
    </Button>
  );
}

export interface ButtonRBProps extends ButtonProps {

}
