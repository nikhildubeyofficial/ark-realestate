/** Area guide entries — Dubai communities (Credence-style reference content). */
export type AreaGuideBase = {
  slug: string;
  title: string;
  excerpt: string;
  /** Pre-fill search on /featured */
  searchKeyword: string;
  /** District / area fragment for `locality` filter (Credence-style area scoping). */
  localityMatch: string;
};

/** Resolved on the server with project images from `all_data_uae_en.json`. */
export type AreaGuide = AreaGuideBase & {
  image: string;
};

export const AREA_GUIDE_ENTRIES: AreaGuideBase[] = [
  {
    slug: "downtown-dubai",
    title: "Downtown Dubai",
    excerpt:
      "Burj Khalifa, Dubai Mall, and world-class dining — the definitive urban luxury address.",
    searchKeyword: "Downtown",
    localityMatch: "Downtown",
  },
  {
    slug: "dubai-marina",
    title: "Dubai Marina",
    excerpt:
      "Waterfront towers, yacht life, and a vibrant promenade with marina views.",
    searchKeyword: "Marina",
    localityMatch: "Dubai Marina",
  },
  {
    slug: "palm-jumeirah",
    title: "Palm Jumeirah",
    excerpt:
      "Iconic fronds, beachfront estates, and ultra-limited off-plan releases.",
    searchKeyword: "Palm",
    localityMatch: "Jumeirah Palm",
  },
  {
    slug: "business-bay",
    title: "Business Bay",
    excerpt:
      "Canal-side living with strong rental demand and quick access to Downtown.",
    searchKeyword: "Business Bay",
    localityMatch: "Business Bay",
  },
  {
    slug: "emaar-beachfront",
    title: "Emaar Beachfront",
    excerpt:
      "Private beach access and high-rise living between Dubai Marina and Palm.",
    searchKeyword: "Beachfront",
    localityMatch: "Marina",
  },
  {
    slug: "creek-harbour",
    title: "Dubai Creek Harbour",
    excerpt:
      "Waterfront masterplan with skyline views and long-term growth story.",
    searchKeyword: "Creek",
    localityMatch: "Dubai Creek Harbour",
  },
];
