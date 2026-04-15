import Image from "next/image";
import Link from "next/link";
import { getAreaGuidesWithImages } from "@/lib/areaGuideImages.server";

export const metadata = {
  title: "Area Guides | ARK Vision",
  description:
    "Explore Dubai’s key communities — waterfront, downtown, and investment corridors.",
};

export default async function GuidePage() {
  const AREA_GUIDES = await getAreaGuidesWithImages();

  return (
    <div className="min-h-screen">
      <section className="relative border-b border-white/5 py-20">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
            <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
              Area Guides
            </span>
          </div>
          <h1 className="mt-4 font-serif text-5xl font-light italic text-white/90 md:text-6xl">
            Dubai <span className="text-[#c9a84c]">Communities</span>
          </h1>
          <p className="mt-6 max-w-2xl font-light text-white/50 text-sm leading-relaxed">
            Curated overviews of Dubai&apos;s most sought-after districts — tap
            through to search live inventory on Property Listings with keywords
            pre-filled, similar to a full-service brokerage search experience.
          </p>
        </div>
      </section>

      <section className="border-b border-white/5 py-16 md:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-8 md:grid-cols-2 md:gap-12 md:px-20 lg:grid-cols-3">
          {AREA_GUIDES.map((area) => (
            <article
              key={area.slug}
              className="card-premium group relative flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <h2 className="absolute bottom-4 left-4 right-4 font-serif text-xl font-medium text-white/95">
                  {area.title}
                </h2>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="flex-1 font-light text-sm leading-relaxed text-white/45">
                  {area.excerpt}
                </p>
                <Link
                  href={`/featured?search=${encodeURIComponent(area.searchKeyword)}&locality=${encodeURIComponent(area.localityMatch)}`}
                  className="btn-magnetic mt-6 inline-flex w-fit border border-[#c9a84c] bg-transparent px-5 py-2.5 text-sm font-light text-[#c9a84c] transition-all duration-400 hover:bg-[#c9a84c] hover:text-[#060606] hover:shadow-[0_0_20px_-5px_rgba(201,168,76,0.4)]"
                >
                  View properties
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
