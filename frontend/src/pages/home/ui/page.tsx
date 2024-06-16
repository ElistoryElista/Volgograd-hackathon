import { FeedbackModal } from "@/features";
import { CreateSupportTicketModal } from "@/features/create-support-ticket";
import { QuestionIcon, StarIcon } from "@/shared";
import { FC } from "react";
import { Link } from "react-router-dom";

const Home: FC = () => {
  return (
    <>
      <section className="screen flex items-center justify-center px-4">
        <div className="box max-w-3xl space-y-2">
          <h3 className="title">Добро пожаловать!</h3>
          <p>
            Мы рады приветствовать вас в нашем туристическом портале, где забота
            о комфорте и безопасности путешественников является приоритетом.
          </p>
          <p>
            Наш проект нацелен на то, чтобы сделать перемещение по городу
            Волгоград максимально удобным для всех, включая людей с
            дополнительными потребностями.
          </p>
          <Link className="btn-primary btn w-full" to={"/trip"}>
            Начать свое путешествие
          </Link>

          <CreateSupportTicketModal>
            <button className="link-hover link flex items-center gap-2">
              <QuestionIcon className="w-4" /> Служба поддержки
            </button>
          </CreateSupportTicketModal>
          <FeedbackModal title="Оценка и предложения">
            <button className="link-hover link flex items-center gap-2">
              <StarIcon className="w-4" /> Оценка и предложения
            </button>
          </FeedbackModal>
        </div>
      </section>
    </>
  );
};

export default Home;
