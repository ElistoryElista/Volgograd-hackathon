import {
  selectHearingImpairedMode,
  selectRestrictedInMovementMode,
  selectUserId,
  selectVisuallyImpairedMode,
  useUpdateIsHearingImpairedMutation,
  useUpdateIsRestrictedInMovementMutation,
  useUpdateIsVisuallyImpairedMutation,
} from "@/entities";
import { useAppSelector } from "@/shared";

export const useUpdateUserAdditional = () => {
  const userId = useAppSelector(selectUserId);

  const isVisuallyImpaired = useAppSelector(selectVisuallyImpairedMode);
  const isHearingImpaired = useAppSelector(selectHearingImpairedMode);
  const isRestrictedInMovement = useAppSelector(selectRestrictedInMovementMode);

  const [updateIsHearingImpairedMutation] =
    useUpdateIsHearingImpairedMutation();
  const [updateIsRestrictedInMovementMutation] =
    useUpdateIsRestrictedInMovementMutation();
  const [updateIsVisuallyImpairedMutation] =
    useUpdateIsVisuallyImpairedMutation();

  async function toggleIsVisuallyImpaired() {
    await updateIsVisuallyImpairedMutation({
      id: userId,
      newState: !isVisuallyImpaired,
    });
  }

  async function toggleIsHearingImpaired() {
    await updateIsHearingImpairedMutation({
      id: userId,
      newState: !isHearingImpaired,
    });
  }

  async function toggleIsRestrictedInMovement() {
    await updateIsRestrictedInMovementMutation({
      id: userId,
      newState: !isRestrictedInMovement,
    });
  }

  return {
    toggleIsVisuallyImpaired,
    toggleIsHearingImpaired,
    toggleIsRestrictedInMovement,
  };
};
