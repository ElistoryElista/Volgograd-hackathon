import {
  changeMethodMovement,
  selectMethodMovement,
  selectCarRouteData,
  selectFootRouteData,
  selectWheelchairRouteData,
} from "@/entities";
import { useTripPlaces } from "@/entities/user";
import { formatSecondsToHoursMinutes, roundDistanceToKm } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { WheelCharIcon } from "@/shared";

export const RouteMode: React.FC = () => {
  const { tripPlaces } = useTripPlaces();
  const dispatch = useAppDispatch();
  const methodMovement = useAppSelector(selectMethodMovement);
  const carRouteData = useAppSelector(selectCarRouteData);
  const footRouteData = useAppSelector(selectFootRouteData);
  const wheelchairRouteData = useAppSelector(selectWheelchairRouteData);

  function handleMethodMovement(mode: "foot" | "car" | "wheelchair") {
    dispatch(changeMethodMovement(mode));
  }

  return (
    <div className="flex justify-between py-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleMethodMovement("wheelchair")}
          className={`btn-base btn ${
            methodMovement === "wheelchair" ? "btn-primary" : ""
          }`}
        >
          <WheelCharIcon className="w-6" />
        </button>
        <button
          onClick={() => handleMethodMovement("foot")}
          className={`btn-base btn ${
            methodMovement === "foot" ? "btn-primary" : ""
          }`}
        >
          <svg
            className="w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M15.5 3.5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2ZM7 23 9.8 8.9 8 9.6V13H6V8.3l5.05-2.14c.97-.41 2.09-.05 2.65.84l1 1.6C15.5 10 17.1 11 19 11v2c-2.2 0-4.2-1-5.5-2.5l-.6 3 2.1 2V23h-2v-6l-2.1-2-1.8 8H7Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <button
          onClick={() => handleMethodMovement("car")}
          className={`btn-base btn ${
            methodMovement === "car" ? "btn-primary" : ""
          }`}
        >
          <svg
            className="w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M17.5 5c.66 0 1.22.42 1.42 1.01L21 12v8c0 .55-.45 1-1 1h-1c-.55 0-1-.45-1-1v-1H6v1c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1v-8l2.08-5.99C5.29 5.42 5.84 5 6.5 5h11ZM5 14.5c0 .83.67 1.5 1.5 1.5S8 15.33 8 14.5 7.33 13 6.5 13 5 13.67 5 14.5ZM17.5 16c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5Zm-11-9.5L5 11h14l-1.5-4.5h-11Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      {tripPlaces && tripPlaces.length > 1 && (
        <div className="flex flex-col items-end justify-between">
          {methodMovement === "foot" && (
            <>
              <p className="text-sm">
                {footRouteData.duration &&
                  formatSecondsToHoursMinutes(footRouteData.duration)}
              </p>
              <p className="text-sm">
                {footRouteData.distance &&
                  roundDistanceToKm(footRouteData.distance)}
              </p>
            </>
          )}
          {methodMovement === "car" && (
            <>
              <p>
                {carRouteData.duration &&
                  formatSecondsToHoursMinutes(carRouteData.duration)}
              </p>
              <p>
                {carRouteData.distance &&
                  roundDistanceToKm(carRouteData.distance)}
              </p>
            </>
          )}
          {methodMovement === "wheelchair" && (
            <>
              <p>
                {wheelchairRouteData.duration &&
                  formatSecondsToHoursMinutes(wheelchairRouteData.duration)}
              </p>
              <p>
                {wheelchairRouteData.distance &&
                  roundDistanceToKm(wheelchairRouteData.distance)}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
