"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DEVELOPER_FILTERS,
  listingMatchesDeveloperFilter,
} from "@/lib/developerFilter";
import type { PropertyListing } from "@/lib/propertyData";

export default function FeaturedListingsClient({
  listings,
}: {
  listings: PropertyListing[];
}) {
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(
    () =>
      listings.filter((l) => listingMatchesDeveloperFilter(l.builder, filter)),
    [listings, filter]
  );

  return (
    <>
      <section className="sticky top-[72px] z-40 border-b border-white/5 bg-[#080808]/95 py-4 backdrop-blur">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          <div className="flex flex-wrap gap-3">
            {DEVELOPER_FILTERS.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setFilter(name)}
                className={`rounded border px-5 py-2.5 font-light text-sm transition ${
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
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          {filtered.length === 0 ? (
            <p className="text-center font-light text-white/50 text-sm">
              No properties match this developer. Try another filter.
            </p>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((listing) => (
                <article
                  key={listing.slug}
                  className="group overflow-hidden rounded-lg border border-white/10 bg-white/5 transition hover:border-[#c9a84c]/30"
                >
                  <div className="relative aspect-[4/3] bg-white/10">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${listing.image})`,
                      }}
                    />
                    <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white/80">
                      ♡
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex gap-4 text-xs text-white/90">
                      <span>{listing.beds} Beds</span>
                      <span>{listing.baths} Baths</span>
                      <span>{listing.sqft} ft²</span>
                    </div>
                  </div>
                  <div className="border-t border-white/10 p-6">
                    <h2 className="font-serif text-xl font-medium text-white/90">
                      {listing.title}
                    </h2>
                    <p className="mt-1 text-sm text-[#c9a84c]">{listing.subtitle}</p>
                    <p className="mt-3 flex items-center gap-2 text-xs text-white/50">
                      <span>📍</span> {listing.location}
                    </p>
                    {listing.excerpt ? (
                      <p className="mt-3 text-xs leading-relaxed text-white/45 line-clamp-3">
                        {listing.excerpt}
                      </p>
                    ) : null}
                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="font-medium text-[#c9a84c]">
                        {listing.price}
                      </span>
                      <Link
                        href="/#contact"
                        className="text-sm text-white/70 underline-offset-4 transition hover:text-[#c9a84c]"
                      >
                        Enquire
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
