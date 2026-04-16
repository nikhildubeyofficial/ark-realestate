"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ArkCredenceFilterModal, {
  type CredenceModalFilters,
  type CredenceModalSortKey,
} from "@/components/ArkCredenceFilterModal";
import InquireModal from "@/components/InquireModal";
import PropertyCompareModal from "@/components/PropertyCompareModal";
import PropertyListingsMap from "@/components/PropertyListingsMap";
import { getCityIdFromParam } from "@/lib/credenceCity";
import { developerFilterMatches } from "@/lib/credenceDeveloperFilter";
import type { CredenceSortKey } from "@/lib/credenceSort";
import { sortListingsCredence } from "@/lib/credenceSort";
import type { PropertyListing } from "@/lib/propertyData";
import { ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";

const PAGE_SIZE = 9;

const VALID_CATEGORIES = [
  "Affordable",
  "Luxury",
  "Waterfront",
  "Commercial",
  "Office",
  "Off-Plan",
] as const;

type ActiveCategory = "All" | (typeof VALID_CATEGORIES)[number];

const FILTER_CHIPS: { value: ActiveCategory; label: string }[] = [
  { value: "All", label: "All Properties" },
  { value: "Off-Plan", label: "Off-Plan" },
  { value: "Affordable", label: "Affordable" },
  { value: "Luxury", label: "Luxury" },
  { value: "Waterfront", label: "Waterfront" },
  { value: "Commercial", label: "Commercial" },
  { value: "Office", label: "Office" },
];

/** Align with credence-realtor URL params (`search` primary; legacy `keyword` / `q`). */
function getSearchFromParams(sp: URLSearchParams): string {
  return (
    sp.get("search")?.trim() ||
    sp.get("keyword")?.trim() ||
    sp.get("q")?.trim() ||
    ""
  );
}

function parseModalFilters(sp: URLSearchParams): CredenceModalFilters {
  const f: CredenceModalFilters = {};
  const dev = sp.get("developer");
  if (dev) f.developer = dev;
  const city = sp.get("city");
  if (city) f.city = city;
  const locality = sp.get("locality");
  if (locality) f.locality = locality;
  const bedrooms = sp.get("bedrooms");
  if (bedrooms) {
    const n = parseInt(bedrooms, 10);
    if (!Number.isNaN(n) && n > 0) f.bedrooms = n;
  }
  const minPrice = sp.get("minPrice");
  if (minPrice) {
    const n = parseInt(minPrice, 10);
    if (!Number.isNaN(n) && n > 0) f.minPrice = n;
  }
  const maxPrice = sp.get("maxPrice");
  if (maxPrice) {
    const n = parseInt(maxPrice, 10);
    if (!Number.isNaN(n) && n > 0) f.maxPrice = n;
  }
  const minArea = sp.get("minArea");
  if (minArea) {
    const n = parseInt(minArea, 10);
    if (!Number.isNaN(n) && n > 0) f.minArea = n;
  }
  const maxArea = sp.get("maxArea");
  if (maxArea) {
    const n = parseInt(maxArea, 10);
    if (!Number.isNaN(n) && n > 0) f.maxArea = n;
  }
  const sortByRaw = sp.get("sortBy")?.trim().toLowerCase();
  if (
    sortByRaw === "min_price" ||
    sortByRaw === "max_price" ||
    sortByRaw === "created_at" ||
    sortByRaw === "updated_at"
  ) {
    f.sortBy = sortByRaw as CredenceModalSortKey;
  }
  const sortOrderRaw = sp.get("sortOrder")?.trim().toLowerCase();
  if (sortOrderRaw === "asc" || sortOrderRaw === "desc")
    f.sortOrder = sortOrderRaw;
  const unitRaw = sp.get("unitType")?.trim().toLowerCase();
  if (unitRaw === "apartment") f.unitType = "Apartment";
  else if (unitRaw === "villa") f.unitType = "Villa";
  return f;
}

function getActiveCategory(sp: URLSearchParams): ActiveCategory {
  const c = sp.get("category")?.trim();
  if (!c) return "All";
  const match = VALID_CATEGORIES.find((v) => v.toLowerCase() === c.toLowerCase());
  return match ?? "All";
}

function applyCategoryRows(
  rows: PropertyListing[],
  active: ActiveCategory
): PropertyListing[] {
  if (active === "All") return rows;
  switch (active) {
    case "Off-Plan":
      return rows.filter((l) => l.tabOffPlan);
    case "Affordable":
      return rows.filter((l) => l.tabAffordable);
    case "Luxury":
      return rows.filter((l) => l.tabLuxury);
    case "Waterfront":
      return rows.filter((l) => l.tabWaterfront);
    case "Commercial":
      return rows.filter((l) => l.tabCommercial);
    case "Office":
      return rows.filter((l) => l.tabOffice);
    default:
      return rows;
  }
}

export default function FeaturedListingsClient({
  listings,
}: {
  listings: PropertyListing[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const spKey = searchParams.toString();

  const skipSearchUrlSyncRef = useRef(false);
  const [searchInput, setSearchInput] = useState(() =>
    getSearchFromParams(searchParams)
  );
  const [debouncedSearch, setDebouncedSearch] = useState(() =>
    getSearchFromParams(searchParams)
  );

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedSearch(searchInput), 300);
    return () => window.clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const cur = getSearchFromParams(params);
    if (debouncedSearch === cur) return;
    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    } else {
      params.delete("search");
    }
    params.delete("keyword");
    params.delete("q");
    params.delete("page");
    skipSearchUrlSyncRef.current = true;
    const qs = params.toString();
    router.replace(qs ? `/featured?${qs}` : "/featured", { scroll: false });
  }, [debouncedSearch, router, searchParams]);

  useEffect(() => {
    if (skipSearchUrlSyncRef.current) {
      skipSearchUrlSyncRef.current = false;
      return;
    }
    const s = getSearchFromParams(searchParams);
    setSearchInput(s);
    setDebouncedSearch(s);
  }, [searchParams]);

  const [filterOpen, setFilterOpen] = useState(false);
  const [compare, setCompare] = useState<Set<string>>(new Set());
  const [compareOpen, setCompareOpen] = useState(false);
  const [inquire, setInquire] = useState<PropertyListing | null>(null);

  const activeCategory = useMemo(
    () => getActiveCategory(new URLSearchParams(spKey)),
    [spKey]
  );

  const modalFilters = useMemo(
    () => parseModalFilters(new URLSearchParams(spKey)),
    [spKey]
  );

  const currentPage = Math.max(
    1,
    parseInt(searchParams.get("page") || "1", 10) || 1
  );

  const filtered = useMemo(() => {
    let rows = [...listings];

    rows = applyCategoryRows(rows, activeCategory);

    const q = debouncedSearch.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.slug.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          l.excerpt.toLowerCase().includes(q) ||
          l.builder.toLowerCase().includes(q)
      );
    }

    const mf = parseModalFilters(new URLSearchParams(spKey));

    const isLuxuryView = activeCategory === "Luxury";

    if (mf.developer) {
      const devParam = mf.developer.trim().toLowerCase();
      rows = rows.filter((l) =>
        developerFilterMatches(devParam, l.builder, l.builder)
      );
    }

    if (mf.city) {
      const cid = getCityIdFromParam(mf.city);
      if (cid !== null) rows = rows.filter((l) => l.cityId === cid);
    }

    if (mf.locality?.trim()) {
      const loc = mf.locality.trim().toLowerCase();
      rows = rows.filter(
        (l) =>
          l.location.toLowerCase().includes(loc) ||
          l.subtitle.toLowerCase().includes(loc)
      );
    }

    if (mf.bedrooms !== undefined && mf.bedrooms > 0) {
      rows = rows.filter(
        (l) => l.maxBedroomsFromUnits >= mf.bedrooms!
      );
    }

    if (mf.unitType === "Apartment") {
      rows = rows.filter((l) => l.maxBedroomsFromUnits <= 3);
    } else if (mf.unitType === "Villa") {
      rows = rows.filter((l) => l.maxBedroomsFromUnits >= 4);
    }

    if (!isLuxuryView) {
      if (
        mf.minPrice !== undefined &&
        mf.minPrice > 0 &&
        activeCategory !== "Affordable"
      ) {
        rows = rows.filter((l) => {
          const floor = l.priceFrom > 0 ? l.priceFrom : l.priceTo;
          return floor >= mf.minPrice!;
        });
      }
      if (mf.maxPrice !== undefined && mf.maxPrice > 0) {
        rows = rows.filter((l) => {
          const ceiling = l.priceTo > 0 ? l.priceTo : l.priceFrom;
          return ceiling <= mf.maxPrice!;
        });
      }
    }

    if (mf.minArea !== undefined && mf.minArea > 0) {
      rows = rows.filter((l) => l.areaMaxSqFt >= mf.minArea!);
    }
    if (mf.maxArea !== undefined && mf.maxArea > 0) {
      rows = rows.filter((l) => l.areaMinSqFt <= mf.maxArea!);
    }

    const sortBy: CredenceSortKey = mf.sortBy ?? "";
    const sortOrder: "asc" | "desc" = mf.sortOrder ?? "desc";
    const categoryForSort: string | null =
      activeCategory === "All" ? null : activeCategory;

    rows = sortListingsCredence(rows, categoryForSort, sortBy, sortOrder);

    return rows;
  }, [listings, debouncedSearch, activeCategory, spKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const setCategory = useCallback(
    (value: ActiveCategory) => {
      const params = new URLSearchParams(searchParams.toString());
      const prevCat = searchParams.get("category");
      if (value === "All") params.delete("category");
      else params.set("category", value);
      if (value === "Luxury") {
        params.delete("minPrice");
        params.delete("maxPrice");
      }
      if (value === "Affordable") {
        params.delete("minPrice");
        params.set("maxPrice", "1500000");
      }
      if (prevCat === "Affordable" && value !== "Affordable") {
        params.delete("maxPrice");
        params.delete("minPrice");
      }
      params.delete("page");
      const qs = params.toString();
      router.replace(qs ? `/featured?${qs}` : "/featured", { scroll: false });
    },
    [router, searchParams]
  );

  const handleApplyFilters = useCallback(
    (newFilters: CredenceModalFilters) => {
      const params = new URLSearchParams(searchParams.toString());
      const cat = getActiveCategory(params);

      const isReset = Object.keys(newFilters).length === 0;
      if (isReset) {
        [
          "developer",
          "city",
          "locality",
          "bedrooms",
          "minPrice",
          "maxPrice",
          "minArea",
          "maxArea",
          "sortBy",
          "sortOrder",
          "unitType",
        ].forEach((k) => params.delete(k));
      } else {
        const setOrDel = (key: string, val: string | undefined) => {
          if (val && val.trim()) params.set(key, val);
          else params.delete(key);
        };

        setOrDel("developer", newFilters.developer);
        setOrDel("city", newFilters.city);
        setOrDel("locality", newFilters.locality);

        if (newFilters.bedrooms !== undefined && newFilters.bedrooms > 0) {
          params.set("bedrooms", String(newFilters.bedrooms));
        } else params.delete("bedrooms");

        if (newFilters.unitType) params.set("unitType", newFilters.unitType);
        else params.delete("unitType");

        if (cat === "Luxury") {
          params.delete("minPrice");
          params.delete("maxPrice");
        } else if (cat === "Affordable") {
          /* Credence: affordable category clears min price and caps at 1.5M AED */
          params.delete("minPrice");
          if (newFilters.maxPrice !== undefined && newFilters.maxPrice > 0) {
            params.set(
              "maxPrice",
              String(Math.min(newFilters.maxPrice, 1_500_000))
            );
          } else {
            params.set("maxPrice", "1500000");
          }
        } else {
          if (newFilters.minPrice !== undefined && newFilters.minPrice > 0) {
            params.set("minPrice", String(newFilters.minPrice));
          } else params.delete("minPrice");
          if (newFilters.maxPrice !== undefined && newFilters.maxPrice > 0) {
            params.set("maxPrice", String(newFilters.maxPrice));
          } else params.delete("maxPrice");
        }

        if (newFilters.minArea !== undefined && newFilters.minArea > 0) {
          params.set("minArea", String(newFilters.minArea));
        } else params.delete("minArea");
        if (newFilters.maxArea !== undefined && newFilters.maxArea > 0) {
          params.set("maxArea", String(newFilters.maxArea));
        } else params.delete("maxArea");

        if (newFilters.sortBy) {
          params.set("sortBy", newFilters.sortBy);
          params.set("sortOrder", newFilters.sortOrder ?? "desc");
        } else {
          params.delete("sortBy");
          params.delete("sortOrder");
        }
      }

      params.delete("page");
      const qs = params.toString();
      router.replace(qs ? `/featured?${qs}` : "/featured", { scroll: false });
    },
    [router, searchParams]
  );

  const handlePageChange = useCallback(
    (p: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (p <= 1) params.delete("page");
      else params.set("page", String(p));
      const qs = params.toString();
      router.replace(qs ? `/featured?${qs}` : "/featured", { scroll: false });
    },
    [router, searchParams]
  );

  const toggleCompare = useCallback((slug: string) => {
    setCompare((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else if (next.size < 4) next.add(slug);
      return next;
    });
  }, []);

  const compareSlugs = useMemo(() => [...compare], [compare]);

  return (
    <>
      <section className="sticky top-[88px] z-40 border-b border-white/10 bg-[#080808]/95 py-4 backdrop-blur-xl">
        <div className="mx-auto max-w-[1280px] space-y-4 px-8 md:px-20">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="block flex-1">
              <span className="sr-only">Search properties</span>
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by keyword, community, developer, or property ID (slug)…"
                className="w-full border border-white/15 bg-black/40 px-4 py-2.5 font-light text-sm text-white/90 placeholder:text-white/35 focus:border-[#c9a84c]/50 focus:outline-none"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilterOpen(true)}
                className="border border-white/20 px-4 py-2 text-xs font-light uppercase tracking-wider text-white/70 transition hover:border-[#c9a84c]/60 hover:text-[#c9a84c]"
              >
                Filters
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTER_CHIPS.map((chip) => {
              const active =
                chip.value === "All"
                  ? activeCategory === "All"
                  : activeCategory === chip.value;
              return (
                <button
                  key={chip.value}
                  type="button"
                  onClick={() => setCategory(chip.value)}
                  className={`border px-3 py-1.5 text-[10px] font-light uppercase tracking-wider transition ${
                    active
                      ? "border-[#c9a84c] text-[#c9a84c]"
                      : "border-white/20 text-white/60 hover:border-[#c9a84c]/50"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          <p className="text-xs font-light text-white/45">
            {filtered.length} propert{filtered.length === 1 ? "y" : "ies"}{" "}
            match your criteria
          </p>
        </div>
      </section>

      <section className={`py-16 ${compare.size > 0 ? "pb-28" : ""}`}>
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          {filtered.length === 0 ? (
            <p className="text-center font-light text-sm text-white/50">
              No properties match. Try adjusting filters or search.
            </p>
          ) : (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {paginated.map((listing) => (
                  <PropertyCard 
                    key={listing.slug} 
                    listing={listing} 
                    compare={compare} 
                    toggleCompare={toggleCompare} 
                    setInquire={setInquire}
                  />
                ))}
              </div>
              {totalPages > 1 ? (
                <nav
                  className="mt-14 flex flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-10"
                  aria-label="Property listings pages"
                >
                  <button
                    type="button"
                    disabled={safePage <= 1}
                    onClick={() => handlePageChange(safePage - 1)}
                    className="min-w-[100px] rounded border border-white/20 px-4 py-2.5 font-light text-sm text-white/80 transition enabled:hover:border-[#c9a84c] enabled:hover:text-[#c9a84c] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    Previous
                  </button>
                  <span className="px-4 font-light text-sm text-white/50">
                    Page {safePage} of {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={safePage >= totalPages}
                    onClick={() => handlePageChange(safePage + 1)}
                    className="min-w-[100px] rounded border border-white/20 px-4 py-2.5 font-light text-sm text-white/80 transition enabled:hover:border-[#c9a84c] enabled:hover:text-[#c9a84c] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    Next
                  </button>
                </nav>
              ) : null}
              <div className="mt-14 border-t border-white/10 pt-10">
                <PropertyListingsMap
                  listings={filtered}
                  onInquire={(l) => setInquire(l)}
                />
              </div>
            </>
          )}
        </div>
      </section>

      {compare.size > 0 ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#c9a84c]/30 bg-[#080808]/98 px-4 py-3 backdrop-blur md:px-12">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3">
            <span className="text-sm text-white/70">
              {compare.size} propert{compare.size === 1 ? "y" : "ies"} selected
              (max 4)
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCompareOpen(true)}
                disabled={compare.size < 2}
                className="border border-[#c9a84c] px-4 py-2 text-sm text-[#c9a84c] transition enabled:hover:bg-[#c9a84c] enabled:hover:text-[#060606] disabled:opacity-40"
              >
                Compare now
              </button>
              <button
                type="button"
                onClick={() => setCompare(new Set())}
                className="border border-white/20 px-4 py-2 text-sm text-white/70 hover:border-white/40"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {compareOpen ? (
        <PropertyCompareModal
          listings={listings}
          selectedSlugs={compareSlugs}
          onClose={() => setCompareOpen(false)}
        />
      ) : null}

      <InquireModal listing={inquire} onClose={() => setInquire(null)} />

      {filterOpen ? (
        <ArkCredenceFilterModal
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
          filters={modalFilters}
          onApply={(f) => {
            handleApplyFilters(f);
            setFilterOpen(false);
          }}
        />
      ) : null}
    </>
  );
}

function PropertyCard({ 
  listing, 
  compare, 
  toggleCompare, 
  setInquire 
}: { 
  listing: PropertyListing; 
  compare: Set<string>; 
  toggleCompare: (slug: string) => void;
  setInquire: (l: PropertyListing) => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const images = useMemo(() => {
    const set = new Set([listing.image, ...listing.gallery]);
    return Array.from(set).filter(Boolean);
  }, [listing]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIdx((idx) => (idx === 0 ? images.length - 1 : idx - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIdx((idx) => (idx === images.length - 1 ? 0 : idx + 1));
  };

  return (
    <article className="group overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:border-[#c9a84c]/40 hover:shadow-[0_20px_45px_-20px_rgba(0,0,0,0.8),0_0_20px_-10px_rgba(201,168,76,0.15)]">
      <div className="relative aspect-[4/3] bg-white/10 overflow-hidden">
        <Link
          href={`/properties/${listing.slug}`}
          className="absolute inset-0 block z-0"
          aria-label={`View ${listing.title}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ backgroundImage: `url(${images[imgIdx]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
        </Link>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <div className="absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-between px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button 
              onClick={handlePrev}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-sm transition-all hover:bg-[#c9a84c] hover:border-[#c9a84c] hover:text-black"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleNext}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-sm transition-all hover:bg-[#c9a84c] hover:border-[#c9a84c] hover:text-black"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-14 left-0 right-0 z-20 flex justify-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {images.map((_, i) => (
              <div 
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${i === imgIdx ? 'w-4 bg-[#c9a84c]' : 'w-1.5 bg-white/40'}`}
              />
            ))}
          </div>
        )}

        <div className="absolute left-3 top-3 z-30 flex items-center gap-2">
          <label className="flex cursor-pointer items-center gap-1.5 rounded border border-white/20 bg-black/50 px-2 py-1 text-[10px] text-white/80 transition-all hover:border-[#c9a84c]/50 hover:bg-black/70">
            <input
              type="checkbox"
              checked={compare.has(listing.slug)}
              onChange={() => toggleCompare(listing.slug)}
              className="accent-[#c9a84c]"
            />
            Compare
          </label>
        </div>
        <button className="absolute right-3 top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/60 transition-all hover:bg-[#c9a84c] hover:border-[#c9a84c] hover:text-black">
          <Heart size={14} />
        </button>
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-3 text-[11px] font-light text-white/90">
          <span>{listing.beds} Beds</span>
          <span>{listing.baths} Baths</span>
          <span>{listing.sqft}</span>
        </div>
      </div>
      <div className="border-t border-white/10 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="border border-white/15 bg-black/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#c9a84c]/90">
            {listing.credenceCategory}
          </span>
          {listing.readyDate ? (
            <span className="text-[10px] text-white/40">
              {listing.readyDate}
            </span>
          ) : null}
        </div>
        <h2 className="mt-2 font-serif text-2xl font-medium text-white/90 transition-colors group-hover:text-[#c9a84c]">
          <Link
            href={`/properties/${listing.slug}`}
          >
            {listing.title}
          </Link>
        </h2>
        <p className="mt-1 text-xs font-light text-white/55">
          <span className="text-white/35">Developer</span>{" "}
          {listing.builder}
        </p>
        <p className="mt-1 text-sm text-[#c9a84c]/90">
          {listing.subtitle}
        </p>
        <p className="mt-3 flex items-center gap-2 text-xs text-white/50">
          <MapPin size={12} className="text-[#c9a84c]" /> {listing.location}
        </p>
        {listing.excerpt ? (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-white/45">
            {listing.excerpt}
          </p>
        ) : null}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <span className="font-serif text-lg font-medium text-[#c9a84c]">
            {listing.price}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setInquire(listing)}
              className="border border-white/20 bg-white/5 px-4 py-2 text-xs font-light tracking-wide text-white/70 transition-all hover:bg-white hover:text-black"
            >
              Inquire
            </button>
            <Link
              href={`/properties/${listing.slug}`}
              className="border border-[#c9a84c] bg-[#c9a84c]/5 px-4 py-2 text-xs font-light tracking-wide text-[#c9a84c] transition-all hover:bg-[#c9a84c] hover:text-black"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
