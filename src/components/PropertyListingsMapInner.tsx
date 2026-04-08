"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import {
  Marker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { PropertyListing } from "@/lib/propertyData";

// Get developer initials (up to 2 characters)
function getDeveloperInitials(builder: string): string {
  if (!builder) return "AR";
  const words = builder.trim().split(/\s+/);
  if (words.length === 1) {
    return builder.substring(0, 2).toUpperCase();
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

// Get consistent color for developer
function getDeveloperColor(builder: string): string {
  const colors = [
    "#c9a84c", // Gold
    "#d4a574", // Bronze
    "#8b7355", // Brown
    "#a08060", // Tan
    "#cd853f", // Peru
  ];
  let hash = 0;
  for (let i = 0; i < builder.length; i++) {
    hash = builder.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function propertyIcon(builder: string = "") {
  const initials = getDeveloperInitials(builder);
  const color = getDeveloperColor(builder);

  return L.divIcon({
    className: "custom-property-marker",
    html: `
      <div class="developer-marker" style="
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${color} 0%, #1a1a1a 100%);
        border: 2px solid ${color};
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        font-size: 11px;
        font-weight: 600;
        color: white;
        text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        font-family: var(--font-inter), system-ui, sans-serif;
      ">${initials}</div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
}

function FitBounds({ listings }: { listings: PropertyListing[] }) {
  const map = useMap();
  useEffect(() => {
    if (!listings.length) return;
    const latlngs = listings.map(
      (l) => [l.latitude, l.longitude] as [number, number]
    );
    const bounds = L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding: [52, 52], maxZoom: 13 });
  }, [map, listings]);
  return null;
}

type Props = {
  listings: PropertyListing[];
  onInquire: (listing: PropertyListing) => void;
};

export default function PropertyListingsMapInner({
  listings,
  onInquire,
}: Props) {
  const center: [number, number] =
    listings.length > 0
      ? [listings[0]!.latitude, listings[0]!.longitude]
      : [25.185, 55.26];

  return (
    <div
      className="relative overflow-hidden border border-white/10 bg-[#060606]"
      lang="en"
    >
      <MapContainer
        center={center}
        zoom={11}
        scrollWheelZoom
        zoomControl
        attributionControl
        className="h-[min(56vh,520px)] w-full min-h-[360px] [&_.leaflet-control-zoom]:border [&_.leaflet-control-zoom]:border-white/15 [&_.leaflet-control-zoom]:bg-[#121212]/95 [&_.leaflet-control-zoom_a]:text-white/90 [&_.leaflet-control-attribution]:max-w-[min(100%,320px)] [&_.leaflet-control-attribution]:text-[10px] [&_.leaflet-control-attribution]:text-white/45 [&_.leaflet-control-attribution]:bg-black/50"
        style={{ background: "#0a0a0a" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {listings.length > 0 ? <FitBounds listings={listings} /> : null}
        {listings.map((l) => (
          <Marker
            key={l.slug}
            position={[l.latitude, l.longitude]}
            icon={propertyIcon(l.builder)}
          >
            <Popup>
              <div className="min-w-[200px] text-[#111]">
                <p className="font-semibold text-sm leading-snug">{l.title}</p>
                <p className="mt-1 text-xs text-neutral-600">{l.location}</p>
                <p className="mt-1 text-xs font-medium text-[#8a6d2a]">
                  {l.price}
                </p>
                <button
                  type="button"
                  className="mt-2 w-full border border-[#c9a84c] bg-[#c9a84c] px-2 py-1.5 text-xs font-medium text-black"
                  onClick={() => onInquire(l)}
                >
                  Inquire
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
