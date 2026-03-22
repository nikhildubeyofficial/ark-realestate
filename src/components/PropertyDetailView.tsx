import Image from "next/image";
import Link from "next/link";
import PropertyDetailInquireButton from "@/components/PropertyDetailInquireButton";
import type { ProjectDetailPayload } from "@/lib/propertyData";

export default function PropertyDetailView({ data }: { data: ProjectDetailPayload }) {
  const { listing, descriptionHtml, gallery } = data;
  const hero = listing.image;
  const thumbs = Array.from(
    new Set([hero, ...gallery].filter(Boolean))
  ).slice(0, 12);
  const mapHref = `https://www.google.com/maps?q=${listing.latitude},${listing.longitude}`;

  return (
    <div className="min-h-screen bg-[#080808] pb-24 pt-[88px]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-20">
        <nav className="mb-8 text-xs font-light text-white/45">
          <Link href="/featured" className="hover:text-[#c9a84c]">
            Property Listings
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">{listing.title}</span>
        </nav>

        <div className="relative aspect-[21/9] min-h-[220px] w-full overflow-hidden rounded-lg border border-white/10 bg-white/5 sm:aspect-[2.4/1]">
          <Image
            src={hero}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <span className="inline-block border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-wider text-white/80">
              {listing.credenceCategory}
            </span>
            <h1
              className="mt-3 max-w-4xl font-serif text-3xl font-light italic text-white/95 md:text-5xl"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {listing.title}
            </h1>
            <p className="mt-2 text-lg text-[#c9a84c] md:text-xl">{listing.price}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-10">
            <section className="border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <h2 className="text-[10px] font-light uppercase tracking-[0.2em] text-white/40">
                Key details
              </h2>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <Detail label="Developer" value={listing.builder} />
                <Detail label="Location" value={listing.location} />
                <Detail
                  label="Category"
                  value={listing.credenceCategory}
                />
                <Detail
                  label="Bedrooms (max)"
                  value={
                    listing.maxBedroomsFromUnits > 0
                      ? String(listing.maxBedroomsFromUnits)
                      : "—"
                  }
                />
                <Detail label="Area" value={listing.sqft} />
                {listing.readyDate ? (
                  <Detail label="Delivery" value={listing.readyDate} />
                ) : null}
              </dl>
            </section>

            {descriptionHtml ? (
              <section className="border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <h2 className="text-[10px] font-light uppercase tracking-[0.2em] text-white/40">
                  About
                </h2>
                <div
                  className="prose prose-invert prose-sm mt-4 max-w-none font-light leading-relaxed text-white/70 prose-headings:text-white/90 prose-p:mb-4 prose-ul:my-2 prose-li:text-white/65"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              </section>
            ) : (
              <p className="font-light text-sm text-white/45">
                Full description will be available soon. Request details using
                Inquire.
              </p>
            )}

            {thumbs.length > 1 ? (
              <section>
                <h2 className="text-[10px] font-light uppercase tracking-[0.2em] text-white/40">
                  Gallery
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {thumbs.slice(1).map((src) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden rounded border border-white/10"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width:768px) 50vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <a
              href={mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex border border-white/20 px-5 py-2.5 text-sm font-light text-white/75 transition hover:border-[#c9a84c] hover:text-[#c9a84c]"
            >
              View on map
            </a>
          </div>

          <aside className="h-fit space-y-4 border border-white/10 bg-[#060606] p-6">
            <p className="text-xs font-light uppercase tracking-wider text-white/40">
              Reference
            </p>
            <p className="font-serif text-lg text-white/90">{listing.title}</p>
            <p className="text-sm text-[#c9a84c]">{listing.price}</p>
            <p className="text-xs text-white/45">ID #{listing.projectId}</p>
            <PropertyDetailInquireButton listing={listing} />
            <Link
              href="/featured"
              className="mt-2 block w-full border border-white/20 py-2.5 text-center text-sm font-light text-white/70 transition hover:border-[#c9a84c]"
            >
              Back to listings
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-white/35">
        {label}
      </dt>
      <dd className="mt-1 font-light text-sm text-white/85">{value}</dd>
    </div>
  );
}
