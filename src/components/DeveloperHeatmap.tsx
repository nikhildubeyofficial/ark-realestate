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
};

// Approximate Dubai-area coordinates for top developers (used for visual layout like the reference)
const points: DevPoint[] = [
  { name: "Damac", lat: 25.2048, lng: 55.2708, weight: 0.9 },
  { name: "Emaar", lat: 25.1972, lng: 55.2744, weight: 0.85 },
  { name: "Shobha", lat: 25.1760, lng: 55.2560, weight: 0.7 },
  { name: "Nakheel", lat: 25.1124, lng: 55.1386, weight: 0.8 },
  { name: "Dubai Props", lat: 25.0775, lng: 55.1403, weight: 0.65 },
  { name: "Ellington", lat: 25.1947, lng: 55.2784, weight: 0.6 },
  { name: "Danube", lat: 25.1000, lng: 55.1700, weight: 0.55 },
  { name: "Omniyat", lat: 25.1895, lng: 55.2695, weight: 0.75 },
  { name: "Deyaar", lat: 25.0950, lng: 55.1560, weight: 0.58 },
];

function useHeatLayer(map: L.Map | null) {
  useEffect(() => {
    if (!map) return;
    const heat = (L as any).heatLayer(
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
  }, [map]);
}

function HeatLayer() {
  const map = useMap();
  useHeatLayer(map);
  return null;
}

function logoIcon(label: string) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:40px;height:40px;border-radius:999px;
      background:#ffffff;display:flex;align-items:center;justify-content:center;
      box-shadow: 0 12px 30px -16px rgba(0,0,0,0.85);
      border:1px solid rgba(0,0,0,0.12);
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Arial;
      font-size:9px;font-weight:700;letter-spacing:1px;color:#080808;
    ">${label}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

export default function DeveloperHeatmap() {
  const center: LatLngExpression = [25.185, 55.26];

  return (
    <div className="relative overflow-hidden border-t border-white/10 bg-[#060606]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      <div className="relative h-[320px] w-full sm:h-[420px] md:h-[520px]">
        <MapContainer
          center={center}
          zoom={11}
          scrollWheelZoom={false}
          zoomControl={false}
          attributionControl={false}
          className="h-full w-full"
          style={{ background: "#0a0a0a" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <HeatLayer />
          {points.map((p) => (
            <Marker
              key={p.name}
              position={[p.lat, p.lng]}
              icon={logoIcon(
                p.name
                  .toUpperCase()
                  .replace(/\s+/g, "")
                  .slice(0, 7)
              )}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

