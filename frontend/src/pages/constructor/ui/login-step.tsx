import { Link } from "react-router-dom";

interface IProps {
  nextUnAuthCallback: () => void;
}
export const LoginStep: React.FC<IProps> = ({ nextUnAuthCallback }) => {
  return (
    <>
      <h3 className="title hidden md:block">Рекомендуем авторизоваться</h3>
      <div role="alert" className="alert  my-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="hidden h-6 w-6 shrink-0 stroke-current md:block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>
          Важно! Нашим приложением можно пользоваться и без учетной записи, но
          тогда вы не сможете использовать некоторые функции
        </span>
      </div>

      <div className="md:hidden">
        <div className="box !bg-success ">
          <h5 className="title !text-md ">
            Дополнительно для авторизированных:
          </h5>
          <ul className="mt-2 flex list-disc flex-col gap-2">
            <li className="ml-5">
              Корректировать маршрут за счет добавления и удаления мест для
              посещения
            </li>
            <li className="ml-5">Продолжить маршрут на другом девайсе</li>
          </ul>
          <Link to={"/login"} className="btn mt-2 w-full">
            Авторизоваться
          </Link>
        </div>
        <button className="btn mt-2 w-full" onClick={nextUnAuthCallback}>
          Продолжить без авторизации
        </button>
      </div>

      <div className="hidden gap-2 md:flex">
        <div className="box w-full !bg-success p-4 md:w-1/2 ">
          <h5 className="title !text-md">Для авторизированных:</h5>
          <ul className="mt-2 flex list-disc flex-col gap-2">
            <li className="ml-5">
              Построить маршрут с учётом дополнительных потребностей
            </li>
            <li className="ml-5">
              Выбирать рекомендованный маршрут для посещения
            </li>
            <li className="ml-5">
              Отмечать места через которые нельзя пройти (учитывается при
              построении маршрута)
            </li>
            <li className="ml-5">
              Оставлять отзывы и приложения по работе приложения{" "}
            </li>
            <li className="ml-5">
              Добавить точку старта маршрута (учитывается при перестройки
              маршрута)
            </li>
            <li className="ml-5">
              Увидеть свое местоположение на карте (для пользователей мобильного
              приложения)
            </li>
            <li className="ml-5">
              Корректировать маршрут за счет добавления и удаления мест для
              посещения
            </li>
            <li className="ml-5">Продолжить маршрут на другом девайсе</li>
          </ul>
          <Link to={"/login"} className="btn mt-2 w-full">
            Авторизоваться
          </Link>
        </div>
        <div className="box hidden w-full p-4 md:block md:w-1/2">
          <h5 className="title !text-md">Для не авторизированных:</h5>
          <ul className="mt-2 flex list-disc flex-col gap-2">
            <li className="ml-5">
              Построить маршрут с учётом дополнительных потребностей
            </li>
            <li className="ml-5">
              Выбирать рекомендованный маршрут для посещения
            </li>
            <li className="ml-5">
              Отмечать места через которые нельзя пройти (учитывается при
              построении маршрута)
            </li>
            <li className="ml-5">
              Оставлять отзывы и приложения по работе приложения{" "}
            </li>
            <li className="ml-5">
              Добавить точку старта маршрута (учитывается при перестройки
              маршрута)
            </li>
            <li className="ml-5">
              Увидеть свое местоположение на карте (для пользователей мобильного
              приложения)
            </li>
            <li className="ml-5 text-error line-through">
              Корректировать маршрут за счет добавления и удаления мест для
              посещения
            </li>
            <li className="ml-5 text-error line-through">
              Продолжить маршрут на другом девайсе
            </li>
          </ul>
          <button className="btn mt-2 w-full" onClick={nextUnAuthCallback}>
            Продолжить без авторизации
          </button>
        </div>
      </div>
    </>
  );
};
