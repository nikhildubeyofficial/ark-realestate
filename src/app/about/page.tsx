import Image from "next/image";

const stats = [
  { value: "500+", label: "Properties Sold" },
  { value: "25+", label: "Years of Excellence" },
  { value: "1,200+", label: "Discerning Clients" },
  { value: "AED 5B+", label: "Total Sales Value" },
];

const leadership = [
  {
    name: "Khalid Al Mansouri",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
  },
  {
    name: "Sarah Chen",
    role: "Head of Luxury Sales",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
  },
  {
    name: "James Whitmore",
    role: "Senior Investment Advisor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  },
  {
    name: "Nadia Rashid",
    role: "Client Relations Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero with background image */}
      <section className="relative min-h-[900px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1440)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/60 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="relative w-full max-w-[1280px] px-8 pb-20 md:px-20">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
              <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
                Our Story
              </span>
            </div>
            <h1 className="mt-4 flex flex-wrap items-baseline gap-2 font-serif text-5xl font-light italic leading-tight text-white/90 md:text-6xl lg:text-7xl">
              <span>About</span>
              <span className="bg-gradient-to-r from-[#c9a84c] via-[#fcf6ba] to-[#b38f28] bg-clip-text text-transparent">
                Ark Vision
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Story + Stats grid */}
      <section className="border-b border-white/5 bg-[#060606] py-24">
        <div className="mx-auto grid max-w-[1280px] gap-16 px-8 md:grid-cols-2 md:px-20">
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-4xl font-light italic leading-tight text-white/80 md:text-5xl">
                A Quarter Century of{" "}
                <span className="bg-gradient-to-r from-[#c9a84c] to-[#fcf6ba] bg-clip-text text-transparent">
                  Unrivalled Excellence
                </span>
              </h2>
            </div>
            <div className="space-y-5 font-light text-white/40 text-sm leading-[1.6]">
              <p>
                Since 1998, Ark Vision has stood as Dubai&apos;s most trusted
                authority in luxury real estate. Our legacy is forged from
                decades of serving the world&apos;s most discerning
                individuals—royalty, heads of state, and captains of industry.
              </p>
              <p>
                We do not simply sell properties. We curate a life. From the
                first conversation to the final key handover, every touchpoint is
                crafted to exceed the expectations of those who accept nothing
                less than extraordinary.
              </p>
              <p>
                Our deep understanding of Dubai&apos;s luxury market, combined
                with an unparalleled global network, allows us to unlock
                opportunities that exist nowhere else — offering our clients
                access to the finest residences in the emirate.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/5 bg-white/5">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col gap-2 bg-[#080808] p-8"
              >
                <span className="font-serif text-3xl font-light italic text-[#c9a84c]">
                  {value}
                </span>
                <span className="text-xs uppercase tracking-[1.2px] text-white/30">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Leadership */}
      <section className="border-b border-white/5 py-24">
        <div className="mx-auto max-w-[1280px] px-8 md:px-20">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-[#c9a84c] to-transparent" />
            <span className="text-[10px] font-light uppercase tracking-[5px] text-[#c9a84c]">
              The People
            </span>
          </div>
          <h2 className="mt-4 font-serif text-5xl font-light italic text-white/80 md:text-6xl">
            Our Leadership
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <div key={person.name} className="group">
                <div className="relative aspect-[296/395] overflow-hidden rounded-sm">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover grayscale transition duration-300 group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-white mix-blend-saturation opacity-0 group-hover:opacity-20" />
                </div>
                <p className="mt-4 font-serif text-lg font-medium italic text-white/80">
                  {person.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[2.4px] text-[#c9a84c]">
                  {person.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
