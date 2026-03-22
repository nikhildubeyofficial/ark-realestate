/**
 * Developer priority order (1 = highest) — aligned with business focus list.
 * Used for sorting, filters, and heatmap emphasis.
 */
export const PRIORITY_DEVELOPERS = [
  "EMAAR",
  "NAKHEEL",
  "DUBAI HOLDING",
  "MEERAS",
  "OMNIYAT",
  "AZIZI",
  "DAMAC",
  "BINGHATTI",
  "DANUBE",
  "ELLINGTON",
  "BEYOND",
  "ARADA",
  "IMTIAZ",
  "SOBHA",
  "HEART OF EUROPE",
  "UNION",
  "SELECT GROUP",
  "SEVEN TIDES",
  "REPORTAGE",
  "MAJID AL FUTTAIM",
  "OBJECT 1",
  "SAMANA",
  "DUGASTA",
  "LEOS",
  "HRE",
  "DEYAAR",
  "ZABEEL",
  "EXPO CITY DEVELOPER",
  "DUBAI SOUTH DEVELOPER",
  "OHANA",
  "TIGER",
  "AMIS",
  "GULF LAND DEVELOPER",
  "AQUA",
  "VINCITORE",
] as const;

/** Every word in the rule must appear in the normalized builder string (lowercase). */
const DEV_MATCH_RULES: string[][] = [
  ["emaar"],
  ["nakheel"],
  ["dubai", "holding"],
  ["meeras"],
  ["omniyat"],
  ["azizi"],
  ["damac"],
  ["binghatti"],
  ["danube"],
  ["ellington"],
  ["beyond"],
  ["arada"],
  ["imtiaz"],
  ["sobha"],
  ["heart", "europe"],
  ["union"],
  ["select", "group"],
  ["seven", "tides"],
  ["reportage"],
  ["majid", "futtaim"],
  ["object"],
  ["samana"],
  ["dugasta"],
  ["leos"],
  ["hre"],
  ["deyaar"],
  ["zabeel"],
  ["expo", "city"],
  ["dubai", "south"],
  ["ohana"],
  ["tiger"],
  ["amis"],
  ["gulf", "land"],
  ["aqua"],
  ["vincitore"],
];

function norm(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function matchesRuleIndex(b: string, i: number): boolean {
  if (i === 17)
    return (
      (b.includes("seven") && b.includes("tides")) ||
      b.includes("srg")
    );
  if (i === 20) return b.includes("object");
  if (i === 25) return b.includes("deyaar") || b.includes("deyar");
  const rule = DEV_MATCH_RULES[i];
  if (!rule) return false;
  return rule.every((w) => b.includes(w));
}

/** Match builder to one of the 35 priority rows (used for index). */
export function developerPriorityIndex(builder: string): number {
  const b = norm(builder);
  for (let i = 0; i < DEV_MATCH_RULES.length; i++) {
    if (matchesRuleIndex(b, i)) return i;
  }
  return 999;
}

/** Filter chip label: "All" or one of PRIORITY_DEVELOPERS. */
export function listingMatchesPriorityDeveloper(
  builder: string,
  filterLabel: string
): boolean {
  if (!filterLabel || filterLabel === "All") return true;
  const idx = PRIORITY_DEVELOPERS.indexOf(
    filterLabel as (typeof PRIORITY_DEVELOPERS)[number]
  );
  if (idx < 0) return norm(builder).includes(norm(filterLabel));
  const b = norm(builder);
  return matchesRuleIndex(b, idx);
}

/** Short English labels for heatmap markers. */
export function heatPointLabelForPriority(index: number): string {
  const full = PRIORITY_DEVELOPERS[index];
  if (!full) return "DEV";
  const words = full.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0]!.slice(0, 10).toUpperCase();
  return words
    .map((w) => w[0])
    .join("")
    .slice(0, 8)
    .toUpperCase();
}

/** Home section: All + first N developers in priority order (horizontal scroll). */
export const HOME_DEVELOPER_CHIP_COUNT = 12;

export function getHomeDeveloperChips(): string[] {
  return [
    "All",
    ...PRIORITY_DEVELOPERS.slice(0, HOME_DEVELOPER_CHIP_COUNT),
  ];
}

/** Heat / filter: point name matches priority chip label. */
export function heatPointMatchesPriorityFilter(
  pointName: string,
  filterLabel: string
): boolean {
  if (!filterLabel || filterLabel === "All") return true;
  return norm(pointName) === norm(filterLabel);
}
