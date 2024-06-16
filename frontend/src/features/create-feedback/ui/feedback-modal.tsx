import { Modal } from "@/shared";
import { FeedbackForm } from "./feedback-form";
import { useState } from "react";

interface IProps {
  children: React.ReactNode;
  title?: string;
  info?: string;
}
export const FeedbackModal: React.FC<IProps> = ({
  children,
  title = "Оценка и ваши предложения по улучшению приложения",
  info = "Мы хотим сделать наш сервис еще лучше. Здесь вы можете оценить наше приложение, а так же предложить свои улучшения.",
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
              Ваша заявка успешно принята. Спасибо за вклад в развитие нашего
              приложения!.
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h3 className="title">{title}</h3>
            <div role="alert" className="alert alert-info my-2 hidden md:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{info}</span>
            </div>
            <FeedbackForm setIsSuccess={setIsSuccess} />
          </div>
        )
      }
    >
      {children}
    </Modal>
  );
};
