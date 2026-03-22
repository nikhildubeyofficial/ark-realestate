/**
 * Credence Realtor–aligned category & eligibility rules (see credence-realtor /api/projects/static).
 */
import categoriesConfig from "@/data/propertyCategories.config.json";
import commercialSlugs from "@/data/commercial-slugs.json";
import officeSlugs from "@/data/office-slugs.json";

const cfg = categoriesConfig as {
  affordableMaxPriceAED?: number;
  luxuryDeveloperNames?: string[];
  luxuryProjectSlugs?: string[];
  luxuryProjectSlugContains?: string[];
  luxuryExcludeSlugs?: string[];
  luxuryExcludeSlugContains?: string[];
  waterfrontProjectSlugs?: string[];
  priorityDeveloperNames?: string[];
};

const AFFORDABLE_MAX =
  cfg.affordableMaxPriceAED ?? 1_500_000;
const LUXURY_DEV_NAMES = cfg.luxuryDeveloperNames ?? [];
const LUXURY_PROJECT_SLUGS = new Set(
  (cfg.luxuryProjectSlugs ?? []).map((s) => s.toLowerCase().trim())
);
const LUXURY_PROJECT_SLUG_CONTAINS = (cfg.luxuryProjectSlugContains ?? []).map(
  (s) => s.toLowerCase().trim()
);
const LUXURY_EXCLUDE_SLUGS = new Set(
  (cfg.luxuryExcludeSlugs ?? []).map((s) => s.toLowerCase().trim())
);
const LUXURY_EXCLUDE_SLUG_CONTAINS = (
  cfg.luxuryExcludeSlugContains ?? []
).map((s) => s.toLowerCase().trim());
const WATERFRONT_PROJECT_SLUGS = new Set(
  (cfg.waterfrontProjectSlugs ?? []).map((s) => s.toLowerCase().trim())
);
const LUXURY_MIN_PRICE_AED = 5_000_000;
const PRIORITY_DEV_NAMES = (cfg.priorityDeveloperNames ?? [])
  .map((s) => s.toLowerCase().trim())
  .filter(Boolean);

const OFFICE_SET = new Set(
  (officeSlugs as string[]).map((s) => s.toLowerCase().trim())
);
const COMMERCIAL_SET = new Set(
  (commercialSlugs as string[]).map((s) => s.toLowerCase().trim())
);

const OFFICE_KEYWORDS = ["office", "offices", "مكتب", "مكاتب", "business bay", "difc"];
const COMMERCIAL_KEYWORDS = [
  "commercial",
  "retail",
  "تجاري",
  "تجارة",
  "mall",
  "business park",
];

export type CredenceCategory =
  | "Affordable"
  | "Luxury"
  | "Waterfront"
  | "Commercial"
  | "Office"
  | "Off-Plan";

const UNIT_CODE_TO_BEDROOMS: Record<string, number> = {
  "110": 0,
  "111": 1,
  "112": 2,
  "113": 3,
  "114": 4,
  "115": 5,
  "116": 6,
  "117": 7,
  "164": 0,
  "462": 2,
};

export type CredenceRawProject = {
  id?: number;
  slug?: string;
  title?: string;
  builder?: string;
  city_id?: number;
  district?: { title?: string };
  statistics?: {
    total?: { price_from?: number; price_to?: number };
    units?: Record<string, { area_from?: number; area_to?: number; count?: number }>;
    villas?: Record<string, { area_from?: number; area_to?: number; count?: number }>;
    transactions?: Record<string, unknown>;
  };
};

function normalizeDeveloperName(name: string): string {
  return (name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+(properties|development|group|holding|holdings|llc|llc\.?)$/i, "")
    .trim();
}

