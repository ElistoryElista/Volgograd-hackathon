import { useNavigate } from "react-router-dom";
import { RoutesList } from "./constructor/ui/routes-list";
import {
  AdditionalNeedsAuthCheckboxes,
  AdditionalNeedsUnauthCheckboxes,
} from "@/features/test-additional-needs";
import { selectIsAuthorized } from "@/entities";
import { useAppSelector } from "@/shared";

interface IProps {}
export const Recommendation: React.FC<IProps> = ({}) => {
  const isAuth = useAppSelector(selectIsAuthorized);
  const navigate = useNavigate();

  return (
    <div className="-mb-2 flex h-[calc(100vh-136px)] items-start justify-center overflow-y-auto px-2 lg:h-auto lg:pb-4">
      <div className="box mt-5 w-full max-w-4xl bg-base-100 lg:mt-2">
        <h2 className="title">Рекомендуемые маршруты</h2>
        <div className="flex items-center">
          Фильтры:{" "}
          {isAuth ? (
            <AdditionalNeedsAuthCheckboxes isOneLine />
          ) : (
            <AdditionalNeedsUnauthCheckboxes isOneLine />
          )}
        </div>
        <span className="divider"></span>
        <RoutesList
          finishCallback={() => {
            navigate("/trip");
          }}
        />
      </div>
    </div>
  );
};
