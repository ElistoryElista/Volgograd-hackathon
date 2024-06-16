import {
  changeVisuallyImpairedMode,
  selectIsAuthorized,
  selectVisuallyImpairedMode,
} from "@/entities";
import { useUpdateUserAdditional } from "@/features/test-additional-needs/hooks/use-update-user-additional";
import { EyeIcon, useAppDispatch, useAppSelector } from "@/shared";

interface IProps {}
export const ModeToggler: React.FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const isVisuallyImpaired = useAppSelector(selectVisuallyImpairedMode);
  const isAuth = useAppSelector(selectIsAuthorized);
  const { toggleIsVisuallyImpaired } = useUpdateUserAdditional();

  function toggleMode() {
    if (isAuth) toggleIsVisuallyImpaired();
    else dispatch(changeVisuallyImpairedMode());
  }

  return (
    <div
      className=" tooltip  tooltip-bottom inline-flex items-center gap-2 self-center rounded-xl bg-base-300 p-2"
      data-tip="Версия для слабовидящих"
    >
      <EyeIcon className="w-6" />
      <input
        type="checkbox"
        className="toggle"
        checked={isVisuallyImpaired}
        onChange={toggleMode}
      />
    </div>
  );
};
