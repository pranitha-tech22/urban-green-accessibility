const fs = require("fs");
const { XMLParser } = require("fast-xml-parser");

const kmlPath = "./src/data/Chennai_Neighbourhood_Parks.kml";
const outputPath = "./src/data/Chennai_Neighbourhood_Parks.geojson";

const kml = fs.readFileSync(kmlPath, "utf8");

const parser = new XMLParser({
  ignoreAttributes: false,
  isArray: (name) => name === "Placemark",
});

const data = parser.parse(kml);

const placemarks = data?.kml?.Document?.Placemark || [];

const features = [];

for (const placemark of placemarks) {
  const name = placemark.name || "Unnamed Park";

  const coordinates =
    placemark?.Point?.coordinates ||
    placemark?.MultiGeometry?.Point?.coordinates;

  if (!coordinates) {
    continue;
  }

  const parts = String(coordinates)
    .trim()
    .split(",");

  const longitude = Number(parts[0]);
  const latitude = Number(parts[1]);

  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    continue;
  }

  features.push({
    type: "Feature",
    properties: {
      name,
    },
    geometry: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  });
}

const geojson = {
  type: "FeatureCollection",
  features,
};

fs.writeFileSync(
  outputPath,
  JSON.stringify(geojson, null, 2)
);

console.log(`Converted ${features.length} parks.`);
console.log(`GeoJSON saved to: ${outputPath}`);