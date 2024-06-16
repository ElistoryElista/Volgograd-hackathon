import { Link, useLocation } from "react-router-dom";

interface IProps {
  className?: string;
}

export const ProfileNavbar: React.FC<IProps> = ({ className }) => {
  const location = useLocation();
  const routeParts = location.pathname.split("/");
  const routeName = routeParts[routeParts.length - 1];

  return (
    <div className={`hidden md:flex py-2 gap-2 justify-center ${className}`}>
      <Link
        to={"/profile/me"}
        className={`btn btn-sm ${
          routeName === "me" ? "btn-primary" : "btn-ghost"
        }`}
      >
        Мои данные
      </Link>
      <Link
        to={"/profile/tickets"}
        className={`btn btn-sm ${
          routeName === "tickets" ? "btn-primary" : "btn-ghost"
        }`}
      >
        Мои билеты
      </Link>
      <Link
        to={"/profile/favorites"}
        className={`btn btn-sm ${
          routeName === "favorites" ? "btn-primary" : "btn-ghost"
        }`}
      >
        Избранные места
      </Link>
    </div>
  );
};
