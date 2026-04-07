"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import PropertyDetailInquireButton from "@/components/PropertyDetailInquireButton";
import type { ProjectDetailPayload } from "@/lib/propertyData";
import { MapPin, ArrowLeft, Maximize2, X, ChevronLeft, ChevronRight, Share2, Heart } from "lucide-react";

export default function PropertyDetailView({ data }: { data: ProjectDetailPayload }) {
  const { listing, descriptionHtml, gallery } = data;
  const hero = listing.image;
  // Unique images list for the gallery and lightbox
  const allImages = Array.from(
    new Set([hero, ...gallery].filter(Boolean))
  ).slice(0, 15);
  
  const [activeImage, setActiveImage] = useState(hero);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const mapHref = `https://www.google.com/maps?q=${listing.latitude},${listing.longitude}`;

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  // Sync activeImage with lightboxIndex when lightbox is open or changed
  useEffect(() => {
    if (lightboxOpen) {
      setActiveImage(allImages[lightboxIndex] as string);
    }
  }, [lightboxIndex, lightboxOpen, allImages]);

  // Keyboard navigation & body scroll lock for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [lightboxOpen, handlePrev, handleNext]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleHeroPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const curIdx = allImages.indexOf(activeImage);
    const nextIdx = curIdx === 0 ? allImages.length - 1 : curIdx - 1;
    setActiveImage(allImages[nextIdx] as string);
  };

  const handleHeroNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const curIdx = allImages.indexOf(activeImage);
    const nextIdx = curIdx === allImages.length - 1 ? 0 : curIdx + 1;
    setActiveImage(allImages[nextIdx] as string);
  };

  return (
    <div className="min-h-screen bg-[#080808] pb-24 pt-[88px]">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-20">
        <div className="mb-8 flex items-center justify-between">
          <nav className="flex items-center gap-4 text-xs font-light text-white/45">
            <Link href="/featured" className="flex items-center gap-1.5 transition-colors hover:text-[#c9a84c]">
              <ArrowLeft size={14} /> Back to Listings
            </Link>
            <span className="h-3 w-px bg-white/10" />
            <span className="truncate text-white/70">{listing.title}</span>
          </nav>
          <div className="flex gap-3">
             <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:bg-white hover:text-black">
                <Share2 size={16} />
             </button>
             <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:bg-[#c9a84c] hover:border-[#c9a84c] hover:text-black">
                <Heart size={16} />
             </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid gap-4 lg:h-[640px] lg:grid-cols-12 lg:grid-rows-1">
          {/* Main Large Image Container */}
          <div 
            className="group relative h-[300px] overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl cursor-zoom-in sm:h-[420px] lg:col-span-9 lg:row-span-1 lg:h-full"
            onClick={() => openLightbox(allImages.indexOf(activeImage))}
          >
            <Image
              src={activeImage}
              alt={listing.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 75vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
            
            {/* Hero Navigation Arrows */}
            {allImages.length > 1 && (
              <div className="absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-between px-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button 
                  onClick={handleHeroPrev}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-all hover:bg-white hover:text-black"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={handleHeroNext}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-all hover:bg-white hover:text-black"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 pointer-events-none">
              <div className="mb-6 flex gap-2">
                <span className="inline-block border border-[#c9a84c]/30 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-wider text-[#c9a84c] backdrop-blur-md">
                  {listing.credenceCategory}
                </span>
                <span className="inline-block border border-white/20 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-wider text-white/70 backdrop-blur-md">
                   {listing.readyDate || "Ready"}
                </span>
              </div>
              <h1
                className="mt-3 max-w-4xl font-serif text-4xl font-light italic text-white md:text-6xl"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {listing.title}
              </h1>
              <div className="mt-6 flex items-center gap-6">
                <p className="text-3xl font-light text-[#c9a84c]">{listing.price}</p>
                <span className="h-6 w-px bg-white/20" />
                <p className="flex items-center gap-2 text-sm text-white/50">
                   <MapPin size={16} className="text-[#c9a84c]" /> {listing.location}
                </p>
              </div>
            </div>
            
            <button 
              className="absolute right-8 top-8 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-all hover:bg-[#c9a84c] hover:border-[#c9a84c] hover:text-black hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                openLightbox(allImages.indexOf(activeImage));
              }}
            >
               <Maximize2 size={20} />
            </button>
          </div>

          {/* Vertical Gallery Sidebar */}
          <div className="hidden lg:grid grid-rows-3 gap-4 lg:col-span-3 h-full">
             {allImages.slice(1, 4).map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer group"
                  onClick={() => setActiveImage(img as string)}
                >
                   <Image 
                    src={img as string} 
                    alt="" 
                    fill 
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    sizes="25vw"
                   />
                   <div className={`absolute inset-0 transition-opacity duration-300 ${activeImage === img ? 'bg-[#c9a84c]/10 ring-2 ring-inset ring-[#c9a84c]' : 'bg-black/30 opacity-40 group-hover:opacity-0'}`} />
                </div>
             ))}
             {allImages.length > 4 && (
                <div 
                  className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 cursor-pointer flex items-center justify-center group"
                  onClick={() => openLightbox(4)}
                >
                   <Image 
                    src={allImages[4] as string} 
                    alt="" 
                    fill 
                    className="object-cover opacity-20 blur-[2px] transition-all duration-700 group-hover:scale-110 group-hover:opacity-30"
                    sizes="25vw"
                   />
                   <div className="relative z-10 text-center">
                      <p className="text-2xl font-serif text-[#c9a84c] italic">+{allImages.length - 4}</p>
                      <p className="text-[10px] uppercase tracking-widest text-white/50">View All</p>
                   </div>
                </div>
             )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_380px]">
          <div className="space-y-16">
            <section className="grid grid-cols-2 gap-8 rounded-2xl border border-white/5 bg-white/[0.01] p-10 backdrop-blur-sm md:grid-cols-4">
                <Detail label="Bedrooms" value={listing.maxBedroomsFromUnits > 0 ? `${listing.maxBedroomsFromUnits}` : "—"} />
                <Detail label="Total Area" value={listing.sqft} />
                <Detail label="Developer" value={listing.builder} />
                <Detail label="Status" value={listing.readyDate || "Ready"} />
            </section>

            <section className="border-b border-white/5 pb-16">
                <h2 className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#c9a84c]">
                  The Residence Expertise
                </h2>
                {descriptionHtml ? (
                  <div
                    className="prose prose-invert prose-sm mt-10 max-w-none font-light leading-relaxed text-white/60 prose-headings:font-serif prose-headings:italic prose-headings:text-white prose-p:mb-8 prose-strong:text-[#c9a84c]"
                    style={{ fontSize: "15px" }}
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                  />
                ) : (
                  <p className="mt-8 font-light text-white/40 italic">
                    Description coming soon for this prestigious landmark.
                  </p>
                )}
            </section>

            {allImages.length > 0 && (
              <section id="gallery">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#c9a84c]">
                    GALLERY VIEW
                  </h3>
                  <p className="text-xs text-white/30">{allImages.length} Curated Images</p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {allImages.map((src, idx) => (
                    <div
                      key={idx}
                      className={`relative aspect-square overflow-hidden rounded-xl border cursor-pointer transition-all duration-500 hover:scale-[1.04] hover:shadow-2xl ${
                        activeImage === src 
                          ? "border-[#c9a84c] ring-4 ring-[#c9a84c]/10" 
                          : "border-white/5 opacity-80 hover:opacity-100"
                      }`}
                      onClick={() => {
                        setActiveImage(src as string);
                        openLightbox(idx);
                      }}
                    >
                      <Image
                        src={src as string}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="flex flex-wrap gap-4 pt-10">
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#161616] px-8 py-4 text-xs font-medium uppercase tracking-widest text-white/90 transition-all hover:bg-white hover:text-black shadow-lg"
              >
                <MapPin size={16} className="text-[#c9a84c] group-hover:text-black" /> 
                Explore Location
              </a>
            </div>
          </div>

          <aside className="sticky top-28 h-fit space-y-8">
            <div className="rounded-2xl border border-white/10 bg-[#060606] p-10 shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#c9a84c]/5 rounded-full -mr-12 -mt-12 transition-all group-hover:scale-150 duration-700" />
              
              <div className="relative z-10 mb-8 space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-white/30">Registry: #{listing.projectId}</p>
                <h3 className="font-serif text-2xl font-medium text-white">{listing.title}</h3>
                <p className="text-2xl font-light text-[#c9a84c]">{listing.price}</p>
              </div>
              
              <div className="h-px bg-white/5 mb-8" />
              
              <div className="space-y-5 mb-10">
                <InquiryStat label="Portfolio Specialist" value={listing.builder} />
                <InquiryStat label="Residential Type" value={listing.propertyKind || "Villa"} />
                <InquiryStat label="Community" value={listing.location.split(',')[0]} />
              </div>

              <PropertyDetailInquireButton listing={listing} />
              
              <Link
                href="/featured"
                className="mt-6 block w-full border border-white/5 py-4 text-center text-[10px] font-medium uppercase tracking-widest text-white/30 transition-all hover:border-white/20 hover:text-white"
              >
                Return to Catalogue
              </Link>
            </div>
            
            <div className="rounded-2xl border border-[#c9a84c]/10 bg-[#c9a84c]/5 p-8 text-center ring-1 ring-inset ring-[#c9a84c]/5">
               <p className="text-sm font-serif italic text-white/80 mb-2">Exclusive Advisory</p>
               <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Contact Senior Consultant</p>
               <button className="mt-6 text-xs font-semibold text-[#c9a84c] hover:underline underline-offset-8">
                 Register Interest for Private Tour
               </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Modern Lightbox Component */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#050505]/98 backdrop-blur-2xl transition-all duration-500 animate-in fade-in">
          {/* Lightbox Header */}
          <div className="flex items-center justify-between px-8 py-6">
            <div className="flex flex-col">
               <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] mb-1">{listing.title}</span>
               <span className="text-[#c9a84c] text-xs font-light">{lightboxIndex + 1} / {allImages.length}</span>
            </div>
            <button 
              onClick={() => setLightboxOpen(false)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white transition-all hover:bg-white hover:text-black hover:rotate-90 duration-300"
            >
              <X size={24} />
            </button>
          </div>

          {/* Lightbox Stage */}
          <div className="relative flex flex-1 items-center justify-center p-4 lg:p-12">
            {/* Visual Navigation Arrows */}
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-8 lg:left-12 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white transition-all hover:bg-[#c9a84c] hover:border-[#c9a84c] hover:text-black active:scale-95 shadow-2xl"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="relative h-full w-full max-w-[1500px] select-none" onClick={handleNext}>
              <Image
                src={allImages[lightboxIndex] as string}
                alt=""
                fill
                className="object-contain p-4 lg:p-8"
                priority
              />
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-8 lg:right-12 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white transition-all hover:bg-[#c9a84c] hover:border-[#c9a84c] hover:text-black active:scale-95 shadow-2xl"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Lightbox Footer Preview */}
          <div className="h-28 w-full overflow-x-auto overflow-y-hidden border-t border-white/5 bg-black/60 px-4 py-4 lg:h-32 lg:px-20">
            <div className="flex h-full w-max min-w-full justify-start gap-3 lg:justify-center lg:gap-4">
              {allImages.map((img, i) => (
                <div 
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`relative h-full w-28 shrink-0 cursor-pointer overflow-hidden rounded-lg border transition-all duration-300 sm:w-36 lg:w-auto lg:aspect-video ${
                    lightboxIndex === i 
                      ? "border-[#c9a84c] ring-2 ring-[#c9a84c] scale-110 z-10" 
                      : "border-white/5 opacity-30 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <Image src={img as string} alt="" fill className="object-cover " />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2 text-center md:text-left">
      <dt className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#c9a84c]/70">
        {label}
      </dt>
      <dd className="font-serif text-xl text-white/90 italic">{value}</dd>
    </div>
  );
}

function InquiryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-white/30 uppercase tracking-widest text-[9px]">{label}</span>
      <span className="text-white/80 font-light truncate max-w-[180px]">{value}</span>
    </div>
  );
}
