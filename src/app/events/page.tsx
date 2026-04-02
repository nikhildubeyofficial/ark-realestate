import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const events = [
  {
    title: "Private Viewing — Palm Jumeirah Residences",
    date: "April 12, 2025",
    time: "6:00 PM – 9:00 PM",
    location: "Ark Vision Gallery, Downtown Dubai",
    excerpt:
      "An invitation-only evening showcasing off-market waterfront estates with champagne reception.",
  },
  {
    title: "Dubai Luxury Market Outlook 2025",
    date: "April 26, 2025",
    time: "4:00 PM – 6:30 PM",
    location: "Level 45, Burj Khalifa",
    excerpt:
      "Executive briefing on investment trends, Golden Visa pathways, and prime developer launches.",
  },
  {
    title: "Developer Roundtable with Emaar & Damac",
    date: "May 8, 2025",
    time: "10:00 AM – 1:00 PM",
    location: "Dubai Marina Conference Suite",
    excerpt:
      "Direct access to senior sales directors for pre-launch inventory and payment-plan structures.",
  },
  {
    title: "Sunset Yacht Tour — Marina & JBR",
    date: "May 22, 2025",
    time: "5:30 PM – 8:00 PM",
    location: "Dubai Marina Yacht Club",
    excerpt:
      "Experience the coastline from the water while previewing marina-front investment opportunities.",
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080808]">
      <section className="relative border-b border-white/5 py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1743191907875-d4e59e5df77d?w=1600)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#080808]/90 to-[#080808]" />
        <div className="relative mx-auto max-w-[1280px] px-5 md:px-20">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
              <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                Exclusive gatherings
              </span>
            </div>
            <h1
              className="mt-4 font-serif text-4xl font-light italic text-white/90 md:text-6xl"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Upcoming <span className="text-[#c9a84c]">Events</span>
            </h1>
            <p className="mt-6 max-w-xl font-light text-white/50 text-sm leading-relaxed">
              By-invitation experiences for discerning clients — private viewings, market briefings,
              and curated evenings across Dubai&apos;s most prestigious addresses.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] space-y-8 px-5 md:px-20">
          {events.map((ev, i) => (
            <Reveal key={ev.title} delayMs={i * 80}>
              <article className="card-premium group relative flex flex-col gap-6 overflow-hidden rounded-lg border border-white/10 bg-white/5 md:flex-row md:gap-10">
                <div
                  className="h-48 w-full shrink-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03] md:h-auto md:min-h-[220px] md:w-[320px] lg:w-[400px]"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1748373448914-1d7f882700e2?w=800)",
                  }}
                />
                <div className="flex flex-1 flex-col justify-center p-6 md:py-10 md:pr-10">
                  <p className="text-[10px] font-light uppercase tracking-[3px] text-[#c9a84c]">
                    {ev.date} · {ev.time}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-medium text-white/90 transition-colors duration-300 group-hover:text-[#fcf6ba] md:text-3xl">
                    {ev.title}
                  </h2>
                  <p className="mt-2 flex items-center gap-2 text-xs text-white/45">
                    <span>📍</span> {ev.location}
                  </p>
                  <p className="mt-4 font-light text-white/50 text-sm leading-relaxed">
                    {ev.excerpt}
                  </p>
                  <Link
                    href="/#contact"
                    className="btn-magnetic mt-6 inline-flex w-fit items-center gap-2 border border-[#c9a84c]/60 px-5 py-2.5 text-sm text-[#c9a84c] transition-all duration-400 hover:bg-[#c9a84c] hover:text-[#060606] hover:shadow-[0_0_20px_-5px_rgba(201,168,76,0.4)] hover:gap-3"
                  >
                    Request invitation <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <Reveal>
          <div className="mx-auto max-w-[640px] px-5 text-center">
            <h2
              className="font-serif text-3xl font-light italic text-white/90 md:text-4xl"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Host a private event with Ark Vision
            </h2>
            <p className="mt-4 font-light text-white/50 text-sm">
              Our team coordinates bespoke viewings and corporate hospitality for qualified buyers
              and partners.
            </p>
            <Link
              href="/#contact"
              className="btn-magnetic mt-8 inline-block bg-[#c9a84c] px-8 py-3 font-medium text-[#060606] transition-all duration-400 hover:bg-[#fcf6ba] hover:shadow-[0_0_30px_-5px_rgba(201,168,76,0.5)] active:scale-[0.98]"
            >
              Contact us
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
