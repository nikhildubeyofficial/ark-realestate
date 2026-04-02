"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, type ReactNode } from "react";

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
      // Scroll to top on page change
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 300); // matches exit animation duration

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div
      className={`page-transition ${
        phase === "enter" ? "page-enter" : "page-exit"
      }`}
    >
      {displayedChildren}
    </div>
  );
}
