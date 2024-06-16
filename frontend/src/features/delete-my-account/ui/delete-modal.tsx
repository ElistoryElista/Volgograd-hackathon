import { Modal } from "@/shared/ui";
import { DeleteButton } from "./delete-button";

interface IProps {
  children: React.ReactNode;
}

const DeleteModalContent: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="title">Вы уверены что хотите удалить свой аккаунт?</h3>
      <p>
        Данные удаленного аккаунт{" "}
        <span className="text-error">нельзя будет восстановить</span>.
      </p>
      <div className="flex flex-col gap-3 justify-between md:flex-row">
        <DeleteButton>Удалить окончательно</DeleteButton>
        <form method="dialog">
          <button className="btn w-full md:w-auto">Отменить</button>
        </form>
      </div>
    </div>
  );
};

export const DeleteModal: React.FC<IProps> = ({ children }) => {
  return <Modal content={<DeleteModalContent />}>{children}</Modal>;
};
