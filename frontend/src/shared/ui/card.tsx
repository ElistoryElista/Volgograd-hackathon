import { Link } from "react-router-dom";

interface IProps {
  children?: React.ReactNode;
  FavoriteButton?: JSX.Element;
  TypeBadge?: JSX.Element;
  redirectLink: string;
  preview_image_url: string;
  className?: string;
}
export const Card: React.FC<IProps> = ({
  children,
  FavoriteButton,
  redirectLink,
  preview_image_url,
  TypeBadge,
  className = "",
}) => {
  return (
    <div
      className={`relative ${className} bg-base-200 rounded-xl overflow-hidden`}
    >
      <div className="absolute flex items-center justify-end w-full gap-2 pr-2 top-2 ">
        {TypeBadge && TypeBadge}
        {FavoriteButton}
      </div>

      <Link to={redirectLink}>
        <img
          className="w-full aspect-[2/1.2] object-cover overflow-hidden"
          src={preview_image_url}
          alt="preview_image"
        />
        <div className="px-4 py-2">{children}</div>
      </Link>
    </div>
  );
};
