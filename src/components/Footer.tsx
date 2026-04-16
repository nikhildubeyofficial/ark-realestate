import Link from "next/link";

const locations = [
  "Palm Jumeirah",
  "Downtown Dubai",
  "Emirates Hills",
  "Dubai Marina",
  "Jumeirah Bay Island",
];

export default function Footer() {
  return (
    <footer className="border-t border-[#c9a84c] bg-black py-12 md:py-20">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 text-center sm:px-8 md:grid-cols-3 md:gap-16 md:px-20 md:text-left">
        <div className="space-y-6 md:items-start">
          <div className="group flex items-center justify-center gap-2 md:justify-start">
            <span className="font-serif text-xl font-medium text-white transition-colors duration-300 group-hover:text-[#c9a84c]">
              ARK
            </span>
            <span
              className="mt-1 block h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent transition-all duration-500 group-hover:w-12 group-hover:from-[#fcf6ba]"
              aria-hidden
            />
          </div>
          <p className="mx-auto max-w-[280px] font-light leading-relaxed text-white/80 text-sm md:mx-0">
            ARK Vision — Dubai&apos;s most trusted luxury real estate house,
            curating extraordinary residences since 1998.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-normal uppercase tracking-[3px] text-white/70">
            Prime Locations
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                href="/guide"
                className="link-underline font-light text-white/70 text-base tracking-wide transition-all duration-300 hover:text-[#c9a84c] hover:pl-1"
              >
                Area guides
              </Link>
            </li>
            {locations.map((loc) => (
              <li key={loc}>
                <Link
                  href={`/featured?keyword=${encodeURIComponent(loc)}`}
                  className="link-underline font-light text-white/70 text-base tracking-wide transition-all duration-300 hover:text-[#c9a84c] hover:pl-1"
                >
                  {loc}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-normal uppercase tracking-[3px] text-white/70">
            Private Updates
          </h4>
          <p className="mb-5 text-xs leading-relaxed text-white/70">
            Subscribe for exclusive off-market listings and private market
            intelligence.
          </p>
          <div className="group/input flex items-center border-b border-white/70 pb-1 transition-all duration-500 focus-within:border-[#c9a84c] focus-within:shadow-[0_2px_15px_-5px_rgba(201,168,76,0.3)]">
            <input
              type="email"
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/50 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-2 text-[#c9a84c] transition-all duration-300 hover:text-[#fcf6ba] hover:translate-x-0.5"
              aria-label="Subscribe"
            >
              →
            </button>
          </div>
        </div>
      </div>
      {/* Bottom bar with section divider */}
      <div className="section-divider mx-auto mt-12 max-w-[1280px]" />
      <p className="mt-6 text-center text-[10px] uppercase tracking-[3px] text-white/30">
        © {new Date().getFullYear()} ARK Vision International. All rights reserved.
      </p>
    </footer>
  );
}
