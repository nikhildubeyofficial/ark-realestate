"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background video — pauses when scrolled out of view so decoding/compositing
 * does not compete with page scroll (common source of jank on long landings).
 */
export default function HeroBackgroundVideo({ src }: { src: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = wrapRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0, rootMargin: "0px" }
    );
    obs.observe(root);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-[center_35%]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
