import { useRef } from "react";
import { useLogout } from "../hooks/use-logout";

export const LogoutButton = () => {
  const { logout } = useLogout();
  const modalRef = useRef<HTMLDialogElement>(null);

  function openModal() {
    if (modalRef.current) modalRef.current.showModal();
  }

  return (
    <>
      <button
        onClick={openModal}
        className="w-full bg-sidebar-bg-200 p-4 pl-8 text-start"
      >
        выйти
      </button>

      <dialog id="my_modal_3" className="modal text-black" ref={modalRef}>
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold">Выход из учетной записи</h3>
          <p className="py-4">Вы уверены что хотите выйти?</p>
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
            <div className="flex justify-end gap-4">
              <button className="btn btn-primary" type="submit">
                Отмена
              </button>
              <button onClick={logout} className="btn btn-error" type="submit">
                Выйти
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};
