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
      >
        <div className="grid gap-4 border border-white/10 bg-white/[0.02] p-5 text-xs uppercase tracking-[2.4px] text-white/50 md:grid-cols-3">
          <p>Verified market inventory</p>
          <p>Multi-criteria discovery</p>
          <p>Premium advisory support</p>
        </div>
      </PremiumSection>

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
