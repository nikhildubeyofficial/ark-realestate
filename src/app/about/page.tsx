import { PremiumSection, TrustMetricRail } from "@/components/PremiumSection";
import { Reveal } from "@/components/Reveal";

const stats = [
  { value: "Top 10", label: "Ranked among Dubai's most trusted brokerage teams" },
  { value: "25+", label: "Years of advisory continuity across market cycles" },
  { value: "AED 5B+", label: "Collective portfolio value guided with precision" },
  { value: "100K+", label: "Homeowners and investors advised with discretion" },
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
  // About page (except founders) uses curated visual references.
  const heroImage = "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1440&q=80&auto=format&fit=crop";
  // Founders images
  const karanImage = "/final%20images/Leaders/karan%20boss%20(1).png";
  const vinayImage = "/final%20images/Leaders/vinay%20boss.png";

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

      <Reveal direction="up">
        <PremiumSection
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
              {/* Karan Hotchandani - Founder */}
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={karanImage}
                    alt="Karan Hotchandani - Founder"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-lg border border-white/10 bg-black/60 backdrop-blur-sm p-4">
                    <p className="font-serif text-xl font-light italic text-[#c9a84c]">Karan Hotchandani</p>
                    <p className="text-xs uppercase tracking-[2px] text-white/60">Founder</p>
                    <p className="mt-2 text-sm text-white/50 leading-relaxed">
                      Visionary leader with a passion for transforming Dubai&apos;s real estate landscape.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vinay Chelani - Founder */}
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={vinayImage}
                    alt="Vinay Chelani - Founder"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-lg border border-white/10 bg-black/60 backdrop-blur-sm p-4">
                    <p className="font-serif text-xl font-light italic text-[#c9a84c]">Vinay Chelani</p>
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
