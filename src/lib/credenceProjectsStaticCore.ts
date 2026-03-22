import allDataJson from '@/data/all_data_uae_en.json';
import categoriesConfig from '@/data/propertyCategories.config.json';
import officeSlugs from '@/data/office-slugs.json';
import commercialSlugs from '@/data/commercial-slugs.json';
import {
  isProjectInAllowedCities,
  getCityName,
  getCityIdFromParam,
  getProjectType,
  getMainImage,
  hasStoredDescription,
  descriptionContainsWaterfrontOrLagoon,
  stripPropertyNumberFromTitle,
} from '@/lib/staticPropertyData';
import {
  developerFilterMatches,
  developerMatchesCategory,
  getPreferredDeveloperRank,
  isPriorityDeveloperProject,
} from '@/lib/credenceDeveloperFilter';

const AFFORDABLE_MAX = (categoriesConfig as { affordableMaxPriceAED?: number }).affordableMaxPriceAED ?? 1_500_000;
const LUXURY_DEV_NAMES = (categoriesConfig as { luxuryDeveloperNames?: string[] }).luxuryDeveloperNames ?? [];
const AFFORDABLE_DEV_NAMES = (categoriesConfig as { affordableDeveloperNames?: string[] }).affordableDeveloperNames ?? [];
const TOP_CATEGORY_PROJECT_PRIORITY = (categoriesConfig as { topCategoryProjectPriority?: Record<string, string[]> }).topCategoryProjectPriority ?? {};
const LUXURY_PROJECT_SLUGS = new Set(
  ((categoriesConfig as { luxuryProjectSlugs?: string[] }).luxuryProjectSlugs ?? []).map((s) => s.toLowerCase().trim())
);
const LUXURY_PROJECT_SLUG_CONTAINS = ((categoriesConfig as { luxuryProjectSlugContains?: string[] }).luxuryProjectSlugContains ?? []).map((s) => s.toLowerCase().trim());
/** Slugs to exclude from luxury category (e.g. Azizi Riviera 66, 60). */
const LUXURY_EXCLUDE_SLUGS = new Set(
  ((categoriesConfig as { luxuryExcludeSlugs?: string[] }).luxuryExcludeSlugs ?? []).map((s) => s.toLowerCase().trim())
);
/** Slug substrings: any project whose slug contains one of these is excluded from luxury (e.g. all Azizi Riviera). */
const LUXURY_EXCLUDE_SLUG_CONTAINS = ((categoriesConfig as { luxuryExcludeSlugContains?: string[] }).luxuryExcludeSlugContains ?? []).map((s) => s.toLowerCase().trim());
/** Luxury = developers whose minimum project price (starting point) is 5M+ AED */
const LUXURY_MIN_PRICE_AED = 5_000_000;
const OFFICE_SET = new Set((officeSlugs as string[]).map((s) => s.toLowerCase().trim()));
const COMMERCIAL_SET = new Set((commercialSlugs as string[]).map((s) => s.toLowerCase().trim()));
const WATERFRONT_PROJECT_SLUGS = new Set(
  ((categoriesConfig as { waterfrontProjectSlugs?: string[] }).waterfrontProjectSlugs ?? []).map((s) => s.toLowerCase().trim())
);

const OFFICE_KEYWORDS = ['office', 'offices', 'مكتب', 'مكاتب', 'business bay', 'difc'];
const COMMERCIAL_KEYWORDS = ['commercial', 'retail', 'تجاري', 'تجارة', 'mall', 'business park'];

