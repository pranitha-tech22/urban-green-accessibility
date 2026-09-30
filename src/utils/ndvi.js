function calculateAverageNDVI(greenSpaces) {
  if (greenSpaces.length === 0) {
    return 0;
  }

  const totalNDVI = greenSpaces.reduce(
    (sum, space) => sum + space.ndvi,
    0
  );

  return Number(
    (totalNDVI / greenSpaces.length).toFixed(2)
  );
}

function getNDVIStatus(ndvi) {
  if (ndvi >= 0.7) {
    return "High vegetation";
  }

  if (ndvi >= 0.5) {
    return "Moderate vegetation";
  }

  return "Low vegetation";
}

export {
  calculateAverageNDVI,
  getNDVIStatus,
};