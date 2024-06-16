import { useLoginMutation } from "@/entities";
import { clearPhone } from "@/shared/lib";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask-format";
import { useNavigate } from "react-router-dom";

interface IFormValues {
  phone: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const [login, { error, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IFormValues>();

  useEffect(() => {
    if (isSuccess) navigate("/home");
  }, [isSuccess]);

  async function onSubmit({ phone, password }: IFormValues) {
    if (phone && password) {
      const cleanedPhoneNumber = clearPhone(phone);
      await login({ phone: cleanedPhoneNumber, password });
    }
  }

  return (
    <section className="space-y-2">
      <h2 className="title text-center">Авторизация</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
        {error && typeof error === "string" && (
          <p className="text-center text-error">{error}</p>
        )}
        <button
          type="submit"
          className="btn-primary btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Войти"
          )}
        </button>
      </form>
    </section>
  );
};
