import { promises as fs } from "node:fs";
import { cache } from "react";
import { DESCRIPTIONS_JSON } from "@/lib/dataPaths";
import {
  developerPriorityIndex,
  heatPointLabelForPriority,
  listingMatchesPriorityDeveloper,
  PRIORITY_DEVELOPERS,
} from "@/lib/developerPriority";
import {
  computeLuxuryBuilders5M,
  getCredenceCategory,
  getProjectAreaSqFt,
  getProjectBedrooms,
  isAffordableProjectEligible,
  matchesLuxuryTab,
} from "@/lib/credencePropertyCategory";
import type { CredenceCategory } from "@/lib/credenceTypes";
import {
  getCredenceAllProjectsRawSorted,
  projectMatchesTabFilter,
} from "@/lib/credenceProjectsStaticCore";
import { inferPropertyKind, inferWaterfront, isAffordablePrice } from "@/lib/propertyCategories";

export type { CredenceCategory } from "@/lib/credenceTypes";

export type PropertyKind =
  | "apartment"
  | "villa"
  | "penthouse"
  | "townhouse"
  | "studio"
  | "other";

export type PropertyListing = {
  slug: string;
  title: string;
  subtitle: string;
  beds: number;
  baths: number;
  sqft: string;
  location: string;
  price: string;
  priceNumeric: number;
  propertyKind: PropertyKind;
  affordable: boolean;
  waterfront: boolean;
  developerPriority: number;
  featuredRank: number;
  image: string;
  latitude: number;
  longitude: number;
  builder: string;
  excerpt: string;
  credenceCategory: CredenceCategory;
  matchesLuxuryTab: boolean;
  maxBedroomsFromUnits: number;
  areaMinSqFt: number;
  areaMaxSqFt: number;
  cityId: number;
  projectId: number;
  hasStoredDescription: boolean;
  priceFrom: number;
  priceTo: number;
  updatedAt: string;
  createdAt: string;
  affordableEligible: boolean;
  /** Handover / delivery label (Credence-style). */
  readyDate: string;
  /** Same inclusion rules as `/api/projects/static` for each category tab. */
  tabLuxury: boolean;
  tabAffordable: boolean;
  tabWaterfront: boolean;
  tabCommercial: boolean;
  tabOffice: boolean;
  tabOffPlan: boolean;
};

export type HeatPoint = {
  name: string;
  lat: number;
  lng: number;
  weight: number;
  mapLabel?: string;
};

export type ProjectRawItem = {
  id?: number;
  slug?: string;
  title?: string;
  city_id?: number;
  latitude?: number;
  longitude?: number;
  builder?: string;
  district?: { title?: string };
  cover?: { src?: string };
  photos?: Array<{ src?: string }>;
  updated_at?: string;
  created_at?: string;
  construction_inspection_date?: string;
  statistics?: {
    total?: {
      price_from?: number;
      price_to?: number;
    };
    units?: Record<
      string,
      {
        count?: number;
        area_from?: number;
        area_to?: number;
      }
    >;
    villas?: Record<
      string,
      {
        area_from?: number;
        area_to?: number;
        count?: number;
      }
    >;
    transactions?: Record<string, unknown>;
  };
};

function safeNumber(n: unknown, fallback = 0): number {
  return typeof n === "number" && Number.isFinite(n) ? n : fallback;
}

function parseDescriptionsHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function priceToLabel(from?: number, to?: number): string {
  const value = safeNumber(from) || safeNumber(to);
  if (!value) return "Price on request";
  if (value >= 1_000_000_000) return `AED ${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `AED ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `AED ${(value / 1_000).toFixed(0)}K`;
  return `AED ${value}`;
}

function titleToBeds(title: string): number {
  const match = title.match(/(\d+)\s*bed/i);
  if (match) return Number(match[1]);
  return 1;
}

function inferBaths(beds: number): number {
  if (beds <= 1) return 1;
  if (beds === 2) return 2;
  if (beds === 3) return 4;
  return beds + 1;
}

function inferSqft(beds: number): string {
  const sqft = 700 + beds * 450;
  return `${sqft.toLocaleString("en-US")} sq ft`;
}

function formatReadyDate(d?: string): string {
  if (!d || typeof d !== "string") return "";
  const match = d.match(/(\d{4})-(\d{2})/);
  if (match) {
    const month = parseInt(match[2], 10);
    const q = Math.ceil(month / 3);
    return `Q${q} ${match[1]}`;
  }
  return d.slice(0, 32);
}

function getBestImage(item: ProjectRawItem): string {
  return (
    item.cover?.src ||
    item.photos?.[0]?.src ||
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900"
  );
}

