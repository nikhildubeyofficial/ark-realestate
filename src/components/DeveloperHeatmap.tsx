"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";

type DevPoint = {
  name: string;
  lat: number;
  lng: number;
  weight: number;
  mapLabel?: string;
};

function markerLabelForMap(p: DevPoint): string {
  const raw = (p.mapLabel ?? p.name ?? "").trim();
  const safe = raw.replace(/[^A-Za-z0-9\s&'-]/g, "").trim();
  const compact = safe.replace(/\s+/g, " ").toUpperCase();
  // Return single line, max 12 characters to be safe
  return compact.slice(0, 12) || "ARK";
}

function logoIcon(label: string) {
  const escaped = label
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  return L.divIcon({
    className: "custom-dev-marker",
    html: `
      <div class="marker-wrapper">
        <div class="marker-content">
          <span class="marker-label">${escaped}</span>
        </div>
      </div>
    `,
    iconSize: [80, 32], // Wider but shorter for pill shape
    iconAnchor: [40, 16],
  });
}

export default function DeveloperHeatmap({ points }: { points: DevPoint[] }) {
  const defaultCenter: LatLngExpression = [25.185, 55.26];
  const center: LatLngExpression =
    points.length > 0
      ? [
          points.reduce((sum, p) => sum + p.lat, 0) / points.length,
          points.reduce((sum, p) => sum + p.lng, 0) / points.length,
        ]
      : defaultCenter;

  return (
    <div className="relative overflow-hidden border-t border-white/10 bg-[#060606]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      <div
        className="relative h-[320px] w-full sm:h-[420px] md:h-[520px]"
        lang="en"
      >
        <MapContainer
          center={center}
          zoom={11}
          scrollWheelZoom
          zoomControl
          attributionControl
          className="h-full w-full [&_.leaflet-control-zoom]:border [&_.leaflet-control-zoom]:border-white/15 [&_.leaflet-control-zoom]:bg-[#121212]/95 [&_.leaflet-control-zoom_a]:text-white/90 [&_.leaflet-control-zoom_a]:no-underline [&_.leaflet-control-attribution]:max-w-[min(100%,280px)] [&_.leaflet-control-attribution]:text-[10px] [&_.leaflet-control-attribution]:leading-snug [&_.leaflet-control-attribution]:text-white/45 [&_.leaflet-control-attribution]:bg-black/50"
          style={{ background: "#0a0a0a" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {points.map((p, idx) => (
            <Marker
              key={`${p.lat}-${p.lng}-${idx}`}
              position={[p.lat, p.lng]}
              icon={logoIcon(markerLabelForMap(p))}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

