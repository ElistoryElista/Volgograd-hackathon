import { useToggleCompanions } from "@/features";

interface IProps {}
export const Deny: React.FC<IProps> = ({}) => {
  const { toggleIsShowCompanions } = useToggleCompanions();

  return (
    <div>
      <button className="btn w-full" onClick={toggleIsShowCompanions}>
        Не показывать меня в списке
      </button>
      <span className="divider"></span>
    </div>
  );
};
