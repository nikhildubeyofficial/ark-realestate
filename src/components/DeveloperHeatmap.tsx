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

function useHeatLayer(map: L.Map | null, points: DevPoint[]) {
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
  }, [map, points]);
}

function HeatLayer({ points }: { points: DevPoint[] }) {
  const map = useMap();
  useHeatLayer(map, points);
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
          <HeatLayer points={points} />
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

