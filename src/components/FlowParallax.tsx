"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function FlowParallax({
  children,
  className = "",
  speed = 0.08,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const layer = layerRef.current;
    if (!root || !layer) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let raf = 0;
    const tick = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        layer.style.transform = "";
        return;
      }

      const shifted = Math.min(Math.max(-rect.top, 0), rect.height) * speed;
      layer.style.transform = `translate3d(0, ${shifted}px, 0)`;
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
    };
  }, [speed]);

  return (
    <div ref={rootRef}>
      <div ref={layerRef} className={`will-change-transform ${className}`}>
        {children}
      </div>
    </div>
  );
}
