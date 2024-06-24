import { clearSessionData } from "@/entities/session";
import { selectDateBirth, selectPhone } from "@/entities/user";
import { DeleteModal } from "@/features/delete-my-account";
import {
  UpdateAvatar,
  UpdateEmail,
  UpdateUsername,
} from "@/features/update-profile";
import { UserSavedTrips } from "@/pages/constructor/ui/user-saved-trips";
import { Modal } from "@/shared";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { formatDate } from "@/shared/lib";
import { Link } from "react-router-dom";

export const ProfileDetails: React.FC = () => {
  const userPhone = useAppSelector(selectPhone);
  const dateBirth = useAppSelector(selectDateBirth);

  const dispatch = useAppDispatch();

  function logout() {
    dispatch(clearSessionData());
  }

  return (
    <div className="box w-full max-w-[42rem] space-y-2">
      <div className="flex flex-col gap-4 md:flex-row">
        <UpdateAvatar />
        <div className="flex flex-grow flex-col gap-2">
          <UpdateUsername />
          <UpdateEmail />
          <p className=" ">
            Телефон: <span className="fb text-black">{userPhone}</span>
          </p>
          <p className=" ">
            Дата рождения:{" "}
            <span className="fb text-black">{formatDate(dateBirth)}</span>
          </p>
          <Modal
            content={
              <>
                <h2 className="title">Мои маршруты</h2>
                <UserSavedTrips />
              </>
            }
          >
            <button className=" btn-sm btn w-full ">Мои маршруты</button>
          </Modal>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Link to={"/policy"} className="link">
          Политика конфиденциальности
        </Link>
        <Link to={"/use-conditions"} className="link">
          Условия использования
        </Link>
      </div>

      <p>
        Здесь вы будете получать уведомления об изменениях в политике
        конфиденциальности, технических работах и изменениях работы сервиса{" "}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <Modal
          content={
            <>
              <h3 className="title">
                Вы действительно хотите выйти из аккаунта?
                <form
                  method="dialog"
                  className="modal-backdrop mt-4 flex justify-between"
                >
                  <button className="btn">Отмена</button>
                  <button className="btn-error btn" onClick={logout}>
                    Выйти
                  </button>
                </form>
              </h3>
            </>
          }
        >
          <button className="btn-error btn">Выйти</button>
        </Modal>
        <DeleteModal>
          <button className="btn">Удалить аккаунт</button>
        </DeleteModal>
      </div>
    </div>
  );
};
