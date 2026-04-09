"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * BackToTop — a floating gold button that appears after scrolling down.
 * Smooth-scrolls back to the top when clicked.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let last = false;
    const tick = () => {
      ticking = false;
      const next = window.scrollY > 500;
      if (next !== last) {
        last = next;
        setVisible(next);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(tick);
      }
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`back-to-top fixed bottom-8 right-8 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a84c]/50 bg-[#080808]/90 text-[#c9a84c] shadow-[0_0_20px_-5px_rgba(201,168,76,0.3)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#060606] hover:shadow-[0_0_30px_-5px_rgba(201,168,76,0.5)] hover:-translate-y-1 active:scale-90 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
