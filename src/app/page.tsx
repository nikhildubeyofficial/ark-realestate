import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import HomeBuyingKnowAccordion from "@/components/HomeBuyingKnowAccordion";
import HomeTopDevelopersSection from "@/components/HomeTopDevelopersSection";
import {
  getHeatPointsForDevelopers,
  getPropertyData,
  getPropertyListingsByProjectIds,
} from "@/lib/propertyData";
import { RECENT_LAUNCH_IDS } from "@/lib/recentLaunches";

/**
 * Home page — layout and copy aligned to Figma
 * Frame 367:423 (Real Estate Website Landing Page)
 */

const awards = [
  { title: "Team Recognition", imageKey: "awardTeam" as const },
  { title: "Awards & Certifications", imageKey: "awardTrophy" as const },
  { title: "Industry Milestones", imageKey: "awardMilestone" as const },
];

const exceptionalResidences = [
  { title: "Penthouse at Burj Khalifa", beds: 5, baths: 6, sqft: "12,500", location: "Downtown Dubai" },
  { title: "Signature Villa", beds: 3, baths: 4, sqft: "8,000", location: "Emirates Hills" },
  { title: "Marina View Residence", beds: 4, baths: 5, sqft: "10,000", location: "Dubai Marina" },
  { title: "Palm Jumeirah Estate", beds: 6, baths: 7, sqft: "15,000", location: "Palm Jumeirah" },
];

const blogPosts = [
  { title: "Prices in Dubai to Rise", excerpt: "From property viewings by private helicopter to seamless key handover — every detail considered." },
  { title: "Prices in Dubai to Rise", excerpt: "From property viewings by private helicopter to seamless key handover — every detail considered." },
  { title: "Prices in Dubai to Rise", excerpt: "From property viewings by private helicopter to seamless key handover — every detail considered." },
];

const awardsCopy =
  "At Ark Vision, we don't just sell properties, we curate opportunities. Whether you're an off-plan investor, a global buyer seeking a second home, or looking for rental yields, we guide you with transparency, insight, and uncompromising dedication.";

/** Place `hero.mp4` in `public/video/` (served at `/video/hero.mp4`). */
const HERO_VIDEO_SRC = "/video/hero.mp4";

// Curated Unsplash URLs — Dubai/luxury real estate to match Figma
const IMG = {
  hero:
    "https://images.unsplash.com/photo-1748373448914-1d7f882700e2?w=1440", // Burj Khalifa Dubai cityscape
  propertyVilla:
    "https://images.unsplash.com/photo-1757439402277-1a88c7abc89d?w=826", // Luxury villa pool
  propertyDubai:
    "https://images.unsplash.com/photo-1743191907875-d4e59e5df77d?w=826", // Burj Khalifa sunset
  propertySkyline:
    "https://images.unsplash.com/photo-1748373448914-1d7f882700e2?w=826", // Dubai skyline
  propertyInterior:
    "https://images.unsplash.com/photo-1760067537524-a0c0703d9721?w=826", // Modern living room
  blogFeatured:
    "https://images.unsplash.com/photo-1760067537524-a0c0703d9721?w=1214", // Luxury interior
  blogThumb:
    "https://images.unsplash.com/photo-1743191907875-d4e59e5df77d?w=348", // Dubai for thumbnails
  blogThumb2:
    "https://images.unsplash.com/photo-1757439402277-1a88c7abc89d?w=348",
  blogThumb3:
    "https://images.unsplash.com/photo-1760067537524-a0c0703d9721?w=348",
  awardTeam:
    "https://images.unsplash.com/photo-1752650735509-58f11eaa2e10?w=1200", // Team high-five
  awardTrophy:
    "https://images.unsplash.com/photo-1659080907103-1cabe53c5662?w=1200", // Trophy in hand
  awardMilestone:
    "https://images.unsplash.com/photo-1636435462738-4166c45015b3?w=1200", // Museum of the Future
  legacyBg:
    "https://images.unsplash.com/photo-1764212193268-dba11709dc38?w=2000", // Palm Jumeirah aerial
} as const;

