"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/featured", label: "Property Listings" },
  { href: "/blog", label: "Blogs" },
  { href: "/events", label: "Events" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
        className={`sticky top-0 z-50 border-b bg-[#080808]/95 backdrop-blur-md transition-[box-shadow,border-color,background-color] duration-500 supports-[backdrop-filter]:bg-[#080808]/85 ${
          scrolled
            ? "border-white/10 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.85)] shadow-black/60"
            : "border-white/5 shadow-none"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:h-[72px] sm:px-8 lg:px-[120px]">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-90"
          >
            <span className="font-serif text-lg font-medium text-white sm:text-xl">ARK</span>
            <span
              className="mt-1 block h-px w-6 bg-gradient-to-r from-[#c9a84c] to-transparent sm:w-8"
              aria-hidden
            />
          </Link>
          <nav className="hidden items-center gap-6 lg:gap-10 md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative text-sm transition-colors duration-300 after:absolute after:bottom-[-6px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#c9a84c] after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100 ${
                  pathname === href ? "text-[#c9a84c] after:scale-x-100" : "text-white/80"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="border border-white/80 bg-transparent px-4 py-2.5 text-sm text-white/80 transition-all duration-300 hover:border-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#060606]"
            >
              Contact Us
            </Link>
          </nav>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded border border-white/20 text-white md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-0.5 w-5 bg-white transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`block h-0.5 w-5 bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 w-5 bg-white transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
        <div
          className={`fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-[#080808]/98 backdrop-blur-lg transition-all duration-300 sm:top-[72px] md:hidden ${
            open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1 px-6 py-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`border-b border-white/10 py-4 text-lg transition-colors duration-300 ${
                  pathname === href ? "text-[#c9a84c]" : "text-white/90"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="mt-6 border border-[#c9a84c] py-4 text-center text-[#c9a84c] transition-colors duration-300 hover:bg-[#c9a84c] hover:text-[#060606]"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
