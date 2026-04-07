"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PropertyDetailInquireButton from "@/components/PropertyDetailInquireButton";
import type { ProjectDetailPayload } from "@/lib/propertyData";
import { MapPin, ArrowLeft, Maximize2 } from "lucide-react";

export default function PropertyDetailView({ data }: { data: ProjectDetailPayload }) {
  const { listing, descriptionHtml, gallery } = data;
  const hero = listing.image;
  const allImages = Array.from(
    new Set([hero, ...gallery].filter(Boolean))
  ).slice(0, 15);
  
  const [activeImage, setActiveImage] = useState(hero);
  const mapHref = `https://www.google.com/maps?q=${listing.latitude},${listing.longitude}`;

  return (
    <div className="min-h-screen bg-[#080808] pb-24 pt-[88px]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-20">
        <nav className="mb-8 flex items-center gap-4 text-xs font-light text-white/45">
          <Link href="/featured" className="flex items-center gap-1.5 hover:text-[#c9a84c] transition-colors">
            <ArrowLeft size={14} /> Back to Listings
          </Link>
          <span className="h-3 w-px bg-white/10" />
          <span className="text-white/70 truncate">{listing.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid gap-4 lg:grid-cols-4 lg:grid-rows-2 lg:h-[600px]">
          {/* Main Large Image */}
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 lg:col-span-3 lg:row-span-2">
            <Image
              src={activeImage}
              alt={listing.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 75vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="inline-block border border-[#c9a84c]/30 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-wider text-[#c9a84c] backdrop-blur-sm">
                {listing.credenceCategory}
              </span>
              <h1
                className="mt-3 max-w-4xl font-serif text-3xl font-light italic text-white/95 md:text-5xl"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {listing.title}
              </h1>
              <div className="mt-4 flex items-center gap-4">
                <p className="text-2xl font-light text-[#c9a84c]">{listing.price}</p>
                <span className="h-4 w-px bg-white/20" />
                <p className="flex items-center gap-1.5 text-xs text-white/60">
                   <MapPin size={14} className="text-[#c9a84c]" /> {listing.location}
                </p>
              </div>
            </div>
            
            {/* Gallery Indicator / Zoom Icon */}
            <button className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 transition-all hover:bg-[#c9a84c] hover:border-[#c9a84c] hover:text-black hover:scale-110">
               <Maximize2 size={18} />
            </button>
          </div>

          {/* Sidebar Thumbs/Featured Grid */}
          <div className="hidden lg:grid grid-rows-2 gap-4 h-full">
             {allImages.slice(1, 3).map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 cursor-pointer group"
                  onClick={() => setActiveImage(img as string)}
                >
                   <Image 
                    src={img as string} 
                    alt="" 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="25vw"
                   />
                   <div className={`absolute inset-0 transition-opacity duration-300 ${activeImage === img ? 'bg-[#c9a84c]/20 ring-1 ring-inset ring-[#c9a84c]' : 'bg-black/20 opacity-40 group-hover:opacity-0'}`} />
                </div>
             ))}
             {/* If less than 2 extra images, fill with something or maybe adjust grid */}
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="space-y-12">
            {/* Quick Stats */}
            <section className="grid grid-cols-2 gap-6 rounded-lg border border-white/10 bg-white/[0.02] p-8 md:grid-cols-4">
                <Detail label="Bedrooms" value={listing.maxBedroomsFromUnits > 0 ? `${listing.maxBedroomsFromUnits}` : "—"} />
                <Detail label="Total Area" value={listing.sqft} />
                <Detail label="Developer" value={listing.builder} />
                <Detail label="Status" value={listing.readyDate || "On Request"} />
            </section>

            {/* Description */}
            <section className="border-b border-white/5 pb-12">
                <h2 className="text-[10px] font-light uppercase tracking-[0.3em] text-[#c9a84c]">
                  Property Overview
                </h2>
                {descriptionHtml ? (
                  <div
                    className="prose prose-invert prose-sm mt-8 max-w-none font-light leading-relaxed text-white/70 prose-headings:font-serif prose-headings:italic prose-headings:text-white prose-p:mb-6 prose-strong:text-[#c9a84c]"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                  />
                ) : (
                  <p className="mt-6 font-light text-white/40 italic">
                    A detailed description for this exceptional residence is being curated. Please inquire for further details.
                  </p>
                )}
            </section>

            {/* More Images / Gallery Grid */}
            {allImages.length > 1 && (
              <section>
                <h3 className="text-[10px] font-light uppercase tracking-[0.3em] text-[#c9a84c] mb-8">
                  Gallery View
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {allImages.map((src, idx) => (
                    <div
                      key={idx}
                      className={`relative aspect-square overflow-hidden rounded-lg border cursor-pointer transition-all duration-300 ${
                        activeImage === src 
                          ? "border-[#c9a84c] ring-2 ring-[#c9a84c]/20 scale-[0.98]" 
                          : "border-white/10 grayscale-[0.3] hover:grayscale-0 hover:scale-[1.03]"
                      }`}
                      onClick={() => setActiveImage(src as string)}
                    >
                      <Image
                        src={src as string}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="flex flex-wrap gap-4 pt-6">
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-6 py-3 text-sm font-light text-white/90 transition-all hover:border-[#c9a84c] hover:text-[#c9a84c] hover:bg-[#c9a84c]/10"
              >
                <MapPin size={16} /> View on Google Maps
              </a>
            </div>
          </div>

          {/* Inquiry Widget */}
          <aside className="sticky top-28 h-fit space-y-6">
            <div className="card-premium rounded-xl border border-white/10 bg-[#080808] p-8 shadow-xl">
              <div className="mb-6 space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-white/40">Ref: #{listing.projectId}</p>
                <h3 className="font-serif text-xl font-medium text-white/90">{listing.title}</h3>
                <p className="text-xl text-[#c9a84c]">{listing.price}</p>
              </div>
              
              <div className="h-px bg-white/10 mb-6" />
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Developer</span>
                  <span className="text-white/80">{listing.builder}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Type</span>
                  <span className="text-white/80 capitalize">{listing.propertyKind || "Residential"}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Location</span>
                  <span className="text-white/80">{listing.location.split(',')[0]}</span>
                </div>
              </div>

              <PropertyDetailInquireButton listing={listing} />
              
              <Link
                href="/featured"
                className="mt-4 block w-full border border-white/20 py-3 text-center text-xs font-light text-white/50 transition-all hover:border-white/40 hover:text-white"
              >
                Back to Property Search
              </Link>
            </div>
            
            <div className="rounded-xl border border-[#c9a84c]/10 bg-[#c9a84c]/5 p-6 text-center">
               <p className="text-xs text-white/60 mb-1">Expert Consultation</p>
               <p className="text-[10px] text-white/30 uppercase tracking-widest">Connect with an Advisor</p>
               <button className="mt-4 text-xs font-medium text-[#c9a84c] hover:underline underline-offset-4">
                 Book a Virtual Tour
               </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <dt className="text-[10px] uppercase tracking-widest text-white/35">
        {label}
      </dt>
      <dd className="font-serif text-base text-white/90 italic">{value}</dd>
    </div>
  );
}
