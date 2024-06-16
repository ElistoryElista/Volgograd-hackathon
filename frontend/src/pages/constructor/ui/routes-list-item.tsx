import { changeLocalTrip, selectIsAuthorized, useTripPlaces } from "@/entities";
import {
  ArrowDownIcon,
  CarIcon,
  EarIcon,
  EyeIcon,
  WheelCharIcon,
  useAppDispatch,
  useAppSelector,
} from "@/shared";
import { TPlace, TReadyRoute } from "@/shared/model/types";
import { useState } from "react";

interface IProps {
  route: TReadyRoute;
  finishCallback: () => void;
}
export const RoutesListItem: React.FC<IProps> = ({ route, finishCallback }) => {
  const { setTripPlaces } = useTripPlaces();

  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectIsAuthorized);
  const [firstFour] = useState(route.places.slice(0, 4));
  const [rest] = useState(route.places.slice(4));

  const [isShowAllPlaces, setIsShowAllPlaces] = useState<boolean>(false);

  function toggleIsShowAllPlaces() {
    setIsShowAllPlaces((prev) => !prev);
  }

  return (
    <div className="box flex flex-col gap-4">
      <h2>{route?.title}</h2>
      <ul className="list-decimal">
        {firstFour?.map((place: TPlace) => (
          <li className="ml-4" key={place.id}>
            {place.short_title || place.title}
          </li>
        ))}
        {isShowAllPlaces &&
          rest?.map((place: TPlace) => (
            <li className="ml-4" key={place.id}>
              {place.short_title || place.title}
            </li>
          ))}
      </ul>
      {rest.length !== 0 && (
        <button className="link inline" onClick={toggleIsShowAllPlaces}>
          {isShowAllPlaces ? (
            <span className="flex justify-center gap-2">
              Свернуть <ArrowDownIcon className="w-4 rotate-180" />
            </span>
          ) : (
            <span className="flex justify-center gap-2">
              Показать все <ArrowDownIcon className="w-4 " />
            </span>
          )}
        </button>
      )}
      <div className="flex justify-between">
        <div className="flex gap-2">
          {route.isVisuallyImpaired && (
            <div
              className={`tooltip  tooltip-right ${
                route.isVisuallyImpaired ? "tooltip-primary" : "tooltip-error"
              }`}
              data-tip={"Подходит для слабовидящих"}
            >
              <button
                className={`btn-sm btn-circle btn ${
                  route.isVisuallyImpaired ? "btn-primary" : ""
                }`}
                disabled={!route.isVisuallyImpaired}
              >
                <EyeIcon className="w-6 " />
              </button>
            </div>
          )}
          {route.isHearingImpaired && (
            <div
              className={`tooltip  tooltip-right ${
                route.isHearingImpaired ? "tooltip-primary" : "tooltip-error"
              }`}
              data-tip={"Подходит для слабослышащих"}
            >
              <button
                className={`btn-sm btn-circle btn ${
                  route.isHearingImpaired ? "btn-primary" : ""
                }`}
                disabled={!route.isHearingImpaired}
              >
                <EarIcon className="w-6" />
              </button>
            </div>
          )}
          {route.isRestrictedInMovement && (
            <div
              className={`tooltip  tooltip-top ${
                route.isRestrictedInMovement
                  ? "tooltip-primary"
                  : "tooltip-error"
              }`}
              data-tip={"Подходит для ограниченных в передвижении"}
            >
              <button
                className={`btn-sm btn-circle btn ${
                  route.isRestrictedInMovement ? "btn-primary" : ""
                }`}
                disabled={!route.isRestrictedInMovement}
              >
                <WheelCharIcon className="w-6" />
              </button>
            </div>
          )}
        </div>
        {route.car && (
          <button className="btn-sm btn-circle btn">
            <CarIcon className="w-6" />
          </button>
        )}
      </div>
      <button
        className="btn-sm btn w-full"
        onClick={() => {
          if (isAuth) {
            setTripPlaces(route.places.map(({ id }) => id));
            finishCallback();
          } else {
            dispatch(changeLocalTrip(route.places));
            finishCallback();
          }
        }}
      >
        выбрать
      </button>
    </div>
  );
};
