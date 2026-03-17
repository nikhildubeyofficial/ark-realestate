import Link from "next/link";

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

const listings = [
  {
    title: "Penthouse at Burj Khalifa",
    subtitle: "Downtown Dubai",
    beds: 5,
    baths: 6,
    sqft: "12,500",
    location: "1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai",
    price: "AED 85M",
  },
  {
    title: "Signature Villa, Emirates Hills",
    subtitle: "Emirates Hills",
    beds: 3,
    baths: 4,
    sqft: "8,000",
    location: "Emirates Hills, Dubai",
    price: "AED 42M",
  },
  {
    title: "Marina View Residence",
    subtitle: "Dubai Marina",
    beds: 4,
    baths: 5,
    sqft: "10,000",
    location: "Dubai Marina, Dubai",
    price: "AED 58M",
  },
  {
    title: "Palm Jumeirah Estate",
    subtitle: "Palm Jumeirah",
    beds: 6,
    baths: 7,
    sqft: "15,000",
    location: "Palm Jumeirah, Dubai",
    price: "AED 120M",
  },
  {
    title: "Jumeirah Bay Island Penthouse",
    subtitle: "Jumeirah Bay Island",
    beds: 4,
    baths: 5,
    sqft: "9,200",
    location: "Jumeirah Bay Island, Dubai",
    price: "AED 72M",
  },
  {
    title: "Downtown Sky Villa",
    subtitle: "Downtown Dubai",
    beds: 5,
    baths: 6,
    sqft: "11,000",
    location: "Downtown Dubai, UAE",
    price: "AED 78M",
  },
];

export default function FeaturedPage() {
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

      {/* Developer filter */}
      <section className="sticky top-[72px] z-40 border-b border-white/5 bg-[#080808]/95 py-4 backdrop-blur">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          <div className="flex flex-wrap gap-3">
            {developers.map((name) => (
              <button
                key={name}
                type="button"
                className="rounded border border-white/20 bg-transparent px-5 py-2.5 font-light text-white/80 text-sm transition hover:border-[#c9a84c] hover:text-[#c9a84c]"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Listings grid */}
      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <article
                key={listing.title}
                className="group overflow-hidden rounded-lg border border-white/10 bg-white/5 transition hover:border-[#c9a84c]/30"
              >
                <div className="relative aspect-[4/3] bg-white/10">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600)`,
                    }}
                  />
                  <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white/80">
                    ♡
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex gap-4 text-xs text-white/90">
                    <span>{listing.beds} Beds</span>
                    <span>{listing.baths} Baths</span>
                    <span>{listing.sqft} ft²</span>
                  </div>
                </div>
                <div className="border-t border-white/10 p-6">
                  <h2 className="font-serif text-xl font-medium text-white/90">
                    {listing.title}
                  </h2>
                  <p className="mt-1 text-sm text-[#c9a84c]">{listing.subtitle}</p>
                  <p className="mt-3 flex items-center gap-2 text-xs text-white/50">
                    <span>📍</span> {listing.location}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-medium text-[#c9a84c]">
                      {listing.price}
                    </span>
                    <Link
                      href="#contact"
                      className="text-sm text-white/70 underline-offset-4 transition hover:text-[#c9a84c]"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
