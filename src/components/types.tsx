import React from "react";

type GenericRegisterOptions = {
  validate?: (value: string) => boolean;
  onChange?: (event: any) => void;
};

type GenericRegisterReactHookForm = (
  name: any,
  options?: GenericRegisterOptions
) => {
  onChange: (e: React.ChangeEvent) => void;
  onBlur: (e: React.FocusEvent) => void;
  ref: React.Ref<any>;
};

type GenericConfigurationReactHookForm = {
  register: GenericRegisterReactHookForm;
  setValue: (name: any, value: any) => void;
};

export type MaskInputTarget = HTMLInputElement & Record<"real_value", string>;

export interface MaskValues {
  value: string;
  mask: string;
}

export interface MaskProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name?: string;

  /**
   * Default is `input`, that renders a `<input />` element.
   *
   * This prop can be used with UI libraries like `react-bootstrap`, `@mui/material`, etc.
   *
   * Component type to be rendered. Must be a component that uses `input` element.
   */
  as?: React.ElementType;

  /**
   * If `react-hook-form` is used, this prop should receive the methods: `register`, and `setValue`.
   * This will properlly set the real value into the react hook form state.
   *
   * The component will handle the `register` action, and `setValue` if prop `mode` is set to `1`.
   *
   * @example
   *
   * ```jsx   *
   * const methods = useForm();
   *
   * const cpfInput = <CpfInput hookForm={{register, setValue}} />
   * const cnpjInput = <CnpjInput hookForm={{register, setValue}} />
   * ```
   */
  hookForm?: GenericConfigurationReactHookForm;

  /**
   * `mode: 1`
   * Default. The component will render two inputs: a dummy one for the mask, and the real value input hidden.
   * This is so the value to be sended by the form will always be the cleaned (real) value, without mask.
   * The dummy input will have no `name` prop, and will not be sended with the form.
   * If the property `hookForm` is passed, the real input will not be rendered, instead the component will use `setValue('cpf'|'cnpj', cleanValue)`
   * to set the value in the form state.
   *
   * `mode: 2`
   *
   * The component will render only the mask input, and this will receive the `name` prop. This way the value will be sended formatted
   * with the mask, and should be treated externally. */
  mode?: 1 | 2;

  /**
   *
   * The onChange event will send a `MaskValues` object, that has a `value: string` with the real value typed (without mask, only numbers), and `mask: string` with the masked value.
   */
  onChange?: (cpf: MaskValues) => void;

  /**
   * Default `true`
   *
   * If `hookForm` prop is passed, this option will add a validate method into register action that will validate the CPF/CNPJ inputed using the algorythms created by Receita Federal do Brasil. If not valid, the `react-hook-form` will trigger an error into the `(useForm()).formState: { errors }` with the name of the input ('cpf'|'cnpj').
   */
  validate?: boolean;
}

export interface MaskRef {
  refs: {
    mask: React.MutableRefObject<HTMLInputElement | null>;
    real: React.MutableRefObject<HTMLInputElement | null>;
  };
}
