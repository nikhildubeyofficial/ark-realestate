import recentLaunchesJson from "@/data/recent-launches.json";

/** Project IDs aligned with credence-realtor `recent-launches.json` (order preserved). */
export const RECENT_LAUNCH_IDS = (
  recentLaunchesJson as { id: number }[]
).map((x) => x.id);
