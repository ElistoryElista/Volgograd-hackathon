import { clearSessionData } from "@/entities/session";
import { selectUserId, useDeleteMyAccountMutation } from "@/entities/user";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { Loading } from "@/shared/ui";

interface IProps {
  children?: React.ReactNode;
  className?: string;
}
export const DeleteButton: React.FC<IProps> = ({
  children = "Удалить аккаунт",
  className = "",
}) => {
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();
  const [deleteAccountQuery, { isLoading }] = useDeleteMyAccountMutation();

  async function clickHandler() {
    if (userId)
      try {
        await deleteAccountQuery({ id: userId });
        dispatch(clearSessionData());
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <button
      className={"btn " + className}
      disabled={isLoading}
      onClick={clickHandler}
    >
      {isLoading ? <Loading size="sm" /> : children}
    </button>
  );
};
