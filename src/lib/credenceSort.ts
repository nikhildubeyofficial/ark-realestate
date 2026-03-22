/**
 * Credence default & explicit sort order (see credence-realtor static API).
 */
import categoriesConfig from "@/data/propertyCategories.config.json";
import type { CredenceCategory } from "@/lib/credencePropertyCategory";
import {
  getPreferredDeveloperRank,
  isPriorityDeveloperProject,
} from "@/lib/credencePropertyCategory";
import type { PropertyListing } from "@/lib/propertyData";

const TOP = (
  categoriesConfig as {
    topCategoryProjectPriority?: Record<string, string[]>;
  }
).topCategoryProjectPriority ?? {};

function normalizeProjectLabel(value: string): string {
  return (value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getCategoryPriorityRank(
  listing: PropertyListing,
  category: string | null
): number {
  if (!category) return Number.MAX_SAFE_INTEGER;
  const key = category.toLowerCase();
  const priorityList = TOP[key];
  if (!Array.isArray(priorityList) || priorityList.length === 0)
    return Number.MAX_SAFE_INTEGER;
  const title = normalizeProjectLabel(listing.title);
  const slug = normalizeProjectLabel(listing.slug);
  const slugRaw = listing.slug.toLowerCase();
  const titleRaw = listing.title.toLowerCase();
  for (let i = 0; i < priorityList.length; i++) {
    const p = normalizeProjectLabel(priorityList[i] || "");
    if (!p) continue;
    if (title.includes(p) || slug.includes(p)) return i;
    if (p.length >= 4 && (slugRaw.includes(p) || titleRaw.includes(p)))
      return i;
  }
  return Number.MAX_SAFE_INTEGER;
}

function deterministicMixKey(listing: PropertyListing): number {
  const s = `${listing.projectId}:${listing.slug}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type CredenceSortKey =
  | ""
  | "min_price"
  | "max_price"
  | "created_at"
  | "updated_at";

export function sortListingsCredence(
  rows: PropertyListing[],
  categoryFilter: string | null,
  sortBy: CredenceSortKey,
  sortOrder: "asc" | "desc"
): PropertyListing[] {
  const list = [...rows];

  if (sortBy) {
    list.sort((a, b) => {
      const bucketA = isPriorityDeveloperProject(a.builder) ? 0 : 1;
      const bucketB = isPriorityDeveloperProject(b.builder) ? 0 : 1;
      if (bucketA !== bucketB) return bucketA - bucketB;
      const rankA = getCategoryPriorityRank(a, categoryFilter);
      const rankB = getCategoryPriorityRank(b, categoryFilter);
      if (rankA !== rankB) return rankA - rankB;
      if (bucketA === 0 && bucketB === 0) {
        const mixA = deterministicMixKey(a);
        const mixB = deterministicMixKey(b);
        if (mixA !== mixB) return mixA - mixB;
      } else {
        const devA = getPreferredDeveloperRank(a.builder);
        const devB = getPreferredDeveloperRank(b.builder);
        if (devA !== devB) return devA - devB;
      }
      let aValue = 0;
      let bValue = 0;
      if (sortBy === "min_price") {
        aValue = a.priceFrom;
        bValue = b.priceFrom;
      } else if (sortBy === "max_price") {
        aValue = a.priceTo;
        bValue = b.priceTo;
      } else {
        const aDate =
          sortBy === "created_at" ? a.createdAt || "" : a.updatedAt || "";
        const bDate =
          sortBy === "created_at" ? b.createdAt || "" : b.updatedAt || "";
        const aParsed = Date.parse(aDate);
        const bParsed = Date.parse(bDate);
        aValue = Number.isFinite(aParsed) ? aParsed : a.projectId;
        bValue = Number.isFinite(bParsed) ? bParsed : b.projectId;
      }
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
    return list;
  }

  list.sort((a, b) => {
    const bucketA = isPriorityDeveloperProject(a.builder) ? 0 : 1;
    const bucketB = isPriorityDeveloperProject(b.builder) ? 0 : 1;
    if (bucketA !== bucketB) return bucketA - bucketB;
    const rankA = getCategoryPriorityRank(a, categoryFilter);
    const rankB = getCategoryPriorityRank(b, categoryFilter);
    if (rankA !== rankB) return rankA - rankB;
    if (bucketA === 0 && bucketB === 0) {
      const mixA = deterministicMixKey(a);
      const mixB = deterministicMixKey(b);
      if (mixA !== mixB) return mixA - mixB;
    } else {
      const devA = getPreferredDeveloperRank(a.builder);
      const devB = getPreferredDeveloperRank(b.builder);
      if (devA !== devB) return devA - devB;
    }
    const hasA = a.hasStoredDescription ? 1 : 0;
    const hasB = b.hasStoredDescription ? 1 : 0;
    return hasB - hasA;
  });
  return list;
}
