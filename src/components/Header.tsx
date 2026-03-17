"use client";

import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/featured", label: "Property Listings" },
  { href: "/blog", label: "Blogs" },
  { href: "#events", label: "Events" },
];

export default function Header() {
  return (
    <>
      {/* Top bar */}
      <div className="hidden border-b border-white/5 bg-[#060606] px-9 py-2.5 md:flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[2.6px] text-white/50">
          Established 1998 · Dubai, United Arab Emirates
        </p>
        <div className="flex items-center gap-1.5">
          <svg
            className="h-2.5 w-2.5 text-white/50"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span className="text-[11px] tracking-widest text-white/50">
            +971 4 123 4567
          </span>
        </div>
      </div>
      {/* Main nav */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#080808]/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-8 md:px-[120px]">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-xl font-medium text-white">
              ARK
            </span>
            <span
              className="mt-1 block h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent"
              aria-hidden
            />
          </Link>
          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-white/80 transition hover:text-white"
              >
                {label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="border border-white/80 bg-transparent px-4 py-3 text-sm text-white/80 transition hover:bg-white hover:text-[#060606]"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
