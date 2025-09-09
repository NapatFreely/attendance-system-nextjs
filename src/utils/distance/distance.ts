export function calculateDistanceInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3 // Earth's radius in meters
  const phi1 = (lat1 * Math.PI) / 180 // φ1 in radians
  const phi2 = (lat2 * Math.PI) / 180 // φ2 in radians
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180 // Δφ in radians
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180 // Δλ in radians

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = R * c // in meters
  return distance
}
