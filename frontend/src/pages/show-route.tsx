import {
  changeLocalTrip,
  getIconUrl,
  selectIsAuthorized,
  useGetAllPlacesQuery,
  useRouteGeometry,
  useTripPlaces,
} from "@/entities";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import qs from "qs";
import { MapLayers, Route } from "@/widgets";
import { CustomMarker } from "@/widgets/map/ui/custom-marker";
import { PopupContent } from "./constructor/ui/popup-content";
import { TPlace } from "@/shared/model/types";
import { useMap } from "react-leaflet";
import { sortByNearestPoint } from "@/entities/route/libs/optimistic-route";
import Control from "react-leaflet-custom-control";
import { useAppDispatch, useAppSelector } from "@/shared";

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
  movement: "foot" | "car";
}
export const RouteLine: React.FC<IPropsRoute> = ({ places, movement }) => {
  const { routeData } = useRouteGeometry(places || [], movement);
  return <>{routeData?.geometry && <Route geometry={routeData.geometry} />}</>;
};

interface IProps {}
export const ShowRoute: React.FC<IProps> = ({}) => {
  const { ids: idsParams, movement } = useParams();
  const [placesIds, setPlacesIds] = useState<number[]>();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuthorized);
  const navigate = useNavigate();
  const { setTripPlaces } = useTripPlaces();

  const query = qs.stringify(
    {
      filters: {
        id: {
          $in: placesIds,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { placesData } = useGetAllPlacesQuery(
    {
      populate: "populate=type.icon, icon",
      page: 1,
      pageSize: 9999,
      fields:
        "fields[0]=id&fields[1]=title&fields[2]=short_title&fields[3]=latitude&fields[4]=longitude&fields[5]=description&fields[6]=image_url",
      filter: query,
    },
    {
      selectFromResult: (res) => ({
        placesData: res?.data?.data,
      }),
      skip: !placesIds,
    }
  );

  useEffect(() => {
    const ids = idsParams?.split(",").map((id) => Number(id));
    setPlacesIds(ids);
  }, []);

  const [places, setPlaces] = useState<TPlace[]>([]);

  useEffect(() => {
    if (placesData && placesData[0]) {
      const optimizedSort = sortByNearestPoint(
        placesData,
        placesData[0]
      ) as TPlace[];

      setPlaces(optimizedSort);
    }
  }, [placesData]);

  function saveRoute() {
    if (isAuth && placesIds) {
      setTripPlaces(placesIds);
      navigate("/trip");
    } else {
      dispatch(changeLocalTrip(places));
      navigate("/trip");
    }
  }

  const movementMethod =
    movement === "foot" || movement === "car" ? movement : "foot";

  return (
    <div className="fixed left-0 top-0 z-20 h-full w-full">
      <MapLayers>
        {placesData && <Places places={places} />}
        {placesData && <RouteLine places={places} movement={movementMethod} />}
        <Control position="bottomleft">
          <button onClick={saveRoute} className="btn-primary btn mb-[64px] ">
            Продолжить маршрут
          </button>
        </Control>
      </MapLayers>
    </div>
  );
};
