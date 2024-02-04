"use client";

import * as React from "react";
import { cleanCpfCnpj, cpfMask } from "../masks";
import { patterns, validateCpf } from "../validation";
import { CpfInputProps, CpfInputRef, CpfInputTarget, CpfValues } from "./types";

const CpfInput = React.forwardRef(
  (
    {
      as: ElementTag = "input",
      mode = 1,
      defaultValue,
      name = "cpf",
      className,
      hookForm,
      validate = true,
      ...props
    }: CpfInputProps,
    refForward: React.ForwardedRef<CpfInputRef>
  ) => {
    const maskRef = React.useRef<HTMLInputElement | null>(null);
    const valueRef = React.useRef<HTMLInputElement | null>(null);
    const validationObj = validate ? { validate: validateCpf } : {};

    React.useImperativeHandle(refForward, () => ({
      refs: {
        mask: maskRef,
        real: valueRef,
      },
    }));

    React.useEffect(() => {
      if (mode === 1 && hookForm) {
        hookForm.register(name, validationObj);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
      changeToDefaultValues();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue]);

    const changeToDefaultValues = () => {
      if (!defaultValue) {
        changeInputMaskValue("");
        changeInputRealValue("");
        return;
      }

      const values = getValues(defaultValue.toString());
      changeInputs(values);
    };

    const getValues = (value: string) => {
      const realValue = cleanCpfCnpj(value, "cpf");
      const maskValue = cpfMask(realValue);

      return {
        value: realValue,
        mask: maskValue,
      };
    };

    const changeInputs = (values: CpfValues) => {
      changeInputMaskValue(values.mask);
      if (mode === 1) changeInputRealValue(values.value);
    };

    const changeInputMaskValue = (value: string) => {
      if (mode === 2 && hookForm) {
        hookForm.setValue(name, value);
        return;
      }

      if (maskRef.current) maskRef.current.value = value;
    };

    const changeInputRealValue = (value: string) => {
      if (mode === 2) return;

      if (!hookForm) {
        if (valueRef.current) valueRef.current.value = value;
        return;
      }

      hookForm.setValue(name, value);
    };

    const onChangeEventHandler = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      const target = event.target as CpfInputTarget;
      const maskOriginalValue = target.value;

      const values = getValues(maskOriginalValue);

      changeInputs(values);

      if (props.onChange) props.onChange(values);
    };

    const maskOnChange = { onChange: onChangeEventHandler };
    const { ref, ...registerMask } =
      mode === 2 && hookForm
        ? hookForm.register(name, { ...maskOnChange, ...validationObj })
        : { ref: undefined, ...maskOnChange };

    return (
      <>
        <ElementTag
          className={className}
          {...props}
          style={{
            zIndex: 1,
          }}
          name={mode === 2 && !hookForm ? name : undefined}
          {...registerMask}
          pattern={patterns.CPF.source}
          ref={
            !ref
              ? maskRef
              : (e: any) => {
                  (ref as CallableFunction)(e);
                  maskRef.current = e;
                }
          }
        />

        {!hookForm && mode === 1 && (
          <input
            name={name}
            style={{
              width: "0px",
              height: "0px",
              opacity: "0px",
            }}
            ref={valueRef}
          />
        )}
      </>
    );
  }
);

CpfInput.displayName = "CpfInput";

export default CpfInput;