function normalizeArabicForMatch(s: string): string {
  return (s || "")
    .trim()
    .replace(/\u0640/g, "")
    .replace(/[\u0622\u0623\u0625\u0627\u0671]/g, "\u0627")
    .replace(/\u0649/g, "\u064a")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export function developerMatchesCategory(
  rawBuilder: string,
  categoryDeveloperNames: string[]
): boolean {
  const builder = (rawBuilder || "").toString().trim();
  if (!builder || categoryDeveloperNames.length === 0) return false;
  const builderNorm = normalizeDeveloperName(builder);
  const builderArabicNorm = normalizeArabicForMatch(builder);
  return categoryDeveloperNames.some((name) => {
    const n = (name || "").trim();
    if (!n) return false;
    const nNorm = normalizeDeveloperName(n);
    const nArabicNorm = normalizeArabicForMatch(n);
    return (
      builderNorm.includes(nNorm) ||
      nNorm.includes(builderNorm) ||
      builderArabicNorm.includes(nArabicNorm) ||
      nArabicNorm.includes(builderArabicNorm)
    );
  });
}

function considerUnits(
  obj: Record<string, unknown> | null | undefined,
  fn: (key: string) => void
): void {
  if (!obj || typeof obj !== "object") return;
  for (const key of Object.keys(obj)) fn(key);
}

export function getProjectBedrooms(project: CredenceRawProject): number {
  let maxBedrooms = 0;
  const consider = (obj: Record<string, unknown> | null | undefined) => {
    if (!obj || typeof obj !== "object") return;
    for (const key of Object.keys(obj)) {
      const br = UNIT_CODE_TO_BEDROOMS[key];
      if (br !== undefined && br > maxBedrooms) maxBedrooms = br;
    }
  };
  consider(project.statistics?.units as Record<string, unknown>);
  consider(project.statistics?.villas as Record<string, unknown>);
  consider(project.statistics?.transactions as Record<string, unknown>);
  return maxBedrooms;
}

export function projectHasBedroomOption(
  project: CredenceRawProject,
  minBedrooms: number
): boolean {
  if (minBedrooms < 0) return true;
  const check = (obj: Record<string, unknown> | null | undefined): boolean => {
    if (!obj || typeof obj !== "object") return false;
    for (const key of Object.keys(obj)) {
      const br = UNIT_CODE_TO_BEDROOMS[key];
      if (br !== undefined && br >= minBedrooms) return true;
    }
    return false;
  };
  return (
    check(project.statistics?.units as Record<string, unknown>) ||
    check(project.statistics?.villas as Record<string, unknown>) ||
    check(project.statistics?.transactions as Record<string, unknown>)
  );
}

export function getProjectAreaSqFt(project: CredenceRawProject): {
  min: number;
  max: number;
} {
  const sources = [
    project.statistics?.units,
    project.statistics?.villas,
    project.statistics?.transactions,
  ];
  let minAreaM2 = Infinity;
  let maxAreaM2 = 0;

  for (const source of sources) {
    if (!source || typeof source !== "object") continue;
    for (const unitData of Object.values(source as Record<string, unknown>)) {
      if (!unitData || typeof unitData !== "object") continue;
      const u = unitData as { area_from?: number; area_to?: number };
      const areaFrom = Number(u.area_from ?? 0);
      const areaTo = Number(u.area_to ?? 0);
      if (areaFrom > 0) minAreaM2 = Math.min(minAreaM2, areaFrom);
      if (areaTo > 0) maxAreaM2 = Math.max(maxAreaM2, areaTo);
    }
  }

  const minSqFt =
    minAreaM2 !== Infinity && minAreaM2 > 0 ? Math.round(minAreaM2 * 10.764) : 0;
  const maxSqFt =
    maxAreaM2 > 0 ? Math.round(maxAreaM2 * 10.764) : minSqFt;
  return { min: minSqFt, max: maxSqFt };
}

function textContainsAny(text: string, keywords: string[]): boolean {
  const t = (text || "").toLowerCase();
  return keywords.some((k) => t.includes(k.toLowerCase()));
}

function projectSlugTitleDistrict(project: CredenceRawProject): string {
  const s = (project.slug || "").toString().toLowerCase();
  const t = (project.title || "").toString().toLowerCase();
  const d = (project.district?.title || "").toString().toLowerCase();
  return `${s} ${t} ${d}`;
}

function descriptionMentionsWaterfrontOrLagoon(plainDescription: string): boolean {
  const lower = plainDescription.toLowerCase();
  return lower.includes("waterfront") || lower.includes("lagoon");
}

export function isAffordableProjectEligible(
  project: CredenceRawProject
): boolean {
  const startingPrice =
    project.statistics?.total?.price_from ??
    project.statistics?.total?.price_to ??
    0;
  const hasOneBedroomOption = projectHasBedroomOption(project, 1);
  return (
    typeof startingPrice === "number" &&
    startingPrice > 0 &&
    startingPrice <= AFFORDABLE_MAX &&
    hasOneBedroomOption
  );
}

export function computeLuxuryBuilders5M(
  items: CredenceRawProject[]
): Set<string> {
  const builderMinPrice = new Map<string, number>();
  for (const p of items) {
    const b = (p.builder || "").toString().trim();
    if (!b) continue;
    const priceFrom = p.statistics?.total?.price_from ?? 0;
    if (typeof priceFrom !== "number" || priceFrom <= 0) continue;
    const current = builderMinPrice.get(b);
    if (current === undefined) builderMinPrice.set(b, priceFrom);
    else builderMinPrice.set(b, Math.min(current, priceFrom));
  }
  const luxuryBuilders5M = new Set<string>();
  builderMinPrice.forEach((minP, builder) => {
    if (minP >= LUXURY_MIN_PRICE_AED) luxuryBuilders5M.add(builder);
  });
  return luxuryBuilders5M;
}

/**
 * Primary category label per Credence `getProjectCategory` (office → commercial → waterfront → luxury dev → affordable → off-plan).
 */
export function getCredenceCategory(
  project: CredenceRawProject,
  options: { descriptionPlain: string }
): CredenceCategory {
  const slug = (project.slug || "").toString().toLowerCase().trim();
  const combined = projectSlugTitleDistrict(project);
  const builder = (project.builder || "").toString();

  if (OFFICE_SET.has(slug)) return "Office";
  if (textContainsAny(combined, OFFICE_KEYWORDS)) return "Office";
  if (COMMERCIAL_SET.has(slug)) return "Commercial";
  if (textContainsAny(combined, COMMERCIAL_KEYWORDS)) return "Commercial";
  if (WATERFRONT_PROJECT_SLUGS.has(slug)) return "Waterfront";
  if (descriptionMentionsWaterfrontOrLagoon(options.descriptionPlain))
    return "Waterfront";
  if (developerMatchesCategory(builder, LUXURY_DEV_NAMES)) return "Luxury";
  if (isAffordableProjectEligible(project)) return "Affordable";
  return "Off-Plan";
}

/** Category when "Luxury" tab is selected (stricter than single-label). Mirrors API luxury branch. */
export function matchesLuxuryTab(
  project: CredenceRawProject,
  options: { luxuryBuilders5M: Set<string> }
): boolean {
  const slug = (project.slug || "").toString().toLowerCase().trim();
  const builder = (project.builder || "").toString().trim();
  const priceFrom = project.statistics?.total?.price_from ?? 0;

  if (LUXURY_EXCLUDE_SLUGS.has(slug)) return false;
  if (LUXURY_EXCLUDE_SLUG_CONTAINS.some((sub) => slug.includes(sub)))
    return false;

  const isLuxuryByDeveloper = developerMatchesCategory(builder, LUXURY_DEV_NAMES);
  const isLuxury5M = options.luxuryBuilders5M.has(builder);
  const isLuxuryAllowlist =
    LUXURY_PROJECT_SLUGS.has(slug) ||
    LUXURY_PROJECT_SLUG_CONTAINS.some((sub) => slug.includes(sub));
  const isLuxuryByPrice =
    typeof priceFrom === "number" && priceFrom >= LUXURY_MIN_PRICE_AED;
  return (
    isLuxuryByDeveloper || isLuxury5M || isLuxuryAllowlist || isLuxuryByPrice
  );
}

export function isPriorityDeveloperProject(builder: string): boolean {
  if (!PRIORITY_DEV_NAMES.length) return false;
  const b = (builder || "").toString();
  return PRIORITY_DEV_NAMES.some((name) =>
    developerMatchesCategory(b, [name])
  );
}

export function getPreferredDeveloperRank(rawBuilder: string): number {
  const builder = (rawBuilder || "").toString();
  if (!builder.trim()) return 9999;
  let best = 9999;
  for (let i = 0; i < PRIORITY_DEV_NAMES.length; i++) {
    const name = PRIORITY_DEV_NAMES[i];
    if (!name) continue;
    if (developerMatchesCategory(builder, [name])) {
      if (i < best) best = i;
    }
  }
  return best;
}

export { AFFORDABLE_MAX, LUXURY_MIN_PRICE_AED };
