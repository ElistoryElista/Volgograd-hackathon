import { LatLngExpression } from "leaflet";
import polyline from "polyline";
import { useMemo } from "react";
import { Polyline } from "react-leaflet";

interface IProps {
  geometry: string;
}

export const Route: React.FC<IProps> = ({ geometry }) => {
  const decodedPolyline: LatLngExpression[][] = useMemo(() => {
    const decodedGeometry = polyline.decode(
      geometry,
      6
    ) as unknown as LatLngExpression[][];
    return decodedGeometry;
  }, [geometry]);

  return <Polyline weight={8} positions={decodedPolyline} color="#0f53ff" />;
};
