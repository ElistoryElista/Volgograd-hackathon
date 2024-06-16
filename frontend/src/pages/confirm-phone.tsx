import { selectIsAuthorized } from "@/entities";
import { ConfirmPhoneForm } from "@/features";
import { useAppSelector } from "@/shared";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ConfirmPhone: React.FC = () => {
  const { action } = useParams<{ action: "registration" | "reset-password" }>();
  const isAuth = useAppSelector(selectIsAuthorized);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/home");
  }, []);

  return (
    <div className="screen flex items-center justify-center">
      <div className="box w-full max-w-[500px] px-4">
        {action === "registration" && (
          <h2 className="title text-center">проверьте свой телефон</h2>
        )}
        {action === "reset-password" && (
          <h2 className="title text-center">восстановление пароля</h2>
        )}

        <ConfirmPhoneForm />
      </div>
    </div>
  );
};
