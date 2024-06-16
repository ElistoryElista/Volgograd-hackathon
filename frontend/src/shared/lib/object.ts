/* eslint-disable @typescript-eslint/no-explicit-any */

export function findMinByField(arr: any[], field: string) {
  if (arr.length === 0) {
    return null;
  }
  return arr.reduce(
    (minValue, obj) => (obj[field] < minValue ? obj[field] : minValue),
    arr[0][field]
  );
}

