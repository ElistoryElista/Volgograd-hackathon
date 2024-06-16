import { addLocalIncidentPoint, useFileUploadMutation } from "@/entities";
import { UploadImageInput, useAppDispatch } from "@/shared";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { LatLng } from "leaflet";
import { useCreateIncidentMutation } from "@/entities/incident";

interface IProps {
  className?: string;
  setIsSuccess: (status: boolean) => void;
  position: LatLng;
}

interface IFormValues {
  description: string;
  type: string;
}

export const IncidentForm: React.FC<IProps> = ({
  className = "",
  setIsSuccess,
  position,
}) => {
  const [image, setImage] = useState<FormData | null>();
  const [uploadImage] = useFileUploadMutation();
  const [createIncident] = useCreateIncidentMutation();
  const dispatch = useAppDispatch();
  const formContext = useForm<IFormValues>();

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
        let incidentData = {
          descriptions: data.description,
          images: imageId,
          latitude: position.lat,
          longitude: position.lng,
          type: data.type,
          publishedAt: null,
        };
        await createIncident(incidentData);
        setIsSuccess(true);
        dispatch(
          addLocalIncidentPoint({ lat: position.lat, lon: position.lng })
        );
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
      {position && (
        <p>
          Координаты {position.lat}, {position.lng}
        </p>
      )}

      <select {...register("type")} className="input w-full">
        <option value="нет проезда/прохода">нет проезда/прохода</option>
        <option value="ремонтные работы">ремонтные работы</option>
        <option value="не работает светофор">не работает светофор</option>
        <option value="высокая преграда">высокая преграда</option>
        <option value="крутой склон">крутой склон</option>
        <option value="не актуальная информация">
          не актуальная информация
        </option>
        <option value="пробка">пробка</option>
      </select>
      {errors?.description && (
        <p className="mt-2 text-error">{errors.description.message}</p>
      )}
      <textarea
        className={`input-bordered input !mt-4 h-40 w-full resize-none ${
          errors?.description ? "input-error" : ""
        }`}
        placeholder="Опишите проблему*"
        {...register("description", { required: "обязательное поле" })}
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
            "Создать заявку"
          )}
        </button>
      </div>
    </form>
  );
};
