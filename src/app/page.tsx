import Link from "next/link";
import Image from "next/image";
import HomeHero from "@/components/HomeHero";
import { Reveal, StaggerReveal } from "@/components/Reveal";
import FlowParallax from "@/components/FlowParallax";
import AwardsRollCarousel from "@/components/AwardsRollCarousel";
import {
  Heart,
  MapPin,
  Phone,
  Mail,
  Award,
  BadgeCheck,
  BarChart3,
  Building2,
  Gem,
  Landmark,
  Sparkles,
} from "lucide-react";
import HomeBuyingKnowAccordion from "@/components/HomeBuyingKnowAccordion";
import AboutLeadershipSection from "@/components/AboutLeadershipSection";
import TestimonialVideos from "@/components/TestimonialVideos";
import { PremiumSection, TrustMetricRail } from "@/components/PremiumSection";
import { leadershipProfiles } from "@/data/leadershipProfiles";
import {
  getPropertyListingsByProjectIds,
} from "@/lib/propertyData";
import { RECENT_LAUNCH_IDS } from "@/lib/recentLaunches";

/**
 * Home page — layout and copy aligned to Figma
 * Frame 367:423 (Real Estate Website Landing Page)
 */

const awardImages = [
  "/awards/WhatsApp%20Image%202026-04-09%20at%209.35.45%20PM.jpeg",
  "/awards/WhatsApp%20Image%202026-04-09%20at%209.35.44%20PM%20(1).jpeg",
  "/awards/WhatsApp%20Image%202026-04-09%20at%209.35.44%20PM.jpeg",
  "/awards/WhatsApp%20Image%202026-04-09%20at%209.35.43%20PM%20(1).jpeg",
  "/awards/WhatsApp%20Image%202026-04-09%20at%209.35.43%20PM.jpeg",
  "/awards/WhatsApp%20Image%202026-04-09%20at%209.35.42%20PM%20(1).jpeg",
];

const blogPosts = [
  { title: "Prices in Dubai to Rise", excerpt: "From property viewings by private helicopter to seamless key handover — every detail considered." },
  { title: "Prices in Dubai to Rise", excerpt: "From property viewings by private helicopter to seamless key handover — every detail considered." },
  { title: "Prices in Dubai to Rise", excerpt: "From property viewings by private helicopter to seamless key handover — every detail considered." },
];

const awardsCopy =
  "At ARK Vision, we don't just sell properties, we curate opportunities. Whether you're an off-plan investor, a global buyer seeking a second home, or looking for rental yields, we guide you with transparency, insight, and uncompromising dedication.";

const trustMetrics = [
  { value: "Top 10", label: "Ranked among Dubai's most trusted brokerage teams", icon: <Award size={18} /> },
  { value: "25+", label: "Years of advisory continuity across market cycles", icon: <BadgeCheck size={18} /> },
  { value: "AED 5B+", label: "Collective portfolio value guided with precision", icon: <Landmark size={18} /> },
  { value: "100K+", label: "Homeowners and investors advised with discretion", icon: <BarChart3 size={18} /> },
];

const awardHighlights = [
  { label: "Top Broker Recognition", year: "2026", icon: <Award size={16} /> },
  { label: "Developer Partner Excellence", year: "2025", icon: <Building2 size={16} /> },
  { label: "Sales Performance Leadership", year: "2024", icon: <Sparkles size={16} /> },
];

const servicePillars = [
  { title: "Off-plan advisory", icon: <Landmark size={16} /> },
  { title: "Luxury primary sales", icon: <Gem size={16} /> },
  { title: "Portfolio strategy", icon: <BarChart3 size={16} /> },
  { title: "Leasing and yield support", icon: <Building2 size={16} /> },
];

const marqueeBrands = [
  { name: "Azizi", logo: "/logos/Azizi_Developments_idAvLMDooX_1.svg" },
  { name: "DEYAAR", logo: "/logos/deyaar.svg" },
  { name: "EMAAR", logo: "/logos/Emaar_idXvHX22tw_1.svg" },
  { name: "OMNIYAT", logo: "/logos/OMNIYAT_id3ynQ1ti7_1.svg" },
  { name: "ARADA", logo: "/logos/arada.svg" },
  { name: "SOBHA", logo: "/logos/sobha.svg" },
  { name: "OBJECT", logo: "/logos/Object_1.svg" },
  { name: "DAMAC", logo: "/logos/damac.svg" },
] as const;

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

