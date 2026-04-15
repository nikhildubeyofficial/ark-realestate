import AboutLeadershipSection from "@/components/AboutLeadershipSection";
import AboutTeamGrid from "@/components/AboutTeamGrid";
import { PremiumSection, TrustMetricRail } from "@/components/PremiumSection";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";
import imagescManifest from "@/data/imagesc-manifest.json";
import { leadershipProfiles } from "@/data/leadershipProfiles";
import { Heart } from "lucide-react";

const stats = [
  { value: "500+", label: "Properties Sold" },
  { value: "25+", label: "Years of Excellence" },
  { value: "1,200+", label: "Discerning Clients" },
  { value: "AED 5B+", label: "Total Sales Value" },
];

const services = [
  "Property Buying & Leasing Advisory",
  "Luxury Homes & Signature Villas",
  "Commercial Property Investment",
  "Warehouse Sales & Leasing",
  "Holiday Homes & Short-Term Rentals",
  "Mortgage & Financing Solutions",
  "Property & Portfolio Management",
  "Golden Visa by Real Estate Investment",
];

export default function AboutPage() {
  const teamImages = (imagescManifest.files ?? []).map(
    (file) => `/ImagesC/${encodeURIComponent(file)}`
  );
  // About page (except leadership tiles) uses Unsplash only.
  const heroImage = "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1440&q=80&auto=format&fit=crop";
  const storyImage =
    "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?w=1440&q=80&auto=format&fit=crop";
  // Founders images
  const karanImage = "/final%20images/Leaders/karan%20boss%20(1).png";
  const vinayImage = "/final%20images/Leaders/vinay%20boss.png";

  const portfolioMosaic = [
    "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb5f7?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511651262363-3e6d7d8c5f0b?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522156373667-4c7234bbd804?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5a6?w=1200&q=80&auto=format&fit=crop",
  ] as const;

  const aboutUsGallery = [
    "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511651262363-3e6d7d8c5f0b?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522156373667-4c7234bbd804?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb5f7?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5a6?w=1200&q=80&auto=format&fit=crop",
  ] as const;

  const propertyHighlights = [
    {
      title: "Luxury Residences",
      image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&q=80&auto=format&fit=crop",
      location: "Downtown Dubai",
    },
    {
      title: "Signature Villas",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80&auto=format&fit=crop",
      location: "Emirates Hills",
    },
    {
      title: "Modern Living",
      image:
        "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=1200&q=80&auto=format&fit=crop",
      location: "Dubai Marina",
    },
    {
      title: "Premium Investment",
      image:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1200&q=80&auto=format&fit=crop",
      location: "Business Bay",
    },
  ] as const;

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[900px]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/45 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="relative w-full max-w-[1280px] px-8 pb-20 md:px-20">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
              <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">Our Story</span>
            </div>
            <h1 className="mt-4 flex flex-wrap items-baseline gap-2 font-serif text-5xl font-light italic leading-tight text-white/90 md:text-6xl lg:text-7xl">
              <span>About</span>
              <span className="bg-gradient-to-r from-[#c9a84c] via-[#fcf6ba] to-[#b38f28] bg-clip-text text-transparent">ARK Vision</span>
            </h1>
            <p className="mt-5 max-w-[760px] font-light text-sm leading-relaxed text-white/70 md:text-base">
              Expert services for every real estate journey - from advisory and acquisition to portfolio growth in Dubai&apos;s most prestigious addresses.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 bg-[#060606] py-24">
        <div className="mx-auto grid max-w-[1280px] gap-16 px-8 md:grid-cols-2 md:px-20">
          <div className="space-y-8">
            <h2 className="font-serif text-4xl font-light italic leading-tight text-white/80 md:text-5xl">
              A Quarter Century of{" "}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#fcf6ba] bg-clip-text text-transparent">Unrivalled Excellence</span>
            </h2>
            <div className="space-y-5 font-light text-white/40 text-sm leading-[1.6]">
              <p>At ARK Vision, we redefine living spaces with innovative design, insight-backed advisory, and premium execution at every stage.</p>
              <p>We do not just broker properties. We curate opportunities for investors, families, and global buyers with clarity, confidence, and measurable value.</p>
              <p>From first consultation to handover and beyond, every interaction is intentionally crafted to deliver peace of mind and long-term growth.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10">
              <div className="h-full w-full bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.06]" style={{ backgroundImage: `url(${storyImage})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/5 bg-white/5">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-2 bg-[#080808] p-8">
                  <span className="font-serif text-3xl font-light italic text-[#c9a84c]">{value}</span>
                  <span className="text-xs uppercase tracking-[1.2px] text-white/30">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Reveal direction="up">
        <PremiumSection
          eyebrow="Credibility"
          title={
            <>
              Trusted by Investors,
              <span className="text-[#c9a84c]"> Chosen by Families</span>
            </>
          }
          description="A premium advisory business is measured by consistency, retention, and outcomes. Our operating standards are built around all three."
        >
          <TrustMetricRail items={stats} />
        </PremiumSection>
      </Reveal>

      <Reveal direction="right">
        <section className="border-b border-white/5 bg-[#060606] py-24">
          <div className="mx-auto max-w-[1280px] px-8 md:px-20">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
              <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                Featured Properties
              </span>
            </div>
            <h2 className="mt-4 font-serif text-5xl font-light italic text-white/80 md:text-6xl">
              A Curated Selection
            </h2>
            <p className="mt-5 max-w-[760px] font-light text-sm leading-relaxed text-white/45">
              Explore a premium set of residences and investment opportunities curated for clarity,
              confidence, and long-term value.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {propertyHighlights.map((p) => (
                <Link
                  key={p.title}
                  href="/featured"
                  className="card-premium group relative overflow-hidden rounded-sm border border-white/10 bg-[#080808]"
                >
                  <div className="relative h-[220px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.06]"
                      style={{ backgroundImage: `url(${p.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute right-4 top-4 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/70">
                      <Heart size={16} />
                    </div>
                  </div>
                  <div className="relative border-t border-white/10 p-5">
                    <p className="font-serif text-lg font-medium italic text-white/90">{p.title}</p>
                    <p className="mt-2 text-xs uppercase tracking-[2.4px] text-[#c9a84c]/80">
                      {p.location}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-white/70 transition-colors group-hover:text-[#c9a84c]">
                      View properties <span aria-hidden="true">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal direction="left">
        <section className="border-b border-white/5 py-24">
          <div className="mx-auto max-w-[1280px] px-8 md:px-20">
            {/* Section Header */}
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-4">
                <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
                <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">Meet The Founders</span>
                <span className="h-px w-8 bg-gradient-to-l from-[#c9a84c] to-transparent" />
              </div>
              <h2 className="mt-4 font-serif text-4xl font-light italic text-white/85 md:text-5xl">
                We Don&apos;t Just Do Deals.
                <span className="block text-[#c9a84c]">We Build Futures.</span>
              </h2>
            </div>

            {/* Founders Grid */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Karan - Founder */}
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={karanImage}
                    alt="Karan - Founder"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-lg border border-white/10 bg-black/60 backdrop-blur-sm p-4">
                    <p className="font-serif text-xl font-light italic text-[#c9a84c]">Karan</p>
                    <p className="text-xs uppercase tracking-[2px] text-white/60">Founder</p>
                    <p className="mt-2 text-sm text-white/50 leading-relaxed">
                      Visionary leader with a passion for transforming Dubai&apos;s real estate landscape.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vinay - Founder */}
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={vinayImage}
                    alt="Vinay - Founder"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-lg border border-white/10 bg-black/60 backdrop-blur-sm p-4">
                    <p className="font-serif text-xl font-light italic text-[#c9a84c]">Vinay</p>
                    <p className="text-xs uppercase tracking-[2px] text-white/60">Founder</p>
                    <p className="mt-2 text-sm text-white/50 leading-relaxed">
                      Strategic mind driving excellence and innovation in every client relationship.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-12 text-center">
              <p className="mx-auto max-w-[800px] font-light text-base leading-relaxed text-white/45">
                We stand by your side from initial advisory to final execution and beyond, securing peace of mind and long-term wealth growth. Trust, faith, and integrity define how we serve every client.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal direction="scale">
        <PremiumSection
          eyebrow="Our Services"
          title={
            <>
              End-to-End Advisory
              <span className="text-[#c9a84c]"> Architecture</span>
            </>
          }
          description="From acquisition to portfolio strategy, every service is designed around transparency, speed, and premium client care."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((item) => (
              <div
                key={item}
                className="card-premium group relative border border-white/10 bg-[#080808] px-5 py-6"
              >
                <p className="text-xs uppercase tracking-[2.6px] text-[#c9a84c]">Service</p>
                <p className="mt-3 font-light text-sm leading-relaxed text-white/75 transition-colors duration-300 group-hover:text-white/90">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </PremiumSection>
      </Reveal>

      {/* Communities In Focus / Portfolio Highlights - Hidden as requested
      <Reveal direction="blur">
        <section className="border-b border-white/5 py-24">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
            <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">Communities In Focus</span>
          </div>
          <h2 className="mt-4 font-serif text-5xl font-light italic text-white/80 md:text-6xl">Portfolio Highlights</h2>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {portfolioMosaic.map((src, idx) => (
              <div
                key={src}
                className={`${idx === 0 ? "md:col-span-2 md:row-span-2" : ""} group relative overflow-hidden rounded-sm border border-white/10`}
              >
                <div
                  className="aspect-[4/3] h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
                  style={{ backgroundImage: `url(${src})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
            ))}
          </div>
        </div>
        </section>
      </Reveal>
      */}

      {/* Our Leadership Section - Hidden (moved to /team page)
      <Reveal direction="right">
        <section className="border-b border-white/5 py-24">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
            <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">The People</span>
          </div>
          <h2 className="mt-4 font-serif text-5xl font-light italic text-white/80 md:text-6xl">Our Leadership</h2>
          <AboutLeadershipSection profiles={leadershipProfiles} />
        </div>
        </section>
      </Reveal> */}

      {/* <Reveal direction="left">
        <section className="border-b border-white/5 bg-[#060606] py-24">
          <div className="mx-auto max-w-[1280px] px-8 md:px-20">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
              <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                Our Team
              </span>
            </div>
            <h2 className="mt-4 font-serif text-5xl font-light italic text-white/80 md:text-6xl">
              The Team Behind ARK Vision
            </h2>
            <p className="mt-5 max-w-[760px] font-light text-sm leading-relaxed text-white/45">
              Our advisors, strategists, and relationship experts deliver a seamless real estate
              experience across every interaction.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href="/team"
                className="btn-magnetic border border-[#c9a84c] bg-[#c9a84c]/10 px-8 py-3 font-light text-[#c9a84c] transition-all duration-400 hover:bg-[#c9a84c] hover:text-[#060606] hover:shadow-[0_0_25px_-5px_rgba(201,168,76,0.5)]"
              >
                View Full Team
              </Link>
            </div>
          </div>
        </section>
      </Reveal> */}

      <Reveal direction="scale">
        <section className="border-b border-white/5 bg-[#060606] py-24">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
            <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">About Us Gallery</span>
          </div>
          <h2 className="mt-4 font-serif text-5xl font-light italic text-white/80 md:text-6xl">Moments & Milestones</h2>
          <p className="mt-5 max-w-[760px] font-light text-sm leading-relaxed text-white/45">
            A visual journey of our team, client experiences, and signature project milestones.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {aboutUsGallery
              .map((src, index) => ({ src, frameNo: index + 1 }))
              .filter((item) => ![5, 7, 8].includes(item.frameNo))
              .map(({ src, frameNo }) => (
              <div key={src} className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-black">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
                  style={{ backgroundImage: `url(${src})` }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
                <span className="pointer-events-none absolute bottom-3 left-3 text-[10px] uppercase tracking-[2.8px] text-white/60">
                  Frame {String(frameNo).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal direction="blur">
        <section className="border-b border-white/5 py-24">
        <div className="mx-auto max-w-[980px] px-8 text-center md:px-20">
          <p className="font-serif text-3xl font-light italic leading-relaxed text-white/85 md:text-4xl">
            &ldquo;Their attention to detail and customer-first approach made our property journey seamless, confident, and truly premium.&rdquo;
          </p>
          <p className="mt-6 text-xs uppercase tracking-[2.8px] text-[#c9a84c]">Client Voice</p>
        </div>
        </section>
      </Reveal>
    </div>
  );
}
