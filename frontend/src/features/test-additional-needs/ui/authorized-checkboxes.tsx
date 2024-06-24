import {
  selectHearingImpairedMode,
  selectRestrictedInMovementMode,
  selectVisuallyImpairedMode,
} from "@/entities";
import { EarIcon, EyeIcon, WheelCharIcon, useAppSelector } from "@/shared";
import { useUpdateUserAdditional } from "../hooks/use-update-user-additional";

interface IProps {
  isOneLine?: boolean;
}
export const AuthorizedCheckboxes: React.FC<IProps> = ({
  isOneLine = false,
}) => {
  const isVisuallyImpaired = useAppSelector(selectVisuallyImpairedMode);
  const isHearingImpaired = useAppSelector(selectHearingImpairedMode);
  const isRestrictedInMovement = useAppSelector(selectRestrictedInMovementMode);

  const {
    toggleIsVisuallyImpaired,
    toggleIsHearingImpaired,
    toggleIsRestrictedInMovement,
  } = useUpdateUserAdditional();

  return (
    <div className={`${isOneLine ? "flex gap-2" : ""}`}>
      <div className="form-control ">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            checked={isVisuallyImpaired}
            className="checkbox"
            onChange={toggleIsVisuallyImpaired}
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
            onChange={toggleIsHearingImpaired}
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
            onChange={toggleIsRestrictedInMovement}
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
