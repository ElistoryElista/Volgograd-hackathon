import { getIconUrl, useTripPlaces } from "@/entities";
import { RemoveTripPlaceButton } from "@/features";
import { TPlace } from "@/shared/model/types";

interface IProps {}

export const TripList: React.FC<IProps> = ({}) => {
  const { tripPlaces } = useTripPlaces();

  if (!tripPlaces) return null;
  else
    return (
      <ul className="flex w-full flex-col gap-2">
        {tripPlaces.map(
          ({ id, short_title, title, type, icon, image_url }: TPlace) => {
            const iconUrl = getIconUrl(type, icon, image_url);
            return (
              <div key={id} className="flex items-center gap-2">
                <img
                  src={iconUrl}
                  className={`h-[40px] w-[40px] rounded-xl border-2 border-primary bg-primary bg-opacity-20 object-cover p-1`}
                />
                <li className="flex w-full flex-grow flex-col justify-between">
                  <h4 className="title !text-sm">{short_title || title}</h4>
                  <p className="link text-sm">Подробнее</p>
                </li>
                <RemoveTripPlaceButton placeId={id} type="sm" />
              </div>
            );
          }
        )}
      </ul>
    );
};
