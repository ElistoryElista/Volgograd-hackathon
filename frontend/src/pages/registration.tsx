import { selectIsAuthorized } from "@/entities";
import { RegistrationForm } from "@/features";
import { useAppSelector } from "@/shared";
import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

export const Registration: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuthorized);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/home");
  }, []);

  return (
    <div className="flex min-h-full w-full items-center justify-center px-4">
      <div className="box w-full max-w-[500px] px-4">
        <RegistrationForm />

        <div className="mt-2 flex justify-between">
          <Link to={"/login"} className="link w-full text-center">
            Уже есть аккаунт
          </Link>
        </div>
      </div>
    </div>
  );
};
