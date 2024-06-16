import {
  selectEmail,
  selectUserId,
  useUpdateEmailMutation,
} from "@/entities/user";
import { useAppSelector } from "@/shared/hooks";
import { useState } from "react";
import { EditButton } from "./edit-button";
import { useForm } from "react-hook-form";
import { Loading } from "@/shared/ui";
import { SaveIcon } from "@/shared";

interface IFormValues {
  newEmail: string;
}

export const UpdateEmail: React.FC = () => {
  const [updateEmail] = useUpdateEmailMutation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const userId = useAppSelector(selectUserId);
  const email = useAppSelector(selectEmail);

  function toggleIsEdit() {
    setIsEdit((prev) => !prev);
  }

  async function onSave({ newEmail }: IFormValues) {
    if (newEmail && userId) {
      try {
        await updateEmail({ id: userId, newEmail }).unwrap();
        toggleIsEdit();
      } catch (error) {
        console.error(error);
      }
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormValues>();

  return (
    <div className="flex items-center justify-between gap-2">
      {isEdit ? (
        <form
          className="flex w-full items-center gap-4"
          onSubmit={handleSubmit(onSave)}
        >
          <input
            type="text"
            placeholder="Введите новую почту"
            defaultValue={email ? email : ""}
            className={`input-bordered input input-sm w-full ${
              errors.newEmail ? "input-error" : ""
            }`}
            {...register("newEmail", {
              required: "Введите новую почту",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Email не верно указан",
              },
            })}
          />
          <button className="btn-primary btn-sm btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loading size="sm" />
            ) : (
              <SaveIcon className="w-4" />
            )}
          </button>
        </form>
      ) : (
        <p className="">
          Почта: <span className="fb text-black">{email}</span>{" "}
        </p>
      )}
      <EditButton isEdit={isEdit} toggleEdit={toggleIsEdit} />
    </div>
  );
};
