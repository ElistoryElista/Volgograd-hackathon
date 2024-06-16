import { TResImage } from "@/shared/model/types";

export function getIconUrl(
  placeType: { icon: TResImage } | undefined,
  placeIcon: TResImage,
  image_url?: null | string
): string {
  return (
    image_url ||
    placeIcon?.formats?.thumbnail?.url ||
    placeIcon?.url ||
    placeType?.icon?.formats?.thumbnail?.url ||
    placeType?.icon?.url ||
    "https://img.freepik.com/premium-vector/pin-point-icon-with-red-map-location-pointer-symbol-isolated-white-background_120819-234.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1710547200&semt=ais"
  );
}
