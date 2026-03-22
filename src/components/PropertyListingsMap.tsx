"use client";

import dynamic from "next/dynamic";
import type { PropertyListing } from "@/lib/propertyData";

const PropertyListingsMapInner = dynamic(
  () => import("./PropertyListingsMapInner"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[min(56vh,520px)] min-h-[360px] w-full border border-white/10 bg-[#060606]" />
    ),
  }
);

export default function PropertyListingsMap({
  listings,
  onInquire,
}: {
  listings: PropertyListing[];
  onInquire: (listing: PropertyListing) => void;
}) {
  return <PropertyListingsMapInner listings={listings} onInquire={onInquire} />;
}
