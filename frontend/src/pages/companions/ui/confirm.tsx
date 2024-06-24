import { useToggleCompanions } from "@/features";

interface IProps {}
export const Confirm: React.FC<IProps> = ({}) => {
  const { toggleIsShowCompanions } = useToggleCompanions();
  return (
    <>
      <div role="alert" className="alert alert-info my-2 ">
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
        <span>
          Здесь вы можете найти себе идеального спутника для вашего путешествия.
          Чтобы система показала пользователей с похожими маршрутами, вам
          потребуется предоставить согласие на обмен контактными данными с
          другими участниками.
        </span>
      </div>
      <button
        className="btn-primary btn w-full"
        onClick={toggleIsShowCompanions}
      >
        Дать согласие
      </button>
    </>
  );
};
