import { useAppSelector } from "@/shared";
import { Confirm } from "./confirm";
import { selectIsAuthorized, selectIsShowCompanions } from "@/entities";
import { Deny } from "./deny";
import { UsersCompanions } from "./users-companions";
import { Link } from "react-router-dom";

interface IProps {}
export const Page: React.FC<IProps> = ({}) => {
  const isCompanions = useAppSelector(selectIsShowCompanions);
  const isAuth = useAppSelector(selectIsAuthorized);

  if (!isAuth)
    return (
      <div className="-mb-2 flex h-[calc(100vh-136px)] items-start justify-center overflow-y-auto px-2 lg:h-auto lg:pb-4">
        <div className="box mt-5 flex w-full max-w-4xl flex-col gap-2 bg-base-100 lg:mt-2">
          <h2 className="title">Компаньоны</h2>
          Для доступа к этой странице необходимо быть авторизованным
          <Link to={"/login"} className="btn-primary btn w-full">
            Авторизоваться
          </Link>
        </div>
      </div>
    );

  return (
    <div className="-mb-2 flex h-[calc(100vh-136px)] items-start justify-center overflow-y-auto px-2 lg:h-auto lg:pb-4">
      <div className="box mt-5 flex w-full max-w-4xl flex-col gap-2 bg-base-100 lg:mt-2">
        <h2 className="title">Компаньоны</h2>
        {!isCompanions && <Confirm />}
        {isCompanions && (
          <>
            <Deny />
            <UsersCompanions />
          </>
        )}
      </div>
    </div>
  );
};
