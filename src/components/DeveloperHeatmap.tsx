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
  logoUrl?: string;
};

function markerLabelForMap(p: DevPoint): string {
  const raw = (p.mapLabel ?? p.name ?? "").trim();
  const safe = raw.replace(/[^A-Za-z0-9\s&'-]/g, "").trim();
  const compact = safe.replace(/\s+/g, " ").toUpperCase();
  // Return single line, max 12 characters to be safe
  return compact.slice(0, 12) || "ARK";
}

function sanitizeImageUrl(raw: string | undefined): string | null {
  if (!raw?.trim()) return null;
  try {
    const u = new URL(raw.trim());
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.href;
  } catch {
    return null;
  }
}

function attrEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

/** Text pill when the API did not provide a builder `logo` URL. */
function textLabelIcon(label: string) {
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
    iconSize: [80, 32],
    iconAnchor: [40, 16],
  });
}

function heatmapMarkerIcon(p: DevPoint) {
  const safeUrl = sanitizeImageUrl(p.logoUrl);
  if (safeUrl) {
    const src = attrEscape(safeUrl);
    return L.divIcon({
      className: "custom-dev-marker custom-dev-marker--logo",
      html: `
      <div class="marker-wrapper marker-wrapper-logo">
        <div class="developer-marker-logo" title="${attrEscape((p.mapLabel ?? p.name).slice(0, 80))}">
          <img src="${src}" alt="" width="40" height="40" loading="lazy" decoding="async" />
        </div>
      </div>`,
      iconSize: [48, 48],
      iconAnchor: [24, 48],
    });
  }
  return textLabelIcon(markerLabelForMap(p));
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
          scrollWheelZoom={false}
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
              key={`${p.lat}-${p.lng}-${idx}-${p.logoUrl ?? "text"}`}
              position={[p.lat, p.lng]}
              icon={heatmapMarkerIcon(p)}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

