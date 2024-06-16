import L, { divIcon } from "leaflet";
import { useContext } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { MapZoomContext } from "./map-layers";
import { useWindowDimensions } from "@/shared/hooks";

type LatLng = {
  lat: number;
  lng: number;
};

interface CustomIconProps {
  position: LatLng;
  color?: string;
  iconUrl?: string;
  popup: JSX.Element;
  indicator?: string | number;
  zoomContent?: string | number;
  zIndex?: number;
}

export const CustomMarker: React.FC<CustomIconProps> = ({
  position,
  color,
  iconUrl,
  popup,
  indicator,
  zIndex,
  zoomContent,
}) => {
  const zoom = useContext(MapZoomContext);
  const { width: windowWith } = useWindowDimensions();
  const isDesktop = windowWith >= 1024;

  if (!iconUrl)
    iconUrl =
      "https://img.freepik.com/premium-vector/pin-point-icon-with-red-map-location-pointer-symbol-isolated-white-background_120819-234.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1710547200&semt=ais";

  const customIcon = divIcon({
    iconAnchor: new L.Point(20, 38),
    iconSize: new L.Point(40, 40),
    className: "border-none",
    html: `<div class="relative w-full h-full rounded-[17px] p-[5px] group border-2 bg-opacity-20" style="background-color:white; border-color:${color}">
    
    <div class="w-full h-full overflow-hidden flex justify-center items-center rounded-[10px]">
      <img src='${iconUrl}' class="object-cover w-full h-full " />
    </div>

     <div class="-z-10 left-1/2 -translate-x-1/2 rotate-45 absolute w-[20px] h-[20px] -bottom-2 " style="background-color:${color};"></div>
    ${
      indicator
        ? `<div class="flex justify-center items-center absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-base-100">
          ${indicator}
        </div>`
        : ""
    }

     <p style="background-color:white;" class="absolute left-1/2 translate-x-[-50%] -bottom-10 rounded-full px-2 text-nowrap max-w-[230px] truncate ${
       zoom >= 16 && zoomContent ? "block" : `hidden`
     } ${zoomContent ? "group-hover:block" : ""}">
        ${zoomContent}
      </p>
  </div>`,
  });

  const panPaddingTop = isDesktop ? 150 : 50;

  return (
    <Marker zIndexOffset={zIndex} position={position} icon={customIcon}>
      <Popup autoPanPadding={[0, panPaddingTop]}>{popup}</Popup>
      {zoomContent && (
        <Tooltip direction="bottom" offset={[0, 15]} opacity={100}>
          {zoomContent}
        </Tooltip>
      )}
    </Marker>
  );
};
