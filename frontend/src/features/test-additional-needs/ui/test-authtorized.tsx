import {
  selectHearingImpairedMode,
  selectRestrictedInMovementMode,
  selectVisuallyImpairedMode,
} from "@/entities";
import { useAppSelector } from "@/shared";
import { useUpdateUserAdditional } from "../hooks/use-update-user-additional";

interface IProps {
  finishCallback: () => void;
}
export const TestAuthorized: React.FC<IProps> = ({ finishCallback }) => {
  const isVisuallyImpaired = useAppSelector(selectVisuallyImpairedMode);
  const isHearingImpaired = useAppSelector(selectHearingImpairedMode);
  const isRestrictedInMovement = useAppSelector(selectRestrictedInMovementMode);

  const {
    toggleIsVisuallyImpaired,
    toggleIsHearingImpaired,
    toggleIsRestrictedInMovement,
  } = useUpdateUserAdditional();

  function finish() {
    finishCallback();
  }

  return (
    <div>
      <h3 className="title">Выберете режим работы приложения</h3>
      <div className="my-4">
        <div className="form-control ">
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              checked={isVisuallyImpaired}
              className="checkbox"
              onChange={toggleIsVisuallyImpaired}
            />
            <span className="label-text">Голосовой гид слабовидящего</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              checked={isHearingImpaired}
              className="checkbox"
              onChange={toggleIsHearingImpaired}
            />
            <span className="label-text">Тактильный гид для слабослышащих</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              checked={isRestrictedInMovement}
              className="checkbox"
              onChange={toggleIsRestrictedInMovement}
            />
            <span className="label-text">Гид маломобильного гражданина</span>
          </label>
        </div>
      </div>
      <button className="btn-primary btn w-full" onClick={finish}>
        Применить настройки
      </button>
    </div>
  );
};