/** Stable pseudo-random mix (FNV-1a) so priority-35 projects are not grouped by developer order. */
function deterministicMixKey(project: any): number {
  const slug = (project?.slug || '').toString();
  const id = project?.id != null ? String(project.id) : '';
  const s = `${id}:${slug}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Unit type codes: statistics.units / .villas / .transactions use these keys.
 * 110=Studio(0), 111=1BR, 112=2BR, 113=3BR, 114=4BR, 115=5BR, 116=6BR, 117=7BR.
 * 164=penthouse (count as 0 for min filter), 462=villa (count as 2 for safety).
 */
const UNIT_CODE_TO_BEDROOMS: Record<string, number> = {
  '110': 0, '111': 1, '112': 2, '113': 3, '114': 4, '115': 5, '116': 6, '117': 7,
  '164': 0, '462': 2,
};

/** Returns max bedroom count from statistics (units, villas, or transactions). So "1 Bedroom" = show projects with max >= 1. */
function getProjectBedrooms(project: any): number {
  let maxBedrooms = 0;
  const consider = (obj: Record<string, unknown> | null | undefined) => {
    if (!obj || typeof obj !== 'object') return;
    for (const key of Object.keys(obj)) {
      const br = UNIT_CODE_TO_BEDROOMS[key];
      if (br !== undefined && br > maxBedrooms) maxBedrooms = br;
    }
  };
  consider(project?.statistics?.units);
  consider(project?.statistics?.villas);
  consider(project?.statistics?.transactions);
  return maxBedrooms;
}

/** Returns true if project has at least one unit type with this many bedrooms (for exact "1 BR only" style filter). */
function projectHasBedroomOption(project: any, minBedrooms: number): boolean {
  if (minBedrooms < 0) return true;
  const consider = (obj: Record<string, unknown> | null | undefined) => {
    if (!obj || typeof obj !== 'object') return false;
    for (const key of Object.keys(obj)) {
      const br = UNIT_CODE_TO_BEDROOMS[key];
      if (br !== undefined && br >= minBedrooms) return true;
    }
    return false;
  };
  return consider(project?.statistics?.units) || consider(project?.statistics?.villas) || consider(project?.statistics?.transactions);
}

function getProjectAreaSqFt(project: any): { min: number; max: number } {
  const sources = [
    project?.statistics?.units,
    project?.statistics?.villas,
    project?.statistics?.transactions,
  ];
  let minAreaM2 = Infinity;
  let maxAreaM2 = 0;

  for (const source of sources) {
    if (!source || typeof source !== 'object') continue;
    for (const unitData of Object.values(source as Record<string, any>)) {
      if (!unitData || typeof unitData !== 'object') continue;
      const areaFrom = Number((unitData as any).area_from ?? 0);
      const areaTo = Number((unitData as any).area_to ?? 0);
      if (areaFrom > 0) minAreaM2 = Math.min(minAreaM2, areaFrom);
      if (areaTo > 0) maxAreaM2 = Math.max(maxAreaM2, areaTo);
    }
  }

  const minSqFt = minAreaM2 !== Infinity && minAreaM2 > 0 ? Math.round(minAreaM2 * 10.764) : 0;
  const maxSqFt = maxAreaM2 > 0 ? Math.round(maxAreaM2 * 10.764) : minSqFt;
  return { min: minSqFt, max: maxSqFt };
}

function textContainsAny(text: string, keywords: string[]): boolean {
  const t = (text || '').toLowerCase();
  return keywords.some((k) => t.includes(k.toLowerCase()));
}

function projectSlugTitleDistrict(project: any): string {
  const s = (project.slug || '').toString().toLowerCase();
  const t = (project.title || '').toString().toLowerCase();
  const d = (project.district?.title || project.district || '').toString().toLowerCase();
  return `${s} ${t} ${d}`;
}

function normalizeProjectLabel(value: string): string {
  return (value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function getCategoryPriorityRank(project: any, category: string | null): number {
  if (!category) return Number.MAX_SAFE_INTEGER;
  const key = category.toLowerCase();
  const priorityList = TOP_CATEGORY_PROJECT_PRIORITY[key];
  if (!Array.isArray(priorityList) || priorityList.length === 0) return Number.MAX_SAFE_INTEGER;
  const title = normalizeProjectLabel((project?.title || '').toString());
  const slug = normalizeProjectLabel((project?.slug || '').toString());
  const slugRaw = (project?.slug || '').toString().toLowerCase();
  const titleRaw = (project?.title || '').toString().toLowerCase();
  for (let i = 0; i < priorityList.length; i += 1) {
    const p = normalizeProjectLabel(priorityList[i] || '');
    if (!p) continue;
    if (title.includes(p) || slug.includes(p)) return i;
    if (p.length >= 4 && (slugRaw.includes(p) || titleRaw.includes(p))) return i;
  }
  // Luxury: "All Omniyat projects" — match builder when slug/title do not contain "omniyat"
  if (key === 'luxury') {
    const omniyatIdx = priorityList.findIndex((x) => normalizeProjectLabel((x || '').toString()) === 'omniyat');
    if (omniyatIdx >= 0 && developerMatchesCategory((project?.builder || '').toString(), ['omniyat', 'Omniyat', 'أومنيات'])) {
      return omniyatIdx;
    }
  }
  return Number.MAX_SAFE_INTEGER;
}

export function isCategoryPriorityProject(project: any, category: string | null): boolean {
  return getCategoryPriorityRank(project, category) !== Number.MAX_SAFE_INTEGER;
}

export function isAffordableProjectEligible(project: any): boolean {
  const startingPrice = project?.statistics?.total?.price_from ?? project?.statistics?.total?.price_to ?? 0;
  const hasOneBedroomOption = projectHasBedroomOption(project, 1);
  return startingPrice > 0 && startingPrice <= AFFORDABLE_MAX && hasOneBedroomOption;
}

export function getProjectCategory(project: any): string {
  const slug = (project.slug || '').toString().toLowerCase().trim();
  const combined = projectSlugTitleDistrict(project);
  const builder = (project.builder || '').toString();
  const priceFrom = project.statistics?.total?.price_from ?? project.statistics?.total?.price_to ?? 0;

  if (OFFICE_SET.has(slug)) return 'Office';
  if (textContainsAny(combined, OFFICE_KEYWORDS)) return 'Office';
  if (COMMERCIAL_SET.has(slug)) return 'Commercial';
  if (textContainsAny(combined, COMMERCIAL_KEYWORDS)) return 'Commercial';
  // Waterfront: explicit list (curated) + stored description mentions waterfront/lagoon
  if (WATERFRONT_PROJECT_SLUGS.has(slug)) return 'Waterfront';
  if (descriptionContainsWaterfrontOrLagoon(project.slug)) return 'Waterfront';
  if (developerMatchesCategory(builder, LUXURY_DEV_NAMES)) return 'Luxury';
  if (isAffordableProjectEligible(project)) return 'Affordable';
  return 'Off-Plan';
}

/**
 * Whether a project appears under a category tab — same rules as static API category filter.
 */
export function projectMatchesTabFilter(
  project: any,
  tab: string,
  luxuryBuilders5M: Set<string>
): boolean {
  const cat = tab.toLowerCase();
  if (cat === 'affordable') {
    return isAffordableProjectEligible(project);
  }
  if (cat === 'luxury') {
    if (isCategoryPriorityProject(project, cat)) return true;
    const builder = (project.builder || '').toString().trim();
    const slug = (project.slug || '').toString().toLowerCase().trim();
    if (LUXURY_EXCLUDE_SLUGS.has(slug)) return false;
    if (LUXURY_EXCLUDE_SLUG_CONTAINS.some((sub) => slug.includes(sub))) return false;
    const priceFrom = project.statistics?.total?.price_from ?? 0;
    const isLuxuryByDeveloper = developerMatchesCategory(builder, LUXURY_DEV_NAMES);
    const isLuxury5M = luxuryBuilders5M.has(builder);
    const isLuxuryAllowlist =
      LUXURY_PROJECT_SLUGS.has(slug) ||
      LUXURY_PROJECT_SLUG_CONTAINS.some((sub) => slug.includes(sub));
    const isLuxuryByPrice = priceFrom >= LUXURY_MIN_PRICE_AED;
    return (
      isLuxuryByDeveloper || isLuxury5M || isLuxuryAllowlist || isLuxuryByPrice
    );
  }
  if (isCategoryPriorityProject(project, cat)) return true;
  return getProjectCategory(project).toLowerCase() === cat;
}

function transformProject(project: any) {
  const stats = project.statistics?.total || {};
  const minPrice = stats.price_from || 0;
  const maxPrice = stats.price_to || 0;
  const photos = Array.isArray(project.photos) ? project.photos : [];
  const mainImage = getMainImage(project);
  const gallery = photos
    .map((p: any) => (typeof p === 'string' ? p : (p?.src || p?.logo)))
    .filter((src: string) => src && src !== mainImage);

  let readyDate = project.construction_inspection_date;
  if (readyDate && typeof readyDate === 'string') {
    const match = readyDate.match(/(\d{4})-(\d{2})/);
    if (match) readyDate = `Q${Math.ceil(parseInt(match[2], 10) / 3)} ${match[1]}`;
  }

  const category = (project as any)._category !== undefined ? (project as any)._category : getProjectCategory(project);
  const cityId = project.city_id;
  const lat = project.latitude;
  const lng = project.longitude;
  const bedrooms = getProjectBedrooms(project);
  const area = getProjectAreaSqFt(project);

  return {
    id: project.id,
    slug: project.slug,
    title: stripPropertyNumberFromTitle(project.title || ''),
    type: getProjectType(project),
    category,
    price: minPrice || maxPrice,
    minPrice,
    maxPrice,
    mainImage: mainImage ?? null,
    gallery,
    location: (project.district?.title || project.district || '') || '',
    locality: (project.district?.title || project.district || '') || '',
    city: getCityName(cityId),
    developer: project.builder || '',
    readyDate: readyDate || null,
    latitude: lat != null && !isNaN(Number(lat)) ? Number(lat) : null,
    longitude: lng != null && !isNaN(Number(lng)) ? Number(lng) : null,
    bedrooms,
    area: area.min || undefined,
    areaMin: area.min || undefined,
    areaMax: area.max || undefined,
  };
}

/** Normalize type query: "ready" | "off-plan" | "off plan" */
function normalizeTypeParam(typeParam: string | null): 'Ready' | 'Off-Plan' | null {
  if (!typeParam || typeof typeParam !== 'string') return null;
  const t = typeParam.trim().toLowerCase().replace(/\s+/g, '-');
  if (t === 'ready') return 'Ready';
  if (t === 'off-plan' || t === 'offplan') return 'Off-Plan';
  return null;
}

export type CredencePipelineResult = {
  items: any[];
  category: string | undefined;
  sortBy: 'min_price' | 'max_price' | 'created_at' | 'updated_at' | undefined;
  sortOrder: 'asc' | 'desc';
  limit: number;
  page: number;
};

/**
 * Full credence static pipeline: same filters, sort, dedupe as /api/projects/static.
 * Use for building PropertyListing[] and for parity with credence-realtor.
 */
export function runCredencePipeline(searchParams: URLSearchParams): CredencePipelineResult {
  try {
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '9', 10)));
    const cityParam = searchParams.get('city')?.trim();
    const typeParam = searchParams.get('type')?.trim();
    const locality = searchParams.get('locality')?.trim().toLowerCase();
    const search = searchParams.get('search')?.trim().toLowerCase();
    const developer = searchParams.get('developer')?.trim().toLowerCase();
    const category = searchParams.get('category')?.trim();
    const bedroomsParam = searchParams.get('bedrooms');
    const minBedroomsNum = bedroomsParam ? parseInt(bedroomsParam, 10) : NaN;
    const minBedrooms = Number.isNaN(minBedroomsNum) || minBedroomsNum < 0 ? undefined : minBedroomsNum;
    const unitTypeParam = searchParams.get('unitType')?.trim().toLowerCase();
    const unitType = unitTypeParam === 'apartment' || unitTypeParam === 'villa' ? unitTypeParam : undefined;
    let minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!, 10) : undefined;
    let maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!, 10) : undefined;
    const minArea = searchParams.get('minArea') ? parseInt(searchParams.get('minArea')!, 10) : undefined;
    const maxArea = searchParams.get('maxArea') ? parseInt(searchParams.get('maxArea')!, 10) : undefined;
    const sortByParam = searchParams.get('sortBy')?.trim().toLowerCase();
    const sortOrderParam = searchParams.get('sortOrder')?.trim().toLowerCase();
    const sortBy: 'min_price' | 'max_price' | 'created_at' | 'updated_at' | undefined =
      sortByParam === 'min_price' || sortByParam === 'max_price' || sortByParam === 'created_at' || sortByParam === 'updated_at'
        ? (sortByParam as any)
        : undefined;
    const sortOrder: 'asc' | 'desc' = sortOrderParam === 'asc' ? 'asc' : 'desc';

    if (category && category.toLowerCase() === 'affordable' && AFFORDABLE_DEV_NAMES.length === 0) {
      const cap = AFFORDABLE_MAX;
      maxPrice = maxPrice !== undefined && maxPrice > 0 ? Math.min(maxPrice, cap) : cap;
    }

    let items: any[] = (allDataJson as any)?.data?.items || [];

    // 1. Only allowed cities (1,2,3,5,7,14,52); if coords present they must be in UAE
    items = items.filter((p: any) => isProjectInAllowedCities(p));

    // 2. Remove 0 AED (price_from === 0 && price_to === 0)
    items = items.filter((p: any) => {
      const from = p.statistics?.total?.price_from ?? 0;
      const to = p.statistics?.total?.price_to ?? 0;
      return from > 0 || to > 0;
    });

    // 2b. Only show properties that have a stored description, except luxury allowlist (they may have empty desc)
    items = items.filter((p: any) => {
      if (hasStoredDescription(p.slug)) return true;
      const slug = (p.slug || '').toString().toLowerCase().trim();
      return LUXURY_PROJECT_SLUGS.has(slug) || LUXURY_PROJECT_SLUG_CONTAINS.some((sub) => slug.includes(sub));
    });

    // 2c. Build set of developers (builders) whose starting point is 5M+ (min price across all their projects)
    const builderMinPrice = new Map<string, number>();
    for (const p of items) {
      const b = (p.builder || '').toString().trim();
      if (!b) continue;
      const priceFrom = p.statistics?.total?.price_from ?? 0;
      if (priceFrom <= 0) continue;
      const current = builderMinPrice.get(b);
      if (current === undefined) builderMinPrice.set(b, priceFrom);
      else builderMinPrice.set(b, Math.min(current, priceFrom));
    }
    const luxuryBuilders5M = new Set<string>();
    builderMinPrice.forEach((minP, builder) => {
      if (minP >= LUXURY_MIN_PRICE_AED) luxuryBuilders5M.add(builder);
    });

    // 3. City filter (by city_id in data — for UI filter; location still determined by lat/long)
    const filterCityId = getCityIdFromParam(cityParam ?? undefined);
    if (filterCityId !== null) {
      items = items.filter((p: any) => {
        const cid = p.city_id != null ? (typeof p.city_id === 'string' ? parseInt(p.city_id, 10) : p.city_id) : null;
        return cid === filterCityId;
      });
    }

    // 4. Type filter (ready / off-plan)
    const filterType = normalizeTypeParam(typeParam ?? null);
    if (filterType !== null) {
      items = items.filter((p: any) => getProjectType(p) === filterType);
    }

    // 5. Remaining filters: category, locality, search, developer, minPrice, maxPrice
    if (category && category !== 'All') {
      const cat = category.toLowerCase();
      if (cat === 'luxury') {
        items = items.filter((p: any) => {
          if (isCategoryPriorityProject(p, cat)) {
            (p as any)._category = 'Luxury';
            return true;
          }
          const builder = (p.builder || '').toString().trim();
          const slug = (p.slug || '').toString().toLowerCase().trim();
          if (LUXURY_EXCLUDE_SLUGS.has(slug)) return false;
          if (LUXURY_EXCLUDE_SLUG_CONTAINS.some((sub) => slug.includes(sub))) return false;
          const priceFrom = p.statistics?.total?.price_from ?? 0;
          const isLuxuryByDeveloper = developerMatchesCategory(builder, LUXURY_DEV_NAMES);
          const isLuxury5M = luxuryBuilders5M.has(builder);
          const isLuxuryAllowlist = LUXURY_PROJECT_SLUGS.has(slug) || LUXURY_PROJECT_SLUG_CONTAINS.some((sub) => slug.includes(sub));
          const isLuxuryByPrice = priceFrom >= LUXURY_MIN_PRICE_AED;
          (p as any)._category = 'Luxury';
          return isLuxuryByDeveloper || isLuxury5M || isLuxuryAllowlist || isLuxuryByPrice;
        });
        // Order is applied in the final sort (category pins → 35 developer priority → description)
      } else if (cat === 'affordable') {
        items = items.filter((p: any) => {
          const isAffordableByRule = isAffordableProjectEligible(p);
          (p as any)._category = 'Affordable';
          return isAffordableByRule;
        });
      } else {
        items = items.filter((p: any) => {
          if (isCategoryPriorityProject(p, cat)) {
            (p as any)._category = category;
            return true;
          }
          const projectCat = getProjectCategory(p);
          (p as any)._category = projectCat;
          return projectCat.toLowerCase() === cat;
        });
      }
    }

    if (locality) {
      items = items.filter(
        (p: any) =>
          p.district?.title?.toLowerCase().includes(locality) ||
          p.district?.title?.toLowerCase() === locality
      );
    }

    if (search) {
      items = items.filter(
        (p: any) =>
          (p.slug && (p.slug as string).toLowerCase().includes(search)) ||
          p.title?.toLowerCase().includes(search) ||
          p.builder?.toLowerCase().includes(search) ||
          p.district?.title?.toLowerCase().includes(search)
      );
    }

    if (developer) {
      items = items.filter((p: any) => {
        const b = p.builder && typeof p.builder === 'string' ? p.builder.trim() : '';
        if (!b) return false;
        return developerFilterMatches(developer, b, b);
      });
    }

    if (minBedrooms !== undefined && minBedrooms >= 0) {
      items = items.filter((p: any) => projectHasBedroomOption(p, minBedrooms));
    }

    if (unitType === 'apartment') {
      items = items.filter((p: any) => getProjectBedrooms(p) <= 3);
    } else if (unitType === 'villa') {
      items = items.filter((p: any) => getProjectBedrooms(p) >= 4);
    }

    if (minPrice !== undefined && minPrice > 0) {
      items = items.filter((p: any) => {
        const priceFrom = p.statistics?.total?.price_from ?? 0;
        const priceTo = p.statistics?.total?.price_to ?? 0;
        const floorPrice = priceFrom > 0 ? priceFrom : priceTo;
        return floorPrice >= minPrice;
      });
    }
    if (maxPrice !== undefined && maxPrice > 0) {
      items = items.filter((p: any) => {
        const priceFrom = p.statistics?.total?.price_from ?? 0;
        const priceTo = p.statistics?.total?.price_to ?? 0;
        const ceilingPrice = priceTo > 0 ? priceTo : priceFrom;
        return ceilingPrice <= maxPrice;
      });
    }
    if (minArea !== undefined && minArea > 0) {
      items = items.filter((p: any) => {
        const area = getProjectAreaSqFt(p);
        return area.max >= minArea;
      });
    }
    if (maxArea !== undefined && maxArea > 0) {
      items = items.filter((p: any) => {
        const area = getProjectAreaSqFt(p);
        return area.min <= maxArea;
      });
    }

    // Dedupe by canonical project name
    const canonicalTitle = (t: string) => (t || '').replace(/\s+\d+$/, '').trim() || (t || '');
    const seen = new Set<string>();
    items = items.filter((p: any) => {
      const can = canonicalTitle(p.title || '').toLowerCase();
      if (seen.has(can)) return false;
      seen.add(can);
      return true;
    });

    // 6. Sorting: 35 priority developers first → others last → category pins → mixed order within priority-35
    //    (deterministic hash, not Emaar-then-Nakheel) → non-priority still by dev rank tie-break → price/date or description
    if (sortBy) {
      items.sort((a: any, b: any) => {
        const bucketA = isPriorityDeveloperProject(a?.builder || '') ? 0 : 1;
        const bucketB = isPriorityDeveloperProject(b?.builder || '') ? 0 : 1;
        if (bucketA !== bucketB) return bucketA - bucketB;
        const rankA = getCategoryPriorityRank(a, category ?? null);
        const rankB = getCategoryPriorityRank(b, category ?? null);
        if (rankA !== rankB) return rankA - rankB;
        if (bucketA === 0 && bucketB === 0) {
          const mixA = deterministicMixKey(a);
          const mixB = deterministicMixKey(b);
          if (mixA !== mixB) return mixA - mixB;
        } else {
          const devA = getPreferredDeveloperRank(a?.builder || '');
          const devB = getPreferredDeveloperRank(b?.builder || '');
          if (devA !== devB) return devA - devB;
        }
        let aValue = 0;
        let bValue = 0;
        if (sortBy === 'min_price') {
          aValue = Number(a?.statistics?.total?.price_from ?? a?.statistics?.total?.price_to ?? 0);
          bValue = Number(b?.statistics?.total?.price_from ?? b?.statistics?.total?.price_to ?? 0);
        } else if (sortBy === 'max_price') {
          aValue = Number(a?.statistics?.total?.price_to ?? a?.statistics?.total?.price_from ?? 0);
          bValue = Number(b?.statistics?.total?.price_to ?? b?.statistics?.total?.price_from ?? 0);
        } else {
          const aDate = sortBy === 'created_at' ? a?.created_at : a?.updated_at;
          const bDate = sortBy === 'created_at' ? b?.created_at : b?.updated_at;
          const aParsed = Date.parse(aDate || '');
          const bParsed = Date.parse(bDate || '');
          // Static dataset has no created/updated fields; fallback to project id as a deterministic recency proxy.
          aValue = Number.isFinite(aParsed) ? aParsed : Number(a?.id ?? 0);
          bValue = Number.isFinite(bParsed) ? bParsed : Number(b?.id ?? 0);
        }
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      });
    } else {
      // Default ranking keeps richer records first.
      items.sort((a: any, b: any) => {
        const bucketA = isPriorityDeveloperProject(a?.builder || '') ? 0 : 1;
        const bucketB = isPriorityDeveloperProject(b?.builder || '') ? 0 : 1;
        if (bucketA !== bucketB) return bucketA - bucketB;
        const rankA = getCategoryPriorityRank(a, category ?? null);
        const rankB = getCategoryPriorityRank(b, category ?? null);
        if (rankA !== rankB) return rankA - rankB;
        if (bucketA === 0 && bucketB === 0) {
          const mixA = deterministicMixKey(a);
          const mixB = deterministicMixKey(b);
          if (mixA !== mixB) return mixA - mixB;
        } else {
          const devA = getPreferredDeveloperRank(a?.builder || '');
          const devB = getPreferredDeveloperRank(b?.builder || '');
          if (devA !== devB) return devA - devB;
        }
        const slugA = (a.slug || '').toString().trim();
        const slugB = (b.slug || '').toString().trim();
        const hasA = hasStoredDescription(slugA) ? 1 : 0;
        const hasB = hasStoredDescription(slugB) ? 1 : 0;
        return hasB - hasA;
      });
    }

    return { items, category, sortBy, sortOrder, limit, page };
  } catch (error) {
    console.error('Error in credence pipeline:', error);
    throw error;
  }
}

/** All projects (no pagination) after the same pipeline as credence — for ARK listings page. */
export function getCredenceAllProjectsRawSorted(
  searchParams: URLSearchParams = new URLSearchParams()
): any[] {
  return runCredencePipeline(searchParams).items;
}

export type CredenceStaticApiResponse = {
  success: boolean;
  message: string;
  data: ReturnType<typeof transformProject>[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
  error?: string;
};

export function executeCredenceProjectsQuery(
  searchParams: URLSearchParams
): CredenceStaticApiResponse {
  try {
    const { items, category, sortBy, sortOrder, limit, page } =
      runCredencePipeline(searchParams);
    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const pageItems = items.slice(start, start + limit);
    const transformed = pageItems.map(transformProject);
    return {
      success: true,
      message: 'Projects fetched',
      data: transformed,
      pagination: { page, limit, total, totalPages },
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch projects',
      data: [],
      pagination: { page: 1, limit: 9, total: 0, totalPages: 0 },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
