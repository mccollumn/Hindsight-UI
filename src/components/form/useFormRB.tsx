import {
  useForm,
  UseFormReturn,
  Controller,
  ControllerProps
} from 'react-hook-form';

export const useFormRB = ({
  defaultValues
}: UseFormRBProps): UseFormRBReturn => {

  const methods: UseFormReturn = useForm({
    defaultValues
  });

  return {
    methods,
    Controller,
    // R1Form,
  }

}

export interface UseFormRBProps {
  /** 
   * Default schema of the form
   */
  defaultValues?: Object,
}

export interface UseFormRBReturn {
  /**
   * All methods from React-Hook-Forms for this form instance
   */
  methods: UseFormReturn,
  Controller: React.FC<ControllerProps>,
  //R1Form: React.FC<R1FormProps>,
}
