import { getIconUrl, useRouteGeometry, useTripPlaces } from "@/entities";
import { TPlace } from "@/shared/model/types";
import { CustomMarker } from "@/widgets/map/ui/custom-marker";
import { useMap } from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-cluster";
import { PopupContent } from "./popup-content";
import { Route } from "@/widgets";
import { useEffect } from "react";
import { RemoveTripPlaceButton } from "@/features";

interface IProps {}
export const TripOnMap: React.FC<IProps> = ({}) => {
  const { tripPlaces } = useTripPlaces();
  const { routeData } = useRouteGeometry(tripPlaces || []);
  const map = useMap();

  useEffect(() => {
    if (tripPlaces && tripPlaces[0]) {
      const firstElement = tripPlaces[0];
      map.setView({ lat: firstElement.latitude, lng: firstElement.longitude });
    }
  }, [tripPlaces]);

  console.log(tripPlaces);

  return (
    <>
      {/* <MarkerClusterGroup> */}
      {tripPlaces &&
        tripPlaces.map((place: TPlace, index: number) => {
          const iconUrl = getIconUrl(place.type, place.icon, place.image_url);
          return (
            <CustomMarker
              key={place.id}
              popup={
                <>
                  <PopupContent place={place} />
                  <RemoveTripPlaceButton placeId={place.id} />
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
      {/* </MarkerClusterGroup> */}
      {routeData?.geometry && <Route geometry={routeData.geometry} />}
    </>
  );
};
