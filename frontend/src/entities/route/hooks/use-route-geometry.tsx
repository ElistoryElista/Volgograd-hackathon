import { useAppSelector } from "@/shared";
import { TPlace } from "@/shared/model/types";
import {
  selectLocalIncidentPoints,
  selectMethodMovement,
} from "../model/route-slice";
import { useGetRouteByPlacesIdsQuery } from "../api/route-api";

import { useGetIncidentsQuery } from "@/entities/incident";
import { isDateGreaterThanNow } from "@/shared/lib";

interface IIncident {
  id: number;
  type: string;
  descriptions: string;
  latitude: number;
  longitude: number;
  when_delete: string;
}

export const useRouteGeometry = (
  tripPlaces: TPlace[],
  method?: "foot" | "car"
) => {
  const localIncidentPoints = useAppSelector(selectLocalIncidentPoints);
  const { incidents } = useGetIncidentsQuery("", {
    selectFromResult: (res) => {
      return {
        incidents: res?.data?.data?.filter((incident: IIncident) => {
          if (incident.when_delete === null) return true;
          else return isDateGreaterThanNow(incident.when_delete);
        }),
      };
    },
  });

  const methodMovement = useAppSelector(selectMethodMovement);
  const mapIncidents =
    incidents?.map((incident: IIncident) => ({
      lat: incident.latitude,
      lon: incident.longitude,
    })) || [];

  const { data: routeData } = useGetRouteByPlacesIdsQuery(
    {
      placesIds: tripPlaces?.map((place: TPlace) => place.id) || [],
      profile: method || methodMovement,
      exclude: [...mapIncidents, ...localIncidentPoints],
    },
    {
      skip: !tripPlaces || tripPlaces.length <= 1,
    }
  );

  return { routeData };
};
