"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";

export type HeroServicePillar = {
  title: string;
  icon: ReactNode;
};

const HERO_VIDEO_SRC = "/video/hero.mp4";

export default function HomeHero({ servicePillars }: { servicePillars: HeroServicePillar[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const layer = parallaxRef.current;
    if (!section || !layer) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let raf = 0;
    const tick = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const video = section.querySelector("video");
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        layer.style.transform = "";
        if (video) video.style.transform = "";
        return;
      }
      const scrolledInto = Math.min(Math.max(-rect.top, 0), rect.height);
      const textY = scrolledInto * 0.1;
      layer.style.transform = `translate3d(0, ${textY}px, 0)`;
      /* Background moves slightly faster than copy for a shallow parallax read */
      if (video) {
        video.style.transform = `translate3d(0, ${scrolledInto * -0.045}px, 0)`;
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      layer.style.transform = "";
      const video = section.querySelector("video");
      if (video) video.style.transform = "";
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative -mt-px min-h-[78dvh] w-full sm:min-h-[85dvh] lg:min-h-[min(92dvh,980px)]"
    >
      <HeroBackgroundVideo src={HERO_VIDEO_SRC} />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#080808] via-black/55 to-black/20" />
      <div className="absolute inset-0 z-[2] flex min-h-[inherit] flex-col px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-20 lg:pb-28 lg:pt-28">
        <div ref={parallaxRef} className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col will-change-transform">
          <div className="flex flex-1 flex-col justify-center py-10 md:py-14 lg:py-20">
            <div className="max-w-[920px] text-left">
              <h1
                className="animate-hero-title text-balance text-6xl font-light leading-[1.02] tracking-tight text-white/[0.98] drop-shadow-sm sm:text-6xl md:text-7xl md:leading-[0.98]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Where Luxury Meets Vision
              </h1>
              <p className="animate-hero-sub mt-8 max-w-[640px] font-sans text-sm font-light uppercase leading-relaxed tracking-[0.2em] text-white/70 sm:mt-10">
                Dubai&apos;s most trusted authority in luxury real estate. Curating extraordinary
                residences for the world&apos;s most discerning individuals since 1998.
              </p>
              <div className="animate-hero-sub mt-10 flex flex-wrap gap-4">
                <Link
                  href="/featured"
                  className="inline-flex items-center justify-center bg-[#c9a84c] px-8 py-3 text-sm font-medium tracking-wide text-[#080808] shadow-sm transition-all duration-300 hover:scale-105 hover:bg-[#d4b55a] hover:shadow-md"
                >
                  Explore listings
                </Link>
                <Link
                  href="/guide"
                  className="inline-flex items-center justify-center border border-white/35 bg-transparent px-8 py-3 text-sm font-medium tracking-wide text-white/95 transition-all duration-300 hover:border-[#c9a84c]/70 hover:text-[#fcf6ba]"
                >
                  Area guides
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-auto w-full max-w-[920px]">
            <div className="hero-expertise-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {servicePillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="border border-white/10 bg-[rgba(0,0,0,0.3)] p-5 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-gold/50"
                >
                  <div className="flex items-center gap-2 text-[#c9a84c]">
                    {pillar.icon}
                    <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/55">
                      Expertise
                    </p>
                  </div>
                  <p className="mt-2.5 font-sans text-sm leading-snug text-white/85">{pillar.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
