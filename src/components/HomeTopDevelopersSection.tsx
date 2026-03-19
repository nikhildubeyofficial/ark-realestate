"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DEVELOPER_FILTERS,
  heatPointMatchesFilter,
  listingMatchesDeveloperFilter,
} from "@/lib/developerFilter";
import type { HeatPoint, PropertyListing } from "@/lib/propertyData";
import DeveloperHeatmapClient from "@/components/DeveloperHeatmapClient";

type Props = {
  heatPoints: HeatPoint[];
  listings: PropertyListing[];
};

export default function HomeTopDevelopersSection({
  heatPoints,
  listings,
}: Props) {
  const [filter, setFilter] = useState<string>("All");

  const filteredPoints = useMemo(
    () =>
      filter === "All"
        ? heatPoints
        : heatPoints.filter((p) => heatPointMatchesFilter(p.name, filter)),
    [heatPoints, filter]
  );

  const displayListings = useMemo(() => {
    const matched = listings.filter((l) =>
      listingMatchesDeveloperFilter(l.builder, filter)
    );
    return matched.slice(0, 4);
  }, [listings, filter]);

  return (
    <section className="border-b border-white/5 bg-[#080808] pb-16 pt-12 md:px-20 md:pb-24 md:pt-[67px]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-[80px]">
        <div className="mb-10">
          <h2
            className="font-serif text-[42px] font-light italic leading-tight text-white/90 md:text-[56px] md:leading-[68px]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Choose from Top Developers
          </h2>
          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-[18px]">
            {DEVELOPER_FILTERS.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setFilter(name)}
                className={`flex min-h-12 shrink-0 items-center border px-3 font-light transition-all duration-300 active:scale-[0.98] sm:px-[10px] first:pl-4 md:first:pl-[30px] ${
                  filter === name
                    ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]"
                    : "border-white/20 bg-transparent text-white/80 hover:border-[#c9a84c] hover:text-[#c9a84c]"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10 overflow-hidden border border-white/10 bg-[#060606]">
          <DeveloperHeatmapClient points={filteredPoints} />
        </div>

        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: "21px" }}
        >
          {displayListings.map((prop) => (
            <Link
              key={prop.slug}
              href="/featured"
              className="group relative mx-auto w-full max-w-[413px] overflow-hidden rounded-t-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-[#c9a84c]/40 hover:shadow-[0_20px_50px_-20px_rgba(201,168,76,0.2)] md:rounded-t-[30px]"
            >
              <div className="relative h-[240px] w-full overflow-hidden rounded-t-2xl sm:h-[280px] md:h-[310px] md:rounded-t-[30px]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ backgroundImage: `url(${prop.image})` }}
                />
                <div className="absolute right-4 top-4 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white/30 bg-black/40 text-white/80">
                  ♡
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex h-12 items-center gap-4 bg-black/40 px-[18px] text-xs text-white/90">
                  <span>{prop.beds} Beds</span>
                  <span>{prop.baths} Baths</span>
                  <span>{prop.sqft} ft²</span>
                </div>
              </div>
              <div className="border-t border-white/10 p-5">
                <h3 className="font-serif text-lg font-medium text-white/90">
                  {prop.title}
                </h3>
                <p className="mt-3 flex items-center gap-2 text-xs text-white/50">
                  <span>📍</span> {prop.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {displayListings.length === 0 ? (
          <p className="mt-8 text-center font-light text-white/45 text-sm">
            No sample listings for this developer on the home preview. View all on{" "}
            <Link href="/featured" className="text-[#c9a84c] underline-offset-4 hover:underline">
              Property Listings
            </Link>
            .
          </p>
        ) : null}
      </div>
    </section>
  );
}
