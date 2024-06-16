import { HomeIcon, MapIcon, StarIcon } from "@/shared";
import { Link, useLocation } from "react-router-dom";

interface IProps {}
export const MobileNavigation: React.FC<IProps> = ({}) => {
  const location = useLocation();
  const route = location.pathname.substring(1);

  return (
    <div className="btm-nav z-30 lg:hidden">
      <Link to={"/home"} className={route === "home" ? "active" : ""}>
        <HomeIcon className="w-6" />
        Главная
      </Link>
      <Link to={"/trip"} className={route === "trip" ? "active" : ""}>
        <MapIcon className="w-6" />
        Мой маршрут
      </Link>
      <Link
        to={"/recommendation"}
        className={route === "recommendation" ? "active" : ""}
      >
        <StarIcon className="w-6" />
        Рекомендации
      </Link>
    </div>
  );
};
