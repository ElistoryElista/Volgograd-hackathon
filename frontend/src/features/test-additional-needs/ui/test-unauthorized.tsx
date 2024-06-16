import {
  changeVisuallyImpairedMode,
  selectVisuallyImpairedMode,
} from "@/entities";
import { useAppDispatch, useAppSelector } from "@/shared";
import { useState } from "react";

interface IProps {
  finishCallback: () => void;
}
export const TestUnauthorized: React.FC<IProps> = ({ finishCallback }) => {
  const [isHearingImpaired, setIsHearingImpaired] = useState<boolean>(
    Boolean(JSON.stringify(localStorage.getItem("isHearingImpaired")))
  );
  const [isRestrictedInMovement, setIsRestrictedInMovement] = useState<boolean>(
    Boolean(JSON.stringify(localStorage.getItem("isRestrictedInMovement")))
  );
  const isVisuallyImpaired = useAppSelector(selectVisuallyImpairedMode);
  const dispatch = useAppDispatch();

  function finish() {
    localStorage.setItem("isHearingImpaired", String(isHearingImpaired));
    localStorage.setItem(
      "isRestrictedInMovement",
      String(isRestrictedInMovement)
    );
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
              onChange={() => dispatch(changeVisuallyImpairedMode())}
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
              onChange={() => setIsHearingImpaired((prev) => !prev)}
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
              onChange={() => setIsRestrictedInMovement((prev) => !prev)}
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
