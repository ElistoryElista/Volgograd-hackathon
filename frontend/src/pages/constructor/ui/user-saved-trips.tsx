import { useGetAllPlacesQuery, useSavedTrips } from "@/entities";
import { ArrowDownIcon, CarIcon } from "@/shared";
import { TPlace, TSavedTrip } from "@/shared/model/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import qs from "qs";

interface IPropsTripItem {
  placesIds: number[];
  method: string;
}
export const TripPlaces: React.FC<IPropsTripItem> = ({ placesIds, method }) => {
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
      fields: "fields[0]=title",
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
    if (placesData) {
      setFirstFour(placesData.slice(0, 4));
      setRest(placesData.slice(4));
    }
  }, [placesData]);

  const [firstFour, setFirstFour] = useState<TPlace[]>([]);
  const [rest, setRest] = useState<TPlace[]>([]);
  const [isShowAllPlaces, setIsShowAllPlaces] = useState<boolean>(false);

  function toggleIsShowAllPlaces() {
    setIsShowAllPlaces((prev) => !prev);
  }

  return (
    <>
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
      {method === "car" && (
        <button className="btn-sm btn-circle btn">
          <CarIcon className="w-6" />
        </button>
      )}
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
    </>
  );
};

interface IProps {}

export const UserSavedTrips: React.FC<IProps> = ({}) => {
  const { trips } = useSavedTrips();

  return (
    <div className="flex flex-col gap-2">
      {trips?.length === 0 && <p>У вас пока нет сохраненных маршрутов</p>}
      {trips?.map(({ place_ids, movement_method, id }: TSavedTrip) => {
        let url =
          "https://" +
          window.location.hostname +
          `/shared-route/${place_ids}/${movement_method}`;

        if (import.meta.env.MODE === "development")
          url =
            "http://localhost:5173/shared-route/" +
            place_ids +
            "/" +
            movement_method;

        return (
          <div key={id} className="box flex flex-col gap-2">
            <TripPlaces
              method={movement_method}
              placesIds={place_ids?.split(",").map((id) => Number(id))}
            />
            <Link to={url} className="btn w-full">
              перейти
            </Link>
          </div>
        );
      })}
    </div>
  );
};
