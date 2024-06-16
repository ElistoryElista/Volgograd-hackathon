import { selectAvatar, selectUserPosition } from "@/entities";
import { TargetIcon, useAppSelector, useWindowDimensions } from "@/shared";
import { CustomMarker } from "@/widgets/map/ui/custom-marker";
// import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { useMap } from "react-leaflet";
import Control from "react-leaflet-custom-control";

export const UserMarker = () => {
  const userPosition = useAppSelector(selectUserPosition);
  // const [position, setPosition] = useState<[number, number]>();
  // const [watchId, setWatchId] = useState(null);

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 10000,
  });

  const avatar = useAppSelector(selectAvatar);
  const map = useMap();

  function handleUserTargetButton() {
    if (coords) map.setView({ lat: coords.latitude, lng: coords.longitude });
  }

  const { width: windowWith } = useWindowDimensions();
  const isDesktop = windowWith >= 1024;

  // useEffect(() => {
  //   if (!userPosition && watchId) {
  //     navigator.geolocation.clearWatch(watchId);
  //     setWatchId(null);
  //   }
  // }, [userPosition]);

  // useEffect(() => {
  //   return () => {
  //     if (watchId !== null) {
  //       navigator.geolocation.clearWatch(watchId);
  //       setWatchId(null);
  //     }
  //   };
  // }, []);

  // console.log(watchId);

  // useEffect(() => {
  //   if (!watchId && userPosition) {
  //     let id;
  //     if (!navigator.geolocation) {
  //       console.log("Геолокация не поддерживается браузером");
  //     } else {
  //       id = navigator.geolocation.watchPosition(
  //         (position) => {
  //           setPosition([position.coords.latitude, position.coords.longitude]);
  //         },
  //         (error) => {
  //           console.error(error);
  //         },
  //         {
  //           enableHighAccuracy: true,
  //           timeout: 5 * 1000,
  //           maximumAge: 5 * 1000,
  //         }
  //       );

  //       id ?? setWatchId(id);
  //     }
  //   }
  // }, [map, userPosition]);

  const iconUrl =
    avatar?.formats?.small?.url ||
    avatar?.formats?.thumbnail?.url ||
    avatar?.url ||
    "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg";

  return !coords ? null : (
    <>
      <Control prepend position="bottomright">
        {!isDesktop && userPosition && (
          <button
            onClick={handleUserTargetButton}
            className="btn-primary btn-circle btn mb-[3rem] lg:hidden"
          >
            <TargetIcon className="w-6" />
          </button>
        )}
      </Control>

      <CustomMarker
        popup={<>Вы здесь</>}
        position={{ lat: coords.latitude, lng: coords.longitude }}
        zIndex={20}
        iconUrl={iconUrl}
        color={"#570df8"}
      />
    </>
  );
};