type ListingRow = PropertyListing & {
  sortScore: number;
  descriptionText: string;
};

function mapRawToListing(
  item: ProjectRawItem,
  descriptions: Record<string, string>,
  luxuryBuilders5M: Set<string>
): ListingRow {
  const slug = item.slug ?? "";
  const title = item.title ?? "Property";
  const beds = titleToBeds(title);
  const district = item.district?.title || "Dubai";
  const builder = item.builder || "Developer";
  const rawDesc = descriptions[slug] || "";
  const descriptionText = parseDescriptionsHtml(rawDesc);
  const pf = safeNumber(item.statistics?.total?.price_from);
  const pt = safeNumber(item.statistics?.total?.price_to);
  const priceNumeric = pf && pt ? (pf + pt) / 2 : pf || pt || 0;
  const propertyKind = inferPropertyKind(title);
  const credenceCategory = getCredenceCategory(item);
  const waterfront =
    credenceCategory === "Waterfront" ||
    inferWaterfront(title, district, descriptionText);
  const affordable =
    credenceCategory === "Affordable" || isAffordablePrice(priceNumeric);
  const developerPriority = developerPriorityIndex(builder);
  const location = district.includes("Dubai")
    ? district
    : `${district}, Dubai`;
  const maxBedroomsFromUnits = getProjectBedrooms(item);
  const area = getProjectAreaSqFt(item);
  const matchesLux = matchesLuxuryTab(item, { luxuryBuilders5M });
  const cityId =
    item.city_id != null
      ? typeof item.city_id === "string"
        ? parseInt(item.city_id, 10)
        : item.city_id
      : 1;
  const projectId = item.id != null ? Number(item.id) : 0;
  const hasStoredDescription =
    typeof rawDesc === "string" && rawDesc.trim().length > 0;
  const updatedAt =
    typeof item.updated_at === "string" ? item.updated_at : "";
  const createdAt =
    typeof item.created_at === "string" ? item.created_at : "";
  const affordableEligible = isAffordableProjectEligible(item);
  const readyDate = formatReadyDate(item.construction_inspection_date);

  const tabLuxury = projectMatchesTabFilter(item, "luxury", luxuryBuilders5M);
  const tabAffordable = projectMatchesTabFilter(item, "affordable", luxuryBuilders5M);
  const tabWaterfront = projectMatchesTabFilter(item, "waterfront", luxuryBuilders5M);
  const tabCommercial = projectMatchesTabFilter(item, "commercial", luxuryBuilders5M);
  const tabOffice = projectMatchesTabFilter(item, "office", luxuryBuilders5M);
  const tabOffPlan = projectMatchesTabFilter(item, "off-plan", luxuryBuilders5M);

  let sqftDisplay = inferSqft(beds);
  if (area.max > 0 || area.min > 0) {
    const minR = Math.round(area.min || area.max);
    const maxR = Math.round(area.max || area.min);
    sqftDisplay =
      minR === maxR || minR === 0
        ? `${maxR.toLocaleString("en-US")} sq ft`
        : `${minR.toLocaleString("en-US")} – ${maxR.toLocaleString("en-US")} sq ft`;
  }

  return {
    slug,
    title,
    subtitle: district,
    beds,
    baths: inferBaths(beds),
    sqft: sqftDisplay,
    location,
    price: priceToLabel(
      item.statistics?.total?.price_from,
      item.statistics?.total?.price_to
    ),
    priceNumeric,
    propertyKind,
    affordable,
    waterfront,
    developerPriority,
    featuredRank: 0,
    credenceCategory,
    matchesLuxuryTab: matchesLux,
    maxBedroomsFromUnits,
    areaMinSqFt: area.min,
    areaMaxSqFt: area.max,
    cityId: Number.isFinite(cityId) ? cityId : 1,
    projectId,
    hasStoredDescription,
    priceFrom: pf || pt || 0,
    priceTo: pt || pf || 0,
    updatedAt,
    createdAt,
    affordableEligible,
    readyDate,
    tabLuxury,
    tabAffordable,
    tabWaterfront,
    tabCommercial,
    tabOffice,
    tabOffPlan,
    image: getBestImage(item),
    latitude: safeNumber(item.latitude),
    longitude: safeNumber(item.longitude),
    builder,
    excerpt: descriptionText.slice(0, 180),
    sortScore:
      safeNumber(item.statistics?.total?.price_from) +
      safeNumber(item.statistics?.total?.price_to) / 2,
    descriptionText,
  };
}

