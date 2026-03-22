"use client";

import type { PropertyListing } from "@/lib/propertyData";

type Props = {
  listings: PropertyListing[];
  selectedSlugs: string[];
  onClose: () => void;
};

export default function PropertyCompareModal({
  listings,
  selectedSlugs,
  onClose,
}: Props) {
  const rows = selectedSlugs
    .map((slug) => listings.find((l) => l.slug === slug))
    .filter((x): x is PropertyListing => Boolean(x));

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Compare properties"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="max-h-[90vh] w-full max-w-5xl overflow-auto border border-white/15 bg-[#080808]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-serif text-lg font-medium text-white/90">
            Compare properties
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-white/50 transition hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full min-w-[640px] border-collapse text-left text-xs text-white/80">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-2 font-normal text-white/45"> </th>
                {rows.map((l) => (
                  <th key={l.slug} className="p-2 font-normal text-[#c9a84c]">
                    {l.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="p-2 text-white/45">Location</td>
                {rows.map((l) => (
                  <td key={l.slug} className="p-2">
                    {l.location}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-2 text-white/45">Price</td>
                {rows.map((l) => (
                  <td key={l.slug} className="p-2">
                    {l.price}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-2 text-white/45">Beds</td>
                {rows.map((l) => (
                  <td key={l.slug} className="p-2">
                    {l.beds}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-2 text-white/45">Baths</td>
                {rows.map((l) => (
                  <td key={l.slug} className="p-2">
                    {l.baths}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-2 text-white/45">Area (ft²)</td>
                {rows.map((l) => (
                  <td key={l.slug} className="p-2">
                    {l.sqft}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-2 text-white/45">Developer</td>
                {rows.map((l) => (
                  <td key={l.slug} className="p-2">
                    {l.builder}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-2 text-white/45">Type</td>
                {rows.map((l) => (
                  <td key={l.slug} className="p-2">
                    {l.propertyKind}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
