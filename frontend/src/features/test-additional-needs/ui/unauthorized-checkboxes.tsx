import {
  changeVisuallyImpairedMode,
  selectVisuallyImpairedMode,
} from "@/entities";
import {
  EarIcon,
  EyeIcon,
  WheelCharIcon,
  useAppDispatch,
  useAppSelector,
} from "@/shared";
import { useState } from "react";

interface IProps {
  isOneLine?: boolean;
}
export const UnauthorizedCheckboxes: React.FC<IProps> = ({
  isOneLine = false,
}) => {
  const [isHearingImpaired, setIsHearingImpaired] = useState<boolean>(
    Boolean(JSON.stringify(localStorage.getItem("isHearingImpaired")))
  );
  const [isRestrictedInMovement, setIsRestrictedInMovement] = useState<boolean>(
    Boolean(JSON.stringify(localStorage.getItem("isRestrictedInMovement")))
  );
  const isVisuallyImpaired = useAppSelector(selectVisuallyImpairedMode);
  const dispatch = useAppDispatch();

  return (
    <div className={`${isOneLine ? "flex gap-2" : ""}`}>
      <div className="form-control ">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            checked={isVisuallyImpaired}
            className="checkbox"
            onChange={() => dispatch(changeVisuallyImpairedMode())}
          />
          <span className="label-text">
            {isOneLine ? (
              <EyeIcon className="w-6" />
            ) : (
              "Голосовой гид слабовидящего"
            )}
          </span>
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
          <span className="label-text">
            {isOneLine ? (
              <EarIcon className="w-6" />
            ) : (
              "Тактильный гид для слабослышащих"
            )}
          </span>
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
          <span className="label-text">
            {isOneLine ? (
              <WheelCharIcon className="w-6" />
            ) : (
              "Гид маломобильного гражданина"
            )}
          </span>
        </label>
      </div>
    </div>
  );
};
