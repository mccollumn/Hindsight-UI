import {
  TextFieldElement,
  PasswordElement,
} from 'react-hook-form-mui'
import {
  FormWrapper, FormWrapperProps
} from '../components/form/FormWrapper'

export const Login = ({
  onLoginSubmit,
  title = 'Member Login',
  description,
  submitButtonText = 'Login',
  defaultUsername,
  defaultPassword,
}: LoginProps) => {
  const defaultValues = {
    username: defaultUsername,
    password: defaultPassword,
  };

  const onSuccess = (values: any) => {
    onLoginSubmit(values);
  }

  return (
    <FormWrapper
      onSuccess={onSuccess}
      defaultValues={defaultValues}
      title={title}
      description={description}
      submitButtonText={submitButtonText}
    >

      <TextFieldElement
        label='Username/Email'
        name='username'
        validation={{
          required: 'Username is required'
        }}
      />

      <PasswordElement
        label='Password'
        name='password'
        type={'password'}
        validation={{
          required: 'Password is required'
        }}
      />

    </FormWrapper>
  )
}

interface LoginProps extends FormWrapperProps {
  /**
   * Handler for when then Login form is submitted
   */
  onLoginSubmit: (formValues: any) => void;
  /**
   * Populate default username field
   */
  defaultUsername?: string;
  /**
   * Populate default password field
   */
  defaultPassword?: string;
}
