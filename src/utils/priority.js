function calculatePriorityScore(areaResult) {
  const populationScore = Math.min(
    (areaResult.population / 5000) * 50,
    50
  );

  const distanceScore = Math.min(
    (areaResult.nearestDistance / 1000) * 50,
    50
  );

  const score = Math.round(
    populationScore + distanceScore
  );

  return Math.min(score, 100);
}

function getPriorityLevel(score) {
  if (score >= 70) {
    return "High";
  }

  if (score >= 40) {
    return "Medium";
  }

  return "Low";
}

export {
  calculatePriorityScore,
  getPriorityLevel,
};