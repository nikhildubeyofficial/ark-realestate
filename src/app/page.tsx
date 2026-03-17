import Link from "next/link";

/**
 * Home page — layout and copy aligned to Figma
 * Frame 367:423 (Real Estate Website Landing Page)
 */

const developers = [
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
];

const awards = [
  { title: "Team Recognition" },
  { title: "Awards & Certifications" },
  { title: "Industry Milestones" },
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
} as const;

const propertyImages = [IMG.propertyVilla, IMG.propertyDubai, IMG.propertySkyline, IMG.propertyInterior];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      {/* 1. Top bar — Figma 367:424, h 30.75px, px 36 */}
      <section className="hidden border-b border-white/5 bg-[#060606] md:block" style={{ minHeight: "30.75px" }}>
        <div className="flex items-center justify-between px-9 py-2">
          <p className="text-[11px] uppercase tracking-[2.625px] text-white/50">
            Established 1999 · Dubai, United Arab Emirates
          </p>
          <div className="flex items-center gap-1.5">
            <svg className="h-2.5 w-2.5 text-white/50" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span className="text-[11px] tracking-[0.75px] text-white/50">+971 4 123 4567</span>
          </div>
        </div>
      </section>

      {/* 2. Hero — Figma 367:431, 1440×900 */}
      <section className="relative h-[560px] w-full md:h-[900px]" style={{ minHeight: "900px" }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMG.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/60 to-black/30" />
        {/* Fade In content area: ~1060×390, positioned from left 190, top 274 */}
        <div className="absolute left-0 right-0 top-0 flex h-full items-center">
          <div className="mx-auto w-full max-w-[1280px] px-[80px]">
            <div className="max-w-[1060px] pt-[120px] md:pt-0">
              <p
                className="font-serif text-[48px] font-light italic leading-[1.2] text-white/90 md:text-[56px] lg:text-[80px] lg:leading-[120px]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Where Luxury{" "}
                <span
                  className="bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38f28] bg-clip-text text-transparent"
                >
                  Meets Vision
                </span>
              </p>
              <p className="mt-6 max-w-xl font-light text-white/60 text-sm leading-[22.75px]">
                Dubai&apos;s most trusted authority in luxury real estate. Curating extraordinary
                residences for the world&apos;s most discerning individuals since 1998.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Component 18 — trust bar, 206px */}
      <section className="flex h-[206px] items-center justify-center border-y border-white/5 bg-[#060606]">
        <p className="text-center font-light text-white/50 text-sm tracking-wide">
          Trusted by royalty, heads of state, and captains of industry
        </p>
      </section>

      {/* 4. Spacer / secondary strip — 561px */}
      <section className="min-h-[280px] border-b border-white/5 bg-[#080808] md:min-h-[561px]" />

      {/* 5. Choose from Top Developers — Figma 367:473, padding 80px, heading + 48px filter row + cards */}
      <section className="border-b border-white/5 bg-[#080808] pb-16 pt-[67px] md:px-20 md:pb-24">
        <div className="mx-auto max-w-[1280px] px-5 md:px-[80px]">
          <div className="mb-10">
            <h2
              className="font-serif text-[42px] font-light italic leading-tight text-white/90 md:text-[56px] md:leading-[68px]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Choose from Top Developers
            </h2>
            <div
              className="mt-6 flex h-12 flex-wrap items-center gap-0"
              style={{ gap: "18px" }}
            >
              {developers.map((name, i) => (
                <button
                  key={name}
                  type="button"
                  className="flex h-12 items-center border border-white/20 bg-transparent px-[10px] font-light text-white/80 transition hover:border-[#c9a84c] hover:text-[#c9a84c] first:pl-[30px]"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "21px" }}>
            {exceptionalResidences.map((prop, i) => (
              <Link
                key={prop.title}
                href="/featured"
                className="group relative w-full max-w-[413px] overflow-hidden rounded-t-[30px] border border-white/10 bg-white/5 transition hover:border-[#c9a84c]/30"
              >
                <div className="relative h-[310px] w-full overflow-hidden rounded-t-[30px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-[1.02]"
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
                <div className="border-t border-white/10 p-5">
                  <h3 className="font-serif text-lg font-medium text-white/90">{prop.title}</h3>
                  <p className="mt-3 flex items-center gap-2 text-xs text-white/50">
                    <span>📍</span> {prop.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Our Awards — Figma 367:499, 80px padding, 120pt top inner */}
      <section className="border-b border-white/5 bg-[#060606] py-24 md:px-20">
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
              <div key={item.title} className="w-full max-w-[399px] overflow-hidden rounded-lg border border-white/10">
                <div className="h-[351px] w-full bg-white/5 bg-cover bg-center" style={{ aspectRatio: "399/351" }} />
                <p className="border-t border-white/10 py-4 font-serif text-lg font-medium text-white/90">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Exceptional Residences — Figma 367:521, left 317px col + 4 cards */}
      <section className="border-b border-white/5 py-24 md:px-20">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-5 lg:flex-row lg:gap-16 md:px-[80px]">
          <div className="min-w-0 max-w-[317px]">
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
              <Link
                key={prop.title}
                href="/featured"
                className="group relative w-full max-w-[413px] overflow-hidden rounded-t-[30px] border border-white/10 bg-white/5 transition hover:border-[#c9a84c]/30"
              >
                <div className="relative h-[310px] w-full overflow-hidden rounded-t-[30px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-[1.02]"
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
                <div className="border-t border-white/10 p-5">
                  <h3 className="font-serif text-lg font-medium text-white/90">{prop.title}</h3>
                  <p className="mt-3 flex items-center gap-2 text-xs text-white/50">
                    <span>📍</span> {prop.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Latest Blogs — Figma 367:767, max-w 1200, py 120 */}
      <section className="border-b border-white/5 py-[120px] md:px-20">
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
            <div className="max-w-[240px]">
              <p className="font-light leading-relaxed text-white/60 text-sm">
                Handpicked from Dubai&apos;s most prestigious addresses, each property a testament to
                uncompromising luxury.
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-flex items-center gap-2 font-light text-[#c9a84c] text-sm transition hover:text-[#fcf6ba]"
              >
                View All blogs <span>→</span>
              </Link>
            </div>
          </div>
          <div className="mt-8 h-px w-full bg-white/10" />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="grid gap-6 md:grid-cols-2 md:gap-4">
              <div
                className="h-[280px] w-full rounded-lg bg-white/5 bg-cover bg-center md:h-[438px]"
                style={{ backgroundImage: `url(${IMG.blogFeatured})` }}
              />
              <div className="flex flex-col justify-center">
                <h3 className="font-serif text-xl font-medium text-white/90">Prices in Dubai to Rise</h3>
                <p className="mt-2 max-w-[316px] font-light text-white/50 text-sm leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {blogPosts.map((post, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className="h-[138px] w-[168px] shrink-0 rounded-lg bg-white/5 bg-cover bg-center md:w-[174px]"
                    style={{ backgroundImage: `url(${[IMG.blogThumb, IMG.blogThumb2, IMG.blogThumb3][i] ?? IMG.blogThumb})` }}
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg font-medium text-white/90">{post.title}</h3>
                    <p className="mt-1 max-w-[316px] font-light text-white/50 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Words of Trust — Figma 367:812, h 713.25, centered max-w 672 */}
      <section className="relative min-h-[600px] border-b border-white/5 bg-black/50 py-24 md:min-h-[713px]">
        <div
          className="absolute left-1/2 top-12 -translate-x-1/2 font-serif text-[200px] leading-none text-white/5"
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
            <button type="button" className="h-9 w-9 rounded-full border border-white/30" aria-label="Previous" />
            <span className="h-px w-6 bg-[#c9a84c]" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
            <span className="h-px w-6 bg-white/30" />
            <button type="button" className="h-9 w-9 rounded-full border border-white/30" aria-label="Next" />
          </div>
        </div>
      </section>

      {/* 10. FAQ — Figma 367:849/850, container 896px */}
      <section className="border-b border-white/5 py-24">
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
          <div className="mt-12 border-y border-white/10">
            {[
              "Who can buy property in Dubai?",
              "What are the costs involved?",
              "How do I get a mortgage?",
            ].map((q) => (
              <div
                key={q}
                className="flex items-center justify-between border-b border-white/10 py-6 last:border-b-0"
              >
                <h3 className="font-serif text-lg font-medium text-white/90">{q}</h3>
                <span className="text-white/50">+</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Contact — Figma 367:883, 80px padding */}
      <section id="contact" className="border-b border-white/5 py-24 md:px-20">
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
          <div className="rounded-lg border border-white/10 p-10 md:p-12">
            <h3 className="font-serif text-xl font-medium text-white/90">Private Inquiry Form</h3>
            <div className="mt-6 h-px bg-white/10" />
            <form className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs text-white/60">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-white/80 placeholder:text-white/40 focus:border-[#c9a84c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-white/80 placeholder:text-white/40 focus:border-[#c9a84c] focus:outline-none"
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
                  className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-white/80 placeholder:text-white/40 focus:border-[#c9a84c] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#c9a84c] py-3 font-medium text-[#060606] transition hover:bg-[#fcf6ba]"
              >
                Submit Private Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
