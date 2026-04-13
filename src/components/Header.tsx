"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/team", label: "Team" },
  { href: "/featured", label: "Property Listings" },
  { href: "/guide", label: "Guide" },
  { href: "/blog", label: "Blogs" },
  { href: "/events", label: "Events" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  // Refs for the sliding nav indicator
  const navRef = useRef<HTMLElement>(null);
  /** Landing scroll bar: updated via transform in rAF — avoids width transitions + Header re-renders on scroll. */
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  // Measure the active link and position the indicator
  const updateIndicator = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    const activeLink = linkRefs.current.get(pathname);
    if (activeLink) {
      const navRect = navEl.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicator({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    } else {
      setIndicator(null);
    }
  }, [pathname]);

  useEffect(() => {
    updateIndicator();
    // Also recalculate on resize
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      const nextScrolled = window.scrollY > 12;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));

      if (isLandingPage) {
        const el = scrollProgressRef.current;
        if (el) {
          const doc = document.documentElement;
          const total = doc.scrollHeight - doc.clientHeight;
          const progress = total > 0 ? Math.min(window.scrollY / total, 1) : 0;
          el.style.transform = `scaleX(${progress})`;
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScroll);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLandingPage]);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Store link ref callback
  const setLinkRef = useCallback(
    (href: string) => (el: HTMLAnchorElement | null) => {
      if (el) {
        linkRefs.current.set(href, el);
      } else {
        linkRefs.current.delete(href);
      }
    },
    []
  );

  return (
    <>
      <div className="hidden border-b border-white/5 bg-[#060606] px-4 py-2 sm:px-9 sm:py-2.5 md:flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[2.6px] text-white/50 sm:text-[11px]">
          Established 1999 · Dubai, United Arab Emirates
        </p>
        <div className="flex items-center gap-1.5">
          <svg
            className="h-2.5 w-2.5 shrink-0 text-white/50"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span className="text-[10px] tracking-widest text-white/50 sm:text-[11px]">
            +971 4 123 4567
          </span>
        </div>
      </div>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "border-white/10 bg-[#080808] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.85),0_0_30px_-10px_rgba(201,168,76,0.08)]"
            : "border-white/5 bg-[#080808] shadow-none"
        }`}
      >
        {/* Scroll progress bar - only on landing page */}
        {isLandingPage && (
          <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-white/5">
            <div
              ref={scrollProgressRef}
              className="h-full w-full origin-left bg-gradient-to-r from-[#c9a84c] to-[#fcf6ba]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        )}
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:h-[72px] sm:px-8 lg:px-[120px]">
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="group flex items-center transition-opacity duration-300 hover:opacity-90"
          >
            <Image
              src="/ARK LOGO BLACK.png"
              alt="Ark Vision Logo"
              width={140}
              height={45}
              className="h-[86px] w-[106px] object-contain"
              priority
            />
          </Link>

          {/* Desktop nav with sliding indicator */}
          <nav ref={navRef} className="relative hidden items-center gap-6 lg:gap-10 md:flex">
            {/* Sliding active indicator */}
            {indicator && (
              <div
                className="nav-indicator"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: 1,
                }}
              />
            )}
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                ref={setLinkRef(href)}
                href={href}
                className={`nav-link-glow relative text-sm transition-all duration-300 hover:text-white ${
                  pathname === href
                    ? "text-[#c9a84c]"
                    : "text-white/80"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="btn-magnetic border border-white/80 bg-transparent px-4 py-2.5 text-sm text-white/80 transition-all duration-400 hover:border-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#060606] hover:shadow-[0_0_20px_-5px_rgba(201,168,76,0.4)]"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded border border-white/20 text-white transition-all duration-300 hover:border-[#c9a84c]/50 hover:shadow-[0_0_15px_-5px_rgba(201,168,76,0.3)] md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-0.5 w-5 bg-white transition-all duration-300 ${open ? "translate-y-2 rotate-45 bg-[#c9a84c]" : ""}`}
            />
            <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span
              className={`block h-0.5 w-5 bg-white transition-all duration-300 ${open ? "-translate-y-2 -rotate-45 bg-[#c9a84c]" : ""}`}
            />
          </button>
        </div>

        {/* Mobile menu - solid background */}
        <div
          className={`fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-[#080808] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:top-[72px] md:hidden ${
            open ? "visible opacity-100 translate-y-0" : "invisible pointer-events-none opacity-0 -translate-y-3"
          }`}
        >
          <nav className="flex flex-col gap-1 px-6 py-8">
            {navLinks.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                className={`group/mobile relative border-b border-white/10 py-4 text-lg transition-all duration-500 hover:pl-3 ${
                  pathname === href ? "text-[#c9a84c]" : "text-white/90 hover:text-[#c9a84c]"
                }`}
                style={{
                  transitionDelay: open ? `${i * 60}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(-12px)",
                }}
              >
                {/* Active indicator dot for mobile */}
                {pathname === href && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#c9a84c]" />
                )}
                <span className={pathname === href ? "ml-4" : ""}>{label}</span>
              </Link>
            ))}
            <Link
              href="/#contact"
              className="btn-magnetic mt-6 border border-[#c9a84c] py-4 text-center text-[#c9a84c] transition-all duration-300 hover:bg-[#c9a84c] hover:text-[#060606]"
              style={{
                transitionDelay: open ? `${navLinks.length * 60}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(8px)",
              }}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
