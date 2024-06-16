import { Modal } from "@/shared";
import { SupportTicketForm } from "./support-ticket-form";
import { useState } from "react";

interface IProps {
  children: React.ReactNode;
  title?: string;
}
export const CreateSupportTicketModal: React.FC<IProps> = ({
  children,
  title = "Форма обратной связи",
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>();
  return (
    <Modal
      content={
        isSuccess ? (
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Ваша заявка успешно создана! В скором времени мы Вам ответим.
            </span>
          </div>
        ) : (
          <>
            <h3 className="title">{title}</h3>
            <SupportTicketForm setIsSuccess={setIsSuccess} />
          </>
        )
      }
    >
      {children}
    </Modal>
  );
};
