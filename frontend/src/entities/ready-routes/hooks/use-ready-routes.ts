import { useAppSelector } from "@/shared";
import { useGetAllReadyRoutesQuery } from "../api/ready-routes-api";
import {
  selectHearingImpairedMode,
  selectRestrictedInMovementMode,
  selectVisuallyImpairedMode,
} from "@/entities/user";

export const useReadyRoutes = () => {
  const isVisuallyImpaired = useAppSelector(selectVisuallyImpairedMode);
  const isHearingImpaired = useAppSelector(selectHearingImpairedMode) || false;
  const isRestrictedInMovement =
    useAppSelector(selectRestrictedInMovementMode) || false;

  function getFilters(): string {
    let result = [];
    if (isVisuallyImpaired)
      result.push("filters[$or][0][isVisuallyImpaired][$eq]=true");
    if (isHearingImpaired)
      result.push("filters[$or][0][isHearingImpaired][$eq]=true");
    if (isRestrictedInMovement)
      result.push("filters[$or][0][isRestrictedInMovement][$eq]=true");

    return result.join("&");
  }

  const { readyRoutes } = useGetAllReadyRoutesQuery(
    {
      populate: "populate=*",
      filters: getFilters(),
    },
    {
      selectFromResult(res) {
        return { readyRoutes: res?.data?.data };
      },
    }
  );

  return { readyRoutes };
};
