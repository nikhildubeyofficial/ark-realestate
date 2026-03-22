/** Aligned with credence-realtor `staticPropertyData` CITY_NAME_TO_ID. */
export const CITY_NAME_TO_ID: Record<string, number> = {
  dubai: 1,
  "abu dhabi": 2,
  sharjah: 3,
  ajman: 7,
  "ras al khaimah": 5,
  fujairah: 52,
  "umm al quwain": 14,
};

export function getCityIdFromParam(
  cityParam: string | null | undefined
): number | null {
  if (!cityParam || typeof cityParam !== "string") return null;
  const normalized = cityParam.trim().toLowerCase().replace(/_/g, " ");
  return CITY_NAME_TO_ID[normalized] ?? null;
}
