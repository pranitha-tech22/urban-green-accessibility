import parkGeoJSON from "./Chennai_Neighbourhood_Parks.json";

const greenSpaces = parkGeoJSON.features
  .filter(
    (feature) =>
      feature.geometry &&
      feature.geometry.type === "Point" &&
      Array.isArray(feature.geometry.coordinates)
  )
  .map((feature, index) => {
    const [longitude, latitude] = feature.geometry.coordinates;

    return {
      id: index + 1,
      name: feature.properties?.name || `Park ${index + 1}`,
      position: [latitude, longitude],
    };
  });

const cityData = {
  greenSpaces,

  // Residential data will be replaced with real geographic data next.
  residentialAreas: [],
};

export default cityData;