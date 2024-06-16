import { useAppSelector } from "@/shared";
import { selectUserId } from "..";
import {
  useGetTripPlacesQuery,
  useUpdateTripPlacesMutation,
} from "../api/user-api";
import { TPlace } from "@/shared/model/types";
import { sortByNearestPoint } from "@/entities/route/libs/optimistic-route";
import { useEffect, useState } from "react";
import {
  selectLocalTrip,
  selectStartPosition,
  selectUserPosition,
} from "@/entities/route";
import { selectIsAuthorized } from "@/entities/session";

export const useTripPlaces = () => {
  const [updateTripPlacesMutation] = useUpdateTripPlacesMutation();
  const startPosition = useAppSelector(selectStartPosition);
  const userPosition = useAppSelector(selectUserPosition);
  const [tripPlaces, setTripPlaces] = useState<TPlace[]>();
  const userId = useAppSelector(selectUserId);
  const isAuth = useAppSelector(selectIsAuthorized);
  const localTrip = useAppSelector(selectLocalTrip);

  const { tripPlacesResponse, isLoading, error } = useGetTripPlacesQuery("", {
    selectFromResult(res) {
      return {
        tripPlacesResponse: res?.data?.trip_places,
        ...res,
      };
    },
    skip: !userId,
  });

  useEffect(() => {
    if (!isAuth && localTrip) {
      let optimizedSort: TPlace[] = [];
      optimizedSort = sortByNearestPoint(
        localTrip,
        startPosition
          ? { latitude: startPosition.lat, longitude: startPosition.lon }
          : userPosition
          ? { latitude: userPosition.lat, longitude: userPosition.lon }
          : localTrip[0]
      ) as TPlace[];
      setTripPlaces(optimizedSort);
    }
  }, [isAuth, localTrip, startPosition, userPosition]);

  useEffect(() => {
    if (tripPlacesResponse && tripPlacesResponse[0]) {
      let optimizedSort: TPlace[] = [];
      optimizedSort = sortByNearestPoint(
        tripPlacesResponse,
        startPosition
          ? { latitude: startPosition.lat, longitude: startPosition.lon }
          : userPosition
          ? { latitude: userPosition.lat, longitude: userPosition.lon }
          : tripPlacesResponse[0]
      ) as TPlace[];
      setTripPlaces(optimizedSort);
    }
  }, [tripPlacesResponse, startPosition, userPosition]);

  async function updateTripPlaces(newPlaceIds: number[]) {
    if (newPlaceIds && userId) {
      await updateTripPlacesMutation({
        id: userId,
        trip_places: newPlaceIds,
      });
    }
  }

  async function removeAllPlaces() {
    await updateTripPlacesMutation({
      id: userId,
      trip_places: [],
    });
  }

  async function toggleTripPlace(placeId: number) {
    if (userId && tripPlaces) {
      const prevPlacesIds = tripPlaces?.map((place: TPlace) => place.id);
      const newPlacesIds = prevPlacesIds?.includes(placeId)
        ? prevPlacesIds?.filter((id: number) => id !== placeId)
        : [...prevPlacesIds, placeId];
      await updateTripPlacesMutation({ id: userId, trip_places: newPlacesIds });
    }
  }

  function checkingIsTripPlace(placeId: number): boolean {
    if (tripPlaces && tripPlaces?.some((place: TPlace) => place.id === placeId))
      return true;
    return false;
  }

  return {
    removeAllPlaces,
    checkingIsTripPlace,
    toggleTripPlace,
    setTripPlaces: updateTripPlaces,
    tripPlaces,
    isLoading,
    error,
  };
};
