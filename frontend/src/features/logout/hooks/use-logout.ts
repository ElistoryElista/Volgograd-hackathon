import { clearSessionData } from "@/entities";
import { useAppDispatch } from "@/shared";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  function logout() {
    dispatch(clearSessionData());
  }

  return { logout };
};
