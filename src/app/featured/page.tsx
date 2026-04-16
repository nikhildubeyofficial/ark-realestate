import FeaturedListingsClient from "@/components/FeaturedListingsClient";
import { PremiumSection } from "@/components/PremiumSection";
import { getPropertyListingsForFeatured } from "@/lib/propertyData";
import { Suspense } from "react";

export default async function FeaturedPage() {
  const listings = await getPropertyListingsForFeatured();
  return (
    <div className="min-h-screen">
      <PremiumSection
        eyebrow="Property Listings"
        title={
          <>
            Curated
            <span className="text-[#c9a84c]"> Opportunity Catalog</span>
          </>
        }
        description="Explore high-conviction projects selected for location quality, developer credibility, and long-term return potential."
        compact
      />

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
