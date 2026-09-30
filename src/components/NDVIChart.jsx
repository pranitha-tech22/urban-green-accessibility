import cityData from "../data/cityData";

function NDVIChart() {
  const parkCount = cityData.greenSpaces.length;

  return (
    <div className="ndvi-chart">
      <div className="ndvi-item">
        <div className="ndvi-label">
          <span>Mapped parks available for NDVI analysis</span>
          <strong>{parkCount}</strong>
        </div>

        <div className="ndvi-bar">
          <div
            className="ndvi-fill"
            style={{ width: "100%" }}
          ></div>
        </div>

        <small>
          NDVI values require satellite imagery analysis and are not
          estimated from the park-location dataset.
        </small>
      </div>

      <div className="ndvi-item">
        <div className="ndvi-label">
          <span>Analysis method</span>
          <strong>Satellite</strong>
        </div>

        <div className="ndvi-bar">
          <div
            className="ndvi-fill"
            style={{ width: "75%" }}
          ></div>
        </div>

        <small>
          NDVI can be calculated from satellite Red and Near-Infrared bands.
        </small>
      </div>
    </div>
  );
}

export default NDVIChart;