export default async function HomePage() {
  const recentLaunches = await getPropertyListingsByProjectIds(RECENT_LAUNCH_IDS);
  return (
    <div className="min-h-screen overflow-x-clip bg-[#050505]">
      <HomeHero servicePillars={servicePillars} />

      {/* Marquee: not wrapped in Reveal so CSS animation runs immediately */}
      <section className="brand-marquee border-y border-white/10 bg-[#050505] py-12 md:py-20">
        <FlowParallax className="relative mx-auto max-w-[1440px] overflow-hidden px-5 md:px-20" speed={0.05}>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-24 bg-gradient-to-r from-[#060606] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-24 bg-gradient-to-l from-[#060606] to-transparent" />

          <div className="brand-marquee-track">
            {marqueeBrands.concat(marqueeBrands).map((b, idx) => (
                <div
                  key={`${b.name}-${idx}`}
                  className="flex min-w-[130px] shrink-0 items-center justify-center text-white/90 md:min-w-[160px]"
                >
                  {"logo" in b ? (
                    <div
                      className={`flex h-6 items-center justify-center md:h-7 ${
                        b.name === "DAMAC" ? "w-[130px] md:w-[150px]" : "w-[110px] md:w-[130px]"
                      }`}
                    >
                      <Image
                        src={b.logo}
                        alt={`${b.name} logo`}
                        width={160}
                        height={36}
                        className={`h-full w-full object-contain opacity-90 ${
                          b.name === "SOBHA" ? "brightness-0 invert" : ""
                        }`}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="font-serif text-xl italic tracking-wide md:text-2xl">
                        {b.name}
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-[2px] text-white/50">
                        {b.sub}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </FlowParallax>
      </section>

      <Reveal direction="up">
        <PremiumSection
          eyebrow="Key Stats"
          title={
            <>
              Performance at a
              <span className="text-[#c9a84c]"> Glance</span>
            </>
          }
          description="Every number reflects consistency, execution quality, and long-term trust built with investors, homeowners, and global buyers."
        >
          <TrustMetricRail items={trustMetrics} />
        </PremiumSection>
      </Reveal>

      {/* Our Legacy / Why ARK Vision (inserted below brand marquee) */}
      <Reveal direction="left">
        <section className="relative overflow-hidden border-b border-white/10 bg-[#050505] py-24 md:py-48">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${IMG.legacyBg})` }}
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />

          <FlowParallax className="relative mx-auto max-w-[1280px] px-5 md:px-20" speed={0.07}>
            <div className="max-w-[760px]">
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
                <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                  Our Legacy
                </span>
              </div>
              <h2
                className="mt-4 font-serif text-4xl font-light italic leading-tight text-white/90 sm:text-5xl md:text-6xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Why Investors Choose
                <span className="block text-[#c9a84c]">ARK Vision</span>
              </h2>

              <p className="mt-6 max-w-[680px] font-light text-white/60 text-sm leading-relaxed md:text-base">
                At ARK Vision, we don&apos;t just sell properties, we curate opportunities. Whether
                you&apos;re an off-plan investor, a global buyer seeking a second home, or looking for
                rental yields, we guide you with transparency, insight, and an uncompromising
                dedication.
              </p>
              <StaggerReveal className="mt-10 grid max-w-[760px] gap-4 sm:grid-cols-3">
                {[
                  {
                    numeral: "01",
                    title: "Advisory",
                    detail: "Evidence-led recommendations, not sales pressure.",
                  },
                  {
                    numeral: "02",
                    title: "Execution",
                    detail: "Fast, transparent process from shortlist to handover.",
                  },
                  {
                    numeral: "03",
                    title: "Stewardship",
                    detail: "Long-term support beyond transaction closure.",
                  },
                ].map((item) => (
                  <div key={item.title} className="stagger-child border border-white/10 bg-white/5 p-5 backdrop-blur-lg">
                    <div className="flex items-center gap-2 text-[#C5A059]">
                      <p className="font-serif text-sm italic tracking-[0.16em]">{item.numeral}</p>
                      <p className="font-serif text-xl italic text-white/90">{item.title}</p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{item.detail}</p>
                  </div>
                ))}
              </StaggerReveal>
            </div>
          </FlowParallax>
        </section>
      </Reveal>

      <Reveal direction="right">
        <section className="border-b border-[#C5A059]/45 bg-[#050505] py-24 md:py-48">
        <FlowParallax className="mx-auto max-w-[1280px] px-5 md:px-20" speed={0.06}>
          <div className="mb-10 overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
                  <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                    Recognition & Awards
                  </span>
                </div>
                <h2
                  className="mt-4 font-serif text-[40px] font-light italic leading-[1.1] text-white/90 md:text-[56px]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  The
                  <span className="block text-[#c9a84c]">Awards Wall</span>
                </h2>
                <p className="mt-4 max-w-[640px] text-sm font-light leading-relaxed text-white/55">
                  {awardsCopy}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {awardHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="border border-white/10 bg-black/40 px-4 py-4"
                  >
                    <div className="flex items-center gap-2 text-[#c9a84c]">
                      {item.icon}
                      <p className="font-serif text-2xl italic">{item.year}</p>
                    </div>
                    <p className="mt-2 text-[11px] uppercase tracking-[1.5px] text-white/60">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <AwardsRollCarousel images={awardImages} bodyText={awardsCopy} />
        </FlowParallax>
        </section>
      </Reveal>

      <Reveal direction="up">
        <section className="border-b border-white/10 bg-[#050505] py-14 md:py-20">
          <div className="mx-auto max-w-[1280px] px-5 md:px-20">
            <div className="grid gap-8 border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-6 md:grid-cols-[1.1fr_1fr] md:p-8">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
                  <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                    Leadership
                  </span>
                </div>
                <h2 className="mt-4 font-serif text-4xl font-light italic text-white/90 md:text-5xl">
                  Executive Leadership
                </h2>
                <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-white/60">
                  The leadership team guiding strategy, market execution, and relationship quality for
                  every ARK Vision client.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="border border-white/10 bg-black/40 p-4">
                  <p className="font-serif text-2xl italic text-[#c9a84c]">Strategic</p>
                  <p className="mt-2 text-xs uppercase tracking-[2px] text-white/60">Developer Relations</p>
                </div>
                <div className="border border-white/10 bg-black/40 p-4">
                  <p className="font-serif text-2xl italic text-[#c9a84c]">Private</p>
                  <p className="mt-2 text-xs uppercase tracking-[2px] text-white/60">Client Advisory</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <AboutLeadershipSection profiles={leadershipProfiles} />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal direction="right">
        <section className="border-b border-white/10 bg-[#050505] py-24 md:py-48">
          <FlowParallax className="mx-auto max-w-[1280px] px-5 md:px-20" speed={0.08}>
            {/* Section Header - Centered for better impact */}
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a84c]" />
                <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                  Market Highlights
                </span>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a84c]" />
              </div>
              <h2
                className="mt-6 font-serif text-[42px] font-normal italic leading-tight text-white/95 sm:text-[52px] md:text-[64px]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Popular <span className="text-[#c9a84c]">Properties</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[500px] font-normal text-white/70 text-sm leading-relaxed">
                High-demand opportunities curated from Dubai&apos;s most competitive corridors
              </p>
            </div>

            {/* Property Cards Grid */}
            <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {recentLaunches.slice(0, 3).map((prop) => (
                <div
                  key={prop.slug}
                  className="card-premium group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] transition-all duration-300 hover:border-[#c9a84c]/30"
                >
                  {/* Image Container */}
                  <Link href={`/properties/${prop.slug}`} className="block">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {/* Property Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition duration-500 ease-out group-hover:scale-105 group-hover:saturate-150"
                        style={{ backgroundImage: `url(${prop.image})` }}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* Top Badge - Property Type */}
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-black/60 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white/90">
                          {prop.credenceCategory}
                        </span>
                      </div>

                      {/* Favorite Button */}
                      <button className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/70 transition-all duration-300 hover:scale-110 hover:bg-[#c9a84c] hover:text-black">
                        <Heart size={16} />
                      </button>

                      {/* Property Stats - Bottom of Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center justify-between border-t border-white/10 pt-3">
                          <div className="flex items-center gap-3 text-white/90">
                            <div className="flex items-center gap-1.5">
                              <span className="font-serif text-lg italic text-[#c9a84c]" style={{ fontFamily: "var(--font-serif)" }}>{prop.beds}</span>
                              <span className="text-[10px] uppercase tracking-wider text-white/60">Beds</span>
                            </div>
                            <span className="text-white/20">|</span>
                            <div className="flex items-center gap-1.5">
                              <span className="font-serif text-lg italic text-[#c9a84c]" style={{ fontFamily: "var(--font-serif)" }}>{prop.baths}</span>
                              <span className="text-[10px] uppercase tracking-wider text-white/60">Baths</span>
                            </div>
                            <span className="text-white/20">|</span>
                            <div className="flex items-center gap-1.5">
                              <span className="font-serif text-lg italic text-[#c9a84c]" style={{ fontFamily: "var(--font-serif)" }}>{prop.sqft}</span>
                              <span className="text-[10px] uppercase tracking-wider text-white/60">ft²</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Card Content */}
                  <div className="border-t border-white/[0.06] p-5">
                    {/* Location */}
                    <div className="flex items-center gap-2 text-white/50">
                      <MapPin size={12} className="text-[#c9a84c]" />
                      <span className="text-[11px] uppercase tracking-wider">{prop.location}</span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-2 font-serif text-xl font-normal italic leading-tight text-white/95 transition-colors duration-300 group-hover:text-[#c9a84c]" style={{ fontFamily: "var(--font-serif)" }}>
                      {prop.title}
                    </h3>

                    {/* Price */}
                    <p className="mt-3 text-base font-medium tracking-wide text-[#c9a84c]/90">
                      {prop.price}
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-4 flex flex-col gap-2">
                      <Link
                        href={`/properties/${prop.slug}`}
                        className="group/btn flex h-11 items-center justify-center rounded-lg border border-[#c9a84c] bg-[#c9a84c]/10 text-sm font-medium text-[#c9a84c] transition-all duration-300 hover:bg-[#c9a84c] hover:text-[#060606]"
                      >
                        <span className="flex items-center gap-2">
                          Inquire Now
                          <span>→</span>
                        </span>
                      </Link>
                      <Link
                        href={`/properties/${prop.slug}`}
                        className="btn-magnetic flex h-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-xs font-normal text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.1] hover:text-white/95"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-12 flex justify-center">
              <Link
                href="/featured"
                className="group flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.08] px-8 py-3 text-sm font-normal text-white/85 transition-all duration-300 hover:border-[#c9a84c]/50 hover:bg-white/[0.12] hover:text-[#c9a84c]"
              >
                View All Properties
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-[10px] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </FlowParallax>
        </section>
      </Reveal>

      <Reveal direction="left">
        <section className="border-b border-white/10 bg-[#050505] py-24 md:py-48">
        <FlowParallax className="mx-auto max-w-[1280px] px-5 md:px-20" speed={0.07}>
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
                style={{ fontFamily: "var(--font-serif)" }}
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
          <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-6">
            {/* Featured (left) */}
            <Link
              href="/blog"
              className="group relative overflow-hidden border border-white/10 bg-white/5 lg:h-[438px]"
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
                  className="group grid grid-cols-[168px_1fr] overflow-hidden border border-white/10 bg-white/5 transition-colors duration-300 hover:bg-white/7 sm:grid-cols-[174px_1fr]"
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
        </FlowParallax>
        </section>
      </Reveal>

      <TestimonialVideos />

      <Reveal direction="up">
        <section className="border-b border-white/10 bg-[#050505] py-24 md:py-48">
        <FlowParallax className="mx-auto max-w-[1280px] px-5 md:px-20" speed={0.06}>
          <div className="max-w-[896px]">
          <h2
            className="font-serif text-[36px] font-light italic leading-tight text-white/90 md:text-[48px] md:leading-[54px]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Everything You Need to Know Before Buying
          </h2>
          <p className="mt-6 max-w-[672px] font-light text-white/60 text-base">
            A comprehensive guide to navigating Dubai&apos;s property market with confidence.
          </p>
          <HomeBuyingKnowAccordion />
          </div>
        </FlowParallax>
        </section>
      </Reveal>

      <Reveal direction="up">
        <section id="contact" className="border-b border-white/10 bg-[#050505] py-14 md:py-20">
        <FlowParallax className="mx-auto grid max-w-[1280px] gap-10 border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent px-5 py-8 md:grid-cols-2 md:px-20 md:py-12" speed={0.06}>
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
              <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                Get in Touch
              </span>
            </div>
            <h2
              className="mt-3 font-serif text-[46px] font-light italic leading-[1.06] text-white/90 md:text-[54px]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Begin Your <span className="block leading-none">Journey</span>
            </h2>
            <p className="mt-6 max-w-[336px] font-normal text-white/65 text-sm leading-relaxed">
              Our advisors are available to discuss your requirements with complete discretion. Every
              inquiry is handled with the utmost care and confidentiality.
            </p>
            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/20 text-[#c9a84c]">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">Our Address</p>
                  <p className="font-light text-white/80 text-sm">Level 45, Burj Khalifa</p>
                  <p className="font-light text-white/80 text-sm">Downtown Dubai, UAE</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/20 text-[#c9a84c]">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">Direct Line</p>
                  <p className="font-light text-white/80 text-sm">+971 4 123 4567</p>
                  <p className="font-light text-white/80 text-sm">+971 50 987 6543</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/20 text-[#c9a84c]">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">Correspondence</p>
                  <p className="font-light text-white/80 text-sm">info@arkvision.ae</p>
                  <p className="font-light text-white/80 text-sm">private@arkvision.ae</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-premium rounded-lg border border-white/10 bg-black/30 p-6 sm:p-8 md:p-12">
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
                className="btn-magnetic w-full bg-[#c9a84c] py-3 font-medium text-[#060606] transition-all duration-400 hover:bg-[#fcf6ba] hover:shadow-[0_0_30px_-5px_rgba(201,168,76,0.5)] active:scale-[0.98]"
              >
                Submit Private Inquiry
              </button>
            </form>
          </div>
        </FlowParallax>
        </section>
      </Reveal>
    </div>
  );
}
