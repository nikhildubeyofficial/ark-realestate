import { promises as fs } from "node:fs";
import { ALL_DATA_UAE_EN_JSON, DESCRIPTIONS_JSON } from "@/lib/dataPaths";
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
import type { CredenceCategory } from "@/lib/credencePropertyCategory";
import { inferPropertyKind, inferWaterfront, isAffordablePrice } from "@/lib/propertyCategories";

export type { CredenceCategory } from "@/lib/credencePropertyCategory";

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
  /** Mid-point of from/to for sorting & filters (AED). */
  priceNumeric: number;
  propertyKind: PropertyKind;
  affordable: boolean;
  waterfront: boolean;
  /** Lower = higher priority in focus list (999 = unlisted). */
  developerPriority: number;
  /** Order in curated catalogue (0 = top). Used for “Featured” sort. */
  featuredRank: number;
  image: string;
  latitude: number;
  longitude: number;
  builder: string;
  excerpt: string;
  /** Credence primary category (tabs + labels). */
  credenceCategory: CredenceCategory;
  /** True when project qualifies for the Luxury tab (broader than label). */
  matchesLuxuryTab: boolean;
  maxBedroomsFromUnits: number;
  areaMinSqFt: number;
  areaMaxSqFt: number;
  cityId: number;
  projectId: number;
  hasStoredDescription: boolean;
  priceFrom: number;
  priceTo: number;
  /** ISO date when present in source; else empty (sort falls back to projectId). */
  updatedAt: string;
  /** ISO date when present (Credence `created_at` sort); often empty in static export. */
  createdAt: string;
  /** True when `isAffordableProjectEligible` (Luxury tab uses `matchesLuxuryTab` instead). */
  affordableEligible: boolean;
};

export type HeatPoint = {
  name: string;
  lat: number;
  lng: number;
  weight: number;
  /** Short English label for map markers (avoids non-Latin builder names from data) */
  mapLabel?: string;
};

type RawItem = {
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
  return sqft.toLocaleString("en-US");
}

function getBestImage(item: RawItem): string {
  return (
    item.cover?.src ||
    item.photos?.[0]?.src ||
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900"
  );
}

export async function getPropertyData(limit = 18): Promise<PropertyListing[]> {
  const [rawData, rawDescriptions] = await Promise.all([
    fs.readFile(ALL_DATA_UAE_EN_JSON, "utf-8"),
    fs.readFile(DESCRIPTIONS_JSON, "utf-8"),
  ]);

  const parsedData = JSON.parse(rawData) as { data?: { items?: RawItem[] } };
  const descriptions = JSON.parse(rawDescriptions) as Record<string, string>;
  const items = parsedData.data?.items ?? [];

  const pool = items
    .filter((item) => {
      const lat = safeNumber(item.latitude);
      const lng = safeNumber(item.longitude);
      return Boolean(item.slug && item.title && lat && lng);
    })
    .slice(0, 800);

  const luxuryBuilders5M = computeLuxuryBuilders5M(pool);

  const normalized = pool
    .map((item) => {
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
      const credenceCategory = getCredenceCategory(item, {
        descriptionPlain: descriptionText,
      });
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

      return {
        slug,
        title,
        subtitle: district,
        beds,
        baths: inferBaths(beds),
        sqft: inferSqft(beds),
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
        credenceCategory,
        matchesLuxuryTab: matchesLux,
        maxBedroomsFromUnits: maxBedroomsFromUnits,
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
    })
    .sort((a, b) => b.sortScore - a.sortScore)
    .slice(0, limit)
    .map(({ sortScore: _sort, descriptionText: _desc, ...rest }, idx) => ({
      ...rest,
      featuredRank: idx,
    }));

  return normalized;
}

/** Prefer Latin characters for map UI when builder string is mixed or RTL. */
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

