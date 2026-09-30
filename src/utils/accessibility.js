// Calculate approximate distance between two latitude/longitude points
function calculateDistance(point1, point2) {
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;

  const earthRadius = 6371000;

  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;

  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}


// Check whether a residential area has access
// to at least one green space within the selected distance
function checkAccessibility(residentialArea, greenSpaces, maxDistance) {
  let nearestDistance = Infinity;
  let nearestPark = null;

  greenSpaces.forEach((park) => {
    const distance = calculateDistance(
      residentialArea.position,
      park.position
    );

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestPark = park;
    }
  });

  return {
    accessible: nearestDistance <= maxDistance,
    nearestDistance,
    nearestPark,
  };
}


// Calculate overall accessibility percentage
function calculateAccessibility(
  residentialAreas,
  greenSpaces,
  maxDistance
) {
  let accessibleCount = 0;

  const results = residentialAreas.map((area) => {
    const result = checkAccessibility(
      area,
      greenSpaces,
      maxDistance
    );

    if (result.accessible) {
      accessibleCount++;
    }

    return {
      ...area,
      ...result,
    };
  });

  const totalAreas = residentialAreas.length;

  const percentage =
    totalAreas === 0
      ? 0
      : Math.round((accessibleCount / totalAreas) * 100);

  return {
    percentage,
    accessibleCount,
    totalAreas,
    results,
  };
}

export {
  calculateDistance,
  checkAccessibility,
  calculateAccessibility,
};