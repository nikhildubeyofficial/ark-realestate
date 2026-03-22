"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";

type DevPoint = {
  name: string;
  lat: number;
  lng: number;
  weight: number;
  mapLabel?: string;
};

type LeafletWithHeat = typeof L & {
  heatLayer: (
    latlngs: [number, number, number][],
    options: Record<string, unknown>
  ) => L.Layer;
};

function useHeatLayer(map: L.Map | null, points: DevPoint[]) {
  useEffect(() => {
    if (!map) return;
    const heat = (L as LeafletWithHeat).heatLayer(
      points.map((p) => [p.lat, p.lng, p.weight]),
      {
        radius: 42,
        blur: 28,
        maxZoom: 12,
        minOpacity: 0.18,
        gradient: {
          0.2: "#0b0b0b",
          0.45: "#6b4f10",
          0.7: "#c9a84c",
          1.0: "#fcf6ba",
        },
      }
    );
    heat.addTo(map);
    return () => {
      heat.remove();
    };
  }, [map, points]);
}

function HeatLayer({ points }: { points: DevPoint[] }) {
  const map = useMap();
  useHeatLayer(map, points);
  return null;
}

function markerLabelForMap(p: DevPoint): string {
  const raw = (p.mapLabel ?? p.name ?? "").trim();
  const safe = raw.replace(/[^A-Za-z0-9\s&'-]/g, "").trim();
  const compact = safe.replace(/\s+/g, "").toUpperCase().slice(0, 8);
  return compact || "MAP";
}

function logoIcon(label: string) {
  const escaped = label
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  return L.divIcon({
    className: "",
    html: `<div style="
      width:40px;height:40px;border-radius:999px;
      background:#ffffff;display:flex;align-items:center;justify-content:center;
      box-shadow: 0 12px 30px -16px rgba(0,0,0,0.85);
      border:1px solid rgba(0,0,0,0.12);
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Arial;
      font-size:9px;font-weight:700;letter-spacing:0.5px;color:#080808;
    ">${escaped}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
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
          <HeatLayer points={points} />
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

