import { promises as fs } from "node:fs";
import path from "node:path";

export type PropertyListing = {
  slug: string;
  title: string;
  subtitle: string;
  beds: number;
  baths: number;
  sqft: string;
  location: string;
  price: string;
  image: string;
  latitude: number;
  longitude: number;
  builder: string;
  excerpt: string;
};

export type HeatPoint = {
  name: string;
  lat: number;
  lng: number;
  weight: number;
};

type RawItem = {
  slug?: string;
  title?: string;
  latitude?: number;
  longitude?: number;
  builder?: string;
  district?: { title?: string };
  cover?: { src?: string };
  photos?: Array<{ src?: string }>;
  statistics?: {
    total?: {
      price_from?: number;
      price_to?: number;
    };
    units?: Record<
      string,
      {
        count?: number;
      }
    >;
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
  const dataPath = path.join(process.cwd(), "all_data_uae_en.json");
  const descriptionsPath = path.join(process.cwd(), "descriptions.json");

  const [rawData, rawDescriptions] = await Promise.all([
    fs.readFile(dataPath, "utf-8"),
    fs.readFile(descriptionsPath, "utf-8"),
  ]);

  const parsedData = JSON.parse(rawData) as { data?: { items?: RawItem[] } };
  const descriptions = JSON.parse(rawDescriptions) as Record<string, string>;
  const items = parsedData.data?.items ?? [];

  const normalized = items
    .filter((item) => {
      const lat = safeNumber(item.latitude);
      const lng = safeNumber(item.longitude);
      return Boolean(item.slug && item.title && lat && lng);
    })
    .slice(0, 300)
    .map((item) => {
      const slug = item.slug ?? "";
      const title = item.title ?? "Property";
      const beds = titleToBeds(title);
      const district = item.district?.title || "Dubai";
      const builder = item.builder || "Developer";
      const descriptionText = parseDescriptionsHtml(descriptions[slug] || "");
      return {
        slug,
        title,
        subtitle: district,
        beds,
        baths: inferBaths(beds),
        sqft: inferSqft(beds),
        location: district.includes("Dubai") ? district : `${district}, Dubai`,
        price: priceToLabel(
          item.statistics?.total?.price_from,
          item.statistics?.total?.price_to
        ),
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
    .map(({ sortScore: _sort, descriptionText: _desc, ...rest }) => rest);

  return normalized;
}

export async function getHeatPointsForDevelopers(): Promise<HeatPoint[]> {
  const listings = await getPropertyData(220);
  const targets = [
    "damac",
    "emaar",
    "shobha",
    "nakheel",
    "dubai properties",
    "ellington",
    "danube",
    "omniyat",
    "deyaar",
  ];

  const grouped = targets
    .map((developer) => {
      const byBuilder = listings.filter((l) =>
        l.builder.toLowerCase().includes(developer)
      );
      if (!byBuilder.length) return null;
      const lat =
        byBuilder.reduce((sum, p) => sum + p.latitude, 0) / byBuilder.length;
      const lng =
        byBuilder.reduce((sum, p) => sum + p.longitude, 0) / byBuilder.length;
      return {
        name: developer
          .split(" ")
          .map((s) => s[0]?.toUpperCase() + s.slice(1))
          .join(" "),
        lat,
        lng,
        weight: Math.min(1, 0.45 + byBuilder.length / 20),
      };
    })
    .filter((v): v is HeatPoint => Boolean(v));

  // Fallback to at least 9 points by using top listings when some builders are absent
  if (grouped.length < 5) {
    return listings.slice(0, 9).map((l) => ({
      name: l.builder || l.title.split(" ")[0] || "Developer",
      lat: l.latitude,
      lng: l.longitude,
      weight: 0.6,
    }));
  }
  return grouped;
}

