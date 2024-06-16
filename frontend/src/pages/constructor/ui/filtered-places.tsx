import MarkerClusterGroup from "react-leaflet-cluster";

import { TPlace } from "@/shared/model/types";
import { CustomMarker } from "@/widgets/map/ui/custom-marker";
import { getIconUrl, selectIsAuthorized } from "@/entities";
import { PopupContent } from "./popup-content";
import { AddTripPlaceButton } from "@/features/add-trip-place";
import { useAppSelector } from "@/shared";

interface IProps {
  places: TPlace[];
}
export const FilteredPlaces: React.FC<IProps> = ({ places }) => {
  const isAuth = useAppSelector(selectIsAuthorized);
  return (
    <>
      <MarkerClusterGroup>
        {places &&
          places.map((place: TPlace) => {
            const iconUrl = getIconUrl(place.type, place.icon, place.image_url);
            return (
              <CustomMarker
                key={place.id}
                popup={
                  <>
                    <PopupContent place={place} />
                    {isAuth && <AddTripPlaceButton placeId={place.id} />}
                  </>
                }
                position={{ lat: place.latitude, lng: place.longitude }}
                color={place?.type?.color || "#ffffff"}
                iconUrl={iconUrl}
                zIndex={0}
                zoomContent={place?.short_title || place?.title}
              />
            );
          })}
      </MarkerClusterGroup>
    </>
  );
};
