import React from "react";

interface VideoBackgroundProps {
  videoSrc: string;
  disabled?: boolean;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  disabled = false,
}) => {
  return (
    <div className="screen fixed left-0 top-0 -z-10">
      {!disabled && (
        <video autoPlay loop muted className="screen z-10 object-cover">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};
