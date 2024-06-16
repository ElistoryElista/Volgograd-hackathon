import { ProfileDetails } from "@/entities";
import { selectIsAuthorized } from "@/entities/session";
import { useAppSelector } from "@/shared/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Profile: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuthorized);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth]);

  if (!isAuth) return null;
  else
    return (
      <div className="screen flex items-center justify-center px-4">
        <ProfileDetails />        
      </div>
    );
};
