import React from "react";

interface ImageUploadProps {
  setImages: (formData: FormData | null) => void;
}

export const UploadImageInput: React.FC<ImageUploadProps> = ({ setImages }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (!file) {
        setImages(null);
        return;
      }

      const formData = new FormData();
      formData.append("files", file);
      setImages(formData);
    } else {
      setImages(null);
      return;
    }
  };

  return (
    <div>
      <input
        type="file"
        className="file-input-bordered file-input-primary file-input w-full max-w-xs"
        onChange={handleFileChange}
      />
    </div>
  );
};
