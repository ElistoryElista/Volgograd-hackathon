import { useRef, useState } from "react";

interface IProps {
  children: React.ReactNode;
  content: JSX.Element;
  className?: string;
}
export const Modal: React.FC<IProps> = ({
  children,
  content,
  className = "",
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [isShowModalContent, setIsShowModalContent] = useState(false);

  function showModal() {
    if (modalRef.current) {
      modalRef.current.showModal();
      setIsShowModalContent(true);
    }
  }
  return (
    <>
      <div className="cursor-pointer" onClick={showModal}>
        {children}
      </div>
      <dialog ref={modalRef} className="modal">
        {isShowModalContent && (
          <div className={`modal-box ${className}`}>
            <>
              {content}{" "}
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2">
                  ✕
                </button>
              </form>
            </>
          </div>
        )}

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
