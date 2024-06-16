import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/shared/hooks";
import { selectIsAuthorized } from "@/entities";
import { LoginForm } from "@/features";

export const Login: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuthorized);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/home");
  }, []);

  return (
    <div className="screen flex items-center justify-center">
      <div className="box flex flex-col">
        <LoginForm />
        <div className="mt-2 flex justify-between">
          <Link to={"/forget-password"} className="link w-full text-center">
            Забыли пароль?
          </Link>
          <Link to={"/registration"} className="link w-full text-center">
            Еще нет аккаунта
          </Link>
        </div>
      </div>
    </div>
  );
};
