import { FC } from "react";
import { Link } from "react-router-dom";

export const NoMatch: FC = () => {
  return (
    <div className="screen flex flex-col items-center justify-center ">
      <div className="box flex flex-col items-center gap-4">
        <h1 className="bg-gradient-to-l from-primary-content via-secondary to-primary bg-clip-text text-9xl font-bold text-transparent">
          404
        </h1>
        <p className="text-3xl font-medium text-neutral">Страница не найдена</p>
        <Link className="btn-primary-content btn px-16" to="/">
          На главную
        </Link>
      </div>
    </div>
  );
};
