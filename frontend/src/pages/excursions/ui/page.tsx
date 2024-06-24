import { ExcursionsList } from "./excursions-list";

interface IProps {}
export const Page: React.FC<IProps> = ({}) => {
  return (
    <div className="-mb-2 flex h-[calc(100vh-136px)] items-start justify-center overflow-y-auto px-2 lg:h-auto lg:pb-4">
      <div className="box mt-5 flex w-full max-w-4xl flex-col gap-2 bg-base-100 lg:mt-2">
        <h2 className="title">Экскурсии</h2>
        <span className="divider"></span>
        <ExcursionsList />
      </div>
    </div>
  );
};
