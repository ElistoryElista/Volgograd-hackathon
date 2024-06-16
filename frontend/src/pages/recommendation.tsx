import { useNavigate } from "react-router-dom";
import { RoutesList } from "./constructor/ui/routes-list";

interface IProps {}
export const Recommendation: React.FC<IProps> = ({}) => {
  const navigate = useNavigate();

  return (
    <div className="screen flex items-start justify-center px-2 py-4">
      <div className="box w-full max-w-4xl bg-base-100">
        <RoutesList
          finishCallback={() => {
            navigate("/trip");
          }}
        />
      </div>
    </div>
  );
};
