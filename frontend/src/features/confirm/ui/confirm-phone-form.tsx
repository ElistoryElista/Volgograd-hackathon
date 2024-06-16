import { useState } from "react";
import ReactInputMask from "react-input-mask-format";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { selectConfirmPhone } from "@/entities/user";

import { confirmRegistrationThunk } from "../../registration/model/confirm-registration-thunk";
import { confirmResetPasswordThunk } from "../model/reset-password-thunks";

interface IFormValues {
  pincode: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const ConfirmPhoneForm: React.FC = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const confirmationPhone = useAppSelector(selectConfirmPhone);
  const { action } = useParams<{ action: "registration" | "reset-password" }>();
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IFormValues>();

  async function confirmRegistration(pincode: string, phone: string | null) {
    if (!phone) navigate("/registration");
    else {
      try {
        await dispatch(confirmRegistrationThunk({ pincode, phone })).unwrap();
        navigate("/home");
      } catch (error) {
        if (error && typeof error === "object" && "message" in error)
          setError(error.message as string);
      }
    }
  }

  async function confirmResetPassword(
    pincode: string,
    phone: string | null,
    newPassword: string
  ) {
    if (newPassword) {
      if (!phone) navigate("/forget-password");
      else {
        try {
          await dispatch(
            confirmResetPasswordThunk({
              pincode,
              phone,
              newPassword,
            })
          ).unwrap();
          navigate("/home");
        } catch (error) {
          if (error && typeof error === "object" && "message" in error)
            setError(error.message as string);
        }
      }
    }
  }

  async function onSubmit({ pincode, newPassword }: IFormValues) {
    if (pincode) {
      const cleanedCode = pincode.replace(/\D/g, "");
      if (action === "registration") {
        confirmRegistration(cleanedCode, confirmationPhone);
      }
      if (action === "reset-password" && newPassword) {
        confirmResetPassword(cleanedCode, confirmationPhone, newPassword);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h3>
        Мы вам позвоним! Введите последние четыре цифры номера телефона для
        получения кода.
      </h3>

      {errors.pincode && (
        <label className="text-error">{errors.pincode.message}</label>
      )}

      <Controller
        name="pincode"
        control={control}
        defaultValue=""
        rules={{
          required: "Введите код подтверждения",
          validate: (value) => {
            if (value.includes("_"))
              return "Введите код подтверждения полностью";
          },
        }}
        render={({ field }) => (
          <ReactInputMask
            {...field}
            className={`input-bordered input text-center text-2xl ${
              errors.pincode ? "input-error" : ""
            }`}
            mask="9 9 9 9"
            placeholder={"_ _ _ _"}
          />
        )}
      />

      {action === "reset-password" && (
        <>
          <h3>Введите новый пароль.</h3>
          {errors.newPassword && (
            <label className="text-error">{errors.newPassword.message}</label>
          )}
          <input
            type="password"
            placeholder="Пароль"
            className={`input-bordered input ${
              errors.newPassword ? "input-error" : ""
            }`}
            {...register("newPassword", {
              required: "Введите пароль",
              validate: (value) => {
                if (value && value.length < 6) return "Минимум 6 символов";
              },
            })}
          />
          {errors.confirmPassword && (
            <label className="text-error">
              {errors.confirmPassword.message}
            </label>
          )}
          <input
            type="password"
            placeholder="Подтвердите пароль"
            className={`input-bordered input ${
              errors.confirmPassword ? "input-error" : ""
            }`}
            {...register("confirmPassword", {
              required: "Введите пароль повторно",
              validate: (value) => {
                if (value !== watch("newPassword"))
                  return "Пароли не совпадают";
              },
            })}
          />
        </>
      )}

      {error && <label className="text-error">{error}</label>}

      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Подтвердить"
        )}
      </button>
    </form>
  );
};
