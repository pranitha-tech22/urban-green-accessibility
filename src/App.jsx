import { useState } from "react";
import "./App.css";

import MapView from "./components/MapView";
import NDVIChart from "./components/NDVIChart";

import cityData from "./data/cityData";
import chennaiBoundary from "./data/chennai_municipal_boundary.json";

function App() {
  const [accessDistance, setAccessDistance] = useState(250);

  const parkCount = cityData.greenSpaces.length;

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>🌿 GreenMap</h2>

        <nav>
          <button className="nav-item active">📊 Dashboard</button>
          <button className="nav-item">🌳 Green Spaces</button>
          <button className="nav-item">🌱 NDVI Analysis</button>
          <button className="nav-item">📍 Accessibility</button>
          <button className="nav-item">⭐ Priority Areas</button>
          <button className="nav-item">ℹ️ Methodology</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Urban Green Accessibility</h1>
            <p>
              Mapping Chennai's green spaces and accessibility zones
            </p>
          </div>

          <div className="status">
            🟢 Real Chennai Data
          </div>
        </header>

        {/* Dashboard statistics */}
        <section className="stats">
          <div className="stat-card">
            <span>🌳</span>
            <div>
              <p>Mapped Green Spaces</p>
              <h2>{parkCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>🗺️</span>
            <div>
              <p>Study Area</p>
              <h2>Chennai</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>📍</span>
            <div>
              <p>Access Radius</p>
              <h2>{accessDistance} m</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>📊</span>
            <div>
              <p>Data Source</p>
              <h2>GCC</h2>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="map-section">
          <div className="section-header">
            <div>
              <h2>Accessibility Map</h2>
              <p>
                Chennai municipal boundary and real neighbourhood parks
              </p>
            </div>

            <select
              value={accessDistance}
              onChange={(event) =>
                setAccessDistance(Number(event.target.value))
              }
            >
              <option value={250}>250 m Access Zone</option>
              <option value={500}>500 m Access Zone</option>
              <option value={800}>800 m Access Zone</option>
              <option value={1000}>1000 m Access Zone</option>
            </select>
          </div>

          <div className="map-container">
            <MapView
              accessDistance={accessDistance}
              studyAreaGeoJSON={chennaiBoundary}
            />
          </div>
        </section>

        {/* Analysis */}
        <section className="bottom-grid">
          <div className="panel">
            <h2>🌳 Green Space Analysis</h2>

            <div className="access-row">
              <span>Mapped neighbourhood parks</span>
              <strong>{parkCount}</strong>
            </div>

            <div className="access-row">
              <span>Current access radius</span>
              <strong>{accessDistance} m</strong>
            </div>

            <div className="access-row">
              <span>Study boundary</span>
              <strong>GCC</strong>
            </div>
          </div>

          <div className="panel">
            <h2>⭐ Priority Analysis</h2>

            <div className="access-row">
              <span>Spatial basis</span>
              <strong>Distance</strong>
            </div>

            <div className="access-row">
              <span>Green-space basis</span>
              <strong>Park locations</strong>
            </div>

            <div className="access-row">
              <span>Planning focus</span>
              <strong>Underserved areas</strong>
            </div>
          </div>
        </section>

        {/* NDVI */}
        <section className="panel ndvi-panel">
          <h2>🌱 NDVI Vegetation Analysis</h2>

          <p className="ndvi-description">
            Satellite-derived NDVI can be used to assess vegetation
            health across the mapped green spaces.
          </p>

          <NDVIChart />
        </section>

        {/* Methodology */}
        <section className="panel">
          <h2>ℹ️ Methodology</h2>

          <div className="access-row">
            <span>1. Study Area</span>
            <strong>Chennai</strong>
          </div>

          <div className="access-row">
            <span>2. Green-space data</span>
            <strong>544 parks</strong>
          </div>

          <div className="access-row">
            <span>3. Accessibility</span>
            <strong>250–1000 m</strong>
          </div>

          <div className="access-row">
            <span>4. Vegetation analysis</span>
            <strong>NDVI</strong>
          </div>

          <div className="access-row">
            <span>5. Priority analysis</span>
            <strong>Spatial assessment</strong>
          </div>

          <p
            style={{
              marginTop: "18px",
              color: "#6b7280",
              fontSize: "13px",
              lineHeight: "1.6",
            }}
          >
            The system maps real green-space locations within the
            Chennai municipal boundary and creates configurable
            accessibility zones around them. Satellite-derived NDVI
            can subsequently be used to evaluate vegetation health,
            while spatial analysis can identify areas requiring
            additional green-space planning.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;