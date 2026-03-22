import { promises as fs } from "node:fs";
import { ALL_DATA_UAE_EN_JSON } from "@/lib/dataPaths";
import type { AreaGuide, AreaGuideBase } from "@/lib/areaGuides";
import { AREA_GUIDE_ENTRIES } from "@/lib/areaGuides";

type RawItem = {
  slug?: string;
  title?: string;
  builder?: string;
  city_id?: number;
  district?: { title?: string };
  cover?: { src?: string };
  photos?: Array<{ src?: string }>;
};

/** Match district / title / slug to dataset wording (see `all_data_uae_en.json`). */
const SLUG_PATTERNS: Record<string, string[]> = {
  "downtown-dubai": ["Downtown", "Downtown Dubai"],
  "dubai-marina": ["Dubai Marina", "Marina"],
  "palm-jumeirah": ["Jumeirah Palm", "Palm Jumeirah", "Palm"],
  "business-bay": ["Business Bay"],
  "emaar-beachfront": ["Emaar Beachfront", "Beachfront"],
  "creek-harbour": ["Dubai Creek Harbour", "Creek Harbour", "Creek"],
};

function pickProjectImage(item: RawItem): string {
  return (
    item.cover?.src ||
    item.photos?.[0]?.src ||
    ""
  );
}

function itemMatchesPattern(item: RawItem, pattern: string): boolean {
  const needle = pattern.toLowerCase().trim();
  if (!needle) return false;
  const d = (item.district?.title ?? "").toLowerCase();
  const t = (item.title ?? "").toLowerCase();
  const s = (item.slug ?? "").toLowerCase().replace(/-/g, " ");
  const b = (item.builder ?? "").toLowerCase();
  return (
    d.includes(needle) ||
    t.includes(needle) ||
    s.includes(needle) ||
    b.includes(needle)
  );
}

function findImageForSlug(
  items: RawItem[],
  guide: AreaGuideBase
): string {
  const patterns = [
    ...(SLUG_PATTERNS[guide.slug] ?? []),
    guide.searchKeyword,
  ];

  if (guide.slug === "emaar-beachfront") {
    const emaarBeach = items.find((it) => {
      const b = (it.builder ?? "").toLowerCase();
      const t = (it.title ?? "").toLowerCase();
      const d = (it.district?.title ?? "").toLowerCase();
      const img = pickProjectImage(it);
      return (
        !!img &&
        b.includes("emaar") &&
        (t.includes("beach") || t.includes("beachfront") || d.includes("marina"))
      );
    });
    if (emaarBeach) return pickProjectImage(emaarBeach);
  }

  for (const pattern of patterns) {
    const found = items.find(
      (it) => itemMatchesPattern(it, pattern) && pickProjectImage(it)
    );
    if (found) return pickProjectImage(found);
  }

  const dubai = items.find(
    (it) =>
      (it.city_id === 1 || it.city_id === undefined) && pickProjectImage(it)
  );
  const anyImg = items.find((it) => pickProjectImage(it));
  return pickProjectImage(dubai ?? anyImg ?? items[0] ?? {});
}

/**
 * Resolves hero images from `all_data_uae_en.json` (project cover / gallery).
 */
export async function getAreaGuidesWithImages(): Promise<AreaGuide[]> {
  const raw = await fs.readFile(ALL_DATA_UAE_EN_JSON, "utf-8");
  const parsed = JSON.parse(raw) as { data?: { items?: RawItem[] } };
  const items = parsed.data?.items ?? [];

  return AREA_GUIDE_ENTRIES.map((entry) => ({
    ...entry,
    image: findImageForSlug(items, entry),
  }));
}
