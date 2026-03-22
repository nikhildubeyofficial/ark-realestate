"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PRIORITY_DEVELOPERS } from "@/lib/developerPriority";
import type { CredenceSortKey } from "@/lib/credenceSort";

export type CredenceModalSortKey = Exclude<CredenceSortKey, "">;

export type CredenceModalFilters = {
  developer?: string;
  city?: string;
  locality?: string;
  bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  sortBy?: CredenceModalSortKey;
  sortOrder?: "asc" | "desc";
  unitType?: "" | "Apartment" | "Villa";
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  filters: CredenceModalFilters;
  onApply: (f: CredenceModalFilters) => void;
};

const CITY_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "All Cities" },
  { value: "Dubai", label: "Dubai" },
  { value: "Abu Dhabi", label: "Abu Dhabi" },
  { value: "Sharjah", label: "Sharjah" },
  { value: "Ajman", label: "Ajman" },
  { value: "Ras Al Khaimah", label: "Ras Al Khaimah" },
  { value: "Fujairah", label: "Fujairah" },
  { value: "Umm Al Quwain", label: "Umm Al Quwain" },
];

export default function ArkCredenceFilterModal({
  isOpen,
  onClose,
  filters,
  onApply,
}: Props) {
  const [local, setLocal] = useState<CredenceModalFilters>(filters);

  useEffect(() => {
    setLocal(filters);
  }, [filters, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sortValue = local.sortBy
    ? `${local.sortBy}_${local.sortOrder || "desc"}`
    : "";

  const devOptions = [...PRIORITY_DEVELOPERS].sort((a, b) =>
    a.localeCompare(b)
  );

  const modal = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-white/15 bg-[#080808] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#080808] px-5 py-4">
          <h2 className="font-serif text-lg font-medium text-white/90">
            Filter Properties
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white/50 transition hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="space-y-5 p-5">
          <label className="block">
            <span className="text-[10px] uppercase tracking-wider text-white/40">
              Developer
            </span>
            <select
              value={local.developer || ""}
              onChange={(e) =>
                setLocal({ ...local, developer: e.target.value || undefined })
              }
              className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white/90"
            >
              <option value="">All Developers</option>
              {devOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-[10px] uppercase tracking-wider text-white/40">
              City
            </span>
            <select
              value={local.city || ""}
              onChange={(e) =>
                setLocal({
                  ...local,
                  city: e.target.value || undefined,
                })
              }
              className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white/90"
            >
              {CITY_OPTIONS.map((o) => (
                <option key={o.label} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-[10px] uppercase tracking-wider text-white/40">
              Area / Locality
            </span>
            <input
              type="text"
              value={local.locality || ""}
              onChange={(e) =>
                setLocal({
                  ...local,
                  locality: e.target.value || undefined,
                })
              }
              placeholder="e.g. Downtown, Dubai Marina"
              className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white/90 placeholder:text-white/35"
            />
          </label>

          <label className="block">
            <span className="text-[10px] uppercase tracking-wider text-white/40">
              Min Bedrooms
            </span>
            <select
              value={local.bedrooms ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                setLocal({
                  ...local,
                  bedrooms: v ? parseInt(v, 10) : undefined,
                });
              }}
              className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white/90"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-[10px] uppercase tracking-wider text-white/40">
                Min Price (AED)
              </span>
              <input
                type="number"
                min={0}
                step={1000}
                value={local.minPrice ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setLocal({
                    ...local,
                    minPrice:
                      v && parseInt(v, 10) > 0 ? parseInt(v, 10) : undefined,
                  });
                }}
                className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white/90"
                placeholder="0"
              />
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-wider text-white/40">
                Max Price (AED)
              </span>
              <input
                type="number"
                min={0}
                step={1000}
                value={local.maxPrice ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setLocal({
                    ...local,
                    maxPrice:
                      v && parseInt(v, 10) > 0 ? parseInt(v, 10) : undefined,
                  });
                }}
                className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white/90"
                placeholder="No limit"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-[10px] uppercase tracking-wider text-white/40">
                Min Area (sq ft)
              </span>
              <input
                type="number"
                min={0}
                step={100}
                value={local.minArea ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setLocal({
                    ...local,
                    minArea:
                      v && parseInt(v, 10) > 0 ? parseInt(v, 10) : undefined,
                  });
                }}
                className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white/90"
              />
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-wider text-white/40">
                Max Area (sq ft)
              </span>
              <input
                type="number"
                min={0}
                step={100}
                value={local.maxArea ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setLocal({
                    ...local,
                    maxArea:
                      v && parseInt(v, 10) > 0 ? parseInt(v, 10) : undefined,
                  });
                }}
                className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white/90"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-[10px] uppercase tracking-wider text-white/40">
              Unit type
            </span>
            <select
              value={local.unitType || ""}
              onChange={(e) =>
                setLocal({
                  ...local,
                  unitType: (e.target.value || undefined) as
                    | ""
                    | "Apartment"
                    | "Villa"
                    | undefined,
                })
              }
              className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white/90"
            >
              <option value="">Any</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
            </select>
          </label>

          <label className="block">
            <span className="text-[10px] uppercase tracking-wider text-white/40">
              Sort By
            </span>
            <select
              value={sortValue}
              onChange={(e) => {
                const sel = e.target.value;
                if (!sel) {
                  setLocal({ ...local, sortBy: undefined, sortOrder: undefined });
                  return;
                }
                const last = sel.lastIndexOf("_");
                const sortBy = sel.slice(0, last) as CredenceModalSortKey;
                const sortOrder = (sel.slice(last + 1) as "asc" | "desc") || "desc";
                setLocal({ ...local, sortBy, sortOrder });
              }}
              className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white/90"
            >
              <option value="">Default (Credence ranking)</option>
              <option value="min_price_asc">Price: Low to High</option>
              <option value="min_price_desc">Price: High to Low</option>
              <option value="created_at_desc">Newest First</option>
              <option value="created_at_asc">Oldest First</option>
            </select>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onApply({});
                onClose();
              }}
              className="flex-1 border border-white/25 py-3 text-sm font-light text-white/80 transition hover:border-[#c9a84c]"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => {
                onApply(local);
                onClose();
              }}
              className="flex-1 border border-[#c9a84c] bg-[#c9a84c]/15 py-3 text-sm font-light text-[#c9a84c] transition hover:bg-[#c9a84c] hover:text-[#060606]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
