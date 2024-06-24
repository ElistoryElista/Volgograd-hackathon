import {
  BusIcon,
  Details,
  HomeIcon,
  MapIcon,
  MenuIcon,
  StarIcon,
  UsersIcon,
} from "@/shared";
import { Link, useLocation } from "react-router-dom";

interface IProps {}
export const MobileNavigation: React.FC<IProps> = ({}) => {
  const location = useLocation();
  const route = location.pathname.substring(1);

  return (
    <div className="btm-nav z-30 lg:hidden">
      <Link
        to={"/home"}
        className={route === "home" ? "active text-primary" : ""}
      >
        <HomeIcon className="w-6" />
        Главная
      </Link>
      <Link
        to={"/trip"}
        className={route === "trip" ? "active text-primary" : ""}
      >
        <MapIcon className="w-6" />
        Путешествие
      </Link>
      {/* <Link
        to={"/recommendation"}
        className={route === "recommendation" ? "active text-primary" : ""}
      >
        <StarIcon className="w-6" />
        Маршруты
      </Link> */}
      <Details className="dropdown-top dropdown-end mt-1">
        <summary
          className={`relative flex h-full w-full cursor-pointer flex-col items-center justify-center  border-current ${
            route === "recommendation" ||
            route === "companions" ||
            route === "excursions"
              ? "text-primary"
              : ""
          }`}
        >
          <MenuIcon className="w-6" /> <p>Меню</p>
        </summary>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <Link
              to={"/recommendation"}
              className={route === "recommendation" ? "active" : ""}
            >
              <StarIcon className="w-6" />
              Рекомендации
            </Link>
          </li>
          <li>
            <Link
              to={"/companions"}
              className={route === "companions" ? "active" : ""}
            >
              <UsersIcon className="w-6" />
              Компаньоны
            </Link>
          </li>
          <li>
            <Link
              to={"/excursions"}
              className={route === "excursions" ? "active" : ""}
            >
              <BusIcon className="w-6" />
              Экскурсии
            </Link>
          </li>
        </ul>
      </Details>
    </div>
  );
};
