"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, type ReactNode } from "react";

/** Matches fixed header offset used in ScrollHandler / Header contact scroll */
const HEADER_SCROLL_OFFSET = 80;

function scrollToHashTargetOrTop() {
  const id = window.location.hash.replace(/^#/, "");
  if (id) {
    const el = document.getElementById(id);
    if (el) {
      const top =
        el.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
      return;
    }
  }
  window.scrollTo({ top: 0, behavior: "instant" });
}

/**
 * PageTransition — wraps page content to animate enter/exit on route change.
 * Uses CSS classes defined in globals.css for the actual animation
 * so everything stays CSS-driven and performant.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Same page — nothing to transition
    if (pathname === prevPathname.current) {
      setDisplayedChildren(children);
      return;
    }

    // New route detected — run exit → swap → enter
    prevPathname.current = pathname;
    setPhase("exit");

    const timer = setTimeout(() => {
      setDisplayedChildren(children);
      setPhase("enter");
      // After the new page paints, scroll: respect #section (e.g. #contact) instead of
      // forcing the hero — otherwise /other → /#contact jumps to top after ~300ms.
      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToHashTargetOrTop);
      });
    }, 300); // matches exit animation duration

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div className={phase === "enter" ? "page-enter" : "page-exit"}>
      {displayedChildren}
    </div>
  );
}
