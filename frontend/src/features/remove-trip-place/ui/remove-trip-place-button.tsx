import { selectIsAuthorized, useTripPlaces } from "@/entities";
import { TrashIcon, useAppSelector } from "@/shared";

interface IProps {
  placeId: number;
  type?: "sm" | "md";
}
export const RemoveTripPlaceButton: React.FC<IProps> = ({
  placeId,
  type = "md",
}) => {
  const isAuth = useAppSelector(selectIsAuthorized);

  const { toggleTripPlace } = useTripPlaces();
  function removeTripPlace() {
    toggleTripPlace(placeId);
  }
  if (!isAuth) return <></>;

  if (type === "md")
    return (
      <button
        className="btn-primary btn-sm btn w-full"
        onClick={removeTripPlace}
      >
        Удалить из маршрута
      </button>
    );
  if (type === "sm")
    return (
      <button
        className="btn-outline btn-sm btn-circle btn"
        onClick={removeTripPlace}
      >
        <TrashIcon className="w-5" />
      </button>
    );
};
