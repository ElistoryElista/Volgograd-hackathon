import { selectUserId, selectUsername } from "@/entities/user";
import { useAppSelector } from "@/shared/hooks";
import { useState } from "react";
import { EditButton } from "./edit-button";
import { useForm } from "react-hook-form";
import { Loading } from "@/shared/ui";
import { useUpdateUsernameMutation } from "@/entities/user";
import { SaveIcon } from "@/shared";

interface IFormValues {
  newUsername: string;
}

export const UpdateUsername: React.FC = () => {
  const [updateUsername] = useUpdateUsernameMutation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const userId = useAppSelector(selectUserId);
  const username = useAppSelector(selectUsername);

  function toggleIsEdit() {
    setIsEdit((prev) => !prev);
  }

  async function onSave({ newUsername }: IFormValues) {
    if (newUsername && userId) {
      try {
        await updateUsername({ id: userId, newUsername }).unwrap();
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
            placeholder="Введите новое ФИО"
            defaultValue={username ? username : ""}
            className={`input-bordered input input-sm w-full ${
              errors.newUsername ? "input-error" : ""
            }`}
            {...register("newUsername", {
              required: "Введите новый ФИО",
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
          ФИО: <span className="fb text-black">{username}</span>{" "}
        </p>
      )}
      <EditButton isEdit={isEdit} toggleEdit={toggleIsEdit} />
    </div>
  );
};
