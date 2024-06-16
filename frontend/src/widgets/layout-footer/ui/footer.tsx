import { FeedbackModal } from "@/features";
import { CreateSupportTicketModal } from "@/features/create-support-ticket";
import { Container, QuestionIcon, StarIcon, WarningIcon } from "@/shared";
import { EmergencyCallModal } from "@/widgets/emergency-call";
import { Link } from "react-router-dom";

interface IProps {}
export const Footer: React.FC<IProps> = ({}) => {
  return (
    <div className="left-0 z-50 hidden w-full bg-neutral p-4 text-neutral-content lg:block">
      <Container>
        <footer className="footer  ">
          <nav>
            <h6 className="footer-title">Пользователям</h6>
            <Link to={"/policy"} className="link-hover link">
              Политика конфиденциальности
            </Link>
            <Link to={"/use-conditions"} className="link-hover link">
              Условия использования
            </Link>
          </nav>
          <nav>
            <h6 className="footer-title">Обратная связь</h6>
            <CreateSupportTicketModal>
              <button className="link-hover link flex gap-2">
                <QuestionIcon className="w-4" /> Служба поддержки
              </button>
            </CreateSupportTicketModal>
            <FeedbackModal>
              <button className="link-hover link flex gap-2">
                <StarIcon className="w-4" /> Оценка и предложения
              </button>
            </FeedbackModal>
          </nav>
          <nav>
            <h6 className="footer-title">Быстрый вызов</h6>
            <EmergencyCallModal>
              <button className="link-hover link flex items-center gap-2">
                <WarningIcon className="w-4 text-error" /> Службы экстренного
                вызова
              </button>
            </EmergencyCallModal>
          </nav>
        </footer>
      </Container>
    </div>
  );
};
