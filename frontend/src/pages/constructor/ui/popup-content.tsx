import { TPlace } from "@/shared/model/types";
// import { useWindowDimensions } from "@/shared/hooks";
import { Modal, TextToSpeech } from "@/shared";

export const PopupContent: React.FC<{ place: TPlace }> = ({ place }) => {
  // const { width: windowWith } = useWindowDimensions();
  // const isDesktop = windowWith >= 1024;
  const iconUrl = place?.icon?.formats?.small?.url || place?.image_url;
  return (
    <div className="flex flex-col gap-2">
      <h3 className="title">{place.short_title || place.title}</h3>
      {iconUrl && <img src={iconUrl} className=" w-full" />}
      {place.description && (
        <>
          <div className="flex items-center gap-2">
            Аудио описание: <TextToSpeech text={place.description} />
          </div>
          <Modal content={<pre>{place.description}</pre>}>
            <button className="btn-sm btn w-full">В тексте</button>
          </Modal>
        </>
      )}

      <div className="mt-4 flex flex-col gap-2"></div>
    </div>
  );
};
