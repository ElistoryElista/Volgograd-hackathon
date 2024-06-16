import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask-format";
import { clearPhone } from "@/shared/lib";
import { useAppDispatch } from "@/shared/hooks";
import { changePhoneUser } from "@/entities/user";

import { registrationThunk } from "../model/registration-thunk";

interface IFormValues {
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  confirmPrivacyPolicy: boolean;
  useConditionsService: boolean;
  date_birth: Date;
}

export const RegistrationForm: React.FC = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<IFormValues>();

  async function onSubmit({
    phone,
    username,
    password,
    email,
    confirmPrivacyPolicy,
    useConditionsService,
    date_birth,
  }: IFormValues) {
    if (
      phone &&
      username &&
      password &&
      email &&
      date_birth &&
      confirmPrivacyPolicy &&
      useConditionsService
    ) {
      const cleanedPhoneNumber = clearPhone(phone);
      try {
        await dispatch(
          registrationThunk({
            phone: cleanedPhoneNumber,
            name: username,
            username,
            date_birth,
            password,
            email,
          })
        ).unwrap();
        dispatch(changePhoneUser(cleanedPhoneNumber));
        navigate("/confirm/registration");
      } catch (error) {
        if (error && typeof error === "object" && "message" in error)
          setError(error.message as string);
      }
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title text-center">Регистрация</h2>

      {errors.username && (
        <label className="text-error">{errors.username.message}</label>
      )}
      <input
        type="text"
        placeholder="ФИО"
        className={`input-bordered input ${
          errors.username ? "input-error" : ""
        }`}
        {...register("username", {
          required: "Введите свои имя",
        })}
      />

      {errors.date_birth && (
        <label className="text-error">{errors.date_birth.message}</label>
      )}
      <input
        type="date"
        placeholder="Дата рождения"
        className={`input-bordered input ${
          errors.date_birth ? "input-error" : ""
        }`}
        {...register("date_birth", {
          required: "Введите свою дату рождения",
        })}
      />

      {errors.email && (
        <label className="text-error">{errors.email.message}</label>
      )}
      <input
        type="text"
        placeholder="Почта"
        className={`input-bordered input ${errors.email ? "input-error" : ""}`}
        {...register("email", {
          required: "Введите Email",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Email не верно указан",
          },
        })}
      />

      <label className="ml-2">Данные для входа</label>
      {errors.phone && (
        <label className="text-error">{errors.phone.message}</label>
      )}
      <Controller
        name="phone"
        control={control}
        defaultValue=""
        rules={{
          required: "Введите телефон",
          validate: (value) => {
            if (value.includes("_")) return "Введите номер телефона";
          },
        }}
        render={({ field }) => (
          <InputMask
            {...field}
            className={`input-bordered input ${
              errors.phone ? "input-error" : ""
            }`}
            mask="+7 (999) 999-99-99"
            placeholder="Телефон"
          />
        )}
      />

      {errors.password && (
        <label className="text-error">{errors.password.message}</label>
      )}

      <input
        type="password"
        placeholder="Пароль"
        className={`input-bordered input ${
          errors.password ? "input-error" : ""
        }`}
        {...register("password", {
          required: "Введите пароль",
          validate: (value) => {
            if (value.length < 6) return "Минимум 6 символов";
          },
        })}
      />

      {errors.confirmPassword && (
        <label className="text-error">{errors.confirmPassword.message}</label>
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
            if (value !== watch("password")) return "Пароли не совпадают";
          },
        })}
      />

      {errors.confirmPrivacyPolicy && (
        <label className="text-error">
          {errors.confirmPrivacyPolicy.message}
        </label>
      )}

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">
            Согласен с{" "}
            <Link target="_blank" to={"/policy"} className="link">
              политикой конфиденциальности
            </Link>
          </span>
          <input
            type="checkbox"
            {...register("confirmPrivacyPolicy", {
              required:
                "Необходимо подтвердить согласие с политикой конфиденциальности",
            })}
            className="checkbox-primary checkbox"
          />
        </label>
      </div>

      {errors.useConditionsService && (
        <label className="text-error">
          {errors.useConditionsService.message}
        </label>
      )}

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">
            Согласен с{" "}
            <Link target="_blank" to="/use-conditions" className="link">
              условиями использования
            </Link>
          </span>
          <input
            type="checkbox"
            {...register("useConditionsService", {
              required:
                "Необходимо подтвердить согласие с условиями использования",
            })}
            className="checkbox-primary checkbox"
          />
        </label>
      </div>

      {error && <label className="text-error">{error}</label>}

      <button type="submit" className="btn-primary btn" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Регистрация"
        )}
      </button>
    </form>
  );
};
