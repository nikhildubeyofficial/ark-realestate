/**
 * Match UI developer filter labels to JSON `builder` strings and heatmap point names.
 */

export const DEVELOPER_FILTERS = [
  "All",
  "Damac",
  "Emaar",
  "Shobha Realty",
  "Nakheel",
  "Dubai Properties",
  "Ellington",
  "Danube",
  "Omniyat",
  "Deyaar",
] as const;

export type DeveloperFilter = (typeof DEVELOPER_FILTERS)[number];

function norm(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

/** True if listing.builder matches the selected filter chip. */
export function listingMatchesDeveloperFilter(
  builder: string,
  filter: string
): boolean {
  if (!filter || filter === "All") return true;
  const b = norm(builder);
  switch (filter) {
    case "Damac":
      return b.includes("damac");
    case "Emaar":
      return b.includes("emaar");
    case "Shobha Realty":
      return b.includes("shobha");
    case "Nakheel":
      return b.includes("nakheel");
    case "Dubai Properties":
      return (
        b.includes("dubai properties") ||
        b.includes("dubai property") ||
        (b.includes("dubai") && b.includes("propert"))
      );
    case "Ellington":
      return b.includes("ellington");
    case "Danube":
      return b.includes("danube");
    case "Omniyat":
      return b.includes("omniyat");
    case "Deyaar":
      return b.includes("deyaar") || b.includes("deyar");
    default:
      return b.includes(norm(filter));
  }
}

/** True if aggregated heat point label matches the filter (heatmap uses shortened names). */
export function heatPointMatchesFilter(pointName: string, filter: string): boolean {
  if (!filter || filter === "All") return true;
  const p = norm(pointName);
  switch (filter) {
    case "Shobha Realty":
      return p.includes("shobha");
    case "Dubai Properties":
      return p.includes("dubai") && p.includes("propert");
    case "Deyaar":
      return p.includes("deyaar") || p.includes("deyar");
    default:
      return p.includes(norm(filter).split(" ")[0] ?? "");
  }
}
