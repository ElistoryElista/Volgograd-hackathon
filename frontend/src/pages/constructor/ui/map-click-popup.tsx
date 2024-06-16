import { changeStartPosition } from "@/entities";
import { IncidentModal } from "@/features";
import { useAppDispatch } from "@/shared";
import { LatLng } from "leaflet";
import { useState } from "react";
import { Popup, useMapEvents } from "react-leaflet";

interface IProps {}
export const MapClickPopup: React.FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const [position, setPosition] = useState<LatLng | null>(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Popup position={position}>
      <div className="flex flex-col gap-2">
        <button
          className="btn-sm btn w-full"
          onClick={() =>
            dispatch(
              changeStartPosition({ lat: position.lat, lon: position.lng })
            )
          }
        >
          Я начинаю отсюда
        </button>
        <IncidentModal position={position}>
          <button className=" btn-sm btn w-full">
            Сообщить о происшествии
          </button>
        </IncidentModal>
      </div>
    </Popup>
  );
};
