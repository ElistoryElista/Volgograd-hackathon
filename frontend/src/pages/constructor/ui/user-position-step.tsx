import { changeUserPosition } from "@/entities";
import { Loading, useAppDispatch } from "@/shared";
import { useEffect } from "react";
import { useGeolocated } from "react-geolocated";

interface IProps {
  callback: () => void;
}
export const UserPositionStep: React.FC<IProps> = ({ callback }) => {
  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 10000,
  });
  const dispatch = useAppDispatch();

  const region: [number, number][] = [
    [50.52, 41.012],
    [48.12, 48.12],
  ];


  const checkIfInRegion = (
    lat: number,
    lon: number,
    region: [number, number][]
  ) => {
    const [minLat, minLon] = region[0];
    const [maxLat, maxLon] = region[1];
    return lat >= minLat && lat <= maxLat && lon >= minLon && lon <= maxLon;
  };

  useEffect(() => {
    if (positionError) callback();
  }, [positionError]);

  function confirmUserPosition() {
    if (coords)
      dispatch(
        changeUserPosition({ lat: coords?.latitude, lon: coords?.longitude })
      );
    callback();
  }

  function getComponent() {
    if (!isGeolocationAvailable) {
      return (
        <div>К сожалению ваш браузер не поддерживает отслеживание позиции</div>
      );
    } else if (!isGeolocationEnabled)
      return (
        <div>
          К сожалению мы не сможем учесть вашу позицию для составления
          наилучшего маршрута, так как нет необходимых разрешении пользователя
        </div>
      );
    else if (
      coords &&
      checkIfInRegion(coords.latitude, coords.longitude, region)
    )
      return (
        <>
          <div>Учесть ваше местоположение при построении маршрута ?</div>{" "}
          <button
            className="btn-primary btn w-full"
            onClick={confirmUserPosition}
          >
            Да учесть
          </button>
        </>
      );
    else if (
      coords &&
      !checkIfInRegion(coords.latitude, coords.longitude, region)
    )
      return (
        <div>
          К сожалению мы не сможем учесть вашу позицию для составления
          наилучшего маршрута, так как мы не обнаружили, что вы сейчас в
          Волгоградской области.
        </div>
      );
    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="title">Ваше местоположение</h2> {getComponent()}
      <button className="btn w-full" onClick={callback}>
        Далее
      </button>
    </div>
  );
};
