"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import DeveloperHeatmapClient from "@/components/DeveloperHeatmapClient";
import InquireModal from "@/components/InquireModal";
import {
  getHomeDeveloperChips,
  heatPointMatchesPriorityFilter,
  listingMatchesPriorityDeveloper,
} from "@/lib/developerPriority";
import type { HeatPoint, PropertyListing } from "@/lib/propertyData";

type Props = {
  heatPoints: HeatPoint[];
  listings: PropertyListing[];
  /** When set (e.g. credence recent-launches IDs), shown below the map instead of developer-filtered picks. */
  recentLaunches?: PropertyListing[];
};

export default function HomeTopDevelopersSection({
  heatPoints,
  listings,
  recentLaunches,
}: Props) {
  const [filter, setFilter] = useState<string>("All");
  const [inquire, setInquire] = useState<PropertyListing | null>(null);

  const chips = useMemo(() => getHomeDeveloperChips(), []);

  const filteredPoints = useMemo(
    () =>
      filter === "All"
        ? heatPoints
        : heatPoints.filter((p) =>
            heatPointMatchesPriorityFilter(p.name, filter)
          ),
    [heatPoints, filter]
  );

  const displayListings = useMemo(() => {
    if (recentLaunches && recentLaunches.length > 0) return recentLaunches;
    const matched = listings.filter((l) =>
      listingMatchesPriorityDeveloper(l.builder, filter)
    );
    return matched.slice(0, 4);
  }, [listings, filter, recentLaunches]);

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
          <p className="mt-3 max-w-3xl font-light text-sm text-white/45">
            Developers are ordered by strategic priority (EMAAR, NAKHEEL, DUBAI
            HOLDING, and onward). Scroll chips to explore; open Property Listings
            for full filters, map view, and compare.
          </p>
          <div className="mt-6 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:gap-[18px] sm:overflow-visible sm:pb-0">
            {chips.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setFilter(name)}
                className={`flex min-h-12 shrink-0 items-center border px-3 font-light transition-all duration-300 active:scale-[0.98] sm:px-[10px] ${
                  filter === name
                    ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]"
                    : "border-white/20 bg-transparent text-white/80 hover:border-[#c9a84c] hover:text-[#c9a84c]"
                }`}
              >
                {name}
              </button>
            ))}
            <Link
              href="/featured"
              className="flex min-h-12 shrink-0 items-center border border-white/15 px-3 text-sm font-light text-white/60 transition hover:border-[#c9a84c]/50 hover:text-[#c9a84c]"
            >
              Full list →
            </Link>
          </div>
        </div>

        <div className="mb-10 overflow-hidden border border-white/10 bg-[#060606]">
          <DeveloperHeatmapClient points={filteredPoints} />
        </div>

        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3
              className="font-serif text-2xl font-light italic text-white/90 md:text-3xl"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {recentLaunches?.length
                ? "Most Recent Launches"
                : "Featured from selection"}
            </h3>
            {recentLaunches?.length ? (
              <p className="mt-1 text-xs font-light text-white/45">
                Same spotlight projects as Credence — hand-picked from live
                inventory.
              </p>
            ) : null}
          </div>
        </div>

        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: "21px" }}
        >
          {displayListings.map((prop) => (
            <div
              key={prop.slug}
              className="group relative mx-auto w-full max-w-[413px] overflow-hidden rounded-t-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-[#c9a84c]/40 hover:shadow-[0_20px_50px_-20px_rgba(201,168,76,0.2)] md:rounded-t-[30px]"
            >
              <Link
                href={`/properties/${prop.slug}`}
                className="block"
              >
                <div className="relative h-[240px] w-full overflow-hidden rounded-t-2xl sm:h-[280px] md:h-[310px] md:rounded-t-[30px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ backgroundImage: `url(${prop.image})` }}
                  />
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <span className="border border-white/20 bg-black/55 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#c9a84c]">
                      {prop.credenceCategory}
                    </span>
                  </div>
                  <div className="absolute right-4 top-4 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white/30 bg-black/40 text-white/80">
                    ♡
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 flex min-h-12 flex-wrap items-center gap-x-4 gap-y-1 bg-black/40 px-[18px] py-2 text-xs text-white/90">
                    <span>{prop.beds} Beds</span>
                    <span>{prop.baths} Baths</span>
                    <span className="truncate">{prop.sqft}</span>
                  </div>
                </div>
              </Link>
              <div className="border-t border-white/10 p-5">
                <p className="text-[10px] uppercase tracking-wider text-white/35">
                  Developer
                </p>
                <p className="font-light text-sm text-white/80">{prop.builder}</p>
                <h3 className="mt-2 font-serif text-lg font-medium text-white/90">
                  <Link
                    href={`/properties/${prop.slug}`}
                    className="hover:text-[#c9a84c]"
                  >
                    {prop.title}
                  </Link>
                </h3>
                {prop.readyDate ? (
                  <p className="mt-1 text-[11px] text-white/40">
                    Delivery {prop.readyDate}
                  </p>
                ) : null}
                <p className="mt-3 flex items-center gap-2 text-xs text-white/50">
                  <span>📍</span> {prop.location}
                </p>
                <p className="mt-2 font-light text-[#c9a84c]">{prop.price}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/properties/${prop.slug}`}
                    className="border border-[#c9a84c] bg-[#c9a84c]/10 px-4 py-2 text-xs font-light text-[#c9a84c] transition hover:bg-[#c9a84c] hover:text-[#060606]"
                  >
                    View details
                  </Link>
                  <button
                    type="button"
                    onClick={() => setInquire(prop)}
                    className="border border-white/20 px-4 py-2 text-xs font-light text-white/70 transition hover:border-[#c9a84c] hover:text-[#c9a84c]"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {displayListings.length === 0 ? (
          <p className="mt-8 text-center font-light text-sm text-white/45">
            No sample listings on the home preview. View all on{" "}
            <Link
              href="/featured"
              className="text-[#c9a84c] underline-offset-4 hover:underline"
            >
              Property Listings
            </Link>
            .
          </p>
        ) : null}
      </div>
      <InquireModal listing={inquire} onClose={() => setInquire(null)} />
    </section>
  );
}
