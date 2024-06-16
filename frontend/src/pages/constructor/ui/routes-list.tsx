import { useReadyRoutes } from "@/entities";
import { TReadyRoute } from "@/shared/model/types";
import { RoutesListItem } from "./routes-list-item";

interface IProps {
  finishCallback: () => void;
}
export const RoutesList: React.FC<IProps> = ({ finishCallback }) => {
  const { readyRoutes } = useReadyRoutes();

  return (
    <div className="flex flex-col gap-2 ">
      {readyRoutes?.map((route: TReadyRoute) => (
        <RoutesListItem
          key={route.id}
          route={route}
          finishCallback={finishCallback}
        />
      ))}
    </div>
  );
};
