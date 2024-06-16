export function roundDistanceToKm(meters: number) {
  const kilometers = meters / 1000;
  const roundedKm = Math.round(kilometers);

  if (roundedKm >= 1) {
    return `${roundedKm} км`;
  } else {
    return `${meters} м`;
  }
}
