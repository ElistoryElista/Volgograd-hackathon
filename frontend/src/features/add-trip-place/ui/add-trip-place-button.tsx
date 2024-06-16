import { useTripPlaces } from "@/entities";
import { PlusIcon } from "@/shared";

interface IProps {
  placeId: number;
  type?: "sm" | "md";
}
export const AddTripPlaceButton: React.FC<IProps> = ({
  placeId,
  type = "md",
}) => {
  const { toggleTripPlace } = useTripPlaces();
  function addTripPlace() {
    toggleTripPlace(placeId);
  }
  if (type === "md")
    return (
      <button className="btn-primary btn-sm btn w-full" onClick={addTripPlace}>
        Добавить в маршрут
      </button>
    );
  if (type === "sm")
    return (
      <button
        className="btn-outline btn-sm btn-circle btn"
        onClick={addTripPlace}
      >
        <PlusIcon className="w-5" />
      </button>
    );
};
