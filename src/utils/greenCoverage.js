import { area } from "@turf/turf";

function calculateGreenCoverage(greenSpaces, studyAreaGeoJSON) {
  if (!studyAreaGeoJSON) {
    return 0;
  }

  // Calculate the actual Chennai municipal boundary area
  const studyAreaSquareMeters = area(studyAreaGeoJSON);

  // Convert m² to hectares
  const studyAreaHectares = studyAreaSquareMeters / 10000;

  const totalGreenArea = greenSpaces.reduce(
    (total, space) => total + space.area,
    0
  );

  if (studyAreaHectares <= 0) {
    return 0;
  }

  const coverage =
    (totalGreenArea / studyAreaHectares) * 100;

  return Number(coverage.toFixed(1));
}

export default calculateGreenCoverage;