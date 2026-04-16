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
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
              alt="ARK Vision Logo"
              width={180}
              height={58}
              className="h-12 w-[94px] object-contain sm:h-[68px] sm:w-[112px]"
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

        {/* Mobile menu */}
        <div
          className={`fixed inset-x-0 bottom-0 top-16 z-40 md:hidden transition-all duration-300 sm:top-[72px] ${
            open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
          }`}
        >
          <div className="h-full overflow-y-auto bg-[#080808]/98 backdrop-blur-sm">
            <nav className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 sm:px-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-md border border-transparent px-3 py-3 text-base transition-colors ${
                    pathname === href
                      ? "border-[#c9a84c]/40 bg-[#c9a84c]/10 text-[#c9a84c]"
                      : "text-white/90 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="mt-3 rounded-md border border-[#c9a84c] px-3 py-3 text-center text-sm font-medium text-[#c9a84c] transition-all duration-300 hover:bg-[#c9a84c] hover:text-[#060606]"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
