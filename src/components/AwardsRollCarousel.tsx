"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type AwardsRollCarouselProps = {
  images: string[];
  bodyText: string;
};

export default function AwardsRollCarousel({ images, bodyText }: AwardsRollCarouselProps) {
  const slides = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [orientationByImage, setOrientationByImage] = useState<Record<string, "portrait" | "landscape">>({});

  useEffect(() => {
    if (!slides.length) return;

    let isCancelled = false;
    const nextOrientation: Record<string, "portrait" | "landscape"> = {};

    Promise.all(
      slides.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => {
              nextOrientation[src] = img.naturalHeight > img.naturalWidth ? "portrait" : "landscape";
              resolve();
            };
            img.onerror = () => {
              nextOrientation[src] = "landscape";
              resolve();
            };
            img.src = src;
          })
      )
    ).then(() => {
      if (!isCancelled) {
        setOrientationByImage(nextOrientation);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [slides]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    setActiveIndex((prev) => {
      if (!slides.length) return 0;
      return Math.min(prev, slides.length - 1);
    });
  }, [slides.length]);

  const goPrev = () => {
    if (!slides.length) return;
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    if (!slides.length) return;
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="awards-roll-wrap mx-auto w-full max-w-[960px]">
      <div className="mb-8 text-center">
        <h3 className="font-serif text-3xl italic text-white md:text-5xl">Moments & Milestones</h3>
        <p className="mt-3 text-[10px] uppercase tracking-[0.26em] text-[#C5A059]">REWARDS & RECOGNITION</p>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-white/20 bg-[#111]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((image, idx) => (
            <div key={`${image}-${idx}`} className="flex min-w-full items-center justify-center p-4 md:p-6">
              <div
                className={`relative w-full overflow-hidden rounded-md border border-white/20 ${
                  (orientationByImage[image] ?? "landscape") === "portrait"
                    ? "mx-auto max-w-[420px] aspect-[3/4]"
                    : "max-w-[920px] aspect-[16/10]"
                }`}
              >
                <Image
                  src={image}
                  alt={`Award ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 960px"
                  priority={idx === 0}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md border border-white/30 bg-black/55 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-black/70"
          aria-label="Previous award"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-white/30 bg-black/55 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-black/70"
          aria-label="Next award"
        >
          Next
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={`dot-${idx}`}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`h-2.5 w-2.5 rounded-full border border-white/40 transition ${
              idx === activeIndex ? "bg-[#C5A059]" : "bg-transparent"
            }`}
            aria-label={`Go to award ${idx + 1}`}
          />
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-[920px] text-center text-sm leading-relaxed text-white/65">
        {bodyText}
      </p>
    </div>
  );
}
