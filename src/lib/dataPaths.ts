import path from "node:path";

/** Root-relative data directory (JSON sources live under `src/data`). */
export const DATA_DIR = path.join(process.cwd(), "src", "data");

export const ALL_DATA_UAE_EN_JSON = path.join(DATA_DIR, "all_data_uae_en.json");
export const DESCRIPTIONS_JSON = path.join(DATA_DIR, "descriptions.json");
