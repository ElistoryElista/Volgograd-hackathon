import { useCreateFeedbackMutation, useFileUploadMutation } from "@/entities";
import { Rating, UploadImageInput } from "@/shared";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface IProps {
  className?: string;
  setIsSuccess: (status: boolean) => void;
}

interface IFormValues {
  description: string;
}

export const FeedbackForm: React.FC<IProps> = ({
  className = "",
  setIsSuccess,
}) => {
  const [image, setImage] = useState<FormData | null>();
  const [uploadImage] = useFileUploadMutation();
  const [createFeedback] = useCreateFeedbackMutation();
  const formContext = useForm<IFormValues>();
  const [rating, setRating] = useState<number>(5);

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
        let feedbackData = {
          rating,
          descriptions: data.description,
          images: imageId,
        };
        await createFeedback(feedbackData);
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
      <div className="flex items-center gap-2">
        Ваша оценка:
        <Rating rating={rating} setRating={setRating} />
      </div>
      {errors?.description && (
        <p className="mt-2 text-error">{errors.description.message}</p>
      )}
      <textarea
        className={`input-bordered input !mt-4 h-40 w-full resize-none ${
          errors?.description ? "input-error" : ""
        }`}
        placeholder="Ваш комментарий к оценке или предложения по улучшению приложения"
        {...register("description")}
      />
      <UploadImageInput setImages={setImage} />
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="btn-primary btn "
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Отправить"
          )}
        </button>
      </div>
    </form>
  );
};
