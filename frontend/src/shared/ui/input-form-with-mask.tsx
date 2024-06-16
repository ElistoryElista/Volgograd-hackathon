import React from "react";
import { Controller, RegisterOptions, UseFormReturn } from "react-hook-form";
import InputMask from "react-input-mask-format";

interface IProps {
  name: string;
  label?: string;
  defaultValue?: string;
  formContext: UseFormReturn<any>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  validate?: (value: string) => string | void;
  required?: boolean;
  mask: string;
}

export const InputFormWithMask: React.FC<IProps> = ({
  name,
  label = "",
  defaultValue = "",
  formContext,
  inputProps,
  required = false,
  validate,
  mask,
}) => {
  const {
    control,
    formState: { errors },
  } = formContext;

  let rules: Omit<
    RegisterOptions<any, any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  > = {};

  const requiredErrorMessage = label
    ? `Введите "${label}"`
    : "Это поле обязательное";

  rules["required"] = required ? requiredErrorMessage : false;
  rules["validate"] = (value) => {
    if (value.includes("_")) return requiredErrorMessage;
    if (validate) validate(value);
  };

  return (
    <div className="mt-2">
      <div className="label">
        {errors[name] ? (
          <span className="label-text text-error">
            {errors[name]?.message as string}
          </span>
        ) : (
          <span className="label-text">
            {label}
            {(required || validate) && <span className="text-error">*</span>}
          </span>
        )}
      </div>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <InputMask
            mask={mask}
            className={`input-bordered input w-full ${
              errors[name] ? "input-error" : ""
            }`}
            {...field}
            {...inputProps}
          />
        )}
      />
    </div>
  );
};
