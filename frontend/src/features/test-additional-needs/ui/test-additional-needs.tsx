import { selectIsAuthorized } from "@/entities";
import { useAppSelector } from "@/shared";
import { AuthorizedCheckboxes } from "./authorized-checkboxes";
import { AdditionalNeedsUnauthCheckboxes } from "..";

interface IProps {
  finishCallback: () => void;
}
export const TestAdditionalNeeds: React.FC<IProps> = ({ finishCallback }) => {
  const isAuth = useAppSelector(selectIsAuthorized);

  function finish() {
    finishCallback();
  }

  return (
    <div>
      <h3 className="title">Выберете режим работы приложения</h3>
      <div className="my-4">{
        isAuth?<AuthorizedCheckboxes/>:<AdditionalNeedsUnauthCheckboxes/>
        }</div>
      <button className="btn-primary btn w-full" onClick={finish}>
        Применить настройки
      </button>
    </div>
  );
};
