import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { createContext, useState } from "react";

interface IProps {
  children: React.ReactNode;
  center?: [number, number];
  zoom?: number;
}

function MapEvents({
  setZoom,
}: {
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}) {
  const map = useMapEvents({
    zoomend() {
      setZoom(map.getZoom());
    },
  });

  return null;
}

export const MapZoomContext = createContext(14);

const maskCoordinates: [number, number][] = [
  [50.52, 41.012],
  [48.12, 48.12],
];

export const MapLayers: React.FC<IProps> = ({ children, zoom, center }) => {
  const centerPosition: LatLngExpression = (center &&
    center[0] &&
    center[1] &&
    center) || [48.7194, 44.5018];
  const [currentZoom, setZoom] = useState(zoom || 12);
  const tileLink = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <MapContainer
      zoomControl={false}
      attributionControl={false}
      className="z-10 h-full w-full"
      center={centerPosition}
      zoom={currentZoom}
      // maxZoom={12}
      minZoom={10}
      maxBounds={maskCoordinates}
      scrollWheelZoom={true}
    >
      <MapEvents setZoom={setZoom} />
      {/* add bounds={maskCoordinates} */}
      <TileLayer url={tileLink} bounds={maskCoordinates} />

      <MapZoomContext.Provider value={currentZoom}>
        {children}
      </MapZoomContext.Provider>
    </MapContainer>
  );
};
