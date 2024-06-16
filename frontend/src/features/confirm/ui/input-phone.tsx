import InputMask from "react-input-mask-format";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks";
import { clearPhone } from "@/shared/lib";

import { resetPasswordThunk } from "../model/reset-password-thunks";

interface IFormValues {
  phone: string;
}

export const InputPhone: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormValues>();

  async function onSubmit({ phone }: IFormValues) {
    if (phone) {
      const cleanedPhone: string = clearPhone(phone);
      try {
        await dispatch(resetPasswordThunk({ phone: cleanedPhone }));
        navigate("/confirm/reset-password");
      } catch (error) {
        console.error(error);
      }
    }
  }
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title text-center">Восстановление пароля</h2>
      <p>Введите телефон привязанный к аккаунту.</p>
      {errors.phone && (
        <label className="text-error">{errors.phone.message}</label>
      )}

      <Controller
        name="phone"
        control={control}
        defaultValue=""
        rules={{
          required: "Введите номер телефона",
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
      <button type="submit" className="submit-button">
        Сбросить текущий пароль
      </button>
    </form>
  );
};
