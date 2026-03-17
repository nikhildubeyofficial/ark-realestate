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
    <footer className="border-t border-[#c9a84c] bg-black py-20">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-8 md:grid-cols-3 md:px-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-medium text-white">
              ARK
            </span>
            <span
              className="mt-1 block h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent"
              aria-hidden
            />
          </div>
          <p className="max-w-[280px] font-light leading-relaxed text-white/80 text-sm">
            Ark Vision — Dubai&apos;s most trusted luxury real estate house,
            curating extraordinary residences since 1998.
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <a
                key={i}
                href="#"
                className="flex h-7 w-7 items-center justify-center rounded border border-white/30 text-white/70 transition hover:border-[#c9a84c] hover:text-[#c9a84c]"
                aria-label={`Social link ${i}`}
              >
                <span className="text-xs">→</span>
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-normal uppercase tracking-[3px] text-white/70">
            Prime Locations
          </h4>
          <ul className="space-y-3">
            {locations.map((loc) => (
              <li key={loc}>
                <Link
                  href="#"
                  className="font-light text-white/70 text-base tracking-wide transition hover:text-[#c9a84c]"
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
          <div className="flex items-center border-b border-white/70 pb-1">
            <input
              type="email"
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/50 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-2 text-[#c9a84c] transition hover:text-[#fcf6ba]"
              aria-label="Subscribe"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
