import {
  selectIsAuthorized,
  selectVisuallyImpairedMode,
  useGetUserInfoQuery,
} from "@/entities";
import { ModeToggler } from "@/features";
import { Avatar, Container, Underline, useAppSelector } from "@/shared";
import { Link, useLocation } from "react-router-dom";

interface IProps {}
export const Header: React.FC<IProps> = ({}) => {
  const location = useLocation();
  const route = location.pathname.substring(1);
  const isVisuallyImpaired = useAppSelector(selectVisuallyImpairedMode);
  const isAuth = useAppSelector(selectIsAuthorized);

  const { avatar } = useGetUserInfoQuery("", {
    selectFromResult(res) {
      return {
        avatar: res?.data?.avatar,
      };
    },
  });
  return (
    <header
      className={`navbar bg-base-100 ${
        isVisuallyImpaired ? "" : "lg:bg-opacity-50"
      }  lg:backdrop-blur-md`}
    >
      <Container>
        <div className="navbar-start ">
          {!isVisuallyImpaired && (
            <Link to={"/home"} className="title text-xl uppercase">
              Волгоград
            </Link>
          )}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1 ">
            <Link
              className={`btn-ghost btn relative uppercase ${
                route === "home" ? "btn-primary" : ""
              }`}
              to="/home"
            >
              Главная
              {route === "home" && <Underline />}
            </Link>
            <Link
              className={`btn-ghost btn relative uppercase ${
                route === "trip" ? "btn-primary" : ""
              }`}
              to="/trip"
            >
              Мой маршрут
              {route === "trip" && <Underline />}
            </Link>
            <Link
              className={`btn-ghost btn relative uppercase ${
                route === "recommendation" ? "btn-primary" : ""
              }`}
              to="/recommendation"
            >
              Рекомендации
              {route === "recommendation" && <Underline />}
            </Link>
            <Link
              className={`btn-ghost btn relative uppercase ${
                route === "recommendation" ? "btn-primary" : ""
              }`}
              to="/profile"
            >
              Профиль
              {route === "profile" && <Underline />}
            </Link>

            <Link
              className={`btn-ghost btn relative uppercase ${
                route === "companions" ? "btn-primary" : ""
              }`}
              to={"/companions"}
            >
              Компаньоны
              {route === "companions" && <Underline />}
            </Link>

            <Link
              className={`btn-ghost btn relative uppercase ${
                route === "excursions" ? "btn-primary" : ""
              }`}
              to={"/excursions"}
            >
              Экскурсии
              {route === "excursions" && <Underline />}
            </Link>
          </ul>
        </div>
        <div className="flex-end navbar-end flex gap-2">
          <ModeToggler />
          {isAuth ? (
            <Link to="profile" className="pointer">
              <Avatar image={avatar} />
            </Link>
          ) : (
            <Link to="/login" className="btn-primary btn">
              Войти
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};
