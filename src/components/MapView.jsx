import {
  MapContainer,
  TileLayer,
  Circle,
  CircleMarker,
  Popup,
  GeoJSON,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

import cityData from "../data/cityData";

function SearchResult({ park }) {
  const map = useMap();

  useEffect(() => {
    if (park) {
      map.flyTo(park.position, 15, {
        duration: 1,
      });
    }
  }, [park, map]);

  return null;
}

function MapView({
  accessDistance = 250,
  studyAreaGeoJSON = null,
}) {
  const center = [13.0827, 80.2707];

  const [search, setSearch] = useState("");
  const [selectedPark, setSelectedPark] = useState(null);

  const filteredParks = cityData.greenSpaces
    .filter((park) =>
      park.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 8);

  return (
    <div
      style={{
        position: "relative",
        height: "450px",
        width: "100%",
      }}
    >
      {/* Search box */}
      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "15px",
          zIndex: 1000,
          width: "280px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search park..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setSelectedPark(null);
          }}
          style={{
            width: "100%",
            padding: "11px 13px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            background: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            outline: "none",
          }}
        />

        {search && filteredParks.length > 0 && (
          <div
            style={{
              marginTop: "5px",
              background: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              maxHeight: "220px",
              overflowY: "auto",
            }}
          >
            {filteredParks.map((park) => (
              <button
                key={park.id}
                onClick={() => {
                  setSelectedPark(park);
                  setSearch(park.name);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  border: "none",
                  background: "white",
                  padding: "10px 12px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "12px",
                  borderBottom: "1px solid #eee",
                }}
              >
                🌳 {park.name}
              </button>
            ))}
          </div>
        )}

        {search && filteredParks.length === 0 && (
          <div
            style={{
              marginTop: "5px",
              background: "white",
              padding: "12px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              fontSize: "12px",
            }}
          >
            No park found
          </div>
        )}
      </div>

      <MapContainer
        center={center}
        zoom={11}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <SearchResult park={selectedPark} />

        {/* Real Chennai municipal boundary */}
        {studyAreaGeoJSON && (
          <GeoJSON
            data={studyAreaGeoJSON}
            style={{
              color: "#2563eb",
              weight: 3,
              fillColor: "#93c5fd",
              fillOpacity: 0.08,
            }}
          />
        )}

        {/* Accessibility zones */}
        {cityData.greenSpaces.map((park) => (
          <Circle
            key={`zone-${park.id}`}
            center={park.position}
            radius={accessDistance}
            pathOptions={{
              color: "#2f8f4e",
              fillColor: "#4caf50",
              fillOpacity: 0.12,
              weight: 1,
            }}
          />
        ))}

        {/* Real park locations */}
        {cityData.greenSpaces.map((park) => (
          <CircleMarker
            key={`park-${park.id}`}
            center={park.position}
            radius={4}
            pathOptions={{
              color: "#14532d",
              fillColor: "#22c55e",
              fillOpacity: 0.9,
              weight: 1,
            }}
          >
            <Popup>
              <strong>{park.name}</strong>
              <br />
              Neighbourhood Park
              <br />
              Access radius: {accessDistance} m
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          right: "15px",
          zIndex: 1000,
          background: "white",
          padding: "12px 14px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          fontSize: "12px",
          lineHeight: "1.8",
        }}
      >
        <strong>Map Legend</strong>

        <div>
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#22c55e",
              marginRight: "7px",
            }}
          />
          Real Park
        </div>

        <div>
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#4caf50",
              opacity: 0.35,
              marginRight: "7px",
            }}
          />
          Access Zone
        </div>

        <div>
          <span
            style={{
              display: "inline-block",
              width: "12px",
              height: "3px",
              background: "#2563eb",
              marginRight: "7px",
              verticalAlign: "middle",
            }}
          />
          Chennai Boundary
        </div>
      </div>
    </div>
  );
}

export default MapView;