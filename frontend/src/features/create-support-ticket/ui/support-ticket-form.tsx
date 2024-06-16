import {
  selectEmail,
  selectPhone,
  selectUserId,
  useCreateSupportTicketMutation,
  useFileUploadMutation,
} from "@/entities";
import {
  InputForm,
  InputFormWithMask,
  useAppSelector,
  UploadImageInput,
} from "@/shared";
import { formatPhoneNumber } from "@/shared/lib";
import { Section } from "@/shared/ui/section";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface IProps {
  className?: string;
  setIsSuccess: (status: boolean) => void;
}

interface IFormValues {
  title: string;
  description: string;
  phone: string;
  email: string;
}

export const SupportTicketForm: React.FC<IProps> = ({
  className = "",
  setIsSuccess,
}) => {
  const userId = useAppSelector(selectUserId);
  const userPhone = useAppSelector(selectPhone);
  const userEmail = useAppSelector(selectEmail);
  const [image, setImage] = useState<FormData | null>();
  const [uploadImage] = useFileUploadMutation();
  const [createSupportTicket] = useCreateSupportTicketMutation();

  const formContext = useForm<IFormValues>({
    defaultValues: {
      phone: userPhone ? formatPhoneNumber(userPhone) : "",
      email: userEmail || "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formContext;

  async function onSubmit(data: IFormValues) {
    if (data) {
      try {
        const res = image && (await uploadImage(image).unwrap());
        const imageId = (res && res[0].id) || null;
        let supportData = {
          title: data.title,
          descriptions: data.description,
          user: userId,
          phone: data.phone,
          email: data.email,
          images: imageId,
        };
        await createSupportTicket(supportData);
        setIsSuccess(true);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <form
      method="dialog"
      onSubmit={handleSubmit(onSubmit)}
      className={className}
    >
      <InputForm
        formContext={formContext}
        name="title"
        label="Тема письма"
        required
      />
      {errors?.description && (
        <p className="mt-2 text-error">{errors.description.message}</p>
      )}
      <textarea
        className={`input-bordered input !mt-4 h-40 w-full resize-none ${
          errors?.description ? "input-error" : ""
        }`}
        placeholder="Тело письма*"
        {...register("description", { required: "обязательное поле" })}
      />
      <UploadImageInput setImages={setImage} />
      <Section className="mt-2" title="Данные для ответа">
        <InputFormWithMask
          mask="+7 (999) 999-99-99"
          formContext={formContext}
          name="phone"
          label="Номер телефона"
          inputProps={{ placeholder: "Для экстренного ответа" }}
          required
        />

        <InputForm
          formContext={formContext}
          name="email"
          label="Почта для обратной связи"
          inputProps={{ placeholder: "Ответ в течении 3-х рабочих дней" }}
          pattern={{
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Email не верно указан",
          }}
          required
        />
      </Section>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="btn-primary btn "
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Создать заявку"
          )}
        </button>
      </div>
    </form>
  );
};