const propertyImages = [IMG.propertyVilla, IMG.propertyDubai, IMG.propertySkyline, IMG.propertyInterior];
const leaderFiles = [
  "Ganesh.png",
  "DSC00435.JPG",
  "DSC00707.JPG",
  "DSC00716.JPG",
  "DSC00775.JPG",
  "Copy of DSC00350.JPG",
  "Copy of DSC00860.JPG",
  "WhatsApp Image 2026-03-23 at 5.34.39 PM.jpeg",
];

function titleFromFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/^copy of\s+/i, "")
    .replace(/^whatsapp image\s*/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const founders = leaderFiles.map((file) => ({
  name: titleFromFilename(file),
  image: `/Leaders/${encodeURIComponent(file)}`,
}));

export default async function HomePage() {
  const [heatPoints, listingsForDevelopers, recentLaunches] = await Promise.all([
    getHeatPointsForDevelopers(),
    getPropertyData(80),
    getPropertyListingsByProjectIds(RECENT_LAUNCH_IDS),
  ]);
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080808]">
      {/* Hero — responsive height; top bar lives in Header only */}
      <section className="relative min-h-[72dvh] w-full sm:min-h-[80dvh] lg:min-h-[900px]">
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="absolute inset-0 z-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#080808] via-black/55 to-black/20" />
        <div className="absolute left-0 right-0 top-0 z-[2] flex min-h-[inherit] items-start px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24 lg:px-20 lg:pb-24 lg:pt-20">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="max-w-[920px] text-left">
              <h1
                className="animate-hero-title font-serif text-[2.5rem] font-light italic leading-[1.08] tracking-tight text-white/[0.98] drop-shadow-[0_6px_40px_rgba(0,0,0,0.88)] sm:text-5xl sm:leading-[1.08] md:text-6xl md:leading-[1.06] lg:text-[4.5rem] lg:leading-[1.05]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Where Luxury Meets Vision
              </h1>
              <p className="animate-hero-sub mt-6 max-w-[640px] font-light text-white/[0.88] text-[0.95rem] leading-[1.75] sm:mt-8 sm:text-lg sm:leading-[1.7] md:text-xl md:leading-[1.65]">
                Dubai&apos;s most trusted authority in luxury real estate. Curating extraordinary
                residences for the world&apos;s most discerning individuals since 1998.
              </p>
              <div className="animate-hero-sub mt-8 flex flex-wrap gap-3">
                <Link
                  href="/featured"
                  className="border border-[#c9a84c] bg-[#c9a84c]/15 px-6 py-2.5 text-sm font-light text-[#c9a84c] transition hover:bg-[#c9a84c] hover:text-[#060606]"
                >
                  Explore listings
                </Link>
                <Link
                  href="/guide"
                  className="border border-white/25 px-6 py-2.5 text-sm font-light text-white/85 transition hover:border-[#c9a84c] hover:text-[#c9a84c]"
                >
                  Area guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee: not wrapped in Reveal so CSS animation runs immediately */}
      <section className="brand-marquee border-y border-white/5 bg-[#060606] py-10 md:py-12">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden px-5 md:px-20">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-24 bg-gradient-to-r from-[#060606] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-24 bg-gradient-to-l from-[#060606] to-transparent" />

          <div className="brand-marquee-track">
            {[
              { name: "Ellington", sub: "management group", style: "serif" as const },
              { name: "DEYAAR", sub: "", style: "block" as const },
              { name: "OMNIYAT", sub: "", style: "wide" as const },
              { name: "ARADA", sub: "", style: "block" as const },
              { name: "DAMAC", sub: "", style: "wide" as const },
            ]
              .concat([
                { name: "Ellington", sub: "management group", style: "serif" as const },
                { name: "DEYAAR", sub: "", style: "block" as const },
                { name: "OMNIYAT", sub: "", style: "wide" as const },
                { name: "ARADA", sub: "", style: "block" as const },
                { name: "DAMAC", sub: "", style: "wide" as const },
              ])
              .map((b, idx) => (
                <div
                  key={`${b.name}-${idx}`}
                  className="flex min-w-[180px] shrink-0 items-center justify-center text-white/90 md:min-w-[220px]"
                >
                  {b.style === "serif" ? (
                    <div className="text-center">
                      <div className="font-serif text-xl italic tracking-wide md:text-2xl">
                        {b.name}
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-[2px] text-white/50">
                        {b.sub}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div
                        className={`text-xl font-semibold md:text-2xl ${
                          b.style === "wide" ? "tracking-[6px]" : "tracking-[3px]"
                        }`}
                      >
                        {b.name}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Our Legacy / Why Ark Vision (inserted below brand marquee) */}
      <Reveal>
        <section className="relative overflow-hidden border-b border-white/5 bg-black">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${IMG.legacyBg})` }}
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />

          <div className="relative mx-auto max-w-[1440px] px-5 py-14 md:px-20 md:py-20">
            <div className="max-w-[760px]">
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
                <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                  Our Legacy
                </span>
              </div>
              <h2
                className="mt-4 font-serif text-4xl font-light italic leading-tight text-white/90 sm:text-5xl md:text-6xl"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Why Ark Vision{" "}
                <span className="text-[#c9a84c]">International Real</span>
                <br />
                <span className="text-[#c9a84c]">Estate</span>
              </h2>

              {/* DAMAC-style wordmark overlay */}
              <div className="pointer-events-none relative mt-8 h-[76px] w-full">
                <div className="absolute inset-0 flex items-center">
                  <p className="select-none text-[72px] font-semibold tracking-[6px] text-white/20 sm:text-[86px] md:text-[100px]">
                    DAMAC
                  </p>
                </div>
                <p className="absolute bottom-0 left-1 text-xs uppercase tracking-[4px] text-white/35">
                  masterful experiences
                </p>
              </div>

              <p className="mt-6 max-w-[680px] font-light text-white/60 text-sm leading-relaxed md:text-base">
                At Ark Vision, we don&apos;t just sell properties, we curate opportunities. Whether
                you&apos;re an off-plan investor, a global buyer seeking a second home, or looking for
                rental yields, we guide you with transparency, insight, and an uncompromising
                dedication.
              </p>

              <div className="mt-10 grid max-w-[640px] grid-cols-1 overflow-hidden border border-white/10 bg-black/50 sm:grid-cols-3">
                {[
                  { value: "100+", label: "Properties Sold" },
                  { value: "13+", label: "Years Experience" },
                  { value: "40+", label: "Countries Served" },
                ].map((s, idx) => (
                  <div
                    key={s.label}
                    className={`px-6 py-6 ${idx !== 2 ? "sm:border-r sm:border-white/10" : ""}`}
                  >
                    <p className="font-serif text-2xl font-light italic text-[#c9a84c]">
                      {s.value}
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-[2.6px] text-white/50">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Removed extra spacer to eliminate gap before Top Developers */}

      <Reveal>
        <HomeTopDevelopersSection
          heatPoints={heatPoints}
          listings={listingsForDevelopers}
          recentLaunches={recentLaunches}
        />
      </Reveal>

      <Reveal>
        <section className="border-b border-white/5 bg-[#060606] py-16 md:px-20 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-[80px]">
          <div className="mb-16 grid gap-8 md:grid-cols-2 md:gap-[15px]">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-6 bg-gradient-to-r from-[#c9a84c] to-transparent md:w-8" />
                <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                  Our Achievements
                </span>
              </div>
              <h2
                className="mt-4 font-serif text-[48px] font-light italic leading-[68px] text-white/90 md:text-[56px]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Our <span className="block">Awards</span>
              </h2>
            </div>
            <p className="max-w-[638px] font-light leading-[22.75px] text-white/40 text-sm">
              {awardsCopy}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3" style={{ gap: "40px" }}>
            {awards.map((item) => (
              <div
                key={item.title}
                className="mx-auto w-full max-w-[399px] overflow-hidden rounded-lg border border-white/10 transition-all duration-500 hover:border-[#c9a84c]/30 hover:shadow-lg"
              >
                <div
                  className="h-[220px] w-full bg-white/5 bg-cover bg-center sm:h-[280px] md:h-[351px]"
                  style={{
                    aspectRatio: "399/351",
                    backgroundImage: `url(${IMG[item.imageKey]})`,
                  }}
                />
                <p className="border-t border-white/10 py-4 font-serif text-lg font-medium text-white/90">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-b border-white/5 bg-[#060606] py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-5 md:px-20">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
              <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                The People
              </span>
            </div>
            <h2 className="mt-4 font-serif text-4xl font-light italic text-white/90 md:text-5xl">
              Our Leadership
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {founders.map((person) => (
                <div key={person.image} className="group">
                  <div
                    className="relative aspect-[296/395] overflow-hidden rounded-sm border border-white/10 bg-cover bg-center grayscale transition-all duration-500 group-hover:border-[#c9a84c]/60 group-hover:grayscale-0 group-hover:shadow-[0_0_45px_-15px_rgba(201,168,76,0.35)] group-hover:brightness-110"
                    style={{ backgroundImage: `url(${person.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-b border-white/5 py-16 md:px-20 md:py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-5 lg:flex-row lg:gap-16 md:px-[80px]">
          <div className="min-w-0 max-w-full lg:max-w-[317px]">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
              <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                Curated Portfolio
              </span>
            </div>
            <h2
              className="mt-4 font-serif text-[48px] font-light italic leading-[68px] text-white/90 md:text-[56px]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Exceptional <span className="block">Residences</span>
            </h2>
            <p className="mt-4 flex items-center gap-2 font-light text-white/40 text-sm">
              by <span className="text-[#c9a84c]">Ark Vision</span>
            </p>
            <p className="mt-6 font-light leading-relaxed text-white/40 text-sm">
              {awardsCopy}
            </p>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "21px" }}>
            {exceptionalResidences.map((prop, i) => (
              <div
                key={prop.title}
                className="group relative mx-auto w-full max-w-[413px] overflow-hidden rounded-t-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-[#c9a84c]/40 hover:shadow-[0_20px_50px_-20px_rgba(201,168,76,0.2)] md:rounded-t-[30px]"
              >
                <Link href="/featured" className="block">
                  <div className="relative h-[240px] w-full overflow-hidden rounded-t-2xl sm:h-[280px] md:h-[310px] md:rounded-t-[30px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
                      style={{ backgroundImage: `url(${propertyImages[i] ?? IMG.propertyVilla})` }}
                    />
                    <div className="absolute right-4 top-4 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white/30 bg-black/40 text-white/80">
                      ♡
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex h-12 items-center gap-4 bg-black/40 px-[18px] text-xs text-white/90">
                      <span>{prop.beds} Beds</span>
                      <span>{prop.baths} Baths</span>
                      <span>{prop.sqft} ft²</span>
                    </div>
                  </div>
                </Link>
                <div className="border-t border-white/10 p-5">
                  <h3 className="font-serif text-lg font-medium text-white/90">{prop.title}</h3>
                  <p className="mt-3 flex items-center gap-2 text-xs text-white/50">
                    <span>📍</span> {prop.location}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/featured?keyword=${encodeURIComponent(prop.title)}`}
                      className="border border-[#c9a84c] bg-[#c9a84c]/10 px-4 py-2 text-xs font-light text-[#c9a84c] transition hover:bg-[#c9a84c] hover:text-[#060606]"
                    >
                      Inquire
                    </Link>
                    <Link
                      href="/featured"
                      className="border border-white/20 px-4 py-2 text-xs font-light text-white/70 transition hover:border-[#c9a84c] hover:text-[#c9a84c]"
                    >
                      View listings
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-b border-white/5 py-16 md:px-20 md:py-[120px]">
        <div className="mx-auto max-w-[1200px] px-5 md:px-[120px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
                <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                  Knowledge hub
                </span>
              </div>
              <h2
                className="mt-4 font-serif text-[48px] font-light italic leading-[68px] text-white/90 md:text-[56px]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Latest <span className="text-[#c9a84c]">Blogs</span>
              </h2>
            </div>
            <div className="max-w-full lg:max-w-[240px]">
              <p className="font-light leading-relaxed text-white/60 text-sm">
                Handpicked from Dubai&apos;s most prestigious addresses, each property a testament to
                uncompromising luxury.
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-flex items-center gap-2 font-light text-[#c9a84c] text-sm transition-all duration-300 hover:gap-3 hover:text-[#fcf6ba]"
              >
                View All blogs <span>→</span>
              </Link>
            </div>
          </div>
          <div className="mt-8 h-px w-full bg-white/10" />
          <div className="mt-12 grid gap-6 lg:grid-cols-[607px_1fr] lg:gap-4">
            {/* Featured (left) */}
            <Link
              href="/blog"
              className="group relative overflow-hidden bg-white/5 lg:h-[438px]"
              aria-label="Read featured blog"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ backgroundImage: `url(${IMG.blogFeatured})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
                <p className="font-serif text-base font-light italic text-white/90 sm:text-lg">
                  {blogPosts[0]?.title ?? "Prices in Dubai to Rise"}
                </p>
                <p className="mt-2 max-w-[420px] font-light text-white/70 text-sm leading-relaxed">
                  {blogPosts[0]?.excerpt}
                </p>
              </div>
            </Link>

            {/* List (right) */}
            <div className="flex flex-col gap-4">
              {blogPosts.map((post, i) => (
                <Link
                  key={`${post.title}-${i}`}
                  href="/blog"
                  className="group grid grid-cols-[168px_1fr] overflow-hidden bg-white/5 transition-colors duration-300 hover:bg-white/7 sm:grid-cols-[174px_1fr]"
                  style={{ minHeight: "138px" }}
                  aria-label={`Read blog: ${post.title}`}
                >
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.02]"
                    style={{
                      backgroundImage: `url(${
                        [IMG.blogThumb, IMG.blogThumb2, IMG.blogThumb3][i] ?? IMG.blogThumb
                      })`,
                    }}
                  />
                  <div className="flex flex-col justify-center bg-black/40 px-6 py-5">
                    <p className="font-serif text-base font-light italic text-white/90">
                      {post.title}
                    </p>
                    <p className="mt-2 max-w-[420px] font-light text-white/70 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="relative min-h-[480px] border-b border-white/5 bg-black/50 py-16 md:min-h-[713px] md:py-24">
        <div
          className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 font-serif text-[120px] leading-none text-white/5 sm:top-12 sm:text-[160px] md:text-[200px]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          &ldquo;
        </div>
        <div className="relative mx-auto max-w-[672px] px-6 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a84c]" />
            <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
              Client Voices
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a84c]" />
          </div>
          <h2
            className="mt-4 font-serif text-[40px] font-light italic leading-[63px] text-white/90 md:text-[50px]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Words of Trust
          </h2>
          <blockquote className="mt-8 font-serif text-xl font-light italic leading-relaxed text-white/80">
            &ldquo;An unparalleled experience from the very first conversation. Their command of the
            luxury market, their discretion, and their dedication to perfection secured us our dream
            penthouse in Downtown Dubai.&rdquo;
          </blockquote>
          <div className="mt-10 flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-white/20" />
            <p className="text-xs uppercase tracking-widest text-white/70">
              Sheikh Mohammed Al Rashid
            </p>
            <p className="text-xs text-white/50">Private Investor · Abu Dhabi</p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              className="h-9 w-9 rounded-full border border-white/30 transition-colors duration-300 hover:border-[#c9a84c] hover:bg-white/5"
              aria-label="Previous"
            />
            <span className="h-px w-6 bg-[#c9a84c]" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
            <span className="h-px w-6 bg-white/30" />
            <button
              type="button"
              className="h-9 w-9 rounded-full border border-white/30 transition-colors duration-300 hover:border-[#c9a84c] hover:bg-white/5"
              aria-label="Next"
            />
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-b border-white/5 py-16 md:py-24">
        <div className="mx-auto max-w-[896px] px-5 md:px-16">
          <h2
            className="font-serif text-[36px] font-light italic leading-tight text-white/90 md:text-[48px] md:leading-[54px]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Everything You Need to Know Before Buying
          </h2>
          <p className="mt-6 max-w-[672px] font-light text-white/60 text-base">
            A comprehensive guide to navigating Dubai&apos;s property market with confidence.
          </p>
          <HomeBuyingKnowAccordion />
        </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="contact" className="border-b border-white/5 py-16 md:px-20 md:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-16 px-5 md:grid-cols-2 md:px-[80px]">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
              <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                Get in Touch
              </span>
            </div>
            <h2
              className="mt-4 font-serif text-[48px] font-light italic leading-[53px] text-white/90 md:text-[56px]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Begin Your <span className="block">Journey</span>
            </h2>
            <p className="mt-6 max-w-[336px] font-light text-white/40 text-sm leading-relaxed">
              Our advisors are available to discuss your requirements with complete discretion. Every
              inquiry is handled with the utmost care and confidentiality.
            </p>
            <div className="mt-12 space-y-8">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/20 text-white/60">
                  📍
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">Our Address</p>
                  <p className="font-light text-white/80 text-sm">Level 45, Burj Khalifa</p>
                  <p className="font-light text-white/80 text-sm">Downtown Dubai, UAE</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/20 text-white/60">
                  📞
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">Direct Line</p>
                  <p className="font-light text-white/80 text-sm">+971 4 123 4567</p>
                  <p className="font-light text-white/80 text-sm">+971 50 987 6543</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/20 text-white/60">
                  ✉️
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">Correspondence</p>
                  <p className="font-light text-white/80 text-sm">info@arkvision.ae</p>
                  <p className="font-light text-white/80 text-sm">private@arkvision.ae</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 p-6 transition-shadow duration-500 hover:border-white/15 hover:shadow-[0_0_40px_-15px_rgba(201,168,76,0.15)] sm:p-8 md:p-12">
            <h3 className="font-serif text-xl font-medium text-white/90">Private Inquiry Form</h3>
            <div className="mt-6 h-px bg-white/10" />
            <form className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs text-white/60">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-white/80 transition-colors duration-300 placeholder:text-white/40 focus:border-[#c9a84c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-white/80 transition-colors duration-300 placeholder:text-white/40 focus:border-[#c9a84c] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/60">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+971 50 000 0000"
                  className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-white/80 placeholder:text-white/40 focus:border-[#c9a84c] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-white/60">Your Requirements</label>
                <textarea
                  placeholder="Describe your ideal property..."
                  rows={4}
                  className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-white/80 transition-colors duration-300 placeholder:text-white/40 focus:border-[#c9a84c] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#c9a84c] py-3 font-medium text-[#060606] transition-all duration-300 hover:bg-[#fcf6ba] hover:shadow-lg active:scale-[0.99]"
              >
                Submit Private Inquiry
              </button>
            </form>
          </div>
        </div>
        </section>
      </Reveal>
    </div>
  );
}
