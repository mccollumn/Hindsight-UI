import { TextFieldElement, PasswordElement } from "react-hook-form-mui";
import { FormWrapper, FormWrapperProps } from "../form/FormWrapper";

export const LoginForm = ({
  onLoginSubmit = () => {},
  title = "Analytics",
  description = <DefaultDescription />,
  submitButtonText = "Login",
  defaultUsername,
  defaultPassword,
  minPasswordLength = 0,
  minSpecialCharLength = 0,
  minNumberLength = 0,
  closeModal = () => {},
  ...props
}: LoginProps) => {
  const defaultValues = {
    username: defaultUsername,
    password: defaultPassword,
  };

  const onSuccess = (values: any) => {
    onLoginSubmit(values);
    closeModal();
  };

  const onCancel = () => {
    closeModal();
  };

  if (!description) {
    description = <DefaultDescription />;
  }

  return (
    <FormWrapper
      onSuccess={onSuccess}
      onCancel={onCancel}
      defaultValues={defaultValues}
      title={title}
      description={description}
      submitButtonText={submitButtonText}
      {...props}
    >
      <TextFieldElement
        label="Username"
        name="username"
        type={"text"}
        validation={{
          required: "Username is required",
        }}
      />

      <PasswordElement
        label="Password"
        name="password"
        type={"password"}
        // helperText={`Min length: ${minPasswordLength} | Min special characters: ${minSpecialCharLength} | Min numbers: ${minNumberLength}`}
        validation={{
          required: "Password is required",
          minLength: {
            value: minPasswordLength,
            message: `Minimum password length: ${minPasswordLength}`,
          },
          validate: {
            minSpecialChar: (p: string) =>
              matchPasswordValidate({
                p,
                minNumber: minSpecialCharLength,
                regex: specialCharacterRegex,
                message: `Minimum special characters: ${minSpecialCharLength}`,
              }),
            minNumber: (p: string) =>
              matchPasswordValidate({
                p,
                minNumber: minNumberLength,
                regex: numberRegex,
                message: `Minimum numbers: ${minNumberLength}`,
              }),
          },
        }}
      />
    </FormWrapper>
  );
};

const DefaultDescription = () => {
  return <div className="login-description"></div>;
};

export const specialCharacterRegex = /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~/]/g;
export const numberRegex = /[0-9]/g;
export const matchPasswordValidate = ({
  p = "",
  message = "",
  regex,
  minNumber,
}: any) => {
  const validArray = p.match(regex) || [];
  const isValid = validArray.length >= minNumber;
  return isValid ? true : message;
};

export interface LoginProps
  extends Omit<FormWrapperProps, "onSuccess" | "defaultValues"> {
  /**
   * Handler when Login form is submitted
   */
  onLoginSubmit?: (formValues: any) => void;
  /**
   * Minimum password length allowed
   */
  minPasswordLength?: number;
  /**
   * Minimum special characters to include in password
   */
  minSpecialCharLength?: number;
  /**
   * Minimum special characters to include
   */
  minNumberLength?: number;
  /**
   * Populate default username field
   */
  defaultUsername?: string;
  /**
   * Populate default password field
   */
  defaultPassword?: string;
  /**
   * Injected if parent is a Modal
   */
  closeModal?: Function;
}
