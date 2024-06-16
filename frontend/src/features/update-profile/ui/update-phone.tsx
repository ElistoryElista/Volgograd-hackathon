import {
  selectPhone,
  selectUserId,
  useUpdatePhoneMutation,
} from "@/entities/user";
import { useAppSelector } from "@/shared/hooks";
import { useState } from "react";
import { EditButton } from "./edit-button";
import { Controller, useForm } from "react-hook-form";
import { Loading } from "@/shared/ui";
import ReactInputMask from "react-input-mask-format";
import { clearPhone } from "@/shared/lib";
import { SaveIcon } from "@/shared";

interface IFormValues {
  newPhone: string;
}

export const UpdatePhone: React.FC = () => {
  const [updatePhone] = useUpdatePhoneMutation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const userId = useAppSelector(selectUserId);
  const phone = useAppSelector(selectPhone);

  function toggleIsEdit() {
    setIsEdit((prev) => !prev);
  }

  async function onSave({ newPhone: newPhone }: IFormValues) {
    if (newPhone && userId) {
      const cleanedPhoneNumber = clearPhone(newPhone);
      try {
        await updatePhone({
          id: userId,
          newPhone: cleanedPhoneNumber,
        }).unwrap();
        toggleIsEdit();
      } catch (error) {
        console.error(error);
      }
    }
  }

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IFormValues>();

  return (
    <div className="flex items-center justify-between gap-2">
      {isEdit ? (
        <form
          className="flex items-center w-full gap-4"
          onSubmit={handleSubmit(onSave)}
        >
          <Controller
            name="newPhone"
            control={control}
            defaultValue=""
            rules={{
              required: "Введите номер телефона",
              validate: (value) => {
                if (value.includes("_")) return "Введите номер телефона";
              },
            }}
            render={({ field }) => (
              <ReactInputMask
                {...field}
                className={`input input-bordered w-full input-sm ${
                  errors.newPhone ? "input-error" : ""
                }`}
                mask="+7 (999) 999-99-99"
                placeholder="Телефон"
              />
            )}
          />
          <button className="btn btn-sm btn-success" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loading size="sm" />
            ) : (
              <SaveIcon className="w-4" />
            )}
          </button>
        </form>
      ) : (
        <p className="text-gray-400">
          телефон: <span className="fb text-black">{phone}</span>
        </p>
      )}
      <EditButton isEdit={isEdit} toggleEdit={toggleIsEdit} />
    </div>
  );
};
