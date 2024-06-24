import { getIconUrl, useRouteGeometry } from "@/entities";
import { TPlace, TReadyRoute } from "@/shared/model/types";
import { MapLayers, Route } from "@/widgets";
import { CustomMarker } from "@/widgets/map/ui/custom-marker";
import { PopupContent } from "./popup-content";
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { sortByNearestPoint } from "@/entities/route/libs/optimistic-route";

interface IPropsPlaces {
  places: TPlace[];
}
const Places: React.FC<IPropsPlaces> = ({ places }) => {
  const map = useMap();

  useEffect(() => {
    if (places && places[0]) {
      const firstElement = places[0];
      map.setView({ lat: firstElement.latitude, lng: firstElement.longitude });
    }
  }, [places]);

  return (
    <>
      {places &&
        places.map((place: TPlace, index: number) => {
          const iconUrl = getIconUrl(place.type, place.icon, place.image_url);
          return (
            <CustomMarker
              key={place.id}
              popup={
                <>
                  <PopupContent place={place} />
                </>
              }
              position={{ lat: place.latitude, lng: place.longitude }}
              color={"#570DF8"}
              iconUrl={iconUrl}
              zIndex={10}
              zoomContent={place?.short_title || place?.title}
              indicator={index + 1}
            />
          );
        })}
    </>
  );
};

interface IPropsRoute {
  places: TPlace[];
  isCar: boolean;
}
export const RouteLine: React.FC<IPropsRoute> = ({ places, isCar }) => {
  const method = isCar ? "car" : "foot";
  const { routeData } = useRouteGeometry(places || [], method);
  return <>{routeData?.geometry && <Route geometry={routeData.geometry} />}</>;
};

interface IProps {
  route: TReadyRoute;
}

export const ShowRoute: React.FC<IProps> = ({ route }) => {
  const [places, setPlaces] = useState<TPlace[]>([]);

  useEffect(() => {
    if (route.places && route.places[0]) {
      const optimizedSort = sortByNearestPoint(
        route.places,
        route.places[0]
      ) as TPlace[];

      setPlaces(optimizedSort);
    }
  }, []);

  return (
    <div className="mt-2 h-[60svh]">
      <MapLayers>
        {places && <Places places={places} />}
        {places && <RouteLine places={places} isCar={route.car} />}
      </MapLayers>
    </div>
  );
};
