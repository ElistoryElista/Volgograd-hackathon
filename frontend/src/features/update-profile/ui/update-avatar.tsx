import {
  selectAvatar,
  selectUserId,
  useUpdateAvatarMutation,
} from "@/entities/user";
import { useAppSelector } from "@/shared/hooks";
import { Loading } from "@/shared/ui";
import { useEffect, useRef, useState } from "react";

export const UpdateAvatar: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File>();
  const [uploadFile, { isLoading }] = useUpdateAvatarMutation();
  const userId = useAppSelector(selectUserId);
  const avatar = useAppSelector(selectAvatar);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedImage) {
      updateAvatar(selectedImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  const avatarUrl =
    avatar?.formats?.medium?.url ||
    avatar?.formats?.small?.url ||
    avatar?.formats?.thumbnail?.url ||
    "https://waterpolo.ru/images/no-foto-avatar.png";

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setSelectedImage(fileObj);
  };

  async function updateAvatar(image: File) {
    const formData = new FormData();
    formData.append("field", "avatar");
    formData.append("refId", String(userId));
    formData.append("ref", "plugin::users-permissions.user");
    formData.append("files", image);
    try {
      await uploadFile(formData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="avatar">
      <div className="h-50 w-40 rounded">
        {isLoading ? (
          <div className="flex h-full items-start justify-center ">
            <Loading size="lg" />
          </div>
        ) : (
          <img
            src={avatarUrl}
            className="cursor-pointer bg-base-200"
            onClick={handleClick}
          />
        )}
      </div>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
};
