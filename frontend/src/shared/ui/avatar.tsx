import { UserIcon } from "../assets";
import { TResImage } from "../model/types";

interface IProps {
  image: TResImage | null;
}
export const Avatar: React.FC<IProps> = ({ image }) => {
  if (image) {
    const avatarUrl =
      image.formats?.small?.url || image.formats?.thumbnail?.url || image.url;

    return (
      <div className="avatar">
        <div className="mask mask-circle w-12">
          <img src={avatarUrl} />
        </div>
      </div>
    );
  }

  return (
    <div className="avatar">
      <div className="mask mask-circle w-14">
        <UserIcon className="w-full" />
      </div>
    </div>
  );
};
