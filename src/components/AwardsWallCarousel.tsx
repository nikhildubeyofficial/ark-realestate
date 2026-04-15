"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type AwardItem = {
  image: string;
  title: string;
  year: string;
};

export default function AwardsWallCarousel({
  images,
}: {
  images: string[];
}) {
  const items = useMemo<AwardItem[]>(
    () =>
      images.slice(0, 8).map((image, i) => ({
        image,
        title: i % 3 === 0 ? "Top Broker Recognition" : i % 3 === 1 ? "Developer Partner Excellence" : "Sales Performance Leadership",
        year: String(2026 - (i % 3)),
      })),
    [images]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const next = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [items.length]);

  const active = items[activeIndex];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="group relative aspect-[16/10] overflow-hidden border border-white/10 bg-black/40">
        <Image
          src={active.image}
          alt=""
          fill
          aria-hidden
          className="object-cover blur-xl scale-110 opacity-35"
          sizes="(max-width: 1024px) 100vw, 65vw"
        />
        <Image
          src={active.image}
          alt={`Award ${activeIndex + 1}`}
          fill
          className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 65vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-serif text-2xl italic text-white/95">{active.title}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/60">
              ARK Vision Distinction
            </p>
          </div>
          <p className="font-serif text-3xl italic text-[#C5A059]">{active.year}</p>
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white/80 transition hover:border-[#C5A059] hover:text-[#C5A059]"
            aria-label="Previous award"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white/80 transition hover:border-[#C5A059] hover:text-[#C5A059]"
            aria-label="Next award"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
        {items.map((item, idx) => (
          <button
            key={`${item.image}-${idx}`}
            type="button"
            onMouseEnter={() => setActiveIndex(idx)}
            onFocus={() => setActiveIndex(idx)}
            onClick={() => setActiveIndex(idx)}
            className={`group relative aspect-[4/3] overflow-hidden border transition ${
              idx === activeIndex ? "border-[#C5A059]" : "border-white/10 hover:border-white/25"
            }`}
            aria-label={`Show award ${idx + 1}`}
          >
            <Image
              src={item.image}
              alt=""
              fill
              aria-hidden
              className="object-cover blur-md scale-110 opacity-30"
              sizes="(max-width: 1024px) 50vw, 22vw"
            />
            <Image
              src={item.image}
              alt={`${item.title} ${item.year}`}
              fill
              className="object-contain p-1 transition duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 22vw"
            />
            <div className="absolute inset-0 bg-black/45 transition-colors duration-300 group-hover:bg-black/20" />
            <div className="absolute inset-x-2 bottom-2 text-left">
              <p className="font-serif text-sm italic text-white/90">{item.year}</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/65">
                Award {String(idx + 1).padStart(2, "0")}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="col-span-full -mt-1 flex items-center justify-center gap-2 lg:hidden">
        {items.map((_, idx) => (
          <button
            key={`dot-${idx}`}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === activeIndex ? "w-7 bg-[#C5A059]" : "w-1.5 bg-white/35"
            }`}
            aria-label={`Go to award ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
