"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import FlowParallax from "@/components/FlowParallax";

const testimonials = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  imageSrc: `/testimonial/${index + 1}.jpeg`,
}));

export default function TestimonialVideos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [orientationByImage, setOrientationByImage] = useState<Record<string, "portrait" | "landscape">>({});

  useEffect(() => {
    let cancelled = false;
    const nextOrientation: Record<string, "portrait" | "landscape"> = {};

    Promise.all(
      testimonials.map(
        (item) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => {
              nextOrientation[item.imageSrc] = img.naturalHeight > img.naturalWidth ? "portrait" : "landscape";
              resolve();
            };
            img.onerror = () => {
              nextOrientation[item.imageSrc] = "portrait";
              resolve();
            };
            img.src = item.imageSrc;
          })
      )
    ).then(() => {
      if (!cancelled) setOrientationByImage(nextOrientation);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeImage = testimonials[activeIndex].imageSrc;
  const activeOrientation = orientationByImage[activeImage] ?? "portrait";

  return (
    <section className="relative overflow-hidden border-b border-[#C5A059]/40 bg-[#050505] py-24 md:py-48">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      
      <FlowParallax className="relative mx-auto max-w-[1280px] px-5 md:px-12" speed={0.08}>
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C5A059]" />
            <span className="text-[10px] font-light uppercase tracking-[5px] text-[#C5A059]">
              Client Voices
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C5A059]" />
          </div>
          <h2
            className="mt-4 font-serif text-[40px] font-light italic leading-tight text-white/90 md:text-[50px]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Words of <span className="text-[#C5A059]">Trust</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[500px] font-light text-white/50 text-sm">
            Captured moments from our testimonial sessions and client success stories.
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-[980px] justify-center">
          <div
            className={`relative overflow-hidden rounded-xl border border-white/10 bg-black ${
              activeOrientation === "landscape"
                ? "w-full max-w-[900px] aspect-[16/10]"
                : "w-full max-w-[520px] aspect-[3/4]"
            }`}
          >
            <Image
              src={activeImage}
              alt={`Testimonial ${testimonials[activeIndex].id}`}
              fill
              className="object-contain bg-black"
              sizes="(max-width: 768px) 100vw, 900px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          </div>

          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white/80 transition hover:border-[#c9a84c] hover:text-[#c9a84c]"
            aria-label="Previous testimonial image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white/80 transition hover:border-[#c9a84c] hover:text-[#c9a84c]"
            aria-label="Next testimonial image"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition ${
                idx === activeIndex ? "w-8 bg-[#c9a84c]" : "w-2.5 bg-white/35"
              }`}
              aria-label={`Go to testimonial ${item.id}`}
            />
          ))}
        </div>

      </FlowParallax>
    </section>
  );
}
