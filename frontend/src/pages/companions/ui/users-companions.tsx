import { selectUserId, useGetAllUsersQuery, useTripPlaces } from "@/entities";
import { Avatar, CopyButton, Modal, useAppSelector } from "@/shared";
import { TPlace, TResImage } from "@/shared/model/types";

interface IProps {}
export const UsersCompanions: React.FC<IProps> = ({}) => {
  const userId = useAppSelector(selectUserId);
  const { tripPlaces } = useTripPlaces();
  const { data: users } = useGetAllUsersQuery(userId, { skip: !userId });

  type TUsers = {
    id: number | null;
    avatar: TResImage | null;
    phone: string | null;
    username: string | null;
    trip_places: TPlace[];
    email: string | null;
  };

  return (
    <>
      {users?.map((user: TUsers) => {
        const userTripPlacesIds = user?.trip_places?.map(({ id }) => id) || [];
        const myTripPlacesIds = tripPlaces?.map(({ id }) => id) || [];

        const isHasIntersection = myTripPlacesIds.some((id) =>
          userTripPlacesIds.includes(id)
        );
        return (
          <div key={user.id} className="flex items-center gap-2">
            <Avatar image={user.avatar} />
            <div className="flex flex-grow flex-col gap-2 self-start">
              <h3 className="title  !text-sm">{user.username}</h3>
              {isHasIntersection && (
                <div className="badge badge-success">Схожий маршрут</div>
              )}
            </div>
            <Modal
              content={
                <div className="flex flex-col gap-4">
                  {user.phone && (
                    <div className="flex items-center gap-2">
                      <span className="">
                        Телефон:{" "}
                        <span className="title !text-sm">{user.phone}</span>
                      </span>
                      <CopyButton textToCopy={user.phone} />
                    </div>
                  )}
                  {user.email && (
                    <div className="flex items-center gap-2">
                      <a className="btn w-full" href={"mailto:" + user.email}>
                        написать на почту
                      </a>
                    </div>
                  )}
                </div>
              }
            >
              <button className="btn-primary btn-sm btn">связь</button>
            </Modal>
          </div>
        );
      })}
    </>
  );
};
