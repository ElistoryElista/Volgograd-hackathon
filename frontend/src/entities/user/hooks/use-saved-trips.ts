import { TPlace, TSavedTrip } from "@/shared/model/types";
import {
  useGetUserSavedTripsQuery,
  useUpdateSavedTripsMutation,
} from "../api/user-api";
import { useAppSelector } from "@/shared";
import { selectMethodMovement } from "@/entities/route";
import { selectUserId } from "../model/slice";

export const useSavedTrips = () => {
  const method = useAppSelector(selectMethodMovement);
  const userId = useAppSelector(selectUserId);
  const [updateSavedTrips] = useUpdateSavedTripsMutation();

  const { trips } = useGetUserSavedTripsQuery("", {
    selectFromResult: (res) => {
      return {
        trips: res?.data?.trips,
      };
    },
  });

  async function saveTrip(tripPlaces: TPlace[]) {
    if (tripPlaces && tripPlaces.length !== 0) {
      const placesIds = tripPlaces.map((place) => place.id);
      const joinedPlaceIds = placesIds.join(",");
      const moveMethod = method === "wheelchair" ? "foot" : method;
      const isAlreadyExist = trips?.some(
        ({ place_ids }: TSavedTrip) => place_ids === joinedPlaceIds
      );

      //   debugger;
      if (!isAlreadyExist) {
        console.log("сохранение маршрута");
        const newSavedTrips = [
          ...trips,
          { place_ids: joinedPlaceIds, movement_method: moveMethod },
        ];
        await updateSavedTrips({ id: userId, trips: newSavedTrips });
      } else console.log("маршрут уже сохранен");
    }
  }

  return { trips, saveTrip };
};
