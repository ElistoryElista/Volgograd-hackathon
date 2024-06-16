import { TPlace } from "@/shared/model/types";

type Coordinate =
  | TPlace
  | {
      latitude: number;
      longitude: number;
    };

function calculateDistance(point1: Coordinate, point2: Coordinate): number {
  const dx = point1.latitude - point2.latitude;
  const dy = point1.longitude - point2.longitude;
  return Math.sqrt(dx * dx + dy * dy);
}

function findNearestPoint(
  currentPoint: Coordinate,
  points: Coordinate[]
): Coordinate | null {
  let nearest: Coordinate | null = null;
  let minDistance = Infinity;

  for (const point of points) {
    const distance = calculateDistance(currentPoint, point);
    if (distance < minDistance) {
      nearest = point;
      minDistance = distance;
    }
  }

  return nearest;
}

export function sortByNearestPoint(
  coordinates: Coordinate[],
  startPoint: Coordinate
) {
  const sortedCoordinates = [];
  let currentPoint = startPoint;
  let remainingCoordinates = [...coordinates]; // Создаем копию исходного массива

  while (remainingCoordinates.length > 0) {
    const nearestPoint = findNearestPoint(currentPoint, remainingCoordinates);
    if (nearestPoint) {
      sortedCoordinates.push(nearestPoint);
      currentPoint = nearestPoint;
      // Создаем новый массив, исключая найденную ближайшую точку
      remainingCoordinates = remainingCoordinates.filter(
        (point) => point !== nearestPoint
      );
    } else {
      break;
    }
  }

  return sortedCoordinates;
}
