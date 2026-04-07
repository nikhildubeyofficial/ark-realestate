"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * RouteLoadingBar — shows a gold shimmer bar at the very top of the
 * viewport whenever the Next.js route changes. Purely decorative
 * (no blocking), fires a CSS animation and self-removes.
 */
export default function RouteLoadingBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(0);
  const isLandingPage = pathname === "/";

  useEffect(() => {
    if (!isLandingPage) {
      setShow(false);
      return;
    }

    // On every pathname change (except initial), trigger the bar
    setKey((k) => k + 1);
    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
    }, 850); // slightly longer than the animation duration

    return () => clearTimeout(timer);
  }, [pathname, isLandingPage]);

  if (!show) return null;

  return <div key={key} className="route-loading-bar" />;
}
