import React from "react";
import {
  Controller,
  RegisterOptions,
  UseFormReturn,
  Validate,
  ValidationRule,
} from "react-hook-form";

interface IProps {
  name: string;
  label?: string;
  defaultValue?: string;
  formContext: UseFormReturn<any>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  validate?:
    | Validate<string, any>
    | Record<string, Validate<string, any>>
    | undefined;
  required?: boolean;
  pattern?: ValidationRule<RegExp>;
}

export const InputForm: React.FC<IProps> = ({
  name,
  label = "",
  defaultValue = "",
  formContext,
  inputProps,
  required = false,
  validate,
  pattern,
}) => {
  const {
    control,
    formState: { errors },
  } = formContext;

  let rules: Omit<
    RegisterOptions<any, any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  > = {};

  if (required || validate) {
    rules["required"] = label ? `Введите "${label}"` : "Это поле обязательное";
    if (validate) {
      rules["validate"] = validate;
    }
    if (pattern) rules["pattern"] = pattern;
  }

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
          <input
            type=""
            className={`input input-bordered w-full ${
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
