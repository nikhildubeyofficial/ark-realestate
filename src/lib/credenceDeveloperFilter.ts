/**
 * Developer name matching & 35-developer priority (credence-realtor parity).
 * Pure logic — no Node `fs` — safe to import from Client Components.
 */
import categoriesConfig from "@/data/propertyCategories.config.json";

const PRIORITY_DEVELOPER_NAMES = (
  (categoriesConfig as { priorityDeveloperNames?: string[] })
    .priorityDeveloperNames ?? []
)
  .map((s) => (s || "").toLowerCase().trim())
  .filter(Boolean);

/** Normalize developer/builder for comparison: lowercase, drop common suffixes. */
function normalizeDeveloperName(name: string): string {
  return (name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+(properties|development|group|holding|holdings|llc|llc\.?)$/i, "")
    .trim();
}

/**
 * Builder strings as they appear in all_data.json (Arabic/Urdu/English) per developer.
 */
const BUILDERS_BY_DEVELOPER: Record<string, string[]> = {
  emaar: ["إمار", "امار", "emaar", "Emaar", "Emaar Properties"],
  nakheel: ["نخيلهيل", "نخيل", "nakheel", "Nakheel"],
  meraas: ["مراس", "ميراس", "meraas", "Meraas", "MEERAS", "meeras", "Meeras"],
  "dubai properties": [
    "مجموعة دبي للعقارات",
    "دبي الجنوب للعقارات دي دبليو سي ش.ذ.م.م",
    "دبي الجنوب",
    "مجموعة دبي",
    "Dubai Properties",
  ],
  damac: ["داماك", "damac", "Damac", "DAMAC"],
  sobha: ["سوبها", "سوبا", "sobha", "Sobha", "SOBHA"],
  aldar: ["الدار", "aldar", "Aldar", "ALDAR"],
  azizi: ["عزيزي", "azizi", "Azizi", "AZIZI"],
  ellington: ["إلينغتون", "الينغتون", "ellington", "Ellington"],
  "majid al futtaim": [
    "ماجد للتطوير",
    "ماجد الفطيم",
    "ماجد",
    "Majid Al Futtaim",
    "majid al futtaim",
  ],
  binghatti: ["بينغهاتي", "binghatti", "Binghatti", "bingati"],
  imtiaz: ["ايمتياز", "امتياز", "imtiaz", "Imtiaz", "imtiyaz"],
  omniyat: ["أومنيات", "omniyat", "Omniyat"],
  "hre development": ["HRE Development", "HRE", "hre development"],
  arada: ["arada", "ARADA", "Arada"],
  beyond: ["beyond", "Beyond"],
  danube: ["danube", "Danube"],
  "dubai south": ["Dubai South", "dubai south"],
  "expo city": ["Expo City", "expo city"],
  reportage: ["reportage", "Reportage"],
  "select group": ["Select Group", "select group"],
  "union properties": ["Union Properties", "union properties", "Union"],
  union: ["Union Properties", "union properties", "Union"],
  nabni: ["nabni", "Nabni"],
  "seven tides": [
    "Seven Tides",
    "seven tides",
    "SRG",
    "srg",
    "Seven Tides Real Estate",
  ],
  srg: ["SRG", "srg", "Seven Tides", "seven tides"],
};

function normalizeArabicForMatch(s: string): string {
  return (s || "")
    .trim()
    .replace(/\u0640/g, "")
    .replace(/[\u0622\u0623\u0625\u0627\u0671]/g, "\u0627")
    .replace(/\u0649/g, "\u064a")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function getBuilderAliasesForDeveloper(developerParam: string): string[] {
  const paramNorm = normalizeDeveloperName(developerParam);
  const firstWord = paramNorm.split(/\s+/)[0] || paramNorm;
  const list =
    BUILDERS_BY_DEVELOPER[paramNorm] ??
    BUILDERS_BY_DEVELOPER[firstWord] ??
    [];
  return list.map((b) => b.trim()).filter(Boolean);
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

function priorityDeveloperTokens(entry: string): string[] {
  const key = (entry || "").toLowerCase().trim();
  const extras: Record<string, string[]> = {
    "dubai holding": ["dubai holding", "dubai holdings", "dubai holding real estate"],
    meraas: ["meraas", "meeras", "MEERAS", "Meraas", "Meeras"],
    binghatti: ["binghatti", "bingati", "Binghatti"],
    imtiaz: ["imtiaz", "imtiyaz", "Imtiaz"],
    union: ["union", "union properties", "Union Properties"],
    "seven tides": [
      "seven tides",
      "Seven Tides",
      "srg",
      "SRG",
      "Seven Tides Real Estate",
    ],
    "majid al futtaim": ["majid al futtaim", "majid al-futtaim", "Majid Al Futtaim"],
    "object 1": ["object 1", "object1", "object one", "Object 1"],
    "expo city": ["expo city", "expo city developer", "Expo City"],
    "dubai south": ["dubai south", "dubai south developer", "Dubai South"],
    "gulf land": ["gulf land", "gulf land developer", "Gulf Land"],
  };
  return extras[key] ?? [entry];
}

export function getPreferredDeveloperRank(rawBuilder: string): number {
  const builder = (rawBuilder || "").toString();
  if (!builder.trim() || PRIORITY_DEVELOPER_NAMES.length === 0) return 9999;
  let best = 9999;
  for (let i = 0; i < PRIORITY_DEVELOPER_NAMES.length; i += 1) {
    const name = PRIORITY_DEVELOPER_NAMES[i];
    if (!name) continue;
    if (developerMatchesCategory(builder, priorityDeveloperTokens(name))) {
      if (i < best) best = i;
    }
  }
  return best;
}

export function isPriorityDeveloperProject(rawBuilder: string): boolean {
  return getPreferredDeveloperRank(rawBuilder) < 9999;
}

/** Match filter param against builder (Urdu/Arabic/English aliases). */
export function developerFilterMatches(
  developerParam: string,
  rawBuilder: string,
  translatedBuilder: string
): boolean {
  if (!rawBuilder || typeof rawBuilder !== "string") return false;
  const b = rawBuilder.trim();
  if (!b) return false;
  const paramNorm = normalizeDeveloperName(developerParam);
  const aliases = getBuilderAliasesForDeveloper(developerParam);
  const bNorm = normalizeArabicForMatch(b);
  if (aliases.length > 0) {
    for (const alias of aliases) {
      if (b === alias || b.includes(alias) || alias.includes(b)) return true;
      const aNorm = normalizeArabicForMatch(alias);
      if (
        bNorm &&
        aNorm &&
        (bNorm.includes(aNorm) || aNorm.includes(bNorm))
      ) {
        return true;
      }
    }
  }
  const displayNorm = normalizeDeveloperName(translatedBuilder || b);
  if (!displayNorm || !paramNorm) return false;
  const paramFirst = paramNorm.split(/\s+/)[0] || paramNorm;
  const displayFirst = displayNorm.split(/\s+/)[0] || displayNorm;
  return (
    displayNorm.includes(paramNorm) ||
    paramNorm.includes(displayNorm) ||
    displayNorm.includes(paramFirst) ||
    paramNorm.includes(displayFirst)
  );
}
