"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { PropertyListing } from "@/lib/propertyData";

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
          <CircleMarker
            key={l.slug}
            center={[l.latitude, l.longitude]}
            radius={9}
            pathOptions={{
              color: "#fcf6ba",
              weight: 1,
              fillColor: "#c9a84c",
              fillOpacity: 0.9,
            }}
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
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
