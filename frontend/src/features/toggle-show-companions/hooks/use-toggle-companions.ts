import {
  selectIsShowCompanions,
  selectUserId,
  useUpdateIsShowCompanionsMutation,
} from "@/entities";
import { useAppSelector } from "@/shared";

export const useToggleCompanions = () => {
  const isCompanions = useAppSelector(selectIsShowCompanions);
  const userId = useAppSelector(selectUserId);
  const [updateIsShowCompanionsMutation] = useUpdateIsShowCompanionsMutation();

  function toggleIsShowCompanions() {
    updateIsShowCompanionsMutation({ id: userId, newState: !isCompanions });
  }

  return { toggleIsShowCompanions };
};
