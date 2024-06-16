import { selectIsAuthorized } from "@/entities";
import { InputPhone } from "@/features";
import { Container, useAppSelector } from "@/shared";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ForgetPassword: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuthorized);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/home");
  }, []);

  return (
    <div className="screen flex items-center justify-center">
      <Container>
        <div className="box w-full max-w-[500px] px-4">
          <InputPhone />
          <div className="mt-2 flex justify-between">
            <Link to={"/login"} className="link">
              Вернуться ко входу
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