const loadPropertyDataset = cache(async () => {
  const rawDescriptions = await fs.readFile(DESCRIPTIONS_JSON, "utf-8");
  const descriptions = JSON.parse(rawDescriptions) as Record<string, string>;
  const validItems = getCredenceAllProjectsRawSorted(
    new URLSearchParams()
  ) as ProjectRawItem[];
  const luxuryBuilders5M = computeLuxuryBuilders5M(validItems);
  return { validItems, pool: validItems, luxuryBuilders5M, descriptions };
});

export async function getPropertyData(limit = 18): Promise<PropertyListing[]> {
  const { pool, luxuryBuilders5M, descriptions } = await loadPropertyDataset();
  const normalized = pool
    .slice(0, limit)
    .map((item, idx) => {
      const row = mapRawToListing(item, descriptions, luxuryBuilders5M);
      const { sortScore: _sort, descriptionText: _desc, ...rest } = row;
      return { ...rest, featuredRank: idx };
    });
  return normalized;
}

/** Full credence-aligned catalogue (same order as static API). */
export async function getPropertyListingsForFeatured(): Promise<PropertyListing[]> {
  const { pool, luxuryBuilders5M, descriptions } = await loadPropertyDataset();
  return pool.map((item, idx) => {
    const row = mapRawToListing(item, descriptions, luxuryBuilders5M);
    const { sortScore: _sort, descriptionText: _desc, ...rest } = row;
    return { ...rest, featuredRank: idx };
  });
}

export async function getPropertyListingsByProjectIds(
  ids: number[]
): Promise<PropertyListing[]> {
  if (ids.length === 0) return [];
  const { validItems, luxuryBuilders5M, descriptions } =
    await loadPropertyDataset();
  const out: PropertyListing[] = [];
  for (const id of ids) {
    const item = validItems.find((i) => Number(i.id) === id);
    if (!item) continue;
    const row = mapRawToListing(item, descriptions, luxuryBuilders5M);
    const { sortScore: _s, descriptionText: _d, ...rest } = row;
    out.push({ ...rest, featuredRank: out.length });
  }
  return out;
}

export type ProjectDetailPayload = {
  listing: PropertyListing;
  descriptionHtml: string;
  gallery: string[];
};

export async function getProjectDetailBySlug(
  slug: string
): Promise<ProjectDetailPayload | null> {
  const { validItems, luxuryBuilders5M, descriptions } =
    await loadPropertyDataset();
  const normalized = slug.trim().toLowerCase();
  const item = validItems.find(
    (i) => (i.slug || "").toLowerCase() === normalized
  );
  if (!item) return null;
  const row = mapRawToListing(item, descriptions, luxuryBuilders5M);
  const { sortScore: _s, descriptionText: _d, ...listing } = row;
  const slugKey = item.slug ?? "";
  const descriptionHtml = descriptions[slugKey] || "";
  const gallery = (item.photos ?? [])
    .map((p) => p?.src)
    .filter((s): s is string => Boolean(s));
  return {
    listing: { ...listing, featuredRank: 0 },
    descriptionHtml,
    gallery,
  };
}

function englishMapLabelFromBuilder(builder: string, title: string): string {
  const raw = (builder || "").trim();
  const latin = raw.match(/[A-Za-z][A-Za-z0-9\s&'.-]{1,28}/);
  if (latin) return latin[0].trim().slice(0, 14);
  const fromTitle = title.match(/[A-Za-z][A-Za-z0-9\s'-]{1,20}/);
  if (fromTitle) return fromTitle[0].trim().slice(0, 14);
  return "Property";
}

export async function getHeatPointsForDevelopers(): Promise<HeatPoint[]> {
  const listings = await getPropertyData(400);
  const grouped: HeatPoint[] = [];

  for (let i = 0; i < PRIORITY_DEVELOPERS.length; i++) {
    const label = PRIORITY_DEVELOPERS[i];
    const byBuilder = listings.filter((l) =>
      listingMatchesPriorityDeveloper(l.builder, label)
    );
    if (!byBuilder.length) continue;
    const lat =
      byBuilder.reduce((sum, p) => sum + p.latitude, 0) / byBuilder.length;
    const lng =
      byBuilder.reduce((sum, p) => sum + p.longitude, 0) / byBuilder.length;
    const short = heatPointLabelForPriority(i);
    grouped.push({
      name: label,
      mapLabel: short.length > 12 ? short.slice(0, 12) : short,
      lat,
      lng,
      weight: Math.min(1, 0.42 + byBuilder.length / 25),
    });
  }

  if (grouped.length < 5) {
    return listings.slice(0, 9).map((l) => {
      const nameEn = englishMapLabelFromBuilder(l.builder, l.title);
      return {
        name: nameEn,
        mapLabel: nameEn.slice(0, 12),
        lat: l.latitude,
        lng: l.longitude,
        weight: 0.6,
      };
    });
  }
  return grouped;
}
