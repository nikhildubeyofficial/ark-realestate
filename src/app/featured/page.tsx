import FeaturedListingsClient from "@/components/FeaturedListingsClient";
import { getPropertyData } from "@/lib/propertyData";
import { Suspense } from "react";

export default async function FeaturedPage() {
  const listings = await getPropertyData(500);
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative border-b border-white/5 py-20">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
            <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
              Property Listings
            </span>
          </div>
          <h1 className="mt-4 font-serif text-5xl font-light italic text-white/90 md:text-6xl">
            Featured <span className="text-[#c9a84c]">Properties</span>
          </h1>
          <p className="mt-6 max-w-xl font-light text-white/50 text-sm leading-relaxed">
            Handpicked from Dubai&apos;s most prestigious addresses. Each
            property is a testament to uncompromising luxury and exceptional
            craftsmanship.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="border-b border-white/5 py-24 text-center font-light text-white/45 text-sm">
            Loading search…
          </div>
        }
      >
        <FeaturedListingsClient listings={listings} />
      </Suspense>
    </div>
  );
}
