import AboutLeadershipSection from "@/components/AboutLeadershipSection";
import { Reveal } from "@/components/Reveal";

const stats = [
  { value: "500+", label: "Properties Sold" },
  { value: "25+", label: "Years of Excellence" },
  { value: "1,200+", label: "Discerning Clients" },
  { value: "AED 5B+", label: "Total Sales Value" },
];

const leadershipFiles = [
  "Ganesh.png",
  "DSC00435.JPG",
  "DSC00707.JPG",
  "DSC00716.JPG",
  "DSC00775.JPG",
  "Copy of DSC00350.JPG",
  "Copy of DSC00860.JPG",
  "WhatsApp Image 2026-03-23 at 5.34.39 PM.jpeg",
];

const aboutGalleryFiles = [
  "Copy of DSC00300.JPG",
  "Copy of DSC00354.JPG",
  "Copy of DSC00377.JPG",
  "Copy of DSC00392.JPG",
  "Copy of DSC00509.JPG",
  "Copy of DSC00595.JPG",
  "Copy of DSC00616.JPG",
  "Copy of DSC00629.JPG",
  "Copy of DSC00651.JPG",
  "Copy of DSC00660.JPG",
  "DSC00273.JPG",
  "DSC00274-5.JPG",
  "DSC00277.JPG",
  "DSC00287.JPG",
  "DSC00294.JPG",
  "DSC00309.JPG",
  "DSC00313.JPG",
  "DSC00315.JPG",
  "DSC00320.JPG",
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

type Leader = { name: string; image: string };

function titleFromFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getLeadershipFromManifest(): Leader[] {
  return leadershipFiles.map((file) => ({
    name: titleFromFilename(file),
    image: `/Leaders/${encodeURIComponent(file)}`,
  }));
}

export default function AboutPage() {
  const leadership = getLeadershipFromManifest();
  const leadershipImages = leadership.map((p) => p.image);
  const aboutGallery = aboutGalleryFiles.map((f) => `/final images/${encodeURIComponent(f)}`);
  const heroImage = aboutGallery[0] ?? "/final images/Copy%20of%20DSC00300.JPG";
  const storyImage = aboutGallery[1] ?? "/final images/Copy%20of%20DSC00354.JPG";
  const ceoImage = "/final images/Dev.jpg";

  return (
    <div className="min-h-screen">
      <Reveal>
        <section className="relative min-h-[900px]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/65 to-black/35" />
        <div className="absolute inset-0 flex items-end">
          <div className="relative w-full max-w-[1280px] px-8 pb-20 md:px-20">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
              <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">Our Story</span>
            </div>
            <h1 className="mt-4 flex flex-wrap items-baseline gap-2 font-serif text-5xl font-light italic leading-tight text-white/90 md:text-6xl lg:text-7xl">
              <span>About</span>
              <span className="bg-gradient-to-r from-[#c9a84c] via-[#fcf6ba] to-[#b38f28] bg-clip-text text-transparent">Ark Vision</span>
            </h1>
            <p className="mt-5 max-w-[760px] font-light text-sm leading-relaxed text-white/70 md:text-base">
              Expert services for every real estate journey - from advisory and acquisition to portfolio growth in Dubai&apos;s most prestigious addresses.
            </p>
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-b border-white/5 bg-[#060606] py-24">
        <div className="mx-auto grid max-w-[1280px] gap-16 px-8 md:grid-cols-2 md:px-20">
          <div className="space-y-8">
            <h2 className="font-serif text-4xl font-light italic leading-tight text-white/80 md:text-5xl">
              A Quarter Century of{" "}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#fcf6ba] bg-clip-text text-transparent">Unrivalled Excellence</span>
            </h2>
            <div className="space-y-5 font-light text-white/40 text-sm leading-[1.6]">
              <p>At Ark Vision, we redefine living spaces with innovative design, insight-backed advisory, and premium execution at every stage.</p>
              <p>We do not just broker properties. We curate opportunities for investors, families, and global buyers with clarity, confidence, and measurable value.</p>
              <p>From first consultation to handover and beyond, every interaction is intentionally crafted to deliver peace of mind and long-term growth.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10">
              <div className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-[1.04]" style={{ backgroundImage: `url(${storyImage})` }} />
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
      </Reveal>

      <Reveal>
        <section className="border-b border-white/5 py-24">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-8 md:grid-cols-[360px_1fr] md:items-center md:px-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10">
            <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${ceoImage})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
          </div>
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
              <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">Meet The Founder</span>
            </div>
            <h2 className="mt-4 font-serif text-4xl font-light italic text-white/85 md:text-5xl">
              We Don&apos;t Just Do Deals.
              <span className="block text-[#c9a84c]">We Build Futures.</span>
            </h2>
            <p className="mt-6 max-w-[760px] font-light text-sm leading-relaxed text-white/45">
              We stand by your side from initial advisory to final execution and beyond, securing peace of mind and long-term wealth growth. Trust, faith, and integrity define how we serve every client.
            </p>
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-b border-white/5 bg-[#060606] py-24">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
            <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">Our Services</span>
          </div>
          <h2 className="mt-4 font-serif text-5xl font-light italic text-white/80 md:text-6xl">Expert Services for Every Journey</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((item) => (
              <div key={item} className="group border border-white/10 bg-[#080808] px-5 py-6 transition-all duration-300 hover:border-[#c9a84c]/45 hover:bg-black">
                <p className="text-xs uppercase tracking-[2.6px] text-[#c9a84c]">Service</p>
                <p className="mt-3 font-light text-sm leading-relaxed text-white/75">{item}</p>
              </div>
            ))}
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-b border-white/5 py-24">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
            <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">Communities In Focus</span>
          </div>
          <h2 className="mt-4 font-serif text-5xl font-light italic text-white/80 md:text-6xl">Portfolio Highlights</h2>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {aboutGallery.slice(0, 8).map((src, idx) => (
              <div key={src} className={`${idx === 0 ? "md:col-span-2 md:row-span-2" : ""} group relative overflow-hidden rounded-sm border border-white/10`}>
                <div className="aspect-[4/3] h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]" style={{ backgroundImage: `url(${src})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
            ))}
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-b border-white/5 py-24">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
            <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">The People</span>
          </div>
          <h2 className="mt-4 font-serif text-5xl font-light italic text-white/80 md:text-6xl">Our Leadership</h2>
          <AboutLeadershipSection imagePaths={leadershipImages} />
        </div>
        </section>
      </Reveal>

      <Reveal>
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
            {aboutGallery.slice(8).map((src, index) => (
              <div key={src} className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-black">
                <div className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]" style={{ backgroundImage: `url(${src})` }} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
                <span className="pointer-events-none absolute bottom-3 left-3 text-[10px] uppercase tracking-[2.8px] text-white/60">
                  Frame {String(index + 9).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal>
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
