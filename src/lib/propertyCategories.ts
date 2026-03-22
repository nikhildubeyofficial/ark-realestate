const WATERFRONT_RE =
  /creek|harbour|harbor|palm|marina|beach|waterfront|lagoon|island|rashid|jebel|jumeirah|shore|bay|canal|coast|seaside|sea\s*view|lagoons?/i;

/** Heuristic: waterfront / coastal Dubai communities from title + location + excerpt. */
export function inferWaterfront(
  title: string,
  location: string,
  excerpt: string
): boolean {
  const blob = `${title} ${location} ${excerpt}`;
  return WATERFRONT_RE.test(blob);
}

export function inferPropertyKind(
  title: string
):
  | "apartment"
  | "villa"
  | "penthouse"
  | "townhouse"
  | "studio"
  | "other" {
  const t = title.toLowerCase();
  if (/\bstudio\b/.test(t)) return "studio";
  if (t.includes("penthouse")) return "penthouse";
  if (t.includes("townhouse") || t.includes("town house")) return "townhouse";
  if (t.includes("villa")) return "villa";
  if (
    t.includes("apartment") ||
    t.includes("flat") ||
    /\bapt\.?\b/.test(t)
  )
    return "apartment";
  return "other";
}

/** Below ~AED 1.5M — “affordable” tier from spreadsheet. */
export function isAffordablePrice(priceNumeric: number): boolean {
  return priceNumeric > 0 && priceNumeric < 1_500_000;
}